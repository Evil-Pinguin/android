/* ===== DroidLingo: состояние, навигация, экраны ===== */

const GOAL = 50;
const LEVELS = [
  { xp: 0, name: "Новичок", icon: "🌱" },
  { xp: 100, name: "Ученик", icon: "📖" },
  { xp: 250, name: "Любитель", icon: "🔧" },
  { xp: 500, name: "Умелец", icon: "🛠️" },
  { xp: 1000, name: "Продвинутый", icon: "🚀" },
  { xp: 2000, name: "Мастер", icon: "🧠" },
  { xp: 4000, name: "Гуру Android", icon: "🤖" }
];
const TIPS = [
  "Повторяй карточки каждый день — так запоминается в 3 раза лучше.",
  "Не зубри: сразу пробуй код в Песочнице.",
  "Ошибки — это опыт. Здесь нет жизней, ошибайся смело!",
  "Проходи разделы по порядку: от простого к сложному.",
  "Kotlin и Android учатся вместе: сначала Kotlin, потом экраны.",
  "Цель дня — всего 50 XP. Маленькие шаги каждый день!",
  "Перескажи выученное другу или коту — так запомнишь навсегда."
];

/* ---------- Состояние ---------- */
const DEF = { xp: 0, xpToday: 0, xpDate: "", streak: 0, lastDay: "", tab: "home",
  tests: {}, theory: {}, practice: {}, cps: {}, kotlin: {}, kotlinCp: 0,
  decks: {}, sandboxDone: {}, sbSol: {}, klevel: null };
let S = load();
function load() {
  try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem("droidlingo_v1") || "{}")); }
  catch (e) { return Object.assign({}, DEF); }
}
function save() { localStorage.setItem("droidlingo_v1", JSON.stringify(S)); }
function todayStr(d) {
  d = d || new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
function addXP(n) {
  const t = todayStr();
  if (S.xpDate !== t) {
    S.xpDate = t; S.xpToday = 0;
    const y = new Date(); y.setDate(y.getDate() - 1);
    if (S.lastDay === todayStr(y)) S.streak++;
    else S.streak = 1;
    S.lastDay = t;
  }
  S.xp += n; S.xpToday += n;
  save(); renderStats();
}
function levelOf(xp) {
  let i = 0;
  LEVELS.forEach((l, k) => { if (xp >= l.xp) i = k; });
  const cur = LEVELS[i], next = LEVELS[i + 1];
  const pct = next ? Math.round(((xp - cur.xp) / (next.xp - cur.xp)) * 100) : 100;
  return { i, cur, next, pct };
}

/* ---------- Разблокировки ---------- */
function unitUnlocked(i) {
  if (i === 0) return true;
  return (S.tests[ANDROID_UNITS[i - 1].id] || 0) >= 60;
}
function kotlinUnlocked(i) {
  if (i === 0) return true;
  return (S.kotlin[KOTLIN_LEVELS[i - 1].id] || 0) >= 60;
}

/* ---------- Навигация ---------- */
const NAV = [
  { id: "home", label: "Главная", icon: "🏠" },
  { id: "cards", label: "Карточки", icon: "🃏" },
  { id: "practice", label: "Закрепление", icon: "🎯" },
  { id: "tests", label: "Тесты", icon: "📝" },
  { id: "sandbox", label: "Песочница", icon: "💻" },
  { id: "kotlin", label: "Kotlin", icon: "💜" }
];
function go(tab) {
  S.tab = tab; S.klevel = null;
  save(); render();
  window.scrollTo(0, 0);
}
function toast(msg) {
  const box = document.getElementById("toast-box");
  const d = document.createElement("div");
  d.className = "toast";
  d.textContent = msg;
  box.appendChild(d);
  setTimeout(() => d.classList.add("show"), 10);
  setTimeout(() => { d.classList.remove("show"); setTimeout(() => d.remove(), 400); }, 2600);
}

/* ---------- Рендер каркаса ---------- */
function render() {
  renderStats();
  document.querySelectorAll(".side-item, .bottom-item").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === S.tab);
  });
  const v = document.getElementById("view");
  if (S.tab === "home") vHome(v);
  else if (S.tab === "cards") vCards(v);
  else if (S.tab === "practice") vPractice(v);
  else if (S.tab === "tests") vTests(v);
  else if (S.tab === "sandbox") {
    if (typeof renderSandbox === "function") renderSandbox(v);
    else { S.tab = "home"; vHome(v); }
  }
  else if (S.tab === "kotlin") (S.klevel ? vKotlinLevel(v, S.klevel) : vKotlin(v));
  renderAside();
}
function renderStats() {
  const lv = levelOf(S.xp);
  document.getElementById("stats").innerHTML =
    '<span class="chip-stat" title="Дней подряд">🔥 ' + S.streak + "</span>" +
    '<span class="chip-stat" title="Всего опыта">⚡ ' + S.xp + "</span>" +
    '<span class="chip-stat hide-sm" title="Уровень">' + lv.cur.icon + " " + lv.cur.name + "</span>";
}
function renderAside() {
  const lv = levelOf(S.xp);
  const gpct = Math.min(100, Math.round((S.xpToday / GOAL) * 100));
  const day = new Date().getDate();
  let html =
    '<div class="panel"><h3>🎯 Цель дня</h3>' +
      '<div class="goal-num">' + Math.min(S.xpToday, GOAL) + " / " + GOAL + " XP</div>" +
      '<div class="progress slim"><div class="progress-fill" style="width:' + gpct + '%"></div></div>' +
      '<div class="muted">' + (gpct >= 100 ? "Цель выполнена! Ты супер! 🎉" : "Ещё немного — и цель выполнена!") + "</div></div>" +
    '<div class="panel"><h3>' + lv.cur.icon + " Уровень: " + lv.cur.name + "</h3>" +
      (lv.next
        ? '<div class="muted">До «' + lv.next.name + "»: " + (lv.next.xp - S.xp) + " XP</div>" +
          '<div class="progress slim"><div class="progress-fill blue" style="width:' + lv.pct + '%"></div></div>'
        : '<div class="muted">Максимальный уровень! Легенда! 🤖</div>') + "</div>" +
    '<div class="panel tip-panel"><h3>💡 Совет дня</h3><div>' + TIPS[day % TIPS.length] + "</div></div>";
  document.getElementById("aside").innerHTML = html;
}

/* ---------- ГЛАВНАЯ: тропа Android ---------- */
const ZIG = [0, -46, -70, -46, 0, 46, 70, 46];
function vHome(v) {
  let h = '<div class="path-wrap">';
  ANDROID_UNITS.forEach((u, i) => {
    const locked = !unitUnlocked(i);
    const passed = (S.tests[u.id] || 0) >= 60;
    h += '<div class="unit-head" style="background:' + (locked ? "#afafaf" : u.color) + '">' +
      "<div><div class='unit-num'>РАЗДЕЛ " + (i + 1) + "</div><div class='unit-title'>" + u.icon + " " + esc(u.title) + " — " + esc(u.subtitle) + "</div></div>" +
      (locked ? "<span class='unit-lock'>🔒</span>" : passed ? "<span class='unit-lock'>✅</span>" : "") +
      "</div>";
    const cpPassed = (S.cps[u.id] || 0) >= 60;
    const nodes = [
      { k: "theory", icon: "📖", label: "Новое", done: !!S.theory[u.id], lock: locked },
      { k: "practice", icon: "🎯", label: "Практика", done: !!S.practice[u.id], lock: locked },
      { k: "test", icon: passed ? "🏆" : "📝", label: "Тест", done: passed, lock: locked },
      { k: "cp", icon: cpPassed ? "✅" : "🏁", label: u.checkpoint.title, done: cpPassed, lock: locked }
    ];
    h += '<div class="nodes">';
    nodes.forEach((n, j) => {
      const gi = i * 4 + j;
      const cls = n.lock ? "locked" : n.done ? "done" : "current";
      h += '<button class="node ' + cls + '" style="margin-left:' + ZIG[gi % ZIG.length] + 'px" ' +
        'onclick="nodeClick(' + i + ",'" + n.k + "'" + ')" title="' + n.label + '">' +
        (n.lock ? "🔒" : n.done ? "✓" : n.icon) +
        (!n.lock && !n.done ? '<span class="node-bubble">' + n.label + "</span>" : "") +
        "</button>";
    });
    h += "</div>";
  });
  h += '<div class="path-end">🎓<br><span>Пройди все разделы — станешь Android-разработчиком!</span></div></div>';
  v.innerHTML = h;
}
function nodeClick(i, kind) {
  const u = ANDROID_UNITS[i];
  if (!unitUnlocked(i)) { toast("🔒 Сначала пройди тест раздела " + i + " минимум на 60%"); return; }
  if (kind === "theory") {
    openTheory({ cards: u.cards, xpPer: 5, done: (r) => {
      S.theory[u.id] = 1; addXP(r.xp); save(); render();
      toast("+" + r.xp + " XP за теорию! ⚡");
    }});
  }
  if (kind === "practice") {
    openSession({ tag: "ЗАКРЕПЛЕНИЕ", questions: buildPractice(u), xpPer: 10, retry: true, done: (r) => {
      S.practice[u.id] = (S.practice[u.id] || 0) + 1; addXP(r.xp); save(); render();
    }});
  }
  if (kind === "test") {
    openSession({ tag: "ТЕСТ · " + u.title.toUpperCase(), questions: u.test.map(clone), xpPer: 10, retry: true, done: (r) => {
      S.tests[u.id] = Math.max(S.tests[u.id] || 0, r.pct);
      addXP(r.xp); save(); render();
      if (r.pct >= 60 && ANDROID_UNITS[i + 1]) toast("🔓 Раздел " + (i + 2) + " открыт!");
    }});
  }
  if (kind === "cp") openCheckpoint(i);
}
function openCheckpoint(i) {
  const u = ANDROID_UNITS[i];
  if (!unitUnlocked(i)) { toast("🔒 Сначала пройди тест предыдущего раздела"); return; }
  toast("🏁 Чекпоинт: " + u.checkpoint.title + "! " + u.checkpoint.desc);
  openSession({ tag: "🏁 ЧЕКПОИНТ · " + u.checkpoint.title.toUpperCase(), questions: u.checkpoint.questions.map(clone), xpPer: 15, retry: true, done: (r) => {
    S.cps[u.id] = Math.max(S.cps[u.id] || 0, r.pct);
    addXP(r.xp); save(); render();
    if (r.pct >= 60) toast("🏁 Чекпоинт «" + u.checkpoint.title + "» сдан!");
  }});
}

/* ---------- Генераторы вопросов ---------- */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function buildPractice(u) {
  const qs = u.drills.map(clone);
  u.cards.forEach((c, i) => {
    const others = shuffle(u.cards.filter(x => x !== c));
    if (i % 2 === 0) qs.push({ t: "choice", q: "Что такое «" + c.t + "»?", options: [c.d, others[0].d, others[1].d, others[2].d], answer: 0, explain: c.tip || "" });
    else qs.push({ t: "choice", q: "Какой термин описан?", code: c.d, options: [c.t, others[0].t, others[1].t, others[2].t], answer: 0 });
  });
  shuffle(u.cards).slice(0, 3).forEach(c => {
    const other = u.cards.find(x => x !== c);
    const isTrue = Math.random() < 0.5;
    qs.push({ t: "tf", q: "«" + c.t + "» — " + (isTrue ? c.d : other.d), answer: isTrue, explain: c.t + ": " + c.d });
  });
  qs.push({ t: "match", q: "Соедини термины и описания", pairs: shuffle(u.cards).slice(0, 4).map(c => [c.t, short(c.d, 70)]) });
  return shuffle(qs).slice(0, 10);
}
function buildExam() {
  const qs = [];
  ANDROID_UNITS.forEach(u => {
    const c = u.cards[Math.floor(Math.random() * u.cards.length)];
    const others = shuffle(u.cards.filter(x => x !== c));
    qs.push({ t: "choice", q: "[" + u.title + "] Что такое «" + c.t + "»?", options: [c.d, others[0].d, others[1].d, others[2].d], answer: 0 });
    const c2 = u.cards[Math.floor(Math.random() * u.cards.length)];
    const other = u.cards.find(x => x !== c2);
    qs.push({ t: "tf", q: "[" + u.title + "] «" + c2.t + "» — " + other.d, answer: false, explain: c2.t + ": " + c2.d });
  });
  return shuffle(qs);
}
function short(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

/* ---------- КАРТОЧКИ ---------- */
function allDecks() {
  const d = ANDROID_UNITS.map((u, i) => ({ key: "a" + i, kind: "android", idx: i, title: u.icon + " " + u.title, sub: u.subtitle, n: u.cards.length }));
  KOTLIN_LEVELS.forEach((l, i) => d.push({ key: "k" + i, kind: "kotlin", idx: i, title: l.icon + " " + l.title, sub: "Kotlin", n: l.cards.length }));
  return d;
}
function vCards(v) {
  const decks = allDecks();
  v.innerHTML = '<h1 class="page-title">🃏 Карточки</h1>' +
    '<p class="muted">Нажми на карточку, чтобы перевернуть. Честно отмечай: знаешь или повторить?</p>' +
    '<div class="grid">' + decks.map((d, i) => {
      const done = S.decks[d.key];
      return '<button class="card-btn" onclick="openDeck(' + i + ')">' +
        '<span class="card-btn-t">' + esc(d.title) + "</span>" +
        '<span class="muted">' + esc(d.sub) + " · " + d.n + " карт " + (done ? "· ✅" : "") + "</span></button>";
    }).join("") + "</div>";
  v._decks = decks;
}
function openDeck(i) {
  const decks = allDecks();
  const d = decks[i];
  const cards = d.kind === "android" ? ANDROID_UNITS[d.idx].cards : KOTLIN_LEVELS[d.idx].cards;
  const order = shuffle(cards.map((_, k) => k));
  let pos = 0, known = 0, flipped = false;
  const v = document.getElementById("view");
  function renderCard() {
    if (pos >= order.length) {
      const xp = known * 5;
      if (xp) addXP(xp);
      S.decks[d.key] = 1; save();
      v.innerHTML = '<div class="finish"><div class="finish-ico">🃏</div><h2>Колода пройдена!</h2>' +
        '<div class="finish-stats"><div class="fstat"><b class="gold">' + xp + ' XP</b><span>опыт</span></div>' +
        '<div class="fstat"><b class="green">' + known + "/" + order.length + "</b><span>знаю</span></div></div>" +
        '<button class="btn-3d btn-green btn-big" onclick="go(\'cards\')">К колодам</button> ' +
        '<button class="btn-ghost" onclick="openDeck(' + i + ')">Ещё раз</button></div>';
      renderAside();
      return;
    }
    const c = cards[order[pos]];
    v.innerHTML =
      '<button class="btn-ghost" onclick="go(\'cards\')">← Все колоды</button>' +
      '<div class="deck-top"><b>' + esc(d.title) + "</b><span>" + (pos + 1) + " / " + order.length + "</span></div>" +
      '<div class="progress"><div class="progress-fill" style="width:' + Math.round((pos / order.length) * 100) + '%"></div></div>' +
      '<div class="flash" id="flash"><div class="flash-in" id="flash-in">' +
        '<div class="flash-face flash-front"><div class="flash-tag">ТЕРМИН</div><div class="flash-term">' + esc(c.t) + '</div><div class="muted">Нажми, чтобы перевернуть 👆</div></div>' +
        '<div class="flash-face flash-back"><div class="flash-tag">ЗНАЧЕНИЕ</div><div class="flash-def">' + esc(c.d) + "</div>" +
        (c.e ? '<pre class="code small">' + esc(c.e) + "</pre>" : "") +
        (c.tip ? '<div class="tip">💡 ' + esc(c.tip) + "</div>" : "") + "</div>" +
      "</div></div>" +
      '<div class="deck-btns">' +
        '<button class="btn-3d btn-red" onclick="deckMark(false)">🔁 Повторить</button>' +
        '<button class="btn-3d btn-green" onclick="deckMark(true)">👍 Знаю</button>' +
      "</div>";
    flipped = false;
    document.getElementById("flash").onclick = () => {
      flipped = !flipped;
      document.getElementById("flash-in").classList.toggle("flipped", flipped);
    };
  }
  window.deckMark = (k) => { if (k) known++; pos++; renderCard(); };
  renderCard();
  window.scrollTo(0, 0);
}

/* ---------- ЗАКРЕПЛЕНИЕ ---------- */
function vPractice(v) {
  v.innerHTML = '<h1 class="page-title">🎯 Закрепление</h1>' +
    '<p class="muted">Смешанные задания по разделу: выбор, правда/ложь, пары и порядок кода. Жизней и таймера нет!</p>' +
    '<div class="grid">' + ANDROID_UNITS.map((u, i) => {
      const locked = !unitUnlocked(i);
      const n = S.practice[u.id] || 0;
      return '<button class="card-btn" ' + (locked ? 'disabled' : 'onclick="openPractice(' + i + ')"') + ">" +
        '<span class="card-btn-t">' + (locked ? "🔒" : u.icon) + " " + esc(u.title) + "</span>" +
        '<span class="muted">' + esc(u.subtitle) + (n ? " · пройдено " + n + " раз" : "") + "</span></button>";
    }).join("") + "</div>";
}
function openPractice(i) {
  const u = ANDROID_UNITS[i];
  if (!unitUnlocked(i)) { toast("🔒 Сначала пройди тест предыдущего раздела"); return; }
  openSession({ tag: "ЗАКРЕПЛЕНИЕ", questions: buildPractice(u), xpPer: 10, retry: true, done: (r) => {
    S.practice[u.id] = (S.practice[u.id] || 0) + 1; addXP(r.xp); save(); render();
  }});
}

/* ---------- ТЕСТЫ ---------- */
function vTests(v) {
  let h = '<h1 class="page-title">📝 Тесты</h1>' +
    '<p class="muted">Набери 60%+, чтобы открыть следующий раздел. Финальный экзамен — по всему курсу!</p><div class="grid">';
  ANDROID_UNITS.forEach((u, i) => {
    const locked = !unitUnlocked(i);
    const best = S.tests[u.id] || 0;
    h += '<button class="card-btn" ' + (locked ? "disabled" : 'onclick="nodeClick(' + i + ",'test'" + ')"') + ">" +
      '<span class="card-btn-t">' + (locked ? "🔒" : best >= 60 ? "🏆" : "📝") + " " + esc(u.title) + "</span>" +
      '<span class="muted">' + u.test.length + " вопросов" + (best ? " · рекорд: " + best + "%" : "") + "</span></button>";
  });
  const lastU = ANDROID_UNITS[ANDROID_UNITS.length - 1];
  const examOpen = (S.tests[lastU.id] || 0) >= 60;
  const examBest = S.tests.exam || 0;
  h += '<button class="card-btn exam" ' + (examOpen ? 'onclick="openExam()"' : "disabled") + ">" +
    '<span class="card-btn-t">' + (examOpen ? "🎓" : "🔒") + " Финальный экзамен</span>" +
    '<span class="muted">' + (ANDROID_UNITS.length * 2) + ' вопросов по всему курсу' + (examBest ? " · рекорд: " + examBest + "%" : "") + "</span></button>";
  v.innerHTML = h + "</div>";
}
function openExam() {
  openSession({ tag: "ФИНАЛЬНЫЙ ЭКЗАМЕН", questions: buildExam(), xpPer: 15, retry: true, done: (r) => {
    S.tests.exam = Math.max(S.tests.exam || 0, r.pct);
    addXP(r.xp); save(); render();
    if (r.pct >= 60) toast("🎓 Ты сдал экзамен! Настоящий разработчик!");
  }});
}

/* ---------- KOTLIN ---------- */
function vKotlin(v) {
  let h = '<h1 class="page-title">💜 Kotlin с нуля до профи</h1>' +
    '<p class="muted">6 уровней: читай теорию → учи карточки → проходи тест. Тест на 60%+ открывает следующий уровень.</p><div class="path-wrap">';
  KOTLIN_LEVELS.forEach((l, i) => {
    const locked = !kotlinUnlocked(i);
    const best = S.kotlin[l.id] || 0;
    const passed = best >= 60;
    h += '<button class="level-row" ' + (locked ? 'disabled' : 'onclick="openKotlin(' + i + ')"') + ">" +
      '<span class="level-ico" style="background:' + (locked ? "#afafaf" : l.color) + '">' + (locked ? "🔒" : passed ? "✓" : l.icon) + "</span>" +
      '<span class="level-txt"><b>Уровень ' + (i + 1) + ": " + esc(l.title) + "</b><span class='muted'>" + esc(l.goal) +
      (best ? " · рекорд: " + best + "%" : "") + "</span></span>" +
      '<span class="level-go">→</span></button>';
  });
  const lastK = KOTLIN_LEVELS[KOTLIN_LEVELS.length - 1];
  const cpOpen = (S.kotlin[lastK.id] || 0) >= 60;
  const cpBest = S.kotlinCp || 0;
  h += '<button class="level-row" ' + (cpOpen ? 'onclick="openKotlinCp()"' : "disabled") + ">" +
    '<span class="level-ico" style="background:' + (cpOpen ? "#ff9600" : "#afafaf") + '">' + (cpOpen ? (cpBest >= 60 ? "✓" : "🏁") : "🔒") + "</span>" +
    '<span class="level-txt"><b>🏁 Чекпоинт: ' + esc(KOTLIN_CHECKPOINT.title) + "</b><span class='muted'>" + esc(KOTLIN_CHECKPOINT.desc) +
    (cpBest ? " · рекорд: " + cpBest + "%" : "") + "</span></span>" +
    '<span class="level-go">→</span></button>';
  v.innerHTML = h + "</div>";
}
function openKotlinCp() {
  const lastK = KOTLIN_LEVELS[KOTLIN_LEVELS.length - 1];
  if ((S.kotlin[lastK.id] || 0) < 60) { toast("🔒 Сначала пройди тест последнего уровня"); return; }
  openSession({ tag: "🏁 ЧЕКПОИНТ · УГАДАЙ ЧИСЛО", questions: KOTLIN_CHECKPOINT.questions.map(clone), xpPer: 15, retry: true, done: (r) => {
    S.kotlinCp = Math.max(S.kotlinCp || 0, r.pct);
    addXP(r.xp); save(); render();
    if (r.pct >= 60) toast("🏁 А теперь собери игру в Песочнице — задача «Угадай число»! 🎮");
  }});
}
function openKotlin(i) {
  if (!kotlinUnlocked(i)) { toast("🔒 Сначала пройди тест предыдущего уровня"); return; }
  S.klevel = KOTLIN_LEVELS[i].id; save(); render();
  window.scrollTo(0, 0);
}
function vKotlinLevel(v, id) {
  const i = KOTLIN_LEVELS.findIndex(l => l.id === id);
  const l = KOTLIN_LEVELS[i];
  const best = S.kotlin[id] || 0;
  let h = '<button class="btn-ghost" onclick="go(\'kotlin\')">← Все уровни</button>' +
    '<h1 class="page-title">' + l.icon + " " + esc(l.title) + "</h1>" +
    '<p class="muted">' + esc(l.goal) + (best ? " · Рекорд теста: " + best + "%" : "") + "</p>";
  l.theory.forEach((b, k) => {
    h += '<div class="theory-block"><h3>' + (k + 1) + ". " + esc(b.h) + "</h3><p>" + esc(b.p) + "</p>" +
      (b.code ? '<pre class="code">' + esc(b.code) + "</pre>" : "") + "</div>";
  });
  h += '<div class="row-btns">' +
    '<button class="btn-3d btn-blue btn-big" onclick="openKotlinDeck(' + i + ')">🃏 Карточки уровня</button>' +
    '<button class="btn-3d btn-green btn-big" onclick="openKotlinQuiz(' + i + ')">🎯 Пройти тест</button></div>';
  h += '<div class="panel try-sandbox">💻 Попробуй примеры из урока в <a href="#" onclick="go(\'sandbox\');return false;">Песочнице</a> — просто скопируй код!</div>';
  v.innerHTML = h;
}
function openKotlinDeck(i) {
  openDeck(ANDROID_UNITS.length + i); // колоды kotlin идут после android-колод
}
function openKotlinQuiz(i) {
  const l = KOTLIN_LEVELS[i];
  const qs = l.quiz.map(clone);
  qs.push({ t: "match", q: "Соедини термины и описания", pairs: shuffle(l.cards).slice(0, 4).map(c => [c.t, short(c.d, 70)]) });
  openSession({ tag: "ТЕСТ · KOTLIN", questions: shuffle(qs), xpPer: 10, retry: true, done: (r) => {
    S.kotlin[l.id] = Math.max(S.kotlin[l.id] || 0, r.pct);
    addXP(r.xp); save(); render();
    if (r.pct >= 60 && KOTLIN_LEVELS[i + 1]) toast("🔓 Уровень " + (i + 2) + " открыт!");
    if (r.pct >= 60 && !KOTLIN_LEVELS[i + 1]) toast("🧙 Ты прошёл весь Kotlin! Легенда!");
  }});
}

/* ---------- Старт ---------- */
document.querySelectorAll(".side-item, .bottom-item").forEach(b => {
  b.addEventListener("click", () => go(b.dataset.tab));
});
render();
