/* Halo home screen. Real apps, inputs, volume and settings come from the Android bridge (window.Halo). */
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const tv = $("#tv");
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ICONS = {
  search: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-3.6-3.6", plus: "M12 5v14M5 12h14", check: "M5 12.5l4.5 4.5L19 7",
  info: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 11v6M12 7.5v.01",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  wifi: "M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.7 15.8a5 5 0 0 1 6.6 0M12 19.2v.01", wifioff: "M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.7 15.8a5 5 0 0 1 6.6 0M12 19.2v.01M3 3l18 18",
  bt: "M7 7.5l10 9-5 4.5V3l5 4.5-10 9", tv: "M3 5.5h18v12H3zM8 21h8", sound: "M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12",
  mute: "M4 9h4l5-4v14l-5-4H4zM17 9.5l5 5M22 9.5l-5 5", user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  lock: "M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3", apps: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  a11y: "M12 3.5v.01M5 8l7 1.5L19 8M12 9.5V14l-3 6.5M12 14l3 6.5", remote: "M8 2.5h8v19H8zM12 6.5v.01M10.3 10.5h3.4M10.3 13.5h3.4",
  input: "M4 8h16v9H4zM8 8V5h8v3", chev: "M9.5 6l6 6-6 6", ext: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  cc: "M3 6h18v12H3zM10.5 10.3a2.2 2.2 0 1 0 0 3.4M17 10.3a2.2 2.2 0 1 0 0 3.4", mic: "M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0zM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3.5",
  del: "M9 6h11v12H9l-6-6zM12 9.5l5 5M17 9.5l-5 5", photo: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 8.5v.01",
  sliders: "M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4", store: "M5 8h14l-1 12H6zM9 8V6.5a3 3 0 0 1 6 0V8",
  globe: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18", x: "M6 6l12 12M18 6L6 18",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13", storage: "M4 5h16v6H4zM4 13h16v6H4zM7.5 8v.01M7.5 16v.01", clock: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3.5 2",
  keyboard: "M3 7h18v10H3zM7 10.5v.01M11 10.5v.01M15 10.5v.01M7.5 14h9", code: "M9 8l-4 4 4 4M15 8l4 4-4 4", home: "M3 11l9-7 9 7M5 9.5V20h14V9.5",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z", move: "M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3",
  play: "M8 5.5v13l10.5-6.5z"
};
const ic = n => `<svg class="ic${n === "play" ? " fill" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n] || ""}"/></svg>`;

/* ---------- saved choices (stay on this TV) ---------- */
const WALLS = [
  ["kerala-backwaters-canal-palm-trees-india.jpg", "Kerala backwaters"], ["a-sunrise-on-kalindi-mountain-himalayas-uttarakhand.jpg", "Himalaya sunrise"],
  ["arugam-waves.jpg", "Arugam Bay"], ["great-carina-nebula-processed.jpg", "Carina Nebula"], ["desert-road-uae.jpg", "Desert road"],
  ["rainforest-canopy.jpg", "Rainforest"], ["thank-you-for-today-minneapolis-reflections-flickr.jpg", "City river"], ["sun-in-snow-forest.jpg", "Snow forest"],
  ["sher-e-bangla-national-cricket-stadium-night.jpg", "Stadium at night"], ["krakenes-lighthouse-storm-tunliweb.jpg", "Lighthouse storm"],
  ["green-and-yellow-taxi-at-night-in.jpg", "Tokyo at night"], ["pokhara-at-dawn.jpg", "Pokhara at dawn"], ["eso-vlt-laser-phot-33a-07.jpg", "Milky Way"], ["none", "Plain black"]
];
const CREDITS = [
  ["Kerala backwaters, Canal, Palm trees, India", "Vyacheslav Argenberg", "CC BY 4.0"], ["A Sunrise on Kalindi mountain, Uttarakhand", "Sharada Prasad CS", "CC BY 2.0"],
  ["Arugam Waves", "Etienne Boulanger", "CC BY 3.0"], ["Great Carina Nebula Processed", "Dylan O'Donnell", "CC0"], ["Desert road UAE", "Nepenthes", "CC BY-SA 3.0"],
  ["Rainforest canopy", "Ben Sutherland", "CC BY 2.0"], ["Minneapolis Reflections", "Andrew Parlette", "CC BY 4.0"], ["Sun In Snow Forest", "Tobias Spitaler", "CC BY 3.0"],
  ["Sher-e-Bangla Stadium Night View", "Jubair1985", "CC BY-SA 4.0"], ["Krakenes lighthouse storm", "Svein Magne Tunli", "CC BY-SA 4.0"],
  ["Taxi at night, Yasukuni-dori, Shinjuku", "Basile Morin", "CC BY-SA 4.0"], ["Pokhara at dawn", "Prasan Shrestha", "CC BY-SA 4.0"], ["ESO VLT laser photo 33a-07", "ESO/Y. Beletsky", "CC BY 4.0"]
];
const DEF = { order: [], hidden: [], wall: "auto", wallEvery: "15 minutes", wallIdx: 0, wallAt: 0, clock: "System", glass: "Auto", glassOk: true, anim: "1x", showPhone: true, sounds: false };
let S;
try { S = Object.assign({}, DEF, JSON.parse(localStorage.getItem("halo.l1") || "{}")); } catch (e) { S = Object.assign({}, DEF); }
S.moving = null; if (!Array.isArray(S.order)) S.order = []; if (!Array.isArray(S.hidden)) S.hidden = [];
function save() { try { localStorage.setItem("halo.l1", JSON.stringify(S)); } catch (e) { } }

/* ---------- bridge ---------- */
const PREVIEW = !window.Halo;
const H = window.Halo || previewBridge();
const J = (s, d) => { try { const v = JSON.parse(s); return v == null ? d : v; } catch (e) { return d; } };
let APPS = [], ST = {}, INPUTS = [], REC = { granted: false, pkgs: [] }, ver = Date.now();
let CONTENT = { supported: false, granted: false, watchNext: [], channels: [] }, PROG = {};
function load() { loadClock(); APPS = J(H.apps(), []); ST = J(H.status(), {}); INPUTS = sortInputs(J(H.inputs(), [])); REC = J(H.recents(), { granted: false }); ver++; loadContent(); }
function loadContent() {
  CONTENT = Object.assign({ supported: false, granted: false, watchNext: [], channels: [] }, J(H.content ? H.content() : "{}", {}));
  PROG = {};
  CONTENT.watchNext.forEach(p => PROG[p.id] = p);
  CONTENT.channels.forEach(ch => ch.programs.forEach(p => PROG[p.id] = p));
  CONTENT.channels.sort((a, b) => rank(a.pkg) - rank(b.pkg));
}
const byPkg = p => APPS.find(a => a.pkg === p);
const sortInputs = l => l.slice().sort((a, b) => String(a.label).localeCompare(String(b.label), undefined, { numeric: true }));
const appName = p => (byPkg(p) || {}).label || "";
const KIND = t => t === 0 ? "movie" : t === 1 || t === 2 || t === 3 ? "series" : t >= 7 && t <= 11 ? "music" : "video";
const KIND_NAME = { movie: "Film", series: "Series", music: "Music", video: "Video" };
const artUrl = p => !p || !p.art ? "" : PREVIEW ? p.art : "art/" + encodeURIComponent(p.id);
const PRI = ["com.google.android.youtube.tv", "com.google.android.youtube.tvmusic", "com.netflix.ninja", "com.amazon.amazonvideo.livingroom", "in.startv.hotstar", "com.jio", "com.spotify.tv.android", "com.android.vending"];
function rank(p) {
  const i = S.order.indexOf(p); if (i >= 0) return i;
  const j = PRI.findIndex(x => p === x || p.startsWith(x + ".")); return j >= 0 ? 1000 + j : 1e6;
}
const ordered = () => APPS.filter(a => !S.hidden.includes(a.pkg) && (a.tv || S.showPhone))
  .sort((a, b) => rank(a.pkg) - rank(b.pkg) || (b.tv - a.tv) || a.label.localeCompare(b.label));

/* preview in a desktop browser only; on the TV the real bridge is used */
function previewBridge() {
  const apps = [["com.google.android.youtube.tv", "YouTube"], ["com.netflix.ninja", "Netflix"], ["com.amazon.amazonvideo.livingroom", "Prime Video"],
    ["in.startv.hotstar.dplus.tv", "JioHotstar"], ["com.spotify.tv.android", "Spotify"], ["com.android.vending", "Google Play Store"],
    ["com.google.android.tv", "Live Channels"], ["com.android.tv.settings", "Settings"], ["com.google.android.youtube.tvmusic", "YouTube Music"],
    ["com.mxtech.videoplayer.television", "MX Player"], ["com.google.android.apps.mediashell", "Chromecast built-in", 0]]
    .map(([pkg, label, tvApp]) => ({ pkg, label, banner: tvApp !== 0, tv: tvApp !== 0, system: false }));
  let vol = 6, muted = false;
  // Sample rows so the layout can be seen on a computer. Titles are invented; on the TV every card comes from the apps themselves.
  const im = k => "wall/" + { kerala: "kerala-backwaters-canal-palm-trees-india", kalindi: "a-sunrise-on-kalindi-mountain-himalayas-uttarakhand", waves: "arugam-waves", nebula: "great-carina-nebula-processed", desert: "desert-road-uae", forest: "rainforest-canopy", harbour: "thank-you-for-today-minneapolis-reflections-flickr", snow: "sun-in-snow-forest", cricket: "sher-e-bangla-national-cricket-stadium-night", lighthouse: "krakenes-lighthouse-storm-tunliweb", tokyo: "green-and-yellow-taxi-at-night-in", pokhara: "pokhara-at-dawn", milky: "eso-vlt-laser-phot-33a-07" }[k] + ".jpg";
  const NF = "com.netflix.ninja", YT = "com.google.android.youtube.tv", PV = "com.amazon.amazonvideo.livingroom", YM = "com.google.android.youtube.tvmusic", HS = "in.startv.hotstar.dplus.tv";
  const P = (id, pkg, title, type, art, o = {}) => Object.assign({ id, pkg, title, type, art: im(art), wide: true }, o);
  const sample = {
    supported: true, granted: true,
    watchNext: [
      P("w0", NF, "Low Tide", 3, "waves", { genre: "Drama", rating: "U/A 16+", sub: "S1 E8 · Last Set", progress: .88, desc: "A surf school on Sri Lanka's east coast has one season left to pay its debts." }),
      P("w1", NF, "Static", 0, "nebula", { genre: "Sci-Fi", rating: "U/A 13+", progress: .38, sub: "48 min left", desc: "A radio astronomer hears a signal that repeats her own voice, eleven years late." }),
      P("w2", PV, "The Long Monsoon", 3, "kerala", { genre: "Drama", rating: "U/A 13+", sub: "S1 E4 · High Water", progress: .62, desc: "A fishing family in Alappuzha waits out the wettest season in forty years." }),
      P("w3", NF, "Salt & Signal", 3, "lighthouse", { genre: "Mystery", rating: "U/A 16+", sub: "S2 E1 · The Log", progress: .12, desc: "The last keeper of a Norwegian lighthouse logs a ship that sank in 1962." }),
      P("w4", HS, "Cricket Nights", 5, "cricket", { genre: "Sport", live: true, sub: "Mumbai v Chennai · Live", desc: "T20 from under the floodlights. Mumbai need 24 from 12 balls." }),
      P("w5", PV, "Glass Harbour", 3, "harbour", { genre: "Thriller", rating: "U/A 16+", sub: "S1 E2 · Expansion Joint", progress: .3 }),
      P("w6", NF, "Paper Tigers", 0, "tokyo", { genre: "Crime", rating: "U/A 16+", sub: "1 h 05 min left", progress: .45 })
    ],
    channels: [
      { id: "c1", pkg: YT, name: "Recommended for you", programs: [["Arugam Bay at sunrise, 4K", "waves", "Tide Pool · 2.1M views"], ["Driving the empty desert road", "desert", "Road Diaries · 880K views"], ["Inside a Himalayan base camp", "kalindi", "Trek Life · 1.4M views"], ["A night under the Milky Way", "milky", "Sky at Night · 3.2M views"], ["Tokyo after midnight", "tokyo", "City Walks · 640K views"], ["Snowfall in a silent forest", "snow", "Calm Places · 5M views"]].map((x, i) => P("y" + i, YT, x[0], 4, x[1], { sub: x[2] })) },
      { id: "c2", pkg: NF, name: "Top Picks for You", programs: [["Kalindi Pass", "kalindi", 0, "Adventure"], ["First Snow", "snow", 0, "Romance"], ["Low Tide", "waves", 1, "Drama"], ["Ninety Kilometres", "desert", 0, "Road movie"], ["The Dark Between", "milky", 1, "Science"], ["Quiet Planet", "forest", 1, "Nature"]].map((x, i) => P("n" + i, NF, x[0], x[2], x[1], { genre: x[3], rating: "U/A 13+" })) },
      { id: "c3", pkg: YM, name: "Mixed for you", programs: [["Monsoon Radio", "kerala", "Nila Trio, Hari Sundaram"], ["Night Drive", "tokyo", "Orbit 9, Sand & Stone"], ["Focus Flow", "forest", "Calm instrumentals"], ["Mountain Mornings", "pokhara", "Acoustic mix"]].map((x, i) => P("m" + i, YM, x[0], 10, x[1], { sub: x[2] })) },
      { id: "c4", pkg: PV, name: "Movies we think you'll like", programs: [["Last Bus to Pokhara", "pokhara", "Romance"], ["Ninety Kilometres", "desert", "Road movie"], ["Kalindi Pass", "kalindi", "Adventure"], ["Static", "nebula", "Sci-Fi"]].map((x, i) => P("a" + i, PV, x[0], 0, x[1], { genre: x[2] })) }
    ]
  };  return {
    clock: () => JSON.stringify({ now: Date.now(), offset: -new Date().getTimezoneOffset(), h24: false, date: new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) }),
    content: () => JSON.stringify(sample), askTvData: () => { }, openProgram: id => (toast("play", "Preview", "On the TV this opens it in its app"), true), dream: () => (toast("photo", "Preview", "On the TV this starts your screen saver (Aerial Views)"), true),
    apps: () => JSON.stringify(apps), recents: () => JSON.stringify({ granted: false }),
    status: () => JSON.stringify({ online: true, net: "wifi", volume: vol, maxVolume: 15, muted, name: "Living Room TV", model: "Preview", android: "12", h24: false, storageFree: 3.1e9, storageTotal: 8e9, ramFree: 9e8, ramTotal: 2e9, usage: false, hasStockHome: true, version: "1.0.0 preview" }),
    inputs: () => JSON.stringify([{ id: "hw1", label: "HDMI 1", type: 1007 }, { id: "hw2", label: "HDMI 2", type: 1007 }]),
    launch: p => (toast("apps", "Preview", "On the TV this opens " + p), true), appInfo: () => true, uninstall: () => true, settings: () => "ok",
    setVolume: v => { vol = v; }, toggleMute: () => { muted = !muted; }, openInput: () => true, storeSearch: () => true, youtubeSearch: () => true, hasYoutube: () => true, voice: () => true, stockHome: () => true, stockState: () => "enabled", restoreStock: () => true
  };
}

/* ---------- time ---------- */
/* The TV is the source of truth: its time, time zone, 12/24-hour setting and language-formatted date. */
let CLK = { offset: -new Date().getTimezoneOffset(), h24: false, date: "" }, clkMinute = -1;
function loadClock() { if (H.clock) CLK = Object.assign(CLK, J(H.clock(), {})); clkMinute = Math.floor(Date.now() / 60000); }
const tvNow = () => new Date(Date.now() + CLK.offset * 60000);
const h24 = () => S.clock === "24-hour" || (S.clock === "System" && !!CLK.h24);
function clockText() { const d = tvNow(), h = d.getUTCHours(), m = String(d.getUTCMinutes()).padStart(2, "0"); return h24() ? String(h).padStart(2, "0") + ":" + m : ((h % 12) || 12) + ":" + m; }
const dateText = () => CLK.date || tvNow().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const gb = b => (b / 1073741824).toFixed(1) + " GB";
function netText() { return ST.online ? (ST.net === "ethernet" ? "Ethernet connected" : "Wi-Fi connected") : "Not connected to the internet"; }

/* ---------- sounds (optional, off by default) ---------- */
let actx = null;
function beep(f, d, g) {
  if (!S.sounds) return;
  try { actx = actx || new AudioContext(); const o = actx.createOscillator(), v = actx.createGain(), t = actx.currentTime; o.frequency.value = f; v.gain.setValueAtTime(g, t); v.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(v).connect(actx.destination); o.start(t); o.stop(t + d + .02); } catch (e) { }
}
const tick = () => beep(2100, .03, .04), clack = () => beep(980, .07, .07);

/* ---------- stage ---------- */
function fit() {
  const w = (window.visualViewport && visualViewport.width) || innerWidth, h = (window.visualViewport && visualViewport.height) || innerHeight;
  const k = Math.min(w / 1920, h / 1080);
  if (k > 0) tv.style.transform = `translate(-50%,-50%) scale(${k})`;
}
addEventListener("resize", fit); if (window.visualViewport) visualViewport.addEventListener("resize", fit);
fit(); addEventListener("load", fit); setTimeout(fit, 300); setTimeout(fit, 1500);

/* ---------- focus engine ---------- */
const F = { cur: null }, stack = [];
let curView = "home";
const topLayer = () => stack[stack.length - 1];
const roots = () => topLayer() ? [topLayer()] : [$("#nav"), $("#v-" + curView)];
const inRoots = el => roots().some(r => r.contains(el));
const focusables = () => roots().flatMap(r => $$("[data-f]", r)).filter(e => e.offsetParent !== null);

function focus(el, o = {}) {
  if (!el) return;
  if (F.cur && F.cur !== el) F.cur.classList.remove("f");
  const changed = F.cur !== el;
  if (o.reveal !== false) reveal(el); // measure first, while the page layout is still clean
  F.cur = el; el.classList.add("f");
  if (changed) onFocus(el, o);
}
function focusDefault() { const l = focusables(); const root = roots()[roots().length - 1]; focus($("[data-first]", root) || l.find(e => !e.closest("#nav")) || l[0]); }

function move(dir) {
  const cur = F.cur, list = focusables();
  if (!cur || !list.includes(cur)) return focusDefault();
  if (cur.dataset.lr && (dir === "left" || dir === "right")) return LR[cur.dataset.lr](cur, dir === "right" ? 1 : -1);
  if ((dir === "left" || dir === "right") && cur.parentElement.classList.contains("track")) {
    let s = dir === "right" ? cur.nextElementSibling : cur.previousElementSibling;
    while (s && !s.hasAttribute("data-f")) s = dir === "right" ? s.nextElementSibling : s.previousElementSibling;
    if (s) { focus(s); tick(); } else bump(cur, dir);
    return;
  }
  const a = cur.getBoundingClientRect(), ax = a.left + a.width / 2, ay = a.top + a.height / 2, cand = [];
  for (const e of list) {
    if (e === cur) continue;
    const b = e.getBoundingClientRect(); if (!b.width) continue;
    const bx = b.left + b.width / 2, by = b.top + b.height / 2; let gap, cross;
    if (dir === "down") { if (by <= ay + 4 || b.top < a.top + a.height * .5) continue; gap = Math.max(0, b.top - a.bottom); cross = Math.abs(bx - ax); }
    else if (dir === "up") { if (by >= ay - 4 || b.bottom > a.bottom - a.height * .5) continue; gap = Math.max(0, a.top - b.bottom); cross = Math.abs(bx - ax); }
    else if (dir === "right") { if (bx <= ax + 4 || b.left < a.left + a.width * .5) continue; gap = Math.max(0, b.left - a.right); cross = Math.abs(by - ay); }
    else { if (bx >= ax - 4 || b.right > a.right - a.width * .5) continue; gap = Math.max(0, a.left - b.right); cross = Math.abs(by - ay); }
    cand.push({ e, gap, cross });
  }
  if (!cand.length) return bump(cur, dir);
  let pick;
  if (dir === "up" || dir === "down") { const min = Math.min(...cand.map(c => c.gap)); pick = cand.filter(c => c.gap <= min + 30).sort((x, y) => x.cross - y.cross)[0]; }
  else pick = cand.sort((x, y) => (x.gap + x.cross * 2.5) - (y.gap + y.cross * 2.5))[0];
  if (dir === "down" && cur.closest("#nav") && !pick.e.closest("#nav")) { const first = $("[data-first]", $("#v-" + curView)); if (first && first.offsetParent) pick = { e: first }; }
  if (dir === "up" && pick.e.closest("#nav") && !cur.closest("#nav")) { const sel = $(".tab.sel", $("#nav")); if (sel) pick = { e: sel }; }
  focus(pick.e); tick();
}
function bump(el, dir) { try { el.animate([{ translate: "0 0" }, { translate: { left: "-10px 0", right: "10px 0", up: "0 -10px", down: "0 10px" }[dir] }, { translate: "0 0" }], { duration: 240, easing: "ease-out" }); } catch (e) { } }

function offsetIn(el, anc) { let t = 0; while (el && el !== anc) { t += el.offsetTop; el = el.offsetParent; } return t; }
function reveal(el) {
  const tr = el.closest(".track");
  if (tr) {
    const vw = 1920 - 2 * 96; // rows always span the stage minus its side padding
    const l = el.offsetLeft, r = l + el.offsetWidth; let x = tr._x || 0;
    if (r > x + vw - 20) x = r - vw + 20;
    if (l < x + 10) x = l - (l > 0 ? 10 : 0);
    x = Math.max(0, Math.min(x, Math.max(0, tr.scrollWidth - vw)));
    if (x !== tr._x) { tr._x = x; tr.style.transform = `translateX(${-x}px)`; }
  }
  const vin = el.closest(".vin");
  if (vin) {
    const h = vin.parentElement.clientHeight, t = offsetIn(el, vin), b = t + el.offsetHeight; let y = vin._y || 0;
    if (t < y + 30) y = t - 30; if (b > y + h - 30) y = b - h + 30;
    y = Math.max(0, y); vin._y = y; vin.style.transform = `translateY(${-y}px)`;
  }
  const sc = el.closest(".scroller");
  if (sc && !el.closest("[data-noscroll]")) {
    const sec = el.closest("[data-sec]"); let y;
    if (sec && (sec.dataset.sec === "hero" || sec.dataset.sec === "hold")) y = 0;
    else if (sec) y = offsetIn(sec, sc) - (+sec.dataset.top || 170);
    else y = offsetIn(el, sc) - 320;
    y = Math.max(0, Math.min(y, Math.max(0, sc.scrollHeight - 1080 + 60)));
    setScroll(sc, y);
  }
  if (el.closest("#nav")) { const s2 = $(".scroller", $("#v-" + curView)); if (s2 && !topLayer()) setScroll(s2, 0); }
}
function setScroll(sc, y) {
  sc._y = y; sc.style.transform = `translateY(${-y}px)`;
  const host = sc.closest(".view"); if (host) { host.classList.toggle("scrolled", y > 0); updateChrome(); }
}
function updateChrome() {
  const sc = $(".scroller", $("#v-" + curView)), y = sc ? sc._y || 0 : 0;
  $("#nav").classList.toggle("away", y > 0 && !(F.cur && F.cur.closest("#nav")));
  tv.classList.toggle("dimmed", y > 0 || (curView !== "home" && curView !== "discover"));
}
let tabTimer = 0, bgTimer = 0;
function onFocus(el, o) {
  if (el.classList.contains("tab") && !o.mouse) { clearTimeout(tabTimer); tabTimer = setTimeout(() => { if (F.cur === el) setView(el.dataset.view); }, 150); }
  if (!topLayer()) { clearTimeout(bgTimer); bgTimer = setTimeout(() => updateBg(el), o.mouse ? 260 : 120); }
  heroHold = !el.closest("#nav"); // the spotlight turns by itself only while you are in the menu
  if (!topLayer() && el.closest(".row[data-sec=hold]") && el.dataset.art && PROG[el.dataset.art]) heroFollow(PROG[el.dataset.art]);
  if (el.closest("#settings")) settingsDesc(el);
  updateChrome();
}

/* ---------- layers ---------- */
function selOf(el) {
  const r = el.closest(".row"), ks = ["a", "pkg", "k", "id", "view", "i"];
  return (r && r.id ? "#" + r.id + " " : "") + "[data-f]" + ks.filter(k => el.dataset[k] != null).map(k => `[data-${k}="${CSS.escape(el.dataset[k])}"]`).join("");
}
function openLayer(el, first) {
  if (!stack.includes(el)) { el._ret = F.cur; stack.push(el); }
  el.style.zIndex = 40 + stack.length; el.classList.add("on");
  focus(first || $("[data-first]", el) || $("[data-f]", el) || el);
}
function closeLayer(el) {
  el = el || topLayer(); const i = stack.indexOf(el); if (i < 0) return;
  const r = el._ret, sel = r && r.closest && r.closest(".view") ? selOf(r) : null;
  stack.splice(i, 1); el.classList.remove("on");
  if (r && document.contains(r) && inRoots(r) && r.offsetParent !== null) focus(r);
  else { const n = sel && !topLayer() && $(sel, $("#v-" + curView)); if (n) focus(n); else focusDefault(); }
}
function closeAll() { while (stack.length) closeLayer(); }

/* ---------- background: the focused suggestion's picture, else the wallpaper, which changes on its own ---------- */
const REAL_WALLS = WALLS.filter(w => w[0] !== "none");
const WALL_MS = { "5 minutes": 3e5, "15 minutes": 9e5, "30 minutes": 18e5, "1 hour": 36e5, "Every day": 864e5, "Never": 0 };
function wallUrl() {
  if (S.wall === "none") return null;
  if (S.wall === "auto") return "wall/" + REAL_WALLS[(S.wallIdx || 0) % REAL_WALLS.length][0];
  return "wall/" + S.wall;
}
function rotateWall(force) {
  if (S.wall !== "auto") return false;
  const ms = WALL_MS[S.wallEvery];
  if (!force && (!ms || Date.now() - (S.wallAt || 0) < ms)) return false;
  S.wallIdx = ((S.wallIdx || 0) + 1) % REAL_WALLS.length; S.wallAt = Date.now(); save();
  return true;
}
let bgFlip = 0, bgCur;
function setBg(url) {
  if (url === bgCur) return; bgCur = url;
  const ls = $$(".bgl"), next = ls[bgFlip ^= 1], prev = ls[bgFlip ^ 1];
  if (!url) { ls.forEach(l => l.classList.remove("on")); return; }
  const go = src => {
    if (bgCur !== url) return;
    const img = new Image(); img.src = src;
    const show = () => { if (bgCur !== url) return; next.style.backgroundImage = `url("${src}")`; next.classList.add("on"); prev.classList.remove("on"); };
    img.decode ? img.decode().then(show, () => { if (bgCur === url) setBg(wallUrl()); }) : (img.onload = show);
  };
  if (tv.classList.contains("lite")) bake(url).then(go); else go(url);
}
/* Fast mode: draw the darkening gradients into the picture once, so the screen has one full-screen layer instead of three. */
const baked = new Map();
function bake(url) {
  if (baked.has(url)) return baked.get(url);
  const p = new Promise(res => {
    const im = new Image();
    im.onload = () => {
      try {
        const c = document.createElement("canvas"); c.width = 1920; c.height = 1080;
        const g = c.getContext("2d"), s = Math.max(1920 / im.width, 1080 / im.height), w = im.width * s, h = im.height * s;
        g.drawImage(im, (1920 - w) / 2, (1080 - h) / 2, w, h);
        const band = (x0, y0, x1, y1, stops) => { const gr = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, a]) => gr.addColorStop(o, `rgba(0,0,0,${a})`)); g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080); };
        band(0, 0, 1920, 0, [[0, .72], [.3, .42], [.58, .08], [.72, 0], [1, 0]]);
        band(0, 1080, 0, 0, [[0, .9], [.22, .55], [.46, 0], [1, 0]]);
        band(0, 0, 0, 1080, [[0, .35], [.14, 0], [1, 0]]);
        c.toBlob(b => res(b ? URL.createObjectURL(b) : url), "image/jpeg", .9);
      } catch (e) { res(url); }
    };
    im.onerror = () => res(url);
    im.src = url;
  });
  baked.set(url, p);
  if (baked.size > 6) { const [k, old] = baked.entries().next().value; baked.delete(k); old.then(u => { if (u.startsWith("blob:")) setTimeout(() => URL.revokeObjectURL(u), 3000); }); }
  return p;
}
function updateBg(el) {
  if (topLayer()) return;
  const p = el && el.dataset.art && PROG[el.dataset.art];
  if (p && p.art) return setBg(artUrl(p));
  const sc = $(".scroller", $("#v-" + curView)), top = !sc || !(sc._y > 0);
  const h = heroItems[heroIdx];
  if (top && (curView === "home" || curView === "discover") && h && h.art) return setBg(artUrl(h));
  setBg(wallUrl());
}

/* ---------- pieces ---------- */
function tile(a, extra = "") {
  const ini = esc((a.label.trim()[0] || "?").toUpperCase());
  return `<div class="app${a.banner ? "" : " noban"}${S.moving === a.pkg ? " moving" : ""}" data-f data-a="app" data-pkg="${esc(a.pkg)}"${extra}>
    <div class="tile ${a.banner ? "ban" : "ico"}"><img src="icon/${encodeURIComponent(a.pkg)}?v=${ver}" alt="" decoding="async"><span class="ini">${ini}</span><span class="nm">${esc(a.label)}</span></div>
    <div class="lab">${esc(a.label)}</div></div>`;
}
const qtile = (act, data, icon, title, sub, cls = "") => `<div class="qtile ${cls}" data-f data-a="${act}" ${data}>${ic(icon)}<div><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ""}</div></div>`;
const INPUT_TYPES = { 1007: "HDMI", 1001: "Composite", 1002: "S-Video", 1003: "SCART", 1004: "Component", 1005: "VGA", 1006: "DVI", 1008: "DisplayPort", 0: "Tuner", 1000: "Input" };
const inputTile = i => qtile("input", `data-id="${esc(i.id)}"`, "input", i.label, INPUT_TYPES[i.type] || "Input");
const QUICK = () => [
  ["network", "wifi", "Network & Internet", netText()], ["bluetooth", "remote", "Remotes & Accessories", "Pair a remote or headphones"],
  ["display", "tv", "Display & Sound", "Picture, resolution, audio"], ["apps", "apps", "Apps", "Storage, permissions, updates"],
  ["dream", "photo", "Screen saver", "TV's ambient mode"], ["main", "gear", "All settings", "Everything on this TV"]
];
function progCard(p, o = {}) {
  const poster = false, tall = !p.wide, bar = p.progress > .01 && p.progress < .99;
  return `<div class="card${poster ? " poster" : ""}${bar ? " has-bar" : ""}" data-f data-a="prog" data-id="${esc(p.id)}" data-art="${esc(p.id)}">
    <div class="im">${p.art ? `<img src="${esc(artUrl(p))}" alt="" decoding="async"${tall ? ' class="tall"' : ""}>` : ""}<div class="shade"></div>${p.live ? '<span class="badge">LIVE</span>' : ""}<div class="cap">${esc(p.title)}</div>${bar ? `<div class="bar"><i style="width:${(p.progress * 100).toFixed(1)}%"></i></div>` : ""}</div>
    <div class="lab">${esc(p.title)}</div><div class="sub">${esc(p.sub || (p.genre ? p.genre + " · " : "") + appName(p.pkg))}</div></div>`;
}
/* hero spotlight: suggestions from the apps, rotating like Google TV */
let heroItems = [], heroIdx = 0, heroHold = false;
function pickHero(view) {
  const seen = new Set(), out = [];
  const add = p => { if (p && p.art && !seen.has(p.title) && out.length < 7) { seen.add(p.title); out.push(p); } };
  if (view === "home") { CONTENT.watchNext.slice(0, 2).forEach(add); CONTENT.channels.forEach(ch => add(ch.programs.find(p => p.art))); }
  else { const all = CONTENT.channels.flatMap(ch => ch.programs); all.filter(p => ["movie", "series"].includes(KIND(p.type))).forEach(add); all.forEach(add); }
  return out;
}
function heroHTML(p) {
  const resume = p.progress > .01 && p.progress < .99, app = appName(p.pkg);
  const kind = KIND(p.type), logo = p.title.length <= 10 && /^[A-Za-z0-9'.-]+$/.test(p.title);
  const label = p.live ? "Watch Live" : resume ? (p.sub && /^S\d/.test(p.sub) ? "Resume " + p.sub.split(" · ")[0] : "Resume") : kind === "series" ? "Go to Show" : kind === "music" ? "Listen Now" : "Watch Now";
  return `<h1 class="h-title${logo ? " logo" : ""}">${esc(p.title)}</h1>
    <div class="h-meta">${p.live ? '<span class="livepill">LIVE</span>' : ""}<span>${esc(p.genre || KIND_NAME[kind])}</span>${p.rating ? `<span class="tag">${esc(p.rating)}</span>` : ""}<span class="app-from">${esc(app)}</span></div>
    ${p.desc ? `<p class="h-desc">${esc(p.desc)}</p>` : p.sub ? `<p class="h-desc">${esc(p.sub)}</p>` : ""}
    <div class="btns"><div class="btn" data-f data-a="prog" data-id="${esc(p.id)}" data-art="${esc(p.id)}" data-first>${esc(label)}</div></div>`;
}
function clockHero() {
  return `<div class="big-clock clock">${clockText()}</div><div class="h-date" id="hdate">${dateText()}</div>
    <div class="h-meta"><span class="dotline"><i class="${ST.online ? "" : "off"}"></i>${esc(ST.name || "TV")} · ${esc(netText())}</span></div>`;
}
function heroSection(view) {
  heroItems = pickHero(view); if (heroIdx >= heroItems.length) heroIdx = 0;
  const p = heroItems[heroIdx];
  return `<section class="hero home-hero" data-sec="hero"><div class="hero-in${p ? " prog-hero" : ""}" id="heroIn">${p ? heroHTML(p) : clockHero()}</div>
    ${heroItems.length > 1 ? `<div class="dots" id="dots">${heroItems.map((x, i) => `<i${i === heroIdx ? ' class="on"' : ""}></i>`).join("")}</div>` : ""}</section>`;
}
function heroFollow(p) {
  const box = $("#v-" + curView + " #heroIn"); if (!box || box._id === p.id) return;
  box._id = p.id; box.classList.add("prog-hero"); box.innerHTML = heroHTML(p);
  box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
  const i = heroItems.findIndex(x => x.id === p.id); if (i >= 0) heroIdx = i;
  $$("#v-" + curView + " #dots i").forEach((d, j) => d.classList.toggle("on", j === i));
}
function nextHero() {
  const box = $("#v-" + curView + " #heroIn"); if (!box || heroItems.length < 2) return;
  heroIdx = (heroIdx + 1) % heroItems.length;
  box._id = heroItems[heroIdx].id; box.classList.add("prog-hero"); box.innerHTML = heroHTML(heroItems[heroIdx]);
  box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
  $$("#v-" + curView + " #dots i").forEach((d, i) => d.classList.toggle("on", i === heroIdx));
  updateBg(F.cur);
}
setInterval(() => {
  if (topLayer() || heroHold || document.visibilityState !== "visible" || (curView !== "home" && curView !== "discover")) return;
  const sc = $(".scroller", $("#v-" + curView)); if (sc && sc._y > 0) return;
  nextHero();
}, 9000);
function suggestState() {
  if (!CONTENT.supported) return "";
  if (!CONTENT.granted) return row("Suggestions", [qtile("tvdata", "", "play", "Show suggestions from your apps", "Play Next and picks from YouTube, Netflix, Prime and more", "wide")], { id: "r-sug" });
  return ""; // nothing shared (some TVs only share app rows with their own home screen): no empty box
}
let rowN = 0;
function row(title, items, o = {}) {
  const id = o.id || "r-" + (rowN++);
  return `<div class="row ${o.cls || ""}" id="${id}" data-sec="${o.sec || "row"}"${o.top ? ` data-top="${o.top}"` : ""}>${title ? `<h2>${esc(title)}${o.sub ? `<small>${esc(o.sub)}</small>` : ""}</h2>` : ""}${items.length ? `<div class="track">${items.join("")}</div>` : `<div class="empty">${esc(o.empty || "Nothing here.")}</div>`}</div>`;
}

/* ---------- views ---------- */
const RENDER = {
  home(v) {
    const all = ordered(), fav = all.slice(0, 6), rest = all.slice(6);
    const rec = (REC.pkgs || []).map(byPkg).filter(a => a && !S.hidden.includes(a.pkg));
    const chans = CONTENT.channels.filter(ch => !S.hidden.includes(ch.pkg));
    v.innerHTML = `<div class="scroller">
      ${heroSection("home")}
      ${CONTENT.watchNext.length ? row("Up Next", CONTENT.watchNext.map(p => progCard(p, { poster: false })), { id: "r-next", sec: "hold" }) : ""}
      ${row("Your Apps", fav.map(a => tile(a)), { id: "r-fav", sec: CONTENT.watchNext.length ? "row" : "hold", cls: "fav", empty: "No apps found on this TV." })}
      ${chans.slice(0, 8).map(ch => row(ch.name || "Recommended", ch.programs.map(p => progCard(p)), { id: "r-" + ch.id, sub: appName(ch.pkg) })).join("")}
      ${suggestState()}
      ${REC.granted ? (rec.length ? row("Recently used", rec.map(a => tile(a)), { id: "r-rec" }) : "")
        : row("Recently used", [qtile("usage", "", "clock", "Show the apps you used last", "Turns on usage access for Halo in your TV settings", "wide")], { id: "r-rec" })}
      ${rest.length ? row("All apps", rest.map(a => tile(a)), { id: "r-all", sub: all.length + " apps" }) : ""}
      ${INPUTS.length ? row("Inputs", INPUTS.map(inputTile), { id: "r-in" }) : ""}
      ${row("Settings", QUICK().map(q => qtile("tvset", `data-k="${q[0]}"`, q[1], q[2], q[3])), { id: "r-set", sub: "Opens your TV's own settings" })}
    </div>`;
  },
  discover(v) {
    const chans = CONTENT.channels.filter(ch => !S.hidden.includes(ch.pkg)), seen = new Set();
    const all = chans.flatMap(ch => ch.programs).filter(p => !seen.has(p.title) && seen.add(p.title));
    const by = k => all.filter(p => KIND(p.type) === k).slice(0, 30);
    const sections = [["movie", "Films for you"], ["series", "Series for you"], ["video", "Videos for you"], ["music", "Music for you"]];
    const empty = !CONTENT.watchNext.length && !all.length;
    const kindRows = sections.filter(([k]) => by(k).length).map(([k, t], i) =>
      row(t, by(k).map(p => progCard(p)), { id: "d-" + k, sec: i === 0 ? "hold" : "row", sub: "From " + [...new Set(by(k).map(p => appName(p.pkg)))].slice(0, 3).join(", ") }));
    v.innerHTML = `<div class="scroller">
      ${heroSection("discover")}
      ${kindRows.join("")}
      ${CONTENT.watchNext.length ? row("Continue watching", CONTENT.watchNext.map(p => progCard(p, { poster: false })), { id: "d-next" }) : ""}
      ${chans.map(ch => row(ch.name || "Recommended", ch.programs.map(p => progCard(p)), { id: "d-" + ch.id, sub: appName(ch.pkg) })).join("")}
      ${empty ? suggestState() || row("Discover", [], { empty: "Nothing to suggest yet." }) : ""}
    </div>`;
  },
  apps(v) {
    const all = ordered(), rows = [];
    for (let i = 0; i < all.length; i += 5) rows.push(row(i ? "" : "Apps", all.slice(i, i + 5).map(a => tile(a)), { sub: i ? "" : all.length + " apps · hold OK on an app for options", sec: i ? "row" : "hold", top: 420 }));
    if (!all.length) rows.push(row("Apps", [], { empty: "No apps to show. Check Settings › Hidden apps." }));
    v.innerHTML = `<div class="scroller" style="padding-top:200px">${rows.join("")}${S.hidden.length ? `<p class="note-line">${S.hidden.length} hidden ${S.hidden.length === 1 ? "app" : "apps"}. Show them again in Settings › Hidden apps.</p>` : ""}</div>`;
  },
  inputs(v) {
    v.innerHTML = `<div class="scroller" style="padding-top:200px">${row("Inputs", INPUTS.map(inputTile), { top: 170, empty: "This TV reports no HDMI inputs. Streaming sticks and boxes don't have any." })}</div>`;
  },
  search(v) {
    v.innerHTML = `<div class="search-wrap" data-noscroll><div class="kb"><div class="q" id="qbox"></div><div class="keys">
      ${[..."abcdefghijklmnopqrstuvwxyz1234567890"].map((k, i) => `<div class="key" data-f data-a="key" data-k="${k}"${i === 0 ? " data-first" : ""}>${k}</div>`).join("")}
      <div class="key wide" data-f data-a="key" data-k="space">Space</div><div class="key wide" data-f data-a="key" data-k="del" aria-label="Delete">${ic("del")}</div><div class="key wide" data-f data-a="key" data-k="clear">Clear</div>
      <div class="key wide" data-f data-a="voice" style="grid-column:span 6">${ic("mic")}Voice search</div></div></div><div class="results" id="results"></div></div>`;
    drawQuery(); drawResults();
  }
};
/* Each page is built once and kept. It is rebuilt only when its data changed (apps, inputs, suggestions, settings). */
let dataVer = 1;
const builtAt = {};
function build(v) { rowN = 0; RENDER[v]($("#v-" + v)); builtAt[v] = dataVer; predecode($("#v-" + v)); }
// Prepare pictures ahead, a few at a time, so the first move onto a tile is smooth too.
function predecode(root) {
  const imgs = $$("img", root); let i = 0;
  const step = () => { const end = Math.min(imgs.length, i + 6); for (; i < end; i++) if (imgs[i].decode) imgs[i].decode().catch(() => { }); if (i < imgs.length) setTimeout(step, 60); };
  setTimeout(step, 50);
}
function setView(v, o = {}) {
  if (v === "inputs" && !INPUTS.length) v = "home";
  curView = v;
  if (o.force || builtAt[v] !== dataVer) build(v);
  else if (v === "home" || v === "discover") { heroItems = pickHero(v); const box = $("#v-" + v + " #heroIn"), i = box ? heroItems.findIndex(x => x.id === box._id) : -1; heroIdx = i >= 0 ? i : 0; }
  $$(".view").forEach(x => x.classList.toggle("on", x.id === "v-" + v));
  $$(".tab").forEach(t => t.classList.toggle("sel", t.dataset.view === v));
  updateChrome();
  if (o.focus) focusDefault();
}
function refreshView() {
  dataVer++;
  const sel = F.cur && !topLayer() && F.cur.closest("#v-" + curView) ? selOf(F.cur) : null;
  build(curView);
  if (sel) { const el = $(sel, $("#v-" + curView)); if (el) focus(el); else focusDefault(); }
}
function renderNav() {
  const hasContent = CONTENT.watchNext.length || CONTENT.channels.length;
  const views = [["home", "Home"]].concat(hasContent ? [["discover", "Discover"]] : []).concat([["apps", "Apps"]]).concat(INPUTS.length ? [["inputs", "Inputs"]] : []).concat([["search", ""]]);
  $("#nav").innerHTML = `<nav class="tabs">${views.map(([v, t]) => `<div class="tab${v === curView ? " sel" : ""}${v === "search" ? " icon" : ""}" data-f data-a="tab" data-view="${v}"${v === "search" ? ' aria-label="Search"' : ""}>${v === "search" ? ic("search") : t}</div>`).join("")}
    <div class="ib" data-f data-a="cc" aria-label="Control Center">${ic("sliders")}</div><div class="ib" data-f data-a="settings" aria-label="Settings">${ic("gear")}</div></nav>
    <div class="status"><span id="netIc">${ic(ST.online ? (ST.net === "ethernet" ? "globe" : "wifi") : "wifioff")}</span><span class="clock">${clockText()}</span></div>`;
}

/* ---------- search ---------- */
let Q = "";
function drawQuery() {
  const b = $("#qbox"); if (!b) return;
  b.innerHTML = ic("search") + (Q ? `<span>${esc(Q)}</span><span class="caret"></span>` : `<span class="caret" style="margin-left:0"></span><span class="ph">Search your apps</span>`);
}
function drawResults() {
  const box = $("#results"); if (!box) return;
  const q = Q.trim().toLowerCase();
  const hits = q ? APPS.filter(a => a.label.toLowerCase().includes(q) || a.pkg.toLowerCase().includes(q)) : [];
  const actions = q ? [qtile("store", "", "store", "Search Google Play", "for “" + Q.trim() + "”")].concat(H.hasYoutube() ? [qtile("yt", "", "play", "Search YouTube", "for “" + Q.trim() + "”")] : []) : [];
  box.innerHTML = q
    ? (hits.length ? `<h2>${hits.length} ${hits.length === 1 ? "app" : "apps"} on this TV</h2><div class="rgrid" style="margin-bottom:44px">${hits.slice(0, 6).map(a => tile(a)).join("")}</div>` : `<h2>No app called “${esc(Q.trim())}” on this TV</h2>`) +
      `<h2>Search elsewhere</h2><div class="rgrid">${actions.join("")}</div>`
    : `<h2>Type to find an app</h2><div class="empty">Search looks through every app on this TV. To search films and shows, use Voice search or search inside an app.</div>`;
}
function typeKey(k) { if (k === "del") Q = Q.slice(0, -1); else if (k === "clear") Q = ""; else if (k === "space") Q += " "; else if (Q.length < 40) Q += k; drawQuery(); drawResults(); }

/* ---------- actions ---------- */
function openTV(key) {
  const r = H.settings(key);
  if (r === "fallback") toast("gear", "Opened Settings", "This TV has no direct page for that, so the main settings opened");
  else if (r !== "ok") toast("x", "Couldn't open settings", "Try the Settings button on your remote");
}
const ACT = {
  tab: el => setView(el.dataset.view),
  app: el => { if (!H.launch(el.dataset.pkg)) toast("x", "Couldn't open that app", "It may have just been removed"); },
  cc: () => openCC(),
  settings: () => { if ($("#cc").classList.contains("on")) closeLayer($("#cc")); openSettings(); },
  tvset: el => openTV(el.dataset.k),
  input: el => { if (!H.openInput(el.dataset.id)) toast("input", "Couldn't switch input", "Use the Input button on your remote"); },
  prog: el => { if (!H.openProgram(el.dataset.id)) toast("x", "Couldn't open that", "The app may have removed it. Try opening the app"); },
  tvdata: () => { H.askTvData(); toast("play", "Choose Allow on the next screen", "Halo then shows Play Next and your apps' picks"); },
  usage: () => { const r = H.settings("usage"); if (r === "fallback") toast("clock", "This TV has no Usage access page", "Running install-halo.ps1 from the PC turns it on for Halo"); else if (r !== "ok") toast("x", "Couldn't open settings", ""); },
  key: el => typeKey(el.dataset.k),
  voice: () => { if (!H.voice()) toast("mic", "Voice search isn't available", "Press the microphone button on your remote instead"); },
  store: () => { if (!H.storeSearch(Q.trim())) toast("x", "Google Play isn't on this TV", ""); },
  yt: () => { if (!H.youtubeSearch(Q.trim())) toast("x", "Couldn't open YouTube", ""); },
  dlg: el => { const fn = $("#dialog")._ok; closeLayer($("#dialog")); if (el.dataset.ok && fn) fn(); },
  opt: el => { const pkg = $("#dialog")._pkg, what = el.dataset.k; closeLayer($("#dialog")); appOption(pkg, what); }
};
function press(el) {
  if (!el) return focusDefault();
  el.classList.remove("press"); void el.offsetWidth; el.classList.add("press"); clack();
  const a = el.dataset.a; if (a && ACT[a]) ACT[a](el);
}

/* ---------- app options and moving ---------- */
function openOptions(pkg) {
  const a = byPkg(pkg); if (!a) return;
  const d = $("#dialog"); d._pkg = pkg;
  const b = (k, icon, label, cls = "") => `<div class="btn ${cls}" data-f data-a="opt" data-k="${k}"${k === "open" ? " data-first" : ""}>${ic(icon)}${label}</div>`;
  d.innerHTML = `<div class="dlg"><div class="opt-head"><div class="tile ${a.banner ? "ban" : "ico"}"><img src="icon/${encodeURIComponent(pkg)}?v=${ver}" alt=""><span class="ini">${esc(a.label[0] || "?")}</span></div><div><h3>${esc(a.label)}</h3><span>${esc(pkg)}</span></div></div>
    <div class="btns">${b("open", "play", "Open")}${b("move", "move", "Move")}${b("hide", "eye", "Hide from Halo")}${b("info", "info", "App info (TV settings)")}${a.system ? "" : b("uninstall", "trash", "Uninstall", "danger")}${b("cancel", "x", "Cancel")}</div></div>`;
  openLayer(d);
}
function appOption(pkg, what) {
  const a = byPkg(pkg); if (!a) return;
  if (what === "open") return H.launch(pkg);
  if (what === "move") { S.moving = pkg; refreshView(); const el = movingEl(); if (el) focus(el); return toast("move", "Moving " + a.label, "Use the arrows, then press OK"); }
  if (what === "hide") { S.hidden.push(pkg); save(); refreshView(); return toast("eye", a.label + " hidden", "It's still installed. Show it again in Settings › Hidden apps"); }
  if (what === "info") return H.appInfo(pkg);
  if (what === "uninstall") return H.uninstall(pkg);
}
const movingEl = () => $(`#r-fav [data-pkg="${CSS.escape(S.moving)}"], #r-all [data-pkg="${CSS.escape(S.moving)}"]`, $("#v-" + curView)) || $(`[data-pkg="${CSS.escape(S.moving)}"]`, $("#v-" + curView));
function moveStep(dir) {
  const list = ordered().map(a => a.pkg), i = list.indexOf(S.moving); if (i < 0) return endMove();
  if (curView !== "apps" && (dir === "up" || dir === "down")) return;
  const j = Math.max(0, Math.min(list.length - 1, i + ({ left: -1, right: 1, up: -5, down: 5 }[dir])));
  if (j === i) return F.cur && bump(F.cur, dir);
  list.splice(i, 1); list.splice(j, 0, S.moving); S.order = list; save();
  refreshView(); const el = movingEl(); if (el) focus(el); tick();
}
function endMove() { const p = S.moving; S.moving = null; refreshView(); const el = $(`[data-pkg="${CSS.escape(p)}"]`, $("#v-" + curView)); if (el) focus(el); toast("check", "Order saved", ""); }

/* ---------- control center ---------- */
const LR = {
  vol: (el, d) => { const max = ST.maxVolume || 15; ST.volume = Math.max(0, Math.min(max, (ST.volume || 0) + d)); H.setVolume(ST.volume); ST.muted = false; drawBar(el, ST.volume, max); tick(); },
  set: () => { }
};
function drawBar(el, v, max) { $("i", el).style.width = v / max * 100 + "%"; $("b", el).textContent = v; }
function openCC() {
  ST = J(H.status(), ST);
  const c = $("#cc"), max = ST.maxVolume || 15;
  const t = (a, icon, name, sub, on) => `<div class="cct${on ? " on" : ""}" data-f data-a="${a}">${ic(icon)}<div><b>${esc(name)}</b><br><span>${esc(sub)}</span></div></div>`;
  c.innerHTML = `<div class="ccp"><div class="cc-head"><div class="av" style="background:#e8e8ed;color:#1c1c1e">${ic("tv")}</div><div><b>${esc(ST.name || "TV")}</b><span>${esc(ST.model || "")}</span></div><span class="clock">${clockText()}</span></div>
    <div class="cc-grid">${t("ccnet", ST.online ? "wifi" : "wifioff", "Network", ST.online ? (ST.net === "ethernet" ? "Ethernet" : "Wi-Fi connected") : "Offline", ST.online)}${t("ccbt", "bt", "Bluetooth", "Remotes & accessories", false)}
    ${t("ccmute", ST.muted ? "mute" : "sound", "Mute", ST.muted ? "On" : "Off", ST.muted)}${t("ccdisp", "tv", "Display & Sound", "Picture and audio", false)}</div>
    <div class="ccs" data-f data-lr="vol" aria-label="Volume">${ic("sound")}<div class="sbar"><i style="width:${(ST.volume || 0) / max * 100}%"></i></div><b>${ST.volume || 0}</b></div>
    <div class="cc-row"><div class="ib" data-f data-a="ccsaver">${ic("photo")}Screen saver</div><div class="ib" data-f data-a="ccall">${ic("gear")}All settings</div></div>
    <div class="cc-row"><div class="ib" data-f data-a="settings">${ic("sliders")}Halo settings</div>${(H.stockState ? H.stockState() : "missing") !== "missing" ? `<div class="ib" data-f data-a="ccstock">${ic("home")}Google TV home</div>` : ""}</div>
    <div class="cc-hint">Use ← → on the volume bar. Press Back to close.</div></div>`;
  openLayer(c, $(".cct", c));
}
Object.assign(ACT, {
  ccnet: () => openTV("network"), ccbt: () => openTV("bluetooth"), ccdisp: () => openTV("display"), ccall: () => openTV("main"),
  ccmute: () => { H.toggleMute(); setTimeout(() => { const c = $("#cc"), ret = c._ret; stack.splice(stack.indexOf(c), 1); openCC(); c._ret = ret; focus($('[data-a="ccmute"]', c)); }, 120); },
  ccsaver: () => { closeLayer($("#cc")); if (!H.dream()) toast("photo", "Couldn't start the screen saver", "Choose it in Settings › Screen saver"); },
  ccstock: () => {
    const st = H.stockState ? H.stockState() : "enabled";
    if (st === "disabled") { H.restoreStock(); toast("home", "Choose Enable on the next screen", "That turns the Google TV home back on"); }
    else if (!H.stockHome()) toast("home", "Google TV home isn't available", "Run restore-tv from the PC to bring it back");
  }
});

/* ---------- dialog ---------- */
function askDialog(title, body, ok, fn) {
  const d = $("#dialog"); d._ok = fn;
  d.innerHTML = `<div class="dlg"><h3>${esc(title)}</h3><p>${esc(body)}</p><div class="btns"><div class="btn" data-f data-a="dlg" data-ok="1">${esc(ok)}</div><div class="btn" data-f data-a="dlg" data-first>Cancel</div></div></div>`;
  openLayer(d);
}

/* ---------- toasts ---------- */
function toast(icon, title, body) {
  const t = document.createElement("div"); t.className = "toast";
  t.innerHTML = `<div class="ti">${ic(icon)}</div><div><b>${esc(title)}</b>${body ? `<span>${esc(body)}</span>` : ""}</div>`;
  const box = $("#toasts"); box.prepend(t); while (box.children.length > 3) box.lastChild.remove();
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 400); }, 3400);
}

/* ---------- settings ---------- */
const X = (label, key, icon) => ({ type: "ext", label, key, icon });
const T = (label, key, desc) => ({ type: "toggle", label, key, desc });
const C = (label, key, options, desc) => ({ type: "choice", label, key, options, desc });
const L = (label, page, value, icon) => ({ type: "link", label, page, value, icon });
const I = (label, value) => ({ type: "info", label, value });
const A = (label, run, o) => Object.assign({ type: "action", label, run }, o || {});
const HD = label => ({ type: "header", label });
const PAGES = {
  root: () => ({
    title: "Settings", icon: "gear", desc: "TV settings open your TV's own Google settings, so nothing is missing. Halo settings change only this home screen.",
    items: [HD("TV settings"),
      X("Network & Internet", "network", "wifi"), X("Remotes & Accessories", "bluetooth", "remote"), X("Display & Sound", "display", "tv"), X("Sound", "sound", "sound"),
      X("Apps", "apps", "apps"), X("Accounts & profiles", "accounts", "user"), X("Privacy", "privacy", "lock"), X("Security & restrictions", "security", "lock"),
      X("Accessibility", "a11y", "a11y"), X("Captions", "captions", "cc"), X("Date & time", "date", "clock"), X("Language", "language", "globe"),
      X("Keyboard", "keyboard", "keyboard"), X("Storage", "storage", "storage"), Object.assign(X("Screen saver", "dream", "photo"), { desc: "Your TV's own screen saver, for example Aerial Views. Halo leaves it running as normal." }), X("About this TV", "about", "info"),
      X("Developer options", "dev", "code"), X("All settings", "main", "gear"),
      HD("Halo home screen"),
      C("Wallpaper", "wall", [["auto", "Change automatically"]].concat(WALLS), "Change automatically goes through all the pictures. Suggestions from your apps show their own picture when you select them."),
      C("Change wallpaper", "wallEvery", ["5 minutes", "15 minutes", "30 minutes", "1 hour", "Every day", "Never"]),
      A("Next wallpaper now", () => { if (S.wall !== "auto") { S.wall = "auto"; } rotateWall(true); setBg(wallUrl()); renderSettings(null, setStack[setStack.length - 1].i); toast("photo", "Wallpaper changed", REAL_WALLS[S.wallIdx][1]); }, { value: () => S.wall === "auto" ? REAL_WALLS[(S.wallIdx || 0) % REAL_WALLS.length][1] : "" }),
      A("Suggestions from apps", () => ACT.tvdata(), { value: () => !CONTENT.supported ? "Needs Android 8" : !CONTENT.granted ? "Turn on" : (CONTENT.watchNext.length || CONTENT.channels.length) ? "On" : "None shared on this TV", desc: "Play Next and the picks that YouTube, Netflix, Prime and other apps share with your home screen." }),
      C("Clock", "clock", ["System", "12-hour", "24-hour"]),
      C("Visual effects", "glass", [["Auto", "Auto (picks fast mode on low-power TVs)"], ["On", "Full: frosted glass and shadows"], ["Off", "Fast: smoothest on any TV"]], "Fast mode keeps the same look without frosted glass and big shadows, which slow down TVs with little memory."),
      C("Animation speed", "anim", ["Off", "0.5x", "1x", "1.5x"]),
      T("Show phone apps", "showPhone", "Also list apps made for phones. Some of them need a mouse or touch."), T("Navigation sounds", "sounds"),
      L("Hidden apps", "hidden", () => S.hidden.length + " hidden"),
      A("Reset app order", () => askDialog("Reset app order?", "Apps go back to the default order. Hidden apps stay hidden.", "Reset", () => { S.order = []; save(); refreshView(); toast("check", "App order reset", ""); })),
      A("Recently used apps", () => ACT.usage(), { value: () => ST.usage ? "On" : "Turn on" })]
      .concat([A("Google TV home", () => ACT.ccstock(), { value: () => ({ enabled: "On · open it", disabled: "Off · turn back on", missing: "Not on this TV" })[H.stockState ? H.stockState() : "enabled"], desc: "Your TV's original home screen. Halo never deletes it. If the installer switched it off, this turns it back on." })])
      .concat([L("About Halo", "about", () => "Version " + (ST.version || "1.0.0"))])
  }),
  hidden: () => ({
    title: "Hidden apps", icon: "eye", desc: "Hidden apps stay installed and keep working. Turn one on to show it on Halo again.",
    items: APPS.slice().sort((a, b) => a.label.localeCompare(b.label)).map(a => T(a.label, "hid:" + a.pkg))
  }),
  about: () => ({
    title: "About Halo", icon: "info", desc: "Halo is a home screen. It runs on top of Android TV and never changes the system.",
    items: [I("Version", ST.version || "1.0.0"), I("TV name", ST.name), I("Model", ST.model), I("Android TV OS", ST.android), I("Time zone (from the TV)", () => CLK.zone || "—"),
      I("Storage free", ST.storageTotal ? gb(ST.storageFree) + " of " + gb(ST.storageTotal) : "—"), I("Memory free", ST.ramTotal ? gb(ST.ramFree) + " of " + gb(ST.ramTotal) : "—"),
      HD("Privacy and security"), I("Internet use", "Poster pictures only"), I("Data collected", "None"), I("Where your choices are kept", "On this TV only"),
      { type: "note", text: "Halo uses the internet only to download the poster pictures your apps list for their suggestions. The Halo screen itself is blocked from the internet and sends nothing anywhere. It reads the list of installed apps, your HDMI inputs, the volume and, if you allow it, which apps you used recently and the suggestions apps share. Uninstall Halo and your TV goes straight back to its normal home screen." },
      HD("Wallpaper credits (Wikimedia Commons)")].concat(CREDITS.map(c => I(c[0], c[2]))).concat([{ type: "note", text: CREDITS.map(c => c[0] + " by " + c[1]).join(" · ") }])
  })
};
let setStack = [], curItems = [], curPage = null;
const CHOICES = {}, val = v => typeof v === "function" ? v() : v;
const optPair = o => Array.isArray(o) ? o : [o, o];
const tget = k => k.startsWith("hid:") ? !S.hidden.includes(k.slice(4)) : !!S[k];
function pageObj(id) {
  if (id.startsWith("choice:")) { const c = CHOICES[id.slice(7)]; return { title: c.label, icon: c.icon, desc: c.desc || "Choose one.", items: [{ type: "radio", key: c.key, options: c.options }] }; }
  return PAGES[id]();
}
function openSettings(page) {
  const el = $("#settings"), ret = el.classList.contains("on") ? el._ret : F.cur;
  ST = J(H.status(), ST); setStack = [{ id: page || "root", i: 0 }]; renderSettings("slide");
  openLayer(el, $("#settings .sr[data-f]")); el._ret = ret;
}
function backSettings() { if (setStack.length > 1) { setStack.pop(); renderSettings("slideback", setStack[setStack.length - 1].i); } else closeLayer($("#settings")); }
$("#settings").back = backSettings;
function renderSettings(anim, focusI) {
  const top = setStack[setStack.length - 1], pg = pageObj(top.id), el = $("#settings");
  curPage = pg; curItems = [];
  const crumbs = setStack.slice(0, -1).map(s => pageObj(s.id).title).join("  ›  ");
  const rows = pg.items.map(it => {
    if (it.type === "header") return `<div class="sh">${esc(it.label)}</div>`;
    if (it.type === "note") return `<div class="note">${esc(it.text)}</div>`;
    if (it.type === "radio") return it.options.map(o => { const [v, lab] = optPair(o), i = curItems.push(Object.assign({}, it, { opt: v })) - 1; return `<div class="sr" data-f data-i="${i}"><span>${esc(lab)}</span><span class="v">${S[it.key] === v ? `<span class="chk">${ic("check")}</span>` : ""}</span></div>`; }).join("");
    const i = curItems.push(it) - 1; let v = "";
    if (it.type === "ext") v = `<span class="ext">TV settings</span>${ic("ext")}`;
    if (it.type === "link") v = (it.value ? esc(val(it.value)) : "") + ic("chev");
    if (it.type === "toggle") v = `<span class="sw${tget(it.key) ? " on" : ""}"></span>`;
    if (it.type === "choice") { CHOICES[it.key] = Object.assign({ icon: pg.icon }, it); const cur = it.options.map(optPair).find(p => p[0] === S[it.key]); v = esc(cur ? cur[1] : S[it.key]) + ic("chev"); }
    if (it.type === "info") v = esc(val(it.value));
    if (it.type === "action") v = it.value ? esc(val(it.value)) : "";
    return `<div class="sr" data-f data-i="${i}">${it.icon ? ic(it.icon) : ""}<span>${esc(it.label)}</span><span class="v">${v}</span></div>`;
  }).join("");
  const iconChanged = el._icon !== pg.icon; el._icon = pg.icon;
  el.innerHTML = `<div class="s-left"><div class="s-icon${iconChanged ? " pop" : ""}">${ic(pg.icon)}</div><div class="s-desc" id="sdesc">${esc(pg.desc || "")}</div></div>
    <div class="s-right"><div class="crumb">${esc(crumbs)}</div><h1>${esc(pg.title)}</h1><div class="vlist"><div class="vin${anim ? " " + anim : ""}">${rows}</div></div></div>`;
  const target = $(`.sr[data-i="${focusI || 0}"]`, el) || $(".sr[data-f]", el);
  F.cur = null; if (target) focus(target);
}
function settingsDesc(el) { const it = curItems[+el.dataset.i], d = $("#sdesc"); if (d && curPage) d.textContent = (it && it.desc) || curPage.desc || ""; setStack[setStack.length - 1].i = +el.dataset.i || 0; }
function settingsPress(el) {
  const i = +el.dataset.i, it = curItems[i]; if (!it) return;
  if (it.type === "ext") openTV(it.key);
  else if (it.type === "link") { setStack.push({ id: it.page, i: 0 }); renderSettings("slide"); }
  else if (it.type === "choice") { setStack.push({ id: "choice:" + it.key, i: 0 }); renderSettings("slide", Math.max(0, it.options.map(o => optPair(o)[0]).indexOf(S[it.key]))); }
  else if (it.type === "toggle") {
    if (it.key.startsWith("hid:")) { const p = it.key.slice(4), j = S.hidden.indexOf(p); if (j >= 0) S.hidden.splice(j, 1); else S.hidden.push(p); }
    else S[it.key] = !S[it.key];
    save(); applyLook(); refreshView(); renderSettings(null, i);
  }
  else if (it.type === "radio") { S[it.key] = it.opt; save(); applyLook(); renderNav(); refreshView(); renderSettings(null, i); setTimeout(backSettings, 180); }
  else if (it.type === "action") it.run(el);
}

/* ---------- look ---------- */
function applyLook() {
  const fast = S.glass === "Off" || (S.glass === "Auto" && (S.glassOk === false || (ST.ramTotal && ST.ramTotal < 2.5e9)));
  if (tv.classList.contains("lite") !== fast) bgCur = undefined; // redraw the background the other way
  tv.classList.toggle("solid", fast); tv.classList.toggle("lite", fast);
  document.documentElement.style.setProperty("--spd", { Off: 0, "0.5x": .5, "1x": 1, "1.5x": 1.5 }[S.anim] ?? 1);
  updateBg(F.cur);
  $$(".clock").forEach(c => c.textContent = clockText());
}
function measureGlass() {
  if (S.glass !== "Auto") return;
  let n = 0; const t0 = performance.now();
  const f = t => { n++; if (t - t0 < 2500) requestAnimationFrame(f); else { const ok = n * 1000 / (t - t0) >= 48; if (ok !== S.glassOk) { S.glassOk = ok; save(); applyLook(); } } };
  requestAnimationFrame(f);
}

/* ---------- clock and wallpaper timer (the screen saver is the TV's own, e.g. Aerial Views) ---------- */
setInterval(() => {
  if (Math.floor(Date.now() / 60000) !== clkMinute) loadClock(); // re-read the TV clock every minute (date, daylight saving)
  $$(".clock").forEach(c => { const t = clockText(); if (c.textContent !== t) c.textContent = t; });
  const d = $("#hdate"); if (d && d.textContent !== dateText()) d.textContent = dateText();
  if (rotateWall() && !topLayer()) updateBg(F.cur);
}, 1000);

/* ---------- input ---------- */
function back() {
  const top = topLayer();
  if (top) { if (top.back) top.back(); else closeLayer(top); return; }
  if (F.cur && !F.cur.closest("#nav")) { const sc = $(".scroller", $("#v-" + curView)); if (sc && sc._y > 0 && (curView === "home" || curView === "discover")) { focus($(".row[data-sec=hold] [data-f]", $("#v-" + curView)) || $(".tab.sel")); return; } focus($(".tab.sel") || $(".tab")); return; }
  if (curView !== "home") { setView("home"); focus($('.tab[data-view="home"]')); }
}
function goHome() { if (S.moving) S.moving = null; closeAll(); setView("home", { force: true }); focus($("#r-next [data-f]") || $("#r-fav [data-f]") || $(".tab.sel")); }
function handle(k) {
  if (k === "Enter") {
    if (S.moving) return endMove();
    if (F.cur && F.cur.closest("#settings") && F.cur.dataset.i != null) { clack(); return settingsPress(F.cur); }
    return press(F.cur);
  }
  if (k === "Back") { if (S.moving) return endMove(); tick(); return back(); }
  if (k === "LongPress" || k === "Menu") {
    if (S.moving) return endMove();
    if (F.cur && F.cur.dataset.pkg && !topLayer()) return openOptions(F.cur.dataset.pkg);
    if (k === "Menu") { if (topLayer() === $("#cc")) return closeLayer(); if (!topLayer()) return openCC(); }
    return;
  }
  if (k === "Home") return goHome();
  if (k === "Search") { closeAll(); setView("search"); return focusDefault(); }
}
window.haloKey = handle;
window.haloEvent = e => {
  if (e === "apps") { load(); renderNav(); if (S.moving && !byPkg(S.moving)) S.moving = null; refreshView(); if (topLayer() === $("#settings")) renderSettings(null, setStack[setStack.length - 1].i); }
  else if (e === "resume") {
    loadClock(); ST = J(H.status(), ST); REC = J(H.recents(), REC); INPUTS = sortInputs(J(H.inputs(), INPUTS)); loadContent(); rotateWall();
    renderNav(); if (!topLayer()) refreshView();
    if (topLayer() === $("#settings")) renderSettings(null, setStack[setStack.length - 1].i);
  }
  else if (e === "time") { loadClock(); $$(".clock").forEach(c => c.textContent = clockText()); const d = $("#hdate"); if (d) d.textContent = dateText(); }
  else if (e === "net") { ST = J(H.status(), ST); const n = $("#netIc"); if (n) n.innerHTML = ic(ST.online ? (ST.net === "ethernet" ? "globe" : "wifi") : "wifioff"); }
  else if (e === "content") { loadContent(); renderNav(); if (curView === "discover" && !CONTENT.watchNext.length && !CONTENT.channels.length) setView("home"); if (!topLayer()) refreshView(); else if (topLayer() === $("#settings")) renderSettings(null, setStack[setStack.length - 1].i); }
  else if (e === "failed") toast("x", "Couldn't open that", "The app may have been removed or is blocked");
};
addEventListener("keydown", e => {
  const k = e.key, dir = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }[k];
  if (dir) { e.preventDefault(); if (S.moving) return moveStep(dir); return move(dir); }
  if (!topLayer() && curView === "search") {
    if (k.length === 1 && /[a-z0-9 ]/i.test(k)) { e.preventDefault(); return typeKey(k === " " ? "space" : k.toLowerCase()); }
    if (k === "Backspace" && Q) { e.preventDefault(); return typeKey("del"); }
  }
  // These keys reach the page only in a desktop preview; on the TV the app sends them through haloKey.
  if (k === "Enter") { e.preventDefault(); return handle("Enter"); }
  if (k === "Escape" || k === "Backspace") { e.preventDefault(); return handle("Back"); }
  if (k === "ContextMenu" || (PREVIEW && (k === "m" || k === "o"))) { e.preventDefault(); return handle("Menu"); }
  if (PREVIEW && (k === "h" || k === "Home")) { e.preventDefault(); return handle("Home"); }
});
tv.addEventListener("mousemove", e => { const el = e.target.closest("[data-f]"); if (el && el !== F.cur && inRoots(el)) focus(el, { reveal: false, mouse: true }); });
tv.addEventListener("click", e => {
  const el = e.target.closest("[data-f]"); if (!el || !inRoots(el)) return;
  focus(el); handle("Enter");
});
tv.addEventListener("contextmenu", e => { e.preventDefault(); handle(F.cur && F.cur.dataset.pkg ? "Menu" : "Back"); });
let wheelT = 0;
tv.addEventListener("wheel", e => { e.preventDefault(); const now = Date.now(); if (now - wheelT < 170) return; wheelT = now; move(Math.abs(e.deltaX) > Math.abs(e.deltaY) ? (e.deltaX > 0 ? "right" : "left") : (e.deltaY > 0 ? "down" : "up")); }, { passive: false });
document.addEventListener("error", e => {
  const t = e.target; if (!t || t.tagName !== "IMG" || !t.parentNode) return;
  if (t.parentNode.classList.contains("tile")) t.parentNode.classList.add("noimg");
  t.remove(); // a suggestion without its picture shows its title instead
}, true);

/* ---------- start ---------- */
load(); renderNav(); applyLook(); build("home"); updateChrome();
// build the other pages while the TV is idle, so the first tab switch is instant
setTimeout(() => { if (curView !== "apps" && builtAt.apps !== dataVer) build("apps"); }, 1500);
rotateWall(); focus($("#r-next [data-f]") || $("#r-fav [data-f]") || $(".tab.sel")); updateBg(F.cur);
measureGlass();
setTimeout(() => { if (!topLayer()) { if (F.cur && document.contains(F.cur)) F.cur.classList.add("f"); else focusDefault(); } }, 800); // make sure a tile shows as selected after start
requestAnimationFrame(() => requestAnimationFrame(() => { try { H.ready && H.ready(); } catch (e) { } }));
if (PREVIEW) tv.insertAdjacentHTML("beforeend", '<div class="preview-flag">Halo for Android TV · demo with sample shows · use the arrow keys, Enter and Esc · photos: Wikimedia Commons (credits in Settings › About Halo)</div>');
const deep = PREVIEW && location.hash.slice(1);
if (deep === "settings") openSettings(); else if (deep === "apps") { setView("apps"); focusDefault(); } else if (deep === "cc") openCC(); else if (deep === "search") { setView("search"); Q = "net"; drawQuery(); drawResults(); focusDefault(); } else if (deep === "options") openOptions("com.netflix.ninja"); else if (deep === "down") { move("down"); move("down"); } else if (deep === "discover") { setView("discover"); focusDefault(); } else if (deep === "next") { move("down"); }
