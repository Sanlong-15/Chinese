"use strict";

// ============================================================
// 0. Character structures (汉字结构) — fixed reference content.
//    Same for every lesson, so it is part of the template,
//    NOT part of the generated data.
// ============================================================
const STRUCTURES = [
  { name:"独体字", pinyin:"dútǐzì", en:"single unit", tier:"base",
    hint:"One whole piece. It does not split into left/right or top/bottom. Usually the oldest, simplest characters, often pictures of real things.",
    svg:`<rect x="8" y="8" width="48" height="48" rx="8" fill="var(--jade)" fill-opacity=".13" stroke="var(--line)" stroke-width="2"/>`,
    members:["人","木","也","大","女","山","口","日","月","水","火","手"] },
  { name:"左右结构", pinyin:"zuǒyòu jiégòu", en:"left – right", tier:"most common",
    hint:"Two parts side by side. More than half of all characters. Usually the left part gives the meaning and the right part gives the sound.",
    svg:`<rect x="8" y="8" width="20" height="48" rx="4" fill="var(--jade)" fill-opacity=".18"/><rect x="34" y="8" width="22" height="48" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["他","你","的","好","江","说","妈","跑","树","谁","吗","地"] },
  { name:"上下结构", pinyin:"shàngxià jiégòu", en:"top – bottom", tier:"most common",
    hint:"Two parts stacked. The second most common shape. Often the top gives the meaning and the bottom gives the sound, or the other way round.",
    svg:`<rect x="8" y="8" width="48" height="20" rx="4" fill="var(--jade)" fill-opacity=".18"/><rect x="8" y="36" width="48" height="20" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["字","早","花","爸","是","想","意","男","苦","忘","念","室"] },
  { name:"左中右结构", pinyin:"zuǒzhōngyòu", en:"left – middle – right", tier:"less common",
    hint:"Three parts across: left, middle, right. A wider version of the left–right shape.",
    svg:`<rect x="8" y="10" width="13" height="44" rx="3" fill="var(--jade)" fill-opacity=".18"/><rect x="25" y="10" width="14" height="44" rx="3" fill="var(--jade)" fill-opacity=".18"/><rect x="43" y="10" width="13" height="44" rx="3" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["谢","班","脚","湖","做","树"] },
  { name:"上中下结构", pinyin:"shàngzhōngxià", en:"top – middle – bottom", tier:"less common",
    hint:"Three parts stacked: top, middle, bottom. A taller version of the top–bottom shape.",
    svg:`<rect x="10" y="8" width="44" height="13" rx="3" fill="var(--jade)" fill-opacity=".18"/><rect x="10" y="25" width="44" height="14" rx="3" fill="var(--jade)" fill-opacity=".18"/><rect x="10" y="43" width="44" height="13" rx="3" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["高","意","常","章","算","煮"] },
  { name:"半包围 (左上)", pinyin:"bàn bāowéi", en:"wraps top-left", tier:"common",
    hint:"One part wraps the top and left, the rest sits inside at the bottom-right. The wrapping part is usually 广 (shelter), 疒 (sickness) or 尸.",
    svg:`<path d="M8,52 V8 H56" fill="none" stroke="var(--seal)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="26" y="26" width="26" height="26" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["病","房","座","度","底","床","应","疼"] },
  { name:"半包围 (左下)", pinyin:"bàn bāowéi", en:"wraps bottom-left", tier:"common",
    hint:"One part wraps the left and bottom, the rest sits inside at the top-right. The wrapping part is almost always 辶 (movement / road).",
    svg:`<path d="M8,8 V56 H56" fill="none" stroke="var(--seal)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="24" y="12" width="26" height="26" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["这","过","还","送","进","道","远","建"] },
  { name:"半包围 (右上)", pinyin:"bàn bāowéi", en:"wraps top-right", tier:"less common",
    hint:"One part wraps the top and right, the rest sits inside at the bottom-left.",
    svg:`<path d="M8,8 H56 V56" fill="none" stroke="var(--seal)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="12" y="24" width="26" height="26" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["句","可","司"] },
  { name:"半包围 (上开口)", pinyin:"bàn bāowéi", en:"three sides, open at bottom", tier:"common",
    hint:"A frame around the top, left and right, open at the bottom. The wrapping part is usually 门 or 冂.",
    svg:`<path d="M8,56 V8 H56 V56" fill="none" stroke="var(--seal)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="22" y="28" width="20" height="24" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["问","同","用","内","周","闻"] },
  { name:"半包围 (下开口)", pinyin:"bàn bāowéi", en:"three sides, open at top", tier:"less common",
    hint:"A frame around the left, bottom and right, open at the top. The wrapping part is 凵.",
    svg:`<path d="M8,8 V56 H56 V8" fill="none" stroke="var(--seal)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="22" y="12" width="20" height="24" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["画","凶"] },
  { name:"半包围 (右开口)", pinyin:"bàn bāowéi", en:"three sides, open at right", tier:"less common",
    hint:"A frame around the top, left and bottom, open at the right. The wrapping part is 匚.",
    svg:`<path d="M56,8 H8 V56 H56" fill="none" stroke="var(--seal)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="26" y="18" width="24" height="28" rx="4" fill="var(--jade)" fill-opacity=".18"/>`,
    members:["区","医","巨"] },
  { name:"全包围结构", pinyin:"quán bāowéi", en:"full enclosure", tier:"common",
    hint:"A box 囗 fully surrounds the inside part on all four sides. Think of a wall around a courtyard.",
    svg:`<rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke="var(--seal)" stroke-width="3.5"/><rect x="22" y="22" width="20" height="20" rx="3" fill="var(--jade)" fill-opacity=".2"/>`,
    members:["国","回","园","图","因","四"] }
];

// ============================================================
// 1. FSRS scheduler — ported from the main app's tested
//    js/domain/logic.js. Pure functions, no DOM, no storage.
// ============================================================
const FSRS_W = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
  0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621
];
const FSRS_DECAY = -0.5;
const FSRS_FACTOR = Math.pow(0.9, 1 / FSRS_DECAY) - 1;
const TARGET_R = 0.9;
const DAY = 86400000;

const clampD = (d) => Math.min(10, Math.max(1, d));
const clampS = (s) => Math.min(36500, Math.max(0.01, s));
const initD = (g) => clampD(FSRS_W[4] - Math.exp(FSRS_W[5] * (g - 1)) + 1);

function fsrsInterval(S) {
  return (S / FSRS_FACTOR) * (Math.pow(TARGET_R, 1 / FSRS_DECAY) - 1);
}

function recallProb(state, now) {
  if (!state || !state.S || !state.reps) return 0;
  const t = Math.max(0, (now - (state.last || now)) / DAY);
  return Math.pow(1 + FSRS_FACTOR * (t / state.S), FSRS_DECAY);
}

function fsrsUpdate(state, rating, now) {
  const g = { again: 1, hard: 2, good: 3, easy: 4 }[rating];
  if (!g) throw new Error("bad rating: " + rating);
  const st = Object.assign({}, state);
  const firstReview = st.state === "new" || !st.reps || !st.S;

  if (firstReview) {
    st.S = clampS(FSRS_W[g - 1]);
    st.D = initD(g);
  } else {
    const t = Math.max(0, (now - (st.last || now)) / DAY);
    const R = Math.pow(1 + FSRS_FACTOR * (t / st.S), FSRS_DECAY);
    const deltaD = -FSRS_W[6] * (g - 3);
    const Dp = st.D + (deltaD * (10 - st.D)) / 9;
    st.D = clampD(FSRS_W[7] * initD(4) + (1 - FSRS_W[7]) * Dp);
    if (g === 1) {
      const Sf = FSRS_W[11] * Math.pow(st.D, -FSRS_W[12]) *
        (Math.pow(st.S + 1, FSRS_W[13]) - 1) * Math.exp(FSRS_W[14] * (1 - R));
      st.S = clampS(Math.min(Sf, st.S));
      st.lapses = (st.lapses || 0) + 1;
    } else {
      const hard = g === 2 ? FSRS_W[15] : 1;
      const easy = g === 4 ? FSRS_W[16] : 1;
      const inc = Math.exp(FSRS_W[8]) * (11 - st.D) * Math.pow(st.S, -FSRS_W[9]) *
        (Math.exp(FSRS_W[10] * (1 - R)) - 1) * hard * easy;
      st.S = clampS(st.S * (1 + inc));
    }
  }
  st.reps = (st.reps || 0) + 1;
  st.last = now;
  st.state = "review";
  st.interval = fsrsInterval(st.S);
  st.due = now + Math.max(0, st.interval) * DAY;
  return st;
}

// New words get recognition first (see the story before producing it).
// As reps grow the mix shifts toward recall and sentences.
function pickTaskFromState(state, eligible, rng) {
  rng = rng || Math.random;
  eligible = eligible && eligible.length ? eligible : ["recognize"];
  const isNew = !state || state.state === "new" || !state.reps;
  if (isNew) return eligible.includes("recognize") ? "recognize" : eligible[0];
  const elig = new Set(eligible);
  const reps = state.reps || 0;
  const pool = [];
  const add = (t, n) => { if (elig.has(t)) for (let i = 0; i < n; i++) pool.push(t); };
  if (reps < 2) { add("recognize", 3); add("listen", 1); }
  else if (reps < 5) { add("recognize", 1); add("recall", 2); add("listen", 1); add("sentence", 1); }
  else { add("recall", 3); add("sentence", 2); add("listen", 1); }
  if (!pool.length) {
    const arr = [...elig];
    return arr[Math.floor(rng() * arr.length)];
  }
  let choices = pool;
  if (state.lastTask) {
    const alt = pool.filter((t) => t !== state.lastTask);
    if (alt.length) choices = alt;
  }
  return choices[Math.floor(rng() * choices.length)];
}

// ============================================================
// 2. Storage — namespaced per lab so two lesson pages opened
//    from the same folder never share each other's progress.
// ============================================================
const LAB_ID = (DB.meta && DB.meta.id) || "lab";
const K_SRS = "cml:" + LAB_ID + ":srs";
const K_DAILY = "cml:" + LAB_ID + ":daily";
const K_SET = "cml:" + LAB_ID + ":settings";

const DEFAULT_SETTINGS = { voiceURI: "", rate: 0.85, pitch: 1, newLimit: 8, sessionCap: 25, frontMode: "zi" };

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { return false; }
}

let srs = readJSON(K_SRS, {});
let daily = readJSON(K_DAILY, { days: {} });
let settings = Object.assign({}, DEFAULT_SETTINGS, readJSON(K_SET, {}));

const saveSrs = () => writeJSON(K_SRS, srs);
const saveDaily = () => writeJSON(K_DAILY, daily);
const saveSettings = () => writeJSON(K_SET, settings);

function newState() { return { state: "new", reps: 0, lapses: 0, S: 0, D: 0, due: 0, last: 0 }; }
function stateOf(id) { return srs[id] || newState(); }

function dayStr(ts) {
  const d = new Date(ts);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function doneToday() { return daily.days[dayStr(Date.now())] || 0; }
function bumpToday() {
  const k = dayStr(Date.now());
  daily.days[k] = (daily.days[k] || 0) + 1;
  saveDaily();
}
function streakDays() {
  let n = 0;
  const cur = new Date();
  for (;;) {
    const k = dayStr(cur.getTime());
    if (daily.days[k]) { n++; cur.setDate(cur.getDate() - 1); }
    else break;
    if (n > 3650) break;
  }
  return n;
}

// ============================================================
// 3. Speech
// ============================================================
const hasTTS = typeof window !== "undefined" && "speechSynthesis" in window;
let voices = [];

function refreshVoices() {
  if (!hasTTS) return;
  voices = window.speechSynthesis.getVoices() || [];
}
function zhVoices() { return voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("zh")); }

function pickVoice() {
  if (!voices.length) return null;
  if (settings.voiceURI) {
    const chosen = voices.find((v) => v.voiceURI === settings.voiceURI);
    if (chosen) return chosen;
  }
  const zh = zhVoices();
  return zh.find((v) => v.lang === "zh-CN") || zh[0] || null;
}

function speak(text) {
  if (!hasTTS || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = Number(settings.rate) || 0.85;
  u.pitch = Number(settings.pitch) || 1;
  const v = pickVoice();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

// ============================================================
// 4. Small helpers
// ============================================================
const $ = (id) => document.getElementById(id);
const words = DB.words || [];
const byId = (id) => words.find((w) => w.id === id);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function sample(arr, n) { return shuffle(arr.slice()).slice(0, n); }

const typeLabel = {
  pictograph: "Pictograph — no parts",
  compound: "Meaning + Meaning",
  phono: "Sound + Meaning",
  whole: "Whole shape — no reliable split"
};
const typeClass = {
  pictograph: "type-pictograph", compound: "type-compound",
  phono: "type-phono", whole: "type-whole"
};

// An example usable as a fill-the-blank: it must actually contain the word.
function clozeExample(w) {
  const list = (w.examples || []).filter((ex) => ex && ex.cn && ex.cn.includes(w.chinese));
  return list.length ? list[Math.floor(Math.random() * list.length)] : null;
}

function eligibleTasks(w) {
  const out = ["recognize", "recall"];
  if (hasTTS) out.push("listen");
  if (words.length >= 4 && clozeExample(w)) out.push("sentence");
  return out;
}

// ============================================================
// 5. Navigation
// ============================================================
function switchView(viewId) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const target = $(viewId);
  if (target) target.classList.add("active");
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === viewId));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewId === "todayView") renderToday();
  if (viewId === "youView") renderSettings();
}
document.querySelectorAll(".nav-btn").forEach((b) => {
  b.addEventListener("click", () => switchView(b.dataset.view));
});

// ============================================================
// 6. TODAY — the mixed session
// ============================================================
let queue = [];
let qIndex = 0;
let sessionCount = 0;

function dueWords(now) {
  return words
    .filter((w) => { const s = stateOf(w.id); return s.state === "review" && (s.due || 0) <= now; })
    .sort((a, b) => (stateOf(a.id).due || 0) - (stateOf(b.id).due || 0));
}
function newWords() { return words.filter((w) => stateOf(w.id).state === "new"); }

function newLeftToday() {
  const usedToday = words.filter((w) => {
    const s = stateOf(w.id);
    return s.reps === 1 && s.last && dayStr(s.last) === dayStr(Date.now());
  }).length;
  return Math.max(0, (settings.newLimit || 0) - usedToday);
}

// Mix reviews and new words: three due, then one new, and repeat.
function buildQueue() {
  const now = Date.now();
  const due = dueWords(now);
  const fresh = newWords().slice(0, newLeftToday());
  const out = [];
  let i = 0, j = 0;
  while (i < due.length || j < fresh.length) {
    for (let k = 0; k < 3 && i < due.length; k++) out.push(due[i++]);
    if (j < fresh.length) out.push(fresh[j++]);
  }
  const cap = Math.max(1, settings.sessionCap || 25);
  queue = out.slice(0, cap).map((w) => ({
    word: w,
    task: pickTaskFromState(stateOf(w.id), eligibleTasks(w))
  }));
  qIndex = 0;
  sessionCount = 0;
}

function renderToday() {
  const now = Date.now();
  const due = dueWords(now).length;
  const fresh = Math.min(newWords().length, newLeftToday());
  $("statDue").textContent = due;
  $("statNew").textContent = fresh;
  $("statDone").textContent = doneToday();
  $("statStreak").textContent = streakDays();

  const badge = $("navDueBadge");
  if (due + fresh > 0) { badge.textContent = due + fresh; badge.style.display = ""; }
  else badge.style.display = "none";

  const note = $("sessionStartNote");
  const btn = $("startSessionBtn");
  if (!words.length) {
    note.textContent = "This lab has no words in it yet.";
    btn.disabled = true;
  } else if (due + fresh === 0) {
    note.textContent = "Nothing is due right now. That is the scheduler doing its job, not a bug. Come back later, or browse the words in Learn.";
    btn.disabled = false;
    btn.textContent = "Study ahead anyway";
  } else {
    note.textContent = due + " word" + (due === 1 ? "" : "s") + " to review and " + fresh + " new word" + (fresh === 1 ? "" : "s") + " waiting. One session mixes reading, meaning, listening and sentences.";
    btn.disabled = false;
    btn.textContent = "Start session";
  }
}

function startSession(force) {
  buildQueue();
  if (!queue.length && force) {
    // "Study ahead": nothing is due, so take the weakest cards.
    const pool = words.slice().sort((a, b) => recallProb(stateOf(a.id), Date.now()) - recallProb(stateOf(b.id), Date.now()));
    queue = pool.slice(0, Math.min(10, pool.length)).map((w) => ({
      word: w, task: pickTaskFromState(stateOf(w.id), eligibleTasks(w))
    }));
    qIndex = 0; sessionCount = 0;
  }
  if (!queue.length) { renderToday(); return; }
  $("sessionStart").style.display = "none";
  $("sessionDone").style.display = "none";
  $("sessionRun").style.display = "";
  renderTask();
}

function endSession() {
  $("sessionRun").style.display = "none";
  $("sessionStart").style.display = "none";
  $("sessionDone").style.display = "";
  $("doneNote").textContent = sessionCount + " card" + (sessionCount === 1 ? "" : "s") +
    " reviewed. " + doneToday() + " today in total. Day streak: " + streakDays() + ".";
  renderToday();
}

function renderTask() {
  if (qIndex >= queue.length) { endSession(); return; }
  const item = queue[qIndex];
  const w = item.word;
  const card = $("taskCard");
  const actions = $("taskActions");

  $("taskCounter").textContent = "Card " + (qIndex + 1) + " of " + queue.length;
  $("taskWordLevel").textContent = w.level || "";
  $("taskProgress").style.width = Math.round((qIndex / queue.length) * 100) + "%";
  actions.innerHTML = "";

  if (item.task === "recognize") renderRecognize(w, card, actions);
  else if (item.task === "recall") renderRecall(w, card, actions);
  else if (item.task === "listen") renderListen(w, card, actions);
  else renderSentence(w, card, actions);
}

function answerBlockHTML(w) {
  return `
    <div class="py">${w.pinyin}</div>
    <div class="en">${w.english}</div>
    <div class="kh">${w.khmer || ""}</div>`;
}

function rateRowHTML(suggest) {
  const b = (r, label, sub) =>
    `<button class="rate-btn" data-rate="${r}"${r === suggest ? ' style="border-color:var(--seal);color:var(--seal)"' : ""}>${label}<small>${sub}</small></button>`;
  return `<div class="rate-row">
    ${b("again", "Again", "forgot")}
    ${b("hard", "Hard", "struggled")}
    ${b("good", "Good", "got it")}
    ${b("easy", "Easy", "too easy")}
  </div>`;
}

function wireRateRow(w, container) {
  container.querySelectorAll(".rate-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyRating(w, btn.dataset.rate));
  });
}

function applyRating(w, rating) {
  const now = Date.now();
  const prev = stateOf(w.id);
  const next = fsrsUpdate(prev, rating, now);
  next.lastTask = queue[qIndex] ? queue[qIndex].task : prev.lastTask;
  srs[w.id] = next;
  saveSrs();
  bumpToday();
  sessionCount++;
  qIndex++;
  renderTask();
}

function renderRecognize(w, card, actions) {
  card.innerHTML = `
    <span class="task-kind recognize">Read it</span>
    <div class="zi hanzi">${w.chinese}</div>
    <div class="hint">What does this mean? Say it out loud first.</div>
    <div class="task-hidden" id="revealBlock">${answerBlockHTML(w)}</div>`;
  actions.innerHTML = `<button class="btn primary big" id="revealBtn">Show answer</button>`;
  $("revealBtn").addEventListener("click", () => {
    $("revealBlock").classList.remove("task-hidden");
    speak(w.chinese);
    actions.innerHTML = rateRowHTML("good");
    wireRateRow(w, actions);
  });
}

function renderRecall(w, card, actions) {
  card.innerHTML = `
    <span class="task-kind recall">Produce it</span>
    <div class="prompt-en">${w.english}</div>
    <div class="prompt-kh">${w.khmer || ""}</div>
    <div class="hint">Which Chinese word is this? Say it, then check.</div>
    <div class="task-hidden" id="revealBlock">
      <div class="zi hanzi" style="margin-top:10px;">${w.chinese}</div>
      <div class="py">${w.pinyin}</div>
    </div>`;
  actions.innerHTML = `<button class="btn primary big" id="revealBtn">Show answer</button>`;
  $("revealBtn").addEventListener("click", () => {
    $("revealBlock").classList.remove("task-hidden");
    speak(w.chinese);
    actions.innerHTML = rateRowHTML("good");
    wireRateRow(w, actions);
  });
}

function renderListen(w, card, actions) {
  const others = sample(words.filter((x) => x.id !== w.id), 3);
  const opts = shuffle(others.concat([w]));
  card.innerHTML = `
    <span class="task-kind listen">Listen</span>
    <button class="speak-btn xl" id="replayBtn" title="Play again">🔊</button>
    <div class="hint">Listen, then pick the meaning.</div>
    <div class="choices" id="choiceWrap">
      ${opts.map((o) => `<button class="choice" data-id="${o.id}">${o.english}</button>`).join("")}
    </div>
    <div class="task-hidden" id="revealBlock">
      <div class="zi hanzi" style="font-size:40px;margin-top:12px;">${w.chinese}</div>
      ${answerBlockHTML(w)}
    </div>`;
  speak(w.chinese);
  $("replayBtn").addEventListener("click", () => speak(w.chinese));
  wireChoices(w, card, actions);
}

function renderSentence(w, card, actions) {
  const ex = clozeExample(w);
  if (!ex) { queue[qIndex].task = "recognize"; renderTask(); return; }
  const blanked = ex.cn.replace(w.chinese, `<span class="cloze-blank">?</span>`);
  const others = sample(words.filter((x) => x.id !== w.id), 3);
  const opts = shuffle(others.concat([w]));
  card.innerHTML = `
    <span class="task-kind sentence">Fill the blank</span>
    <div class="cloze-sentence hanzi">${blanked}</div>
    <div class="cloze-en">${ex.en}</div>
    <div class="choices" id="choiceWrap">
      ${opts.map((o) => `<button class="choice" data-id="${o.id}"><span class="zi hanzi">${o.chinese}</span><br><span style="font-size:11px;color:var(--ink-soft)">${o.pinyin}</span></button>`).join("")}
    </div>
    <div class="task-hidden" id="revealBlock">
      <div class="py" style="margin-top:12px;">${ex.py}</div>
      ${answerBlockHTML(w)}
    </div>`;
  wireChoices(w, card, actions);
}

// Shared grading for the two multiple-choice tasks.
function wireChoices(w, card, actions) {
  const wrap = $("choiceWrap");
  wrap.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosen = parseInt(btn.dataset.id, 10);
      const right = chosen === w.id;
      wrap.querySelectorAll(".choice").forEach((b) => {
        b.disabled = true;
        if (parseInt(b.dataset.id, 10) === w.id) b.classList.add("correct");
        else if (b === btn) b.classList.add("wrong");
      });
      $("revealBlock").classList.remove("task-hidden");
      speak(w.chinese);
      actions.innerHTML = rateRowHTML(right ? "good" : "again");
      wireRateRow(w, actions);
    });
  });
}

$("startSessionBtn").addEventListener("click", () => startSession(true));
$("endSessionBtn").addEventListener("click", endSession);
$("againSessionBtn").addEventListener("click", () => startSession(true));
$("goLearnBtn").addEventListener("click", () => switchView("learnView"));

// ============================================================
// 7. LEARN — word list, flashcards, word detail
// ============================================================
let currentLevel = "ALL";
let currentSearch = "";
const imageCache = {};

function buildLevelChips(containerId, chipClass, onChange) {
  const levels = [...new Set(words.map((w) => w.level))].filter(Boolean);
  const container = $(containerId);
  if (!container) return;
  container.innerHTML =
    '<button class="filter-chip ' + chipClass + ' active" data-level="ALL">All</button>' +
    levels.map((lv) => '<button class="filter-chip ' + chipClass + '" data-level="' + lv + '">' + lv + "</button>").join("");
  container.querySelectorAll("." + chipClass).forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll("." + chipClass).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      onChange(btn.dataset.level);
    });
  });
}

function matchesFilter(w) {
  if (currentLevel !== "ALL" && w.level !== currentLevel) return false;
  if (!currentSearch) return true;
  const s = currentSearch.toLowerCase();
  return w.chinese.includes(currentSearch) ||
    w.pinyin.toLowerCase().includes(s) ||
    w.english.toLowerCase().includes(s) ||
    (w.khmer && w.khmer.includes(currentSearch)) ||
    (w.breakdown && w.breakdown.toLowerCase().includes(s));
}

function renderGrid() {
  const grid = $("wordGrid");
  const now = Date.now();
  const filtered = words.filter(matchesFilter);
  $("countNote").textContent = filtered.length ? filtered.length + " words" : "No matching words found";
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-note">Nothing matches that search.</div>';
    return;
  }
  grid.innerHTML = filtered.map((w) => {
    const pct = Math.round(recallProb(stateOf(w.id), now) * 100);
    return `
      <div class="word-card" data-id="${w.id}">
        <div class="zi hanzi">${w.chinese}</div>
        <div class="py">${w.pinyin}</div>
        <div class="en">${w.english}</div>
        <div class="level-tag">${w.level || ""}</div>
        <div class="mini-bar"><span style="width:${pct}%"></span></div>
      </div>`;
  }).join("");
  grid.querySelectorAll(".word-card").forEach((c) => {
    c.addEventListener("click", () => {
      const id = parseInt(c.dataset.id, 10);
      speak((byId(id) || {}).chinese);
      openDetail(id);
    });
  });
}

function charStoryHTML(ch) {
  const info = (DB.charInfo || {})[ch];
  if (!info) return "";
  const families = (DB.charToFamily || {})[ch] || [];
  const famHTML = families.map((f) =>
    `<span class="family-chip" data-family="${f}">Part of the ${f.replace("The ", "").replace(" sound family", "")} family &rarr;</span>`
  ).join(" ");
  return `
    <div class="char-story-card">
      <div class="big-zi hanzi">${ch}
        <button class="speak-btn small" data-speak="${ch}" style="display:block;margin:6px auto 0;">🔊</button>
      </div>
      <div class="char-story-body">
        <span class="type-badge ${typeClass[info.type] || "type-whole"}">${typeLabel[info.type] || ""}</span>
        ${info.parts && info.parts !== "-" ? `<div class="parts-line"><strong>Parts:</strong> ${info.parts}</div>` : ""}
        <div class="story-line">${info.story}</div>
        ${famHTML}
      </div>
    </div>`;
}

// The character web: other words in this lab that share a character.
function relatedWordsHTML(w) {
  const mine = new Set(w.chars || []);
  const related = words.filter((x) => x.id !== w.id && (x.chars || []).some((c) => mine.has(c))).slice(0, 12);
  if (!related.length) {
    return `<p class="empty-note">No other word in this lab shares a character with ${w.chinese} yet. As you add more lessons, this web fills in.</p>`;
  }
  return `<div class="web-row">` + related.map((x) => {
    const zi = (x.chars || []).map((c) => (mine.has(c) ? `<mark>${c}</mark>` : c)).join("");
    return `<div class="web-pill" data-id="${x.id}">
      <div class="zi hanzi">${zi}</div>
      <div class="py">${x.pinyin}</div>
      <div class="en">${x.english}</div>
    </div>`;
  }).join("") + `</div>`;
}

function exampleBoxHTML(ex) {
  const badge = ex.level ? `<span class="level-badge level-badge-${String(ex.level).toLowerCase()}">${ex.level}</span>` : "";
  return `
    <div class="example-box">
      ${badge}
      <div class="cn hanzi">${ex.cn} <button class="speak-btn small" data-speak="${ex.cn}">🔊</button></div>
      <div class="py">${ex.py}</div>
      <div class="en">${ex.en}</div>
    </div>`;
}

function cleanImageQuery(english) {
  let t = (english || "").replace(/\([^)]*\)/g, "").trim();
  return t.split(",")[0].trim();
}

async function loadWordImage(w) {
  const wrap = $("wordImageWrap");
  if (!wrap) return;
  const term = cleanImageQuery(w.english);
  if (!term) { wrap.innerHTML = `<p class="image-none">No picture found for this word.</p>`; return; }
  if (imageCache[term]) { renderWordImage(wrap, term, imageCache[term], 0); return; }
  try {
    const params = new URLSearchParams({
      action: "query", generator: "search", gsrsearch: term, gsrnamespace: "6",
      gsrlimit: "8", prop: "imageinfo", iiprop: "url|extmetadata",
      iiurlwidth: "320", format: "json", origin: "*"
    });
    const res = await fetch("https://commons.wikimedia.org/w/api.php?" + params.toString());
    const data = await res.json();
    const pages = (data.query && data.query.pages) || {};
    const results = Object.values(pages)
      .filter((p) => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl)
      .filter((p) => /\.(jpe?g|png|webp)$/i.test(p.title || ""))
      .sort((a, b) => (a.index || 99) - (b.index || 99))
      .map((p) => ({ thumb: p.imageinfo[0].thumburl, page: p.imageinfo[0].descriptionurl }));
    imageCache[term] = results;
    if ($("wordImageWrap") === wrap) renderWordImage(wrap, term, results, 0);
  } catch (err) {
    wrap.innerHTML = `<p class="image-none">Could not reach the picture search. Check your internet connection.</p>`;
  }
}

function renderWordImage(wrap, term, results, index) {
  if (!results.length) { wrap.innerHTML = `<p class="image-none">No picture found for "${term}".</p>`; return; }
  const i = index % results.length;
  const r = results[i];
  wrap.innerHTML = `
    <img class="word-image" src="${r.thumb}" alt="${term}" loading="lazy" />
    <div class="image-caption">
      <span>photo: &ldquo;${term}&rdquo; &middot; <a href="${r.page}" target="_blank" rel="noopener">Wikimedia Commons</a></span>
      ${results.length > 1 ? `<button type="button" class="img-shuffle-btn">try another</button>` : ""}
    </div>`;
  const sb = wrap.querySelector(".img-shuffle-btn");
  if (sb) sb.addEventListener("click", () => renderWordImage(wrap, term, results, i + 1));
  const img = wrap.querySelector(".word-image");
  if (img) img.addEventListener("error", () => renderWordImage(wrap, term, results.filter((x) => x !== r), 0));
}

function openDetail(id) {
  const w = byId(id);
  if (!w) return;
  const uniqueChars = [...new Set(w.chars || [])];
  const st = stateOf(w.id);
  const pct = Math.round(recallProb(st, Date.now()) * 100);
  const stateNote = st.state === "new" ? "not studied yet"
    : "seen " + st.reps + "x · next review in " + Math.max(0, Math.round((st.due - Date.now()) / DAY)) + " day(s)";

  $("detailContent").innerHTML = `
    <div class="detail-head">
      <div class="zi-row">
        <div class="zi hanzi">${w.chinese}</div>
        <button class="speak-btn" data-speak="${w.chinese}">🔊</button>
      </div>
      <div class="py">${w.pinyin}</div>
      <div class="en">${w.english}</div>
      <div class="kh">${w.khmer || ""}</div>
      <div class="strength-wrap">
        <div class="lbl"><span>Memory strength</span><span>${pct}%</span></div>
        <div class="bar"><span style="width:${pct}%"></span></div>
        <div class="lbl" style="margin-top:4px;"><span>${stateNote}</span></div>
      </div>
    </div>
    <div class="section-label">Picture</div>
    <div id="wordImageWrap" class="word-image-wrap"><p class="image-loading">Looking for a picture&hellip;</p></div>
    <div class="section-label">Examples</div>
    ${(w.examples || []).map(exampleBoxHTML).join("")}
    <div class="section-label">How to remember it</div>
    ${w.breakdown && w.breakdown !== "-"
      ? `<div class="parts-line" style="margin-bottom:8px;"><strong>Word breakdown:</strong> ${w.breakdown}</div>` : ""}
    ${uniqueChars.map(charStoryHTML).join("")}
    <div class="section-label">Character web — words that share a piece</div>
    ${relatedWordsHTML(w)}`;

  $("overlay").classList.add("show");
  loadWordImage(w);

  document.querySelectorAll("#detailContent [data-speak]").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); speak(btn.dataset.speak); });
  });
  document.querySelectorAll("#detailContent .web-pill").forEach((p) => {
    p.addEventListener("click", () => openDetail(parseInt(p.dataset.id, 10)));
  });
  document.querySelectorAll("#detailContent .family-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      closeDetail();
      switchView("practiceView");
      showPane("paneFamilies");
      setTimeout(() => {
        const t = document.querySelector(`[data-group-title="${chip.dataset.family}"]`);
        if (t) t.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    });
  });
}

function closeDetail() { $("overlay").classList.remove("show"); }
$("closeDetail").addEventListener("click", closeDetail);
$("overlay").addEventListener("click", (e) => { if (e.target.id === "overlay") closeDetail(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDetail(); });

$("searchBox").addEventListener("input", (e) => { currentSearch = e.target.value.trim(); renderGrid(); });

document.querySelectorAll("#learnSeg button").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#learnSeg button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    const cards = b.dataset.mode === "cards";
    $("learnList").style.display = cards ? "none" : "";
    $("learnCards").style.display = cards ? "" : "none";
    if (cards) renderFlashcard();
  });
});

// --- flashcards (browsing only, no effect on the schedule) ---
let studyLevel = "ALL";
let studyList = words.slice();
let studyIndex = 0;

// Which side is shown before the flip: the characters, the pinyin, or the
// Khmer. Flipping always reveals the other three, so each choice trains a
// different direction: reading, pronunciation, and Khmer -> Chinese.
const FRONT_HINT = {
  zi: "Tap to reveal pinyin, meaning and Khmer",
  py: "Tap to reveal the characters, meaning and Khmer",
  kh: "Tap to reveal the characters, pinyin and meaning"
};
let frontMode = ["zi", "py", "kh"].includes(settings.frontMode) ? settings.frontMode : "zi";

function buildStudyList() {
  studyList = studyLevel === "ALL" ? words.slice() : words.filter((w) => w.level === studyLevel);
  studyIndex = 0;
  renderFlashcard();
}
function renderFlashcard() {
  const card = $("flashcard");
  const front = $("fc-front");
  if (!studyList.length) {
    front.textContent = "—";
    $("progressNote").textContent = "No words in this filter.";
    return;
  }
  const w = studyList[studyIndex];
  card.classList.remove("flipped");

  front.className = "fc-front fc-front--" + frontMode;
  front.textContent = frontMode === "zi" ? w.chinese
    : frontMode === "py" ? w.pinyin
    : (w.khmer || "—");
  $("fcHint").textContent = FRONT_HINT[frontMode];

  $("fc-zi").textContent = w.chinese;
  $("fc-py").textContent = w.pinyin;
  $("fc-en").textContent = w.english;
  $("fc-kh").textContent = w.khmer || "";
  // Do not repeat on the back whatever is already showing on the front.
  $("fc-zi").style.display = frontMode === "zi" ? "none" : "";
  $("fc-py").style.display = frontMode === "py" ? "none" : "";
  $("fc-kh").style.display = frontMode === "kh" ? "none" : "";

  $("progressNote").textContent = (studyIndex + 1) + " / " + studyList.length;
}

document.querySelectorAll("#frontSeg button").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#frontSeg button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    frontMode = b.dataset.front;
    settings.frontMode = frontMode;
    saveSettings();
    renderFlashcard();
  });
});
$("flashcard").addEventListener("click", () => {
  const card = $("flashcard");
  card.classList.toggle("flipped");
  if (card.classList.contains("flipped") && studyList.length) speak(studyList[studyIndex].chinese);
});
$("nextBtn").addEventListener("click", () => {
  if (!studyList.length) return;
  studyIndex = (studyIndex + 1) % studyList.length; renderFlashcard();
});
$("prevBtn").addEventListener("click", () => {
  if (!studyList.length) return;
  studyIndex = (studyIndex - 1 + studyList.length) % studyList.length; renderFlashcard();
});
$("shuffleBtn").addEventListener("click", () => { shuffle(studyList); studyIndex = 0; renderFlashcard(); });
$("detailBtn").addEventListener("click", () => { if (studyList.length) openDetail(studyList[studyIndex].id); });

// ============================================================
// 8. PRACTICE
// ============================================================
function showPane(paneId) {
  document.querySelectorAll("#practiceView .pane").forEach((p) => { p.style.display = "none"; });
  const t = $(paneId);
  if (t) t.style.display = "";
  document.querySelectorAll("#practiceSeg button").forEach((b) => b.classList.toggle("active", b.dataset.pane === paneId));
  if (paneId === "paneCloze") nextCloze();
}
document.querySelectorAll("#practiceSeg button").forEach((b) => {
  b.addEventListener("click", () => showPane(b.dataset.pane));
});

function renderPatterns() {
  const wrap = $("patternGroupsWrap");
  const groups = DB.patternGroups || [];
  wrap.innerHTML = groups.length ? groups.map((g) => `
    <div class="pattern-group" data-group-title="${g.title}">
      <span class="sound-tag hanzi">${g.sound_component}</span>
      <h3>${g.title}</h3>
      <p class="explain">${g.explain}</p>
      <div class="member-row">
        ${g.members.map((m) => `
          <div class="member-pill" data-lookup="${m[0]}">
            <div class="zi hanzi">${m[0]}</div>
            <div class="py">${m[1]}</div>
            <div class="gloss">${m[3]}</div>
          </div>`).join("")}
      </div>
    </div>`).join("")
    : `<p class="empty-note">No sound families in this lesson. That is honest, not a gap: a family needs at least two characters here that share the same sound part.</p>`;

  wrap.querySelectorAll(".member-pill").forEach((p) => {
    p.addEventListener("click", () => {
      const ch = p.dataset.lookup;
      speak(ch);
      const w = words.find((x) => (x.chars || []).includes(ch));
      if (w) openDetail(w.id);
    });
  });

  const radWrap = $("radicalGroupsWrap");
  const rads = DB.radicalGroups || [];
  radWrap.innerHTML = rads.length ? rads.map((g) => `
    <div class="radical-group">
      <span class="rad-tag hanzi">${g.radical}</span>
      <span style="font-size:12.5px;color:var(--ink-soft);"> — ${g.meaning}</span>
      <div class="rad-members hanzi">${g.members.join(" ")}</div>
    </div>`).join("")
    : `<p class="empty-note">No meaning radicals shared by two or more characters in this lesson.</p>`;
}

function renderStructures() {
  const inLab = new Set();
  words.forEach((w) => (w.chars || []).forEach((c) => inLab.add(c)));
  $("structGrid").innerHTML = STRUCTURES.map((s) => `
    <div class="struct-card">
      <div class="struct-head">
        <svg width="56" height="56" viewBox="0 0 64 64">${s.svg}</svg>
        <div>
          <div class="struct-name hanzi">${s.name}</div>
          <div class="struct-py">${s.pinyin}</div>
          <div class="struct-en">${s.en}</div>
          <span class="struct-tier">${s.tier}</span>
        </div>
      </div>
      <p class="struct-hint">${s.hint}</p>
      <div class="struct-members">
        ${s.members.map((c) => `<div class="struct-zi${inLab.has(c) ? " in-lab" : ""}" data-ch="${c}">${c}</div>`).join("")}
      </div>
    </div>`).join("");
  $("structGrid").querySelectorAll(".struct-zi.in-lab").forEach((el) => {
    el.addEventListener("click", () => {
      const w = words.find((x) => (x.chars || []).includes(el.dataset.ch));
      if (w) { speak(el.dataset.ch); openDetail(w.id); }
    });
  });
}

// --- Sentence cloze practice ---
let clozeRight = 0, clozeTotal = 0;

function clozePool() { return words.filter((w) => clozeExample(w)); }

function nextCloze() {
  const card = $("clozeCard");
  const pool = clozePool();
  if (pool.length < 4) {
    card.innerHTML = `<p class="empty-note">This lesson needs at least 4 words with example sentences before fill-the-blank works.</p>`;
    $("clozeScore").textContent = "";
    return;
  }
  const w = pool[Math.floor(Math.random() * pool.length)];
  const ex = clozeExample(w);
  const opts = shuffle(sample(words.filter((x) => x.id !== w.id), 3).concat([w]));
  card.innerHTML = `
    <div class="cloze-sentence hanzi">${ex.cn.replace(w.chinese, `<span class="cloze-blank">?</span>`)}</div>
    <div class="cloze-en">${ex.en}</div>
    <div class="choices" id="clozeChoices">
      ${opts.map((o) => `<button class="choice" data-id="${o.id}"><span class="zi hanzi">${o.chinese}</span><br><span style="font-size:11px;color:var(--ink-soft)">${o.pinyin}</span></button>`).join("")}
    </div>
    <div class="task-hidden" id="clozeReveal">
      <div class="py" style="font-size:14px;color:var(--ink-soft);margin-top:12px;font-style:italic;">${ex.py}</div>
      <div style="font-size:13px;color:var(--ink);margin-top:4px;">${w.chinese} · ${w.pinyin} · ${w.english}</div>
    </div>
    <div class="task-actions" id="clozeActions"></div>`;

  card.querySelectorAll("#clozeChoices .choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      const right = parseInt(btn.dataset.id, 10) === w.id;
      clozeTotal++;
      if (right) clozeRight++;
      card.querySelectorAll(".choice").forEach((b) => {
        b.disabled = true;
        if (parseInt(b.dataset.id, 10) === w.id) b.classList.add("correct");
        else if (b === btn) b.classList.add("wrong");
      });
      $("clozeReveal").classList.remove("task-hidden");
      speak(ex.cn);
      // A miss here pulls the word forward in the review queue.
      if (!right) {
        const st = stateOf(w.id);
        if (st.state === "review") { st.due = Date.now(); srs[w.id] = st; saveSrs(); renderToday(); }
      }
      $("clozeActions").innerHTML = `<button class="btn primary" id="clozeNext">Next sentence</button>
        <button class="btn" id="clozeOpen">Open word card</button>`;
      $("clozeNext").addEventListener("click", nextCloze);
      $("clozeOpen").addEventListener("click", () => openDetail(w.id));
      $("clozeScore").textContent = clozeRight + " right out of " + clozeTotal;
    });
  });
  $("clozeScore").textContent = clozeTotal ? clozeRight + " right out of " + clozeTotal : "";
}

// ============================================================
// 9. YOU — settings, backup, reset
// ============================================================
function renderVoicePicker() {
  const sel = $("voicePicker");
  const zh = zhVoices();
  const list = zh.length ? zh : voices;
  sel.innerHTML = list.length
    ? list.map((v) => `<option value="${v.voiceURI}">${v.name} (${v.lang})</option>`).join("")
    : `<option value="">No voices available</option>`;
  const current = pickVoice();
  if (current) sel.value = current.voiceURI;
  $("voiceWarn").style.display = zh.length ? "none" : "";
}

function renderSettings() {
  renderVoicePicker();
  $("rateSlider").value = settings.rate;
  $("rateVal").textContent = Number(settings.rate).toFixed(2) + "x";
  $("pitchSlider").value = settings.pitch;
  $("pitchVal").textContent = Number(settings.pitch).toFixed(2);
  $("newLimit").value = settings.newLimit;
  $("sessionCap").value = settings.sessionCap;

  const now = Date.now();
  const learned = words.filter((w) => stateOf(w.id).state === "review").length;
  const strong = words.filter((w) => recallProb(stateOf(w.id), now) >= 0.9).length;
  $("progressSummary").textContent =
    words.length + " words in this lab. " + learned + " started, " + strong +
    " currently strong (90% or better). Day streak: " + streakDays() + ".";
}

$("voicePicker").addEventListener("change", (e) => { settings.voiceURI = e.target.value; saveSettings(); });
$("rateSlider").addEventListener("input", (e) => {
  settings.rate = parseFloat(e.target.value);
  $("rateVal").textContent = settings.rate.toFixed(2) + "x";
  saveSettings();
});
$("pitchSlider").addEventListener("input", (e) => {
  settings.pitch = parseFloat(e.target.value);
  $("pitchVal").textContent = settings.pitch.toFixed(2);
  saveSettings();
});
$("voiceTestBtn").addEventListener("click", () => speak("你好，我在学中文。"));
$("newLimit").addEventListener("change", (e) => {
  settings.newLimit = Math.max(0, Math.min(50, parseInt(e.target.value, 10) || 0));
  e.target.value = settings.newLimit; saveSettings(); renderToday();
});
$("sessionCap").addEventListener("change", (e) => {
  settings.sessionCap = Math.max(5, Math.min(100, parseInt(e.target.value, 10) || 25));
  e.target.value = settings.sessionCap; saveSettings();
});

$("exportBtn").addEventListener("click", () => {
  const payload = { app: "character-memory-lab", labId: LAB_ID, exportedAt: new Date().toISOString(), srs, daily, settings };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = LAB_ID + "-progress-" + dayStr(Date.now()) + ".json";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  $("backupNote").textContent = "Backup file saved to your downloads.";
});

$("importBtn").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || !data.srs) throw new Error("no progress in this file");
      srs = data.srs; saveSrs();
      if (data.daily) { daily = data.daily; saveDaily(); }
      if (data.settings) { settings = Object.assign({}, DEFAULT_SETTINGS, data.settings); saveSettings(); }
      const mismatch = data.labId && data.labId !== LAB_ID;
      $("backupNote").textContent = "Backup restored." + (mismatch ? " Note: this backup came from a different lab (" + data.labId + "), so some words may not match." : "");
      renderSettings(); renderToday(); renderGrid();
    } catch (err) {
      $("backupNote").textContent = "Could not read that file: " + err.message;
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

let resetArmed = false;
$("resetBtn").addEventListener("click", () => {
  if (!resetArmed) {
    resetArmed = true;
    $("resetWarn").style.display = "";
    setTimeout(() => { resetArmed = false; $("resetWarn").style.display = "none"; }, 6000);
    return;
  }
  srs = {}; daily = { days: {} };
  saveSrs(); saveDaily();
  resetArmed = false;
  $("resetWarn").style.display = "none";
  $("backupNote").textContent = "All progress cleared.";
  renderSettings(); renderToday(); renderGrid();
});

// ============================================================
// 10. Boot
// ============================================================
(function init() {
  const meta = DB.meta || {};
  if (meta.title) { document.title = meta.title; $("pageTitle").textContent = meta.title; }
  $("pageSubtitle").textContent = meta.subtitle || "";
  $("pageFooter").textContent = meta.footer || "";

  if (hasTTS) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = () => { refreshVoices(); renderVoicePicker(); };
  }

  buildLevelChips("wordsLevelChips", "words-chip", (lv) => { currentLevel = lv; renderGrid(); });
  buildLevelChips("studyLevelChips", "study-chip", (lv) => { studyLevel = lv; buildStudyList(); });

  document.querySelectorAll("#frontSeg button").forEach((b) => {
    b.classList.toggle("active", b.dataset.front === frontMode);
  });

  renderGrid();
  renderFlashcard();
  renderPatterns();
  renderStructures();
  renderToday();
  renderSettings();
})();
