/* ===== Мини-интерпретатор подмножества Kotlin (для песочницы) =====
   Поддерживает: println/print, val/var, if/else, when, for (in .., until, списки),
   while, fun + return, listOf/mutableListOf, .size/.length/.add(), шаблоны $,
   null, ?., ?:, комментарии //. */

function runKotlin(src) {
  const output = [];
  const MAX_OUT = 5000;

  function printVal(v) {
    if (output.length >= MAX_OUT) throw err(null, "Слишком много вывода (может, бесконечный цикл?)");
    output.push(toStr(v));
  }

  function err(line, msg) { const e = new Error(msg); e.line = line; return e; }
  function toStr(v) {
    if (v === null || v === undefined) return "null";
    if (v.t === "str") return v.v;
    if (v.t === "num") return Number.isInteger(v.v) ? String(v.v) : String(v.v);
    if (v.t === "bool") return v.v ? "true" : "false";
    if (v.t === "null") return "null";
    if (v.t === "list") return "[" + v.v.map(toStr).join(", ") + "]";
    if (v.t === "range") return v.v.from + ".." + v.v.to;
    if (v.t === "fun") return "fun " + (v.name || "") + "(...)";
    if (v.t === "random") return "Random";
    return String(v.v);
  }
  function isTrue(v) {
    if (v.t === "bool") return v.v;
    if (v.t === "null") return false;
    if (v.t === "num") return v.v !== 0;
    if (v.t === "str") return v.v.length > 0;
    return true;
  }
  function eq(a, b) {
    if (a.t !== b.t) {
      if (a.t === "null" || b.t === "null") return a.t === b.t;
      return false;
    }
    if (a.t === "list") {
      if (a.v.length !== b.v.length) return false;
      return a.v.every((x, i) => eq(x, b.v[i]));
    }
    return a.v === b.v;
  }

  /* ---------- Токенизатор ---------- */
  function tokenize(s) {
    const toks = [];
    let i = 0, line = 1;
    const ops3 = ["..."];
    const ops2 = ["..", "==", "!=", "<=", ">=", "&&", "||", "++", "--", "->", "?:", "?.", "+=", "-=", "*=", "/=", "%="];
    const ops1 = "+-*/%<>=!?:(){}[],.;";
    while (i < s.length) {
      const c = s[i];
      if (c === "\n") { line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }
      if (c === "/" && s[i + 1] === "/") { while (i < s.length && s[i] !== "\n") i++; continue; }
      if (c === "/" && s[i + 1] === "*") {
        i += 2;
        while (i < s.length && !(s[i] === "*" && s[i + 1] === "/")) { if (s[i] === "\n") line++; i++; }
        i += 2; continue;
      }
      if (c === '"') {
        let j = i + 1, raw = "";
        while (j < s.length && s[j] !== '"') {
          if (s[j] === "\\" && j + 1 < s.length) {
            const n = s[j + 1];
            if (n === "n") { raw += "\n"; j += 2; continue; }
            if (n === "t") { raw += "\t"; j += 2; continue; }
            if (n === '"') { raw += '"'; j += 2; continue; }
            if (n === "\\") { raw += "\\"; j += 2; continue; }
            if (n === "$") { raw += "\x00D"; j += 2; continue; }
            raw += n; j += 2; continue;
          }
          raw += s[j]; j++;
        }
        if (j >= s.length) throw err(line, "Не закрыта кавычка");
        toks.push({ t: "str", v: raw, line });
        i = j + 1; continue;
      }
      if (/[0-9]/.test(c)) {
        let j = i, num = "";
        while (j < s.length && /[0-9.]/.test(s[j])) {
          if (s[j] === "." && (j + 1 >= s.length || !/[0-9]/.test(s[j + 1]))) break;
          num += s[j]; j++;
        }
        toks.push({ t: "num", v: parseFloat(num), line });
        i = j; continue;
      }
      if (/[A-Za-z_А-Яа-яЁё]/.test(c)) {
        let j = i, w = "";
        while (j < s.length && /[A-Za-z0-9_А-Яа-яЁё]/.test(s[j])) { w += s[j]; j++; }
        toks.push({ t: "id", v: w, line });
        i = j; continue;
      }
      const three = s.substr(i, 3), two = s.substr(i, 2);
      if (ops3.includes(three)) { toks.push({ t: "op", v: three, line }); i += 3; continue; }
      if (ops2.includes(two)) { toks.push({ t: "op", v: two, line }); i += 2; continue; }
      if (ops1.includes(c)) { toks.push({ t: "op", v: c, line }); i++; continue; }
      throw err(line, "Непонятный символ: " + c);
    }
    return toks;
  }

  /* ---------- Парсер ---------- */
  const tokens = tokenize(src);
  let pos = 0;
  function peek() { return tokens[pos]; }
  function next() { return tokens[pos++]; }
  function eof() { return pos >= tokens.length; }
  function isOp(v) { const t = peek(); return t && t.t === "op" && t.v === v; }
  function isId(v) { const t = peek(); return t && t.t === "id" && (v === undefined || t.v === v); }
  function expectOp(v) {
    const t = next();
    if (!t || t.t !== "op" || t.v !== v) throw err(t ? t.line : null, "Ожидалось «" + v + "»");
    return t;
  }
  function expectId(what) {
    const t = next();
    if (!t || t.t !== "id") throw err(t ? t.line : null, "Ожидалось " + (what || "имя"));
    return t;
  }

  function parseProgram() {
    const body = [];
    while (!eof()) {
      if (isOp(";")) { next(); continue; }
      body.push(parseStatement());
    }
    return { type: "prog", body };
  }
  function parseStatement() {
    if (isId("val") || isId("var")) {
      const k = next();
      const name = expectId("имя переменной");
      if (isOp(":")) { next(); parseTypeName(); }
      expectOp("=");
      const expr = parseExpr();
      return { type: "decl", kind: k.v, name: name.v, expr, line: k.line };
    }
    if (isId("fun")) return parseFun();
    if (isId("if")) return parseIf();
    if (isId("when")) return parseWhen();
    if (isId("for")) return parseFor();
    if (isId("while")) {
      const k = next(); expectOp("(");
      const cond = parseExpr(); expectOp(")");
      const body = parseBody();
      return { type: "while", cond, body, line: k.line };
    }
    if (isId("return")) {
      const k = next();
      let expr = null;
      if (!eof() && !isOp("}") && !isOp(";")) expr = parseExpr();
      return { type: "return", expr, line: k.line };
    }
    if (isOp("{")) return parseBlock();
    const e = parseExpr();
    if (!eof() && peek().t === "op" && ["=", "+=", "-=", "*=", "/=", "%="].includes(peek().v)) {
      const op = next();
      if (e.type !== "var") throw err(op.line, "Присваивать можно только переменной");
      const val = parseExpr();
      return { type: "assign", name: e.name, op: op.v, expr: val, line: op.line };
    }
    if (!eof() && peek().t === "op" && (peek().v === "++" || peek().v === "--")) {
      const op = next();
      if (e.type !== "var") throw err(op.line, "++ и -- работают только с переменными");
      return { type: "incdec", name: e.name, op: op.v, line: op.line };
    }
    return { type: "expr", expr: e, line: e.line };
  }
  function parseTypeName() {
    let n = "";
    const t = next();
    if (!t || (t.t !== "id" && t.t !== "op")) throw err(t ? t.line : null, "Ожидался тип");
    n += t.v;
    while (!eof() && ((peek().t === "op" && ["?", "<", ">", ","].includes(peek().v)) || peek().t === "id")) n += next().v;
    return n;
  }
  function parseFun() {
    const k = next();
    const name = expectId("имя функции");
    expectOp("(");
    const params = [];
    while (!isOp(")")) {
      if (isOp(",")) { next(); continue; }
      if (eof()) throw err(null, "Не закрыта скобка параметров");
      const p = expectId("параметр");
      let def = null;
      if (isOp(":")) { next(); parseTypeName(); }
      if (isOp("=")) { next(); def = parseExpr(); }
      params.push({ name: p.v, def });
    }
    expectOp(")");
    if (isOp(":")) { next(); parseTypeName(); }
    if (isOp("=")) { // fun f() = expr
      next();
      const expr = parseExpr();
      return { type: "fun", name: name.v, params, body: { type: "block", body: [{ type: "return", expr, line: k.line }] }, line: k.line };
    }
    const body = parseBlock();
    return { type: "fun", name: name.v, params, body, line: k.line };
  }
  function parseIf() {
    const k = next(); expectOp("(");
    const cond = parseExpr(); expectOp(")");
    const thenB = parseBody();
    let elseB = null;
    if (isId("else")) { next(); elseB = (isId("if")) ? parseIf() : parseBody(); }
    return { type: "if", cond, thenB, elseB, line: k.line };
  }
  function parseWhen() {
    const k = next(); expectOp("(");
    const subj = parseExpr(); expectOp(")");
    expectOp("{");
    const branches = [];
    while (!isOp("}")) {
      if (eof()) throw err(null, "Не закрыт when");
      if (isOp(";")) { next(); continue; }
      if (isId("else")) {
        next(); expectOp("->");
        branches.push({ conds: null, body: parseBodyOrSingle() });
      } else {
        const conds = [parseExpr()];
        while (isOp(",")) { next(); conds.push(parseExpr()); }
        expectOp("->");
        branches.push({ conds, body: parseBodyOrSingle() });
      }
    }
    expectOp("}");
    return { type: "when", subj, branches, line: k.line };
  }
  function parseFor() {
    const k = next(); expectOp("(");
    const v = expectId("переменная цикла");
    const inT = next();
    if (!inT || inT.t !== "id" || inT.v !== "in") throw err(inT ? inT.line : null, "Ожидалось «in»");
    const iter = parseExpr();
    let step = null;
    if (isId("step")) { next(); step = parseExpr(); }
    expectOp(")");
    const body = parseBody();
    return { type: "for", v: v.v, iter, step, body, line: k.line };
  }
  function parseBody() { return isOp("{") ? parseBlock() : { type: "block", body: [parseStatement()] }; }
  function parseBodyOrSingle() { return parseBody(); }
  function parseBlock() {
    expectOp("{");
    const body = [];
    while (!isOp("}")) {
      if (eof()) throw err(null, "Не закрыта скобка {");
      if (isOp(";")) { next(); continue; }
      body.push(parseStatement());
    }
    expectOp("}");
    return { type: "block", body };
  }

  /* Выражения */
  function parseExpr() { return parseElvis(); }
  function parseElvis() {
    let e = parseOr();
    if (isOp("?:")) { const o = next(); const r = parseElvis(); e = { type: "elvis", l: e, r, line: o.line }; }
    return e;
  }
  function parseOr() {
    let e = parseAnd();
    while (isOp("||")) { const o = next(); e = { type: "bin", op: "||", l: e, r: parseAnd(), line: o.line }; }
    return e;
  }
  function parseAnd() {
    let e = parseEq();
    while (isOp("&&")) { const o = next(); e = { type: "bin", op: "&&", l: e, r: parseEq(), line: o.line }; }
    return e;
  }
  function parseEq() {
    let e = parseCmp();
    while (!eof() && peek().t === "op" && (peek().v === "==" || peek().v === "!=")) {
      const o = next(); e = { type: "bin", op: o.v, l: e, r: parseCmp(), line: o.line };
    }
    return e;
  }
  function parseCmp() {
    let e = parseRange();
    while (!eof() && peek().t === "op" && ["<", ">", "<=", ">="].includes(peek().v)) {
      const o = next(); e = { type: "bin", op: o.v, l: e, r: parseRange(), line: o.line };
    }
    return e;
  }
  function parseRange() {
    let e = parseAdd();
    if (isOp("..")) { const o = next(); e = { type: "range", l: e, r: parseAdd(), kind: "dot", line: o.line }; }
    else if (isId("until")) { const o = next(); e = { type: "range", l: e, r: parseAdd(), kind: "until", line: o.line }; }
    else if (isId("downTo")) { const o = next(); e = { type: "range", l: e, r: parseAdd(), kind: "downTo", line: o.line }; }
    return e;
  }
  function parseAdd() {
    let e = parseMul();
    while (!eof() && peek().t === "op" && (peek().v === "+" || peek().v === "-")) {
      const o = next(); e = { type: "bin", op: o.v, l: e, r: parseMul(), line: o.line };
    }
    return e;
  }
  function parseMul() {
    let e = parseUnary();
    while (!eof() && peek().t === "op" && (peek().v === "*" || peek().v === "/" || peek().v === "%")) {
      const o = next(); e = { type: "bin", op: o.v, l: e, r: parseUnary(), line: o.line };
    }
    return e;
  }
  function parseUnary() {
    if (isOp("!")) { const o = next(); return { type: "un", op: "!", e: parseUnary(), line: o.line }; }
    if (isOp("-")) { const o = next(); return { type: "un", op: "-", e: parseUnary(), line: o.line }; }
    return parsePostfix();
  }
  function parsePostfix() {
    let e = parsePrimary();
    while (true) {
      if (isOp("(")) {
        const o = next(); const args = [];
        while (!isOp(")")) {
          if (eof()) throw err(null, "Не закрыта скобка вызова");
          if (isOp(",")) { next(); continue; }
          args.push(parseExpr());
        }
        expectOp(")");
        e = { type: "call", f: e, args, line: o.line };
      } else if (isOp("[")) {
        const o = next(); const idx = parseExpr(); expectOp("]");
        e = { type: "index", obj: e, idx, line: o.line };
      } else if (isOp(".") || isOp("?.")) {
        const o = next(); const safe = o.v === "?.";
        const m = expectId("свойство или метод");
        e = { type: "member", obj: e, name: m.v, safe, line: o.line };
      } else break;
    }
    return e;
  }
  function parsePrimary() {
    const t = peek();
    if (!t) throw err(null, "Неожиданный конец кода");
    if (t.t === "num") { next(); return { type: "lit", v: { t: "num", v: t.v }, line: t.line }; }
    if (t.t === "str") { next(); return { type: "str", raw: t.v, line: t.line }; }
    if (t.t === "id" && t.v === "true") { next(); return { type: "lit", v: { t: "bool", v: true }, line: t.line }; }
    if (t.t === "id" && t.v === "false") { next(); return { type: "lit", v: { t: "bool", v: false }, line: t.line }; }
    if (t.t === "id" && t.v === "null") { next(); return { type: "lit", v: { t: "null", v: null }, line: t.line }; }
    if (t.t === "id" && t.v === "if") return parseIf();
    if (t.t === "id") { next(); return { type: "var", name: t.v, line: t.line }; }
    if (t.t === "op" && t.v === "(") { next(); const e = parseExpr(); expectOp(")"); return e; }
    throw err(t.line, "Неожиданно: «" + t.v + "»");
  }

  /* ---------- Выполнение ---------- */
  function Scope(parent) { return { vars: {}, consts: {}, parent }; }
  function findScope(sc, name) {
    let s = sc;
    while (s) { if (name in s.vars) return s; s = s.parent; }
    return null;
  }
  function getVar(sc, name, line) {
    const s = findScope(sc, name);
    if (!s) throw err(line, "Неизвестное имя: " + name);
    return s.vars[name];
  }

  function evalTemplate(raw, sc, line) {
    let out = "";
    let i = 0;
    while (i < raw.length) {
      const c = raw[i];
      if (c === "\x00" && raw[i + 1] === "D") { out += "$"; i += 2; continue; }
      if (c === "$" && i + 1 < raw.length) {
        if (raw[i + 1] === "{") {
          let j = i + 2, depth = 1;
          while (j < raw.length && depth > 0) {
            if (raw[j] === "{") depth++;
            else if (raw[j] === "}") depth--;
            j++;
          }
          if (depth !== 0) throw err(line, "Не закрыт ${...}");
          const inner = raw.slice(i + 2, j - 1);
          out += toStr(evalSubExpr(inner, sc));
          i = j; continue;
        }
        const m = raw.slice(i + 1).match(/^[A-Za-z_А-Яа-яЁё][A-Za-z0-9_А-Яа-яЁё]*/);
        if (m) { out += toStr(getVar(sc, m[0], line)); i += 1 + m[0].length; continue; }
      }
      out += c; i++;
    }
    return { t: "str", v: out };
  }

  // Вычисление под-выражения ${...} через отдельный запуск парсера
  function evalSubExpr(code, sc) {
    const savedTokens = tokens.slice, savedPos = pos;
    const sub = tokenize(code);
    const outer = { toks: tokens, p: pos };
    try {
      // подменяем поток токенов
      tokens.length = 0;
      for (const t of sub) tokens.push(t);
      pos = 0;
      const node = parseExpr();
      return evalExpr(node, sc);
    } finally {
      tokens.length = 0;
      for (const t of outer.toks) tokens.push(t);
      pos = outer.p;
    }
    void savedTokens; void savedPos;
  }

  let loopGuard = 0;
  const LOOP_MAX = 200000;
  function guard(line) {
    if (++loopGuard > LOOP_MAX) throw err(line, "Программа работает слишком долго (бесконечный цикл?)");
  }
  let callDepth = 0;

  function evalExpr(n, sc) {
    switch (n.type) {
      case "lit": return n.v;
      case "str": return evalTemplate(n.raw, sc, n.line);
      case "var": return getVar(sc, n.name, n.line);
      case "elvis": {
        const l = evalExpr(n.l, sc);
        return l.t === "null" ? evalExpr(n.r, sc) : l;
      }
      case "bin": return evalBin(n, sc);
      case "un": {
        const v = evalExpr(n.e, sc);
        if (n.op === "!") return { t: "bool", v: !isTrue(v) };
        if (n.op === "-") {
          if (v.t !== "num") throw err(n.line, "Минус работает только с числами");
          return { t: "num", v: -v.v };
        }
      }
      case "range": {
        const a = evalExpr(n.l, sc), b = evalExpr(n.r, sc);
        if (a.t !== "num" || b.t !== "num") throw err(n.line, "Диапазон строится из чисел");
        const from = Math.trunc(a.v);
        let to = Math.trunc(b.v), step = 1;
        if (n.kind === "until") to = to - 1;
        if (n.kind === "downTo") step = -1;
        return { t: "range", v: { from, to, step } };
      }
      case "member": {
        const o = evalExpr(n.obj, sc);
        if (o.t === "null") {
          if (n.safe) return { t: "null", v: null };
          throw err(n.line, "Null! Используй ?. для безопасного вызова");
        }
        return getMember(o, n.name, n.line);
      }
      case "index": {
        const o = evalExpr(n.obj, sc), idx = evalExpr(n.idx, sc);
        if (idx.t !== "num") throw err(n.line, "Индекс должен быть числом");
        const k = Math.trunc(idx.v);
        if (o.t === "list") {
          if (k < 0 || k >= o.v.length) throw err(n.line, "Индекс " + k + " вне списка (размер " + o.v.length + ")");
          return o.v[k];
        }
        if (o.t === "str") {
          if (k < 0 || k >= o.v.length) throw err(n.line, "Индекс вне строки");
          return { t: "str", v: o.v[k] };
        }
        throw err(n.line, "Индекс [...] работает со списками и строками");
      }
      case "call": return evalCall(n, sc);
      case "if": {
        const c = evalExpr(n.cond, sc);
        if (isTrue(c)) return execBlock(n.thenB, sc);
        if (n.elseB) {
          if (n.elseB.type === "if") return evalExpr(n.elseB, sc);
          return execBlock(n.elseB, sc);
        }
        return { t: "null", v: null };
      }
    }
    throw err(n.line, "Не умею вычислять это выражение");
  }

  function getMember(o, name, line) {
    if (o.t === "list" && name === "size") return { t: "num", v: o.v.length };
    if (o.t === "str" && (name === "length" || name === "size")) return { t: "num", v: o.v.length };
    if (o.t === "range" && name === "step") return { t: "num", v: o.v.step };
    // методы возвращаем как связанные вызовы
    if (o.t === "list" && ["add", "isEmpty", "isNotEmpty", "contains"].includes(name)) return { t: "method", o, name };
    if (o.t === "random" && ["nextInt", "nextBoolean"].includes(name)) return { t: "method", o, name };
    if (o.t === "str" && ["uppercase", "lowercase", "toInt", "toDouble", "isEmpty", "isNotEmpty", "length"].includes(name)) return { t: "method", o, name };
    throw err(line, "Не знаю свойство/метод ." + name);
  }

  function evalBin(n, sc) {
    if (n.op === "&&") {
      const l = evalExpr(n.l, sc);
      if (!isTrue(l)) return { t: "bool", v: false };
      return { t: "bool", v: isTrue(evalExpr(n.r, sc)) };
    }
    if (n.op === "||") {
      const l = evalExpr(n.l, sc);
      if (isTrue(l)) return { t: "bool", v: true };
      return { t: "bool", v: isTrue(evalExpr(n.r, sc)) };
    }
    const a = evalExpr(n.l, sc), b = evalExpr(n.r, sc);
    switch (n.op) {
      case "==": return { t: "bool", v: eq(a, b) };
      case "!=": return { t: "bool", v: !eq(a, b) };
      case "+":
        if (a.t === "str" || b.t === "str") return { t: "str", v: toStr(a) + toStr(b) };
        if (a.t === "num" && b.t === "num") return { t: "num", v: a.v + b.v };
        if (a.t === "list" && b.t === "list") return { t: "list", v: a.v.concat(b.v) };
        throw err(n.line, "+ работает с числами, строками и списками");
      case "-": case "*": case "/": case "%": {
        if (a.t !== "num" || b.t !== "num") throw err(n.line, "Арифметика работает только с числами");
        if (n.op === "-") return { t: "num", v: a.v - b.v };
        if (n.op === "*") return { t: "num", v: a.v * b.v };
        if (n.op === "/") {
          if (b.v === 0) throw err(n.line, "Деление на ноль!");
          return { t: "num", v: a.v / b.v };
        }
        if (b.v === 0) throw err(n.line, "Деление на ноль!");
        return { t: "num", v: a.v % b.v };
      }
      case "<": case ">": case "<=": case ">=": {
        if (a.t === "num" && b.t === "num") {
          const r = n.op === "<" ? a.v < b.v : n.op === ">" ? a.v > b.v : n.op === "<=" ? a.v <= b.v : a.v >= b.v;
          return { t: "bool", v: r };
        }
        if (a.t === "str" && b.t === "str") {
          const r = n.op === "<" ? a.v < b.v : n.op === ">" ? a.v > b.v : n.op === "<=" ? a.v <= b.v : a.v >= b.v;
          return { t: "bool", v: r };
        }
        throw err(n.line, "Сравнивать можно числа и строки");
      }
    }
  }

  function evalCall(n, sc) {
    // вызов метода: obj.method(args)
    if (n.f.type === "member") {
      const o = evalExpr(n.f.obj, sc);
      if (o.t === "null") {
        if (n.f.safe) return { t: "null", v: null };
        throw err(n.line, "Null! Используй ?. для безопасного вызова");
      }
      const args = n.args.map(a => evalExpr(a, sc));
      return callMethod(o, n.f.name, args, n.line);
    }
    if (n.f.type === "var") {
      const args = n.args.map(a => evalExpr(a, sc));
      return callFunc(n.f.name, args, sc, n.line);
    }
    throw err(n.line, "Это нельзя вызвать как функцию");
  }

  function callMethod(o, name, args, line) {
    if (o.t === "random") {
      if (name === "nextInt") {
        if (args.length === 1 && args[0].t === "num") {
          const n = Math.trunc(args[0].v);
          if (n <= 0) throw err(line, "nextInt: число должно быть больше 0");
          return { t: "num", v: Math.floor(Math.random() * n) };
        }
        if (args.length === 2 && args[0].t === "num" && args[1].t === "num") {
          const from = Math.trunc(args[0].v), until = Math.trunc(args[1].v);
          if (until <= from) throw err(line, "nextInt: конец должен быть больше начала");
          return { t: "num", v: from + Math.floor(Math.random() * (until - from)) };
        }
        throw err(line, "nextInt(n) или nextInt(from, until)");
      }
      if (name === "nextBoolean") return { t: "bool", v: Math.random() < 0.5 };
    }
    if (o.t === "list") {
      if (name === "add") { o.v.push(args[0] !== undefined ? args[0] : { t: "null", v: null }); return { t: "bool", v: true }; }
      if (name === "isEmpty") return { t: "bool", v: o.v.length === 0 };
      if (name === "isNotEmpty") return { t: "bool", v: o.v.length > 0 };
      if (name === "contains") return { t: "bool", v: o.v.some(x => eq(x, args[0])) };
    }
    if (o.t === "str") {
      if (name === "uppercase") return { t: "str", v: o.v.toUpperCase() };
      if (name === "lowercase") return { t: "str", v: o.v.toLowerCase() };
      if (name === "toInt") { const x = parseInt(o.v, 10); if (isNaN(x)) throw err(line, "Не число: " + o.v); return { t: "num", v: x }; }
      if (name === "toDouble") { const x = parseFloat(o.v); if (isNaN(x)) throw err(line, "Не число: " + o.v); return { t: "num", v: x }; }
      if (name === "isEmpty") return { t: "bool", v: o.v.length === 0 };
      if (name === "isNotEmpty") return { t: "bool", v: o.v.length > 0 };
    }
    throw err(line, "Не знаю метод ." + name + "()");
  }

  function callFunc(name, args, sc, line) {
    if (name === "println") { printVal(args.length ? (args.length === 1 ? args[0] : { t: "str", v: args.map(toStr).join(" ") }) : { t: "str", v: "" }); return { t: "null", v: null }; }
    if (name === "print") {
      const s = args.length ? args.map(toStr).join(" ") : "";
      if (output.length === 0) output.push(s);
      else output[output.length - 1] += s;
      return { t: "null", v: null };
    }
    if (name === "listOf") return { t: "list", v: args.slice() };
    if (name === "mutableListOf") return { t: "list", v: args.slice(), mut: true };
    const f = getVar(sc, name, line);
    if (!f || f.t !== "fun") throw err(line, "Неизвестная функция: " + name);
    if (++callDepth > 500) throw err(line, "Слишком глубокая рекурсия");
    try {
      const local = Scope(f.closure);
      for (let i = 0; i < f.params.length; i++) {
        const p = f.params[i];
        let val = args[i];
        if (val === undefined) {
          if (p.def) val = evalExpr(p.def, local);
          else throw err(line, "Функции " + name + " не хватает аргумента «" + p.name + "»");
        }
        local.vars[p.name] = val;
      }
      const res = execBlock(f.body, local);
      return res && res.__ret !== undefined ? res.__ret : { t: "null", v: null };
    } catch (e) {
      if (e && e.__isRet) return e.value;
      throw e;
    } finally { callDepth--; }
  }

  function execBlock(b, sc) {
    const local = Scope(sc);
    let last = { t: "null", v: null };
    for (const st of b.body) {
      const r = execStmt(st, local);
      if (r && r.__isRet) throw r;
      if (r !== undefined) last = r;
    }
    return last;
  }

  function execStmt(st, sc) {
    switch (st.type) {
      case "decl": {
        const v = evalExpr(st.expr, sc);
        sc.vars[st.name] = v;
        if (st.kind === "val") sc.consts[st.name] = true;
        return undefined;
      }
      case "assign": {
        const s = findScope(sc, st.name);
        if (!s) throw err(st.line, "Неизвестная переменная: " + st.name);
        if (s.consts[st.name]) throw err(st.line, "«" + st.name + "» — это val, её менять нельзя!");
        const v = evalExpr(st.expr, sc);
        if (st.op === "=") s.vars[st.name] = v;
        else {
          const cur = s.vars[st.name];
          if (cur.t !== "num" || v.t !== "num") throw err(st.line, st.op + " работает только с числами");
          const r = st.op === "+=" ? cur.v + v.v : st.op === "-=" ? cur.v - v.v : st.op === "*=" ? cur.v * v.v : st.op === "/=" ? cur.v / v.v : cur.v % v.v;
          s.vars[st.name] = { t: "num", v: r };
        }
        return undefined;
      }
      case "incdec": {
        const s = findScope(sc, st.name);
        if (!s) throw err(st.line, "Неизвестная переменная: " + st.name);
        const cur = s.vars[st.name];
        if (cur.t !== "num") throw err(st.line, st.op + " работает только с числами");
        s.vars[st.name] = { t: "num", v: cur.v + (st.op === "++" ? 1 : -1) };
        return undefined;
      }
      case "fun": {
        sc.vars[st.name] = { t: "fun", params: st.params, body: st.body, closure: sc };
        return undefined;
      }
      case "return": {
        const v = st.expr ? evalExpr(st.expr, sc) : { t: "null", v: null };
        throw { __isRet: true, value: v };
      }
      case "expr": return evalExpr(st.expr, sc);
      case "block": return execBlock(st, sc);
      case "if": return evalExpr(st, sc);
      case "when": {
        const subj = evalExpr(st.subj, sc);
        for (const br of st.branches) {
          if (br.conds === null) return execBlock(br.body, sc);
          for (const c of br.conds) {
            if (eq(subj, evalExpr(c, sc))) return execBlock(br.body, sc);
          }
        }
        return undefined;
      }
      case "while": {
        let g = 0;
        while (isTrue(evalExpr(st.cond, sc))) {
          guard(st.line);
          if (++g > LOOP_MAX) throw err(st.line, "Цикл while крутится слишком долго");
          execBlock(st.body, sc);
        }
        return undefined;
      }
      case "for": {
        const it = evalExpr(st.iter, sc);
        const stepV = st.step ? evalExpr(st.step, sc) : null;
        const items = [];
        if (it.t === "range") {
          let step = it.v.step;
          if (stepV) {
            if (stepV.t !== "num") throw err(st.line, "step должен быть числом");
            step = Math.trunc(stepV.v) * (step < 0 ? -1 : 1);
            if (step === 0) throw err(st.line, "step не может быть нулём");
          }
          const { from, to } = it.v;
          const count = step > 0 ? Math.max(0, Math.floor((to - from) / step) + 1) : Math.max(0, Math.floor((from - to) / -step) + 1);
          if (count > LOOP_MAX) throw err(st.line, "Слишком большой диапазон");
          if (step > 0) { for (let x = from; x <= to; x += step) items.push({ t: "num", v: x }); }
          else { for (let x = from; x >= to; x += step) items.push({ t: "num", v: x }); }
        } else if (it.t === "list") {
          for (const x of it.v) items.push(x);
        } else if (it.t === "str") {
          for (const ch of it.v) items.push({ t: "str", v: ch });
        } else throw err(st.line, "for работает с диапазонами, списками и строками");
        for (const v of items) {
          guard(st.line);
          const local = Scope(sc);
          local.vars[st.v] = v;
          execBlock(st.body, local);
        }
        return undefined;
      }
    }
  }

  /* ---------- Запуск ---------- */
  try {
    const ast = parseProgram();
    const global = Scope(null);
    global.vars["Random"] = { t: "random" };
    for (const st of ast.body) execStmt(st, global);
    if (findScope(global, "main")) callFunc("main", [], global, null);
    return { ok: true, output: output.join("\n") };
  } catch (e) {
    if (e && e.__isRet) return { ok: true, output: output.join("\n") };
    const msg = e && e.message ? e.message : String(e);
    const line = e && e.line ? "Строка " + e.line + ": " : "";
    return { ok: false, output: output.join("\n"), error: line + msg };
  }
}
