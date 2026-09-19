/* ===== Движок уроков: сессии вопросов + теория (стиль Duolingo) ===== */

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Сессия вопросов ---------- */
function openSession(cfg) {
  const root = document.getElementById("lesson-root");
  const questions = cfg.questions.slice();
  const xpPer = cfg.xpPer || 10;
  let idx = 0, correct = 0, checked = false, sel = null;

  document.body.classList.add("lesson-open");

  function progress() {
    return Math.round((idx / questions.length) * 100);
  }

  function render() {
    checked = false; sel = null;
    const q = questions[idx];
    root.innerHTML =
      '<div class="lesson">' +
        '<div class="lesson-top">' +
          '<button class="icon-btn" id="ls-close" title="Выйти">✕</button>' +
          '<div class="progress"><div class="progress-fill" style="width:' + progress() + '%"></div></div>' +
          '<div class="lesson-count">' + (idx + 1) + " / " + questions.length + "</div>" +
        "</div>" +
        '<div class="lesson-body">' +
          '<div class="lesson-tag">' + esc(cfg.tag || "ЗАДАНИЕ") + "</div>" +
          '<h2 class="lesson-q">' + esc(q.q || "") + "</h2>" +
          ((q.code && q.t !== "fill") ? '<pre class="code">' + esc(q.code) + "</pre>" : "") +
          '<div id="ls-area"></div>' +
        "</div>" +
        '<div class="lesson-footer" id="ls-footer">' +
          '<button class="btn-3d btn-green btn-big" id="ls-check" disabled>Проверить</button>' +
        "</div>" +
      "</div>";
    document.getElementById("ls-close").onclick = close;
    renderQuestion(q);
  }

  function enableCheck() { document.getElementById("ls-check").disabled = false; }
  function onCheckBtn(fn) { document.getElementById("ls-check").onclick = fn; }

  function renderQuestion(q) {
    const area = document.getElementById("ls-area");
    if (q.t === "choice") {
      const opts = shuffle(q.options.map((o, i) => ({ o, ok: i === q.answer })));
      area.innerHTML = '<div class="opt-list">' + opts.map((x, i) =>
        '<button class="opt" data-i="' + i + '"><span class="opt-num">' + (i + 1) + "</span>" + esc(x.o) + "</button>"
      ).join("") + "</div>";
      let picked = -1;
      area.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        if (checked) return;
        area.querySelectorAll(".opt").forEach(x => x.classList.remove("sel"));
        b.classList.add("sel");
        picked = +b.dataset.i;
        sel = opts[picked].ok;
        enableCheck();
      });
      onCheckBtn(() => finish(sel === true, q,
        q.options[q.answer], null));
    }
    if (q.t === "tf") {
      area.innerHTML = '<div class="opt-list">' +
        '<button class="opt" data-v="1">✅ Правда</button>' +
        '<button class="opt" data-v="0">❌ Неправда</button></div>';
      area.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        if (checked) return;
        area.querySelectorAll(".opt").forEach(x => x.classList.remove("sel"));
        b.classList.add("sel");
        sel = (b.dataset.v === "1") === !!q.answer;
        enableCheck();
      });
      onCheckBtn(() => finish(sel === true, q, q.answer ? "Правда" : "Неправда", null));
    }
    if (q.t === "fill") {
      const opts = shuffle(q.options.map((o, i) => ({ o, ok: i === q.answer })));
      area.innerHTML = '<div class="fill-code">' +
        esc(q.code).split("___").join('<span class="fill-blank" id="fill-blank">···</span>') +
        "</div>" + '<div class="chip-row">' + opts.map((x, i) =>
          '<button class="chip" data-i="' + i + '">' + esc(x.o) + "</button>"
        ).join("") + "</div>";
      area.querySelectorAll(".chip").forEach(b => b.onclick = () => {
        if (checked) return;
        area.querySelectorAll(".chip").forEach(x => x.classList.remove("sel"));
        b.classList.add("sel");
        document.getElementById("fill-blank").textContent = opts[+b.dataset.i].o;
        sel = opts[+b.dataset.i].ok;
        enableCheck();
      });
      onCheckBtn(() => finish(sel === true, q, q.options[q.answer], null));
    }
    if (q.t === "input") {
      area.innerHTML = '<input class="text-input" id="ls-input" placeholder="Введи ответ…" autocomplete="off">';
      const inp = document.getElementById("ls-input");
      inp.focus();
      inp.oninput = () => { document.getElementById("ls-check").disabled = !inp.value.trim(); };
      inp.onkeydown = (e) => { if (e.key === "Enter" && inp.value.trim() && !checked) doInput(); };
      const norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
      function doInput() {
        const ok = q.accept.some(a => norm(a) === norm(inp.value));
        finish(ok, q, q.accept[0], null);
      }
      onCheckBtn(doInput);
    }
    if (q.t === "match") {
      const n = q.pairs.length;
      const lefts = shuffle(q.pairs.map((p, i) => ({ txt: p[0], i })));
      const rights = shuffle(q.pairs.map((p, i) => ({ txt: p[1], i })));
      const links = {}; // leftPos -> rightPos
      let selL = -1;
      area.innerHTML = '<div class="match-wrap"><div class="match-col" id="m-left">' +
        lefts.map((x, i) => '<button class="opt match-l" data-p="' + i + '">' + esc(x.txt) + "</button>").join("") +
        '</div><div class="match-col" id="m-right">' +
        rights.map((x, i) => '<button class="opt match-r" data-p="' + i + '">' + esc(x.txt) + "</button>").join("") +
        "</div></div>";
      const lBtns = [...area.querySelectorAll(".match-l")];
      const rBtns = [...area.querySelectorAll(".match-r")];
      lBtns.forEach(b => b.onclick = () => {
        if (checked) return;
        const p = +b.dataset.p;
        if (links[p] !== undefined) { // снять пару
          const rp = links[p]; delete links[p];
          lBtns[p].classList.remove("matched"); rBtns[rp].classList.remove("matched");
        } else {
          lBtns.forEach(x => x.classList.remove("sel"));
          selL = p; b.classList.add("sel");
        }
        syncMatch();
      });
      rBtns.forEach(b => b.onclick = () => {
        if (checked) return;
        if (selL < 0) return;
        const rp = +b.dataset.p;
        // снять старую связь этой правой кнопки
        for (const k in links) if (links[k] === rp) { delete links[k]; lBtns[k].classList.remove("matched"); }
        links[selL] = rp;
        lBtns.forEach(x => x.classList.remove("sel"));
        lBtns[selL].classList.add("matched"); b.classList.add("matched");
        selL = -1;
        syncMatch();
      });
      function syncMatch() {
        document.getElementById("ls-check").disabled = Object.keys(links).length !== n;
      }
      onCheckBtn(() => {
        let allOk = true;
        for (const k in links) {
          if (lefts[+k].i !== rights[links[k]].i) { allOk = false; break; }
        }
        const correctTxt = q.pairs.map(p => p[0] + " — " + p[1]).join("\n");
        finish(allOk, q, correctTxt, null);
      });
    }
    if (q.t === "order") {
      const order = shuffle(q.items.map((_, i) => i));
      let ans = [];
      area.innerHTML = '<div class="order-ans" id="o-ans"><span class="order-hint">Нажимай блоки по порядку…</span></div>' +
        '<div class="chip-row" id="o-bank">' + order.map(i =>
          '<button class="chip code-chip" data-i="' + i + '">' + esc(q.items[i]) + "</button>"
        ).join("") + "</div>";
      const bank = document.getElementById("o-bank");
      const ansBox = document.getElementById("o-ans");
      function draw() {
        ansBox.innerHTML = ans.length ? ans.map(i =>
          '<button class="chip code-chip in-ans" data-i="' + i + '">' + esc(q.items[i]) + "</button>"
        ).join("") : '<span class="order-hint">Нажимай блоки по порядку…</span>';
        [...bank.children].forEach(b => b.style.display = ans.includes(+b.dataset.i) ? "none" : "");
        ansBox.querySelectorAll(".in-ans").forEach(b => b.onclick = () => {
          if (checked) return;
          ans = ans.filter(x => x !== +b.dataset.i);
          draw();
        });
        document.getElementById("ls-check").disabled = ans.length !== q.items.length;
      }
      bank.querySelectorAll(".chip").forEach(b => b.onclick = () => {
        if (checked) return;
        ans.push(+b.dataset.i);
        draw();
      });
      draw();
      onCheckBtn(() => {
        const ok = ans.every((v, i) => v === i);
        finish(ok, q, q.items.join("\n"), null);
      });
    }
  }

  function finish(ok, q, correctTxt, extraHtml) {
    checked = true;
    if (ok) correct++;
    const footer = document.getElementById("ls-footer");
    footer.className = "lesson-footer banner " + (ok ? "good" : "bad");
    footer.innerHTML =
      '<div class="banner-inner">' +
        '<div class="banner-ico">' + (ok ? "🎉" : "💡") + "</div>" +
        '<div class="banner-txt"><b>' + (ok ? pick(["Отлично!", "Молодец!", "Супер!", "Так держать!"]) : "Правильный ответ:") + "</b>" +
        (ok
          ? (q.explain ? "<div>" + esc(q.explain) + "</div>" : "<div>+" + xpPer + " XP</div>")
          : '<div class="banner-answer">' + esc(correctTxt).replace(/\n/g, "<br>") + "</div>" +
            (q.explain ? "<div>" + esc(q.explain) + "</div>" : "")) +
        "</div>" +
        '<button class="btn-3d ' + (ok ? "btn-green" : "btn-red") + ' btn-big" id="ls-next">Продолжить</button>' +
      "</div>";
    document.getElementById("ls-next").onclick = () => {
      idx++;
      if (idx >= questions.length) showFinish();
      else { render(); window.scrollTo(0, 0); }
    };
    document.getElementById("ls-next").focus();
  }

  function showFinish() {
    const xp = correct * xpPer + (correct === questions.length ? 10 : 0);
    const pct = Math.round((correct / questions.length) * 100);
    root.innerHTML =
      '<div class="lesson"><div class="finish">' +
        '<div class="finish-ico">' + (pct === 100 ? "🏆" : pct >= 60 ? "🎉" : "💪") + "</div>" +
        "<h2>" + (pct === 100 ? "Идеально!" : pct >= 60 ? "Урок пройден!" : "Хорошая попытка!") + "</h2>" +
        '<div class="finish-stats">' +
          '<div class="fstat"><b class="gold">' + xp + " XP</b><span>опыт</span></div>" +
          '<div class="fstat"><b class="' + (pct >= 60 ? "green" : "red") + '">' + pct + '%</b><span>точность</span></div>' +
          '<div class="fstat"><b>' + correct + "/" + questions.length + "</b><span>верно</span></div>" +
        "</div>" +
        '<button class="btn-3d btn-green btn-big" id="ls-done">Продолжить</button>' +
        (cfg.retry ? '<button class="btn-ghost" id="ls-retry">Пройти ещё раз</button>' : "") +
      "</div></div>";
    celebrate(pct >= 60);
    document.getElementById("ls-done").onclick = () => {
      close();
      cfg.done && cfg.done({ correct, total: questions.length, xp, pct });
    };
    const rb = document.getElementById("ls-retry");
    if (rb) rb.onclick = () => openSession(cfg);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      const c = document.getElementById("ls-check");
      const n = document.getElementById("ls-next");
      const d = document.getElementById("ls-done");
      if (d) d.click();
      else if (n) n.click();
      else if (c && !c.disabled && document.activeElement.tagName !== "INPUT") c.click();
    }
  }
  document.addEventListener("keydown", onKey);

  function close() {
    document.removeEventListener("keydown", onKey);
    document.body.classList.remove("lesson-open");
    root.innerHTML = "";
    if (cfg.onClose) cfg.onClose();
  }

  render();
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function celebrate(big) {
  const em = big ? ["🎉", "⭐", "🏆", "🎊", "💚"] : ["💪", "📚", "✨"];
  for (let i = 0; i < (big ? 26 : 10); i++) {
    const s = document.createElement("div");
    s.className = "confetti";
    s.textContent = em[i % em.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDelay = (Math.random() * 0.6) + "s";
    s.style.fontSize = (18 + Math.random() * 26) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3200);
  }
}

/* ---------- Урок-теория: карточки по порядку ---------- */
function openTheory(cfg) {
  const root = document.getElementById("lesson-root");
  const cards = cfg.cards;
  const xpPer = cfg.xpPer || 5;
  let idx = 0;
  document.body.classList.add("lesson-open");

  function render() {
    const c = cards[idx];
    root.innerHTML =
      '<div class="lesson">' +
        '<div class="lesson-top">' +
          '<button class="icon-btn" id="ls-close">✕</button>' +
          '<div class="progress"><div class="progress-fill" style="width:' + Math.round((idx / cards.length) * 100) + '%"></div></div>' +
          '<div class="lesson-count">' + (idx + 1) + " / " + cards.length + "</div>" +
        "</div>" +
        '<div class="lesson-body"><div class="theory-card">' +
          '<div class="lesson-tag">НОВОЕ</div>' +
          '<h2 class="theory-term">' + esc(c.t) + "</h2>" +
          '<p class="theory-def">' + esc(c.d) + "</p>" +
          (c.e ? '<pre class="code">' + esc(c.e) + "</pre>" : "") +
          (c.tip ? '<div class="tip">💡 ' + esc(c.tip) + "</div>" : "") +
        "</div></div>" +
        '<div class="lesson-footer"><button class="btn-3d btn-green btn-big" id="ls-next">' +
          (idx === cards.length - 1 ? "Завершить" : "Далее") + "</button></div>" +
      "</div>";
    document.getElementById("ls-close").onclick = close;
    document.getElementById("ls-next").onclick = () => {
      idx++;
      if (idx >= cards.length) {
        const xp = cards.length * xpPer;
        close();
        cfg.done && cfg.done({ xp });
      } else render();
    };
  }
  function close() {
    document.body.classList.remove("lesson-open");
    root.innerHTML = "";
    if (cfg.onClose) cfg.onClose();
  }
  render();
}
