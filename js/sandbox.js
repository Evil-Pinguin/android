/* ===== Песочница: тренажёр кода на мини-Kotlin ===== */

function renderSandbox(v) {
  if (!S.sandboxCode) S.sandboxCode = {};
  if (!S.sandboxTask) S.sandboxTask = "free";
  const cur = SANDBOX_TASKS.find(t => t.id === S.sandboxTask);
  const taskId = cur ? cur.id : "free";

  let h = '<h1 class="page-title">💻 Песочница</h1>' +
    '<p class="muted">Пиши код на Kotlin и запускай прямо здесь! Решай задачи от простой к сложной — за каждую +30 XP.</p>' +
    '<div class="task-chips">' +
      '<button class="chip' + (taskId === "free" ? " sel" : "") + '" onclick="sbPick(\'free\')">🎲 Свободный режим</button>' +
      SANDBOX_TASKS.map((t, i) =>
        '<button class="chip' + (taskId === t.id ? " sel" : "") + '" onclick="sbPick(\'' + t.id + '\')">' +
        (S.sandboxDone[t.id] ? "✅" : (i + 1) + ".") + " " + esc(t.title) + "</button>"
      ).join("") +
    "</div>";

  if (cur) {
    h += '<div class="panel task-panel"><h3>📋 Задача: ' + esc(cur.title) + "</h3>" +
      "<p>" + esc(cur.desc) + "</p>" +
      '<div class="expected"><b>Программа должна вывести:</b><pre>' + esc(cur.expected) + "</pre></div>" +
      "<details><summary>💡 Подсказка</summary><p>" + esc(cur.hint) + "</p></details></div>";
  } else {
    h += '<div class="panel task-panel"><h3>🎲 Свободный режим</h3><p>Экспериментируй! Попробуй циклы, функции, списки — всё, что выучил.</p></div>';
  }

  const code = S.sandboxCode[taskId] !== undefined ? S.sandboxCode[taskId] :
    (cur ? cur.starter : 'fun main() {\n    println("Привет, песочница!")\n}');
  h += '<div class="editor-wrap"><div class="editor-head"><span>📝 Main.kt</span><span class="muted">Ctrl+Enter — запуск</span></div>' +
    '<textarea id="sb-code" spellcheck="false"></textarea></div>' +
    '<div class="row-btns">' +
      '<button class="btn-3d btn-green btn-big" onclick="sbRun()">▶ Запустить</button>' +
      (cur ? '<button class="btn-3d btn-blue btn-big" onclick="sbCheck()">✅ Проверить</button>' : "") +
      (cur && cur.solution ? '<button class="btn-3d btn-gray" onclick="sbSolution()">🔍 Решение</button>' : "") +
      '<button class="btn-3d btn-gray" onclick="sbReset()">↺ Сбросить</button>' +
    "</div>" +
    '<div class="console" id="sb-console"><span class="muted">Нажми «Запустить», чтобы увидеть результат…</span></div>';

  v.innerHTML = h;
  const ta = document.getElementById("sb-console") && document.getElementById("sb-code");
  ta.value = code;
  ta.addEventListener("input", () => { S.sandboxCode[taskId] = ta.value; save(); });
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 4;
      S.sandboxCode[taskId] = ta.value; save();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") sbRun();
  });

  window.sbPick = (id) => { S.sandboxTask = id; save(); renderSandbox(document.getElementById("view")); };
  window.sbSolution = () => {
    const t = SANDBOX_TASKS.find(x => x.id === taskId);
    if (!t || !t.solution) return;
    if (!S.sbSol) S.sbSol = {};
    S.sbSol[t.id] = 1; save();
    document.getElementById("sb-console").innerHTML =
      "<div class='c-ok'>🔍 Решение задачи «" + esc(t.title) + "»:</div><pre>" + esc(t.solution) + "</pre>" +
      "<div class='muted'>Разбери код, вставь в редактор и нажми «Проверить». За подсмотренное решение — +10 XP вместо +30.</div>";
    toast("Решение показано 👀 Разбери его!");
  };
  window.sbReset = () => {
    delete S.sandboxCode[taskId]; save();
    renderSandbox(document.getElementById("view"));
    toast("Код сброшен ↺");
  };
  window.sbRun = () => {
    const src = document.getElementById("sb-code").value;
    const r = runKotlin(src);
    const c = document.getElementById("sb-console");
    if (r.ok) {
      c.innerHTML = r.output
        ? "<div class='c-ok'>✓ Выполнено:</div><pre>" + esc(r.output) + "</pre>"
        : "<div class='c-ok'>✓ Выполнено, но программа ничего не вывела.</div><div class='muted'>Добавь println(...), чтобы что-то увидеть.</div>";
    } else {
      c.innerHTML = "<div class='c-err'>✕ Ошибка!</div><pre class='err'>" + esc(r.error) + "</pre>" +
        (r.output ? "<div class='muted'>Успело вывестись:</div><pre>" + esc(r.output) + "</pre>" : "");
    }
  };
  window.sbCheck = () => {
    const t = SANDBOX_TASKS.find(x => x.id === taskId);
    if (!t) return;
    const src = document.getElementById("sb-code").value;
    const r = runKotlin(src);
    const c = document.getElementById("sb-console");
    const norm = (s) => s.replace(/\r/g, "").split("\n").map(x => x.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
    if (!r.ok) {
      c.innerHTML = "<div class='c-err'>✕ Сначала исправь ошибку:</div><pre class='err'>" + esc(r.error) + "</pre>";
      return;
    }
    if (norm(r.output) === norm(t.expected)) {
      celebrate(true);
      if (!S.sandboxDone[t.id]) {
        const award = (S.sbSol && S.sbSol[t.id]) ? 10 : 30;
        S.sandboxDone[t.id] = 1;
        addXP(award); save(); renderAside();
        toast("+" + award + " XP! Задача решена! ⚡");
        renderSandbox(document.getElementById("view"));
        document.getElementById("sb-console").innerHTML =
          "<div class='c-ok'>🎉 Верно! Задача решена! +" + award + " XP</div><pre>" + esc(r.output) + "</pre>";
      } else {
        c.innerHTML = "<div class='c-ok'>🎉 Верно! Задача решена!</div><pre>" + esc(r.output) + "</pre>";
        toast("Верно! (XP за эту задачу уже получен)");
      }
    } else {
      c.innerHTML = "<div class='c-err'>✕ Пока не совпадает. Сравни:</div>" +
        "<div class='diff'><div><b>Твой вывод:</b><pre>" + esc(r.output || "(пусто)") + "</pre></div>" +
        "<div><b>Нужно:</b><pre>" + esc(t.expected) + "</pre></div></div>" +
        "<div class='muted'>💡 " + esc(t.hint) + "</div>";
    }
  };
}
