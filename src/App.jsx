import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft, ChevronRight, Sparkles, NotebookPen, Check, Lock
} from "lucide-react";
import { APP_TITLE, APP_SUBTITLE, PARTS, AFFIRMATIONS, BONUS_QUESTIONS, ENCOURAGEMENTS, CLOSING } from "./content.js";

/* ---------------------------------------------------------------
   ALMACENAMIENTO LOCAL (por navegador/dispositivo — sin backend)
--------------------------------------------------------------- */
const STORAGE_PREFIX = "etl:"; // "encuentra tu lugar"

const storage = {
  async get(key) {
    try {
      const v = localStorage.getItem(STORAGE_PREFIX + key);
      return v === null ? null : { key, value: v };
    } catch (e) {
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, value);
      return { key, value };
    } catch (e) {
      return null;
    }
  },
};

/* ---------------------------------------------------------------
   TOKENS
--------------------------------------------------------------- */
const TONES = {
  moss: { accent: "#F2795A", accentSoft: "#FDE3D9" },   // Parte I — coral cálido
  ochre: { accent: "#E8A93D", accentSoft: "#FBEBCC" },  // Parte II — dorado
  rose: { accent: "#6E9B6E", accentSoft: "#DEEEDC" },   // Parte III — verde salvia
};

/* ---------------------------------------------------------------
   HOOK DE RESPUESTA (con autoguardado)
--------------------------------------------------------------- */
function useAnswer(key) {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await storage.get(key);
      if (!cancelled) setValue(res ? res.value : "");
    })();
    return () => { cancelled = true; };
  }, [key]);

  const onChange = useCallback((text) => {
    setValue(text);
    setSaved(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      await storage.set(key, text);
      setSaved(true);
    }, 400);
  }, [key]);

  return [value, onChange, saved];
}

/* ---------------------------------------------------------------
   REFLEXIÓN CON IA (vía backend propio, /api/reflect)
--------------------------------------------------------------- */
async function requestReflection(question, text) {
  const response = await fetch("/api/reflect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, text }),
  });
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error("La respuesta del servidor no se pudo leer.");
  }
  if (!response.ok) {
    throw new Error(data?.error || `Error HTTP ${response.status}`);
  }
  if (!data.reflection) {
    throw new Error("La respuesta llegó vacía.");
  }
  return data.reflection;
}

const REFLECTIONS_ENABLED = import.meta.env.VITE_ENABLE_REFLECTIONS === "true";

function PromptField({ storageKey, question, placeholder }) {
  const [value, onChange, saved] = useAnswer(storageKey);
  const [reflection, setReflection] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const getReflection = async () => {
    if (!value || value.trim().length < 6 || cooldown) return;
    setStatus("loading");
    setReflection("");
    setErrorDetail("");
    try {
      const text = await requestReflection(question, value.trim());
      setReflection(text);
      setStatus("idle");
    } catch (e) {
      setStatus("error");
      const raw = e && e.message ? e.message : "";
      if (/rate limit/i.test(raw)) {
        setErrorDetail("estás pidiendo reflexiones muy rápido — espera un minuto");
        setCooldown(true);
        setTimeout(() => setCooldown(false), 20000);
      } else {
        setErrorDetail(raw || "error desconocido");
      }
    }
  };

  return (
    <div className="promptField">
      <textarea
        className="promptTextarea"
        value={value}
        placeholder={placeholder || "Escribe aquí…"}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
      <span className={"savedTag" + (saved ? " on" : "")}>{saved ? "Guardado" : "Guardando…"}</span>
      {REFLECTIONS_ENABLED && (
        <>
          <div className="reflectionRow">
            <button
              className="reflectionBtn"
              type="button"
              onClick={getReflection}
              disabled={status === "loading" || cooldown || !value || value.trim().length < 6}
            >
              <Sparkles size={13} />
              {status === "loading" ? "Pensando…" : cooldown ? "Espera un momento…" : "Recibir una reflexión"}
            </button>
          </div>
          {status === "error" && (
            <span className="reflectionError">No se pudo generar la reflexión: {errorDetail}. Intenta de nuevo.</span>
          )}
          {reflection && (
            <div className="reflectionCard"><p>{reflection}</p></div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   CHECKLIST CON RESUMEN
--------------------------------------------------------------- */
function checklistMessage(count, total) {
  const ratio = count / total;
  if (count === 0) return "Todavía no marcaste ninguna. También es información: quizás esta parte no es la que más resuena contigo ahora mismo.";
  if (ratio <= 0.35) return "Reconoces alguna de estas señales. No es un diagnóstico — es una invitación suave a seguir observando.";
  if (ratio <= 0.7) return "Reconoces varias de estas señales en tu historia. Puede valer la pena que dediques tiempo a los ejercicios de esta parte.";
  return "Reconoces la mayoría de estas señales. Esto no define quién eres, pero sí puede ser un buen punto de partida para profundizar con calma en los ejercicios de esta parte.";
}

function ChecklistBlock({ chapterId, items }) {
  const [checked, setChecked] = useState(() => items.map(() => false));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results = await Promise.all(items.map(async (_, i) => {
        const res = await storage.get(`chk:${chapterId}:${i}`);
        return res ? res.value === "yes" : false;
      }));
      if (!cancelled) { setChecked(results); setLoaded(true); }
    })();
    return () => { cancelled = true; };
  }, [chapterId]);

  const toggle = async (i) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
    await storage.set(`chk:${chapterId}:${i}`, next[i] ? "yes" : "");
  };

  const count = checked.filter(Boolean).length;

  return (
    <div className="checklistBlock">
      {items.map((label, i) => (
        <button key={i} className={"checkItem" + (checked[i] ? " checked" : "")} onClick={() => toggle(i)} type="button">
          <span className="checkBox">{checked[i] && <Check size={13} strokeWidth={3} />}</span>
          <span>{label}</span>
        </button>
      ))}
      {loaded && count > 0 && (
        <div className="checklistSummary">
          <span className="checklistCount">{count} de {items.length}</span>
          <p>{checklistMessage(count, items.length)}</p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   PANTALLAS
--------------------------------------------------------------- */
/* ---------------------------------------------------------------
   ILUSTRACIÓN: árbol con raíces
--------------------------------------------------------------- */
function TreeIllustration() {
  return (
    <svg viewBox="0 0 240 220" width="188" height="172" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="canopyShade" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trunkShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6E4A2E" />
          <stop offset="45%" stopColor="#8A5A38" />
          <stop offset="100%" stopColor="#A16F45" />
        </linearGradient>
      </defs>

      {/* suelo */}
      <ellipse cx="120" cy="178" rx="92" ry="9" fill="#E9C98F" opacity="0.5" />

      {/* raíces: pares que se bifurcan, con distinto grosor */}
      <g stroke="#8A5A38" strokeLinecap="round" fill="none">
        <path d="M112 150 C 96 160, 90 162, 74 182" strokeWidth="6" />
        <path d="M84 176 C 78 180, 72 181, 64 190" strokeWidth="3" />
        <path d="M112 150 C 102 164, 100 172, 94 194" strokeWidth="5" />
        <path d="M128 150 C 138 164, 140 172, 146 194" strokeWidth="5" />
        <path d="M128 150 C 144 160, 150 162, 166 182" strokeWidth="6" />
        <path d="M156 176 C 162 180, 168 181, 176 190" strokeWidth="3" />
        <path d="M120 152 C 118 168, 122 180, 118 198" strokeWidth="4" opacity="0.85" />
      </g>

      {/* tronco, con una leve curva y ramas */}
      <path
        d="M108 154 C 104 130, 105 108, 110 88 C 106 70, 108 56, 116 42
           C 122 56, 122 70, 120 88 C 126 108, 128 130, 132 154 Z"
        fill="url(#trunkShade)"
      />
      <path d="M112 100 C 96 92, 84 90, 70 78" stroke="#8A5A38" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M126 96 C 142 86, 152 84, 168 70" stroke="#8A5A38" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* textura de corteza */}
      <path d="M114 140 C 113 120, 114 100, 116 84" stroke="#6E4A2E" strokeWidth="1.5" opacity="0.5" fill="none" />
      <path d="M122 140 C 122 120, 121 100, 118 84" stroke="#6E4A2E" strokeWidth="1.5" opacity="0.4" fill="none" />

      {/* copa: racimo de follaje en capas para dar volumen */}
      <g opacity="0.95">
        <circle cx="70" cy="72" r="19" fill="#6E9B6E" />
        <circle cx="168" cy="64" r="18" fill="#6E9B6E" />
        <circle cx="116" cy="36" r="26" fill="#F2795A" />
        <circle cx="80" cy="46" r="24" fill="#E8A93D" />
        <circle cx="150" cy="44" r="25" fill="#F2795A" />
        <circle cx="118" cy="66" r="30" fill="#E8A93D" />
        <circle cx="90" cy="66" r="22" fill="#6E9B6E" />
        <circle cx="146" cy="70" r="21" fill="#6E9B6E" />
        <circle cx="118" cy="90" r="20" fill="#F2795A" />
      </g>
      {/* sombreado suave encima para dar redondez */}
      <circle cx="118" cy="60" r="66" fill="url(#canopyShade)" />

      {/* motas de luz (hojas sueltas) */}
      <circle cx="60" cy="58" r="3.5" fill="#E8A93D" />
      <circle cx="176" cy="52" r="3" fill="#F2795A" />
      <circle cx="130" cy="18" r="3" fill="#6E9B6E" />
    </svg>
  );
}

function HomeScreen({ onNavigatePart, onNavigate }) {
  return (
    <div className="homeScreen">
      <div className="homeHero">
        <div className="treeWrap"><TreeIllustration /></div>
        <h1>{APP_TITLE}</h1>
        <p className="homeSubtitle">{APP_SUBTITLE}</p>
      </div>
      <p className="homeIntro">
        Cambias de pareja, pero la historia parece repetirse. Ganas más dinero, pero la relación no mejora.
        Este cuaderno te acompaña a mirar esas repeticiones desde el enfoque de las constelaciones familiares —
        con lecturas breves y ejercicios para escribir directamente aquí.
      </p>
      <div className="trustNote">
        <span>Todo lo que escribas se guarda solo en este navegador — nadie más puede verlo. Puedes ir a tu ritmo.</span>
      </div>
      <div className="homeParts">
        {PARTS.map((part, i) => (
          <button key={part.id} className="homePartCard" style={{ "--accent": TONES[part.tone].accent, "--accentSoft": TONES[part.tone].accentSoft }} onClick={() => onNavigatePart(i)}>
            <span className="homePartNum">{part.num}</span>
            <span className="homePartTitle">{part.title}</span>
            <ChevronRight size={18} />
          </button>
        ))}
        <button className="homePartCard alt" onClick={() => onNavigate("affirmations")}>
          <Sparkles size={18} />
          <span className="homePartTitle">Afirmaciones</span>
          <ChevronRight size={18} />
        </button>
        <button className="homePartCard alt" onClick={() => onNavigate("bonus")}>
          <span className="homePartNum">30</span>
          <span className="homePartTitle">Preguntas para 30 días</span>
          <ChevronRight size={18} />
        </button>
        <button className="homePartCard alt" onClick={() => onNavigate("notes")}>
          <NotebookPen size={18} />
          <span className="homePartTitle">Mis notas libres</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function PartScreen({ part, onOpenChapter, onBack }) {
  const tone = TONES[part.tone];
  return (
    <div className="partScreen" style={{ "--accent": tone.accent, "--accentSoft": tone.accentSoft }}>
      <button className="backLink" onClick={onBack}><ChevronLeft size={16} /> Inicio</button>
      <div className="partHeader">
        <span className="partEyebrow">Parte {part.num}</span>
        <h2>{part.title}</h2>
      </div>
      {part.epigraph && (
        <div className="epigraph">
          <p>“{part.epigraph}”</p>
          <span>{part.epigraphNote}</span>
        </div>
      )}
      <ol className="chapterList">
        {part.chapters.map((ch, i) => (
          <li key={ch.id}>
            <button className="chapterRow" onClick={() => onOpenChapter(i)}>
              <span className="chapterIndex">{i + 1}</span>
              <span className="chapterRowTitle">{ch.heading}</span>
              <ChevronRight size={16} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChapterScreen({ part, chapter, index, total, onPrev, onNext, onBack }) {
  const tone = TONES[part.tone];
  const encIndex = (parseInt((chapter.id.match(/\d+/) || ["0"])[0], 10)) % ENCOURAGEMENTS.length;
  const encouragement = ENCOURAGEMENTS[encIndex];
  const isFinalChapter = part.num === "III" && index === total - 1;

  return (
    <div className="chapterScreen" style={{ "--accent": tone.accent, "--accentSoft": tone.accentSoft }}>
      <button className="backLink" onClick={onBack}><ChevronLeft size={16} /> {part.title}</button>
      <article className="page">
        <span className="pageEyebrow">Parte {part.num} · Capítulo {index + 1} de {total}</span>
        <h2>{chapter.heading}</h2>
        {chapter.paragraphs.map((p, i) => <p key={i} className="pageParagraph">{p}</p>)}
        {chapter.checklist && <ChecklistBlock chapterId={chapter.id} items={chapter.checklist} />}
        {chapter.prompts && (
          <div className="promptsBlock">
            <span className="promptsLabel">Para escribir</span>
            {chapter.prompts.map((pr, i) => (
              <div key={i} className="promptItem">
                <p className="promptQuestion">{pr}</p>
                <PromptField storageKey={`ans:${chapter.id}:${i}`} question={pr} />
              </div>
            ))}
          </div>
        )}
        <div className="encouragementNote">
          <Sparkles size={14} />
          <p>{encouragement}</p>
        </div>
        {isFinalChapter && (
          <div className="closingBlock">
            <h3>{CLOSING.heading}</h3>
            {CLOSING.paragraphs.map((p, i) => <p key={i} className="pageParagraph">{p}</p>)}
          </div>
        )}
      </article>
      <div className="chapterNav">
        <button className="navBtn" onClick={onPrev} disabled={index === 0}><ChevronLeft size={16} /> Anterior</button>
        <button className="navBtn primary" onClick={onNext} disabled={index === total - 1}>Siguiente <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function AffirmationsScreen({ onBack }) {
  return (
    <div className="simpleScreen">
      <button className="backLink" onClick={onBack}><ChevronLeft size={16} /> Inicio</button>
      <h2><Sparkles size={20} style={{ marginRight: 8, verticalAlign: -3 }} />Afirmaciones</h2>
      <p className="pageParagraph">Lee despacio. Quédate con las que sientas más verdaderas hoy.</p>
      <h3 className="groupLabel">Para el amor</h3>
      <div className="affirmGrid">{AFFIRMATIONS.love.map((a, i) => <div key={i} className="affirmCard">{a}</div>)}</div>
      <h3 className="groupLabel">Para el dinero y la pareja</h3>
      <div className="affirmGrid">{AFFIRMATIONS.money.map((a, i) => <div key={i} className="affirmCard alt">{a}</div>)}</div>
    </div>
  );
}

function BonusNum({ index, isOpen, onToggle }) {
  const [value] = useAnswer(`bonus-q-${index}`);
  const answered = value && value.trim().length > 0;
  return (
    <button type="button" className={"bonusNum" + (answered ? " done" : "") + (isOpen ? " active" : "")} onClick={onToggle}>
      {index + 1}
    </button>
  );
}

function BonusScreen({ onBack }) {
  const [openDay, setOpenDay] = useState(null);
  return (
    <div className="simpleScreen">
      <button className="backLink" onClick={onBack}><ChevronLeft size={16} /> Inicio</button>
      <h2>30 preguntas para 30 días</h2>
      <p className="pageParagraph">Elige un número cada día y responde sin editarlo.</p>
      <div className="bonusGrid">
        {BONUS_QUESTIONS.map((q, i) => (
          <BonusNum key={i} index={i} isOpen={openDay === i} onToggle={() => setOpenDay(openDay === i ? null : i)} />
        ))}
      </div>
      {openDay !== null && (
        <div className="bonusPanel">
          <span className="bonusPanelDay">Día {openDay + 1}</span>
          <p className="promptQuestion">{BONUS_QUESTIONS[openDay]}</p>
          <PromptField storageKey={`bonus-q-${openDay}`} question={BONUS_QUESTIONS[openDay]} />
        </div>
      )}
    </div>
  );
}

function NotesScreen({ onBack }) {
  const [entries, setEntries] = useState([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await storage.get("journal-entries");
      setEntries(res ? JSON.parse(res.value) : []);
      setLoaded(true);
    })();
  }, []);

  const addEntry = async () => {
    if (!draft.trim()) return;
    const next = [{ text: draft.trim(), date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) }, ...entries];
    setEntries(next);
    setDraft("");
    await storage.set("journal-entries", JSON.stringify(next));
  };

  return (
    <div className="simpleScreen">
      <button className="backLink" onClick={onBack}><ChevronLeft size={16} /> Inicio</button>
      <h2><NotebookPen size={20} style={{ marginRight: 8, verticalAlign: -3 }} />Mis notas libres</h2>
      <p className="pageParagraph">Un espacio sin estructura para lo que vaya surgiendo mientras lees.</p>
      <textarea className="promptTextarea" rows={4} placeholder="Escribe una nota…" value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button className="navBtn primary" style={{ marginTop: 10 }} onClick={addEntry}>Guardar nota</button>
      <div className="entryList">
        {loaded && entries.length === 0 && <p className="emptyNote">Todavía no tienes notas guardadas.</p>}
        {entries.map((e, i) => (
          <div key={i} className="entryCard">
            <span className="entryDate">{e.date}</span>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PUERTA DE ACCESO (código simple, ligado a la compra)
--------------------------------------------------------------- */
function AccessGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const expected = import.meta.env.VITE_ACCESS_CODE;

  const tryUnlock = async (e) => {
    e.preventDefault();
    if (!expected || code.trim().toUpperCase() === expected.trim().toUpperCase()) {
      await storage.set("unlocked", "yes");
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="gateScreen">
      <Lock size={22} strokeWidth={1.4} />
      <h1>{APP_TITLE}</h1>
      <p>Introduce el código de acceso que recibiste al comprar.</p>
      <form onSubmit={tryUnlock} className="gateForm">
        <input
          className="gateInput"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(false); }}
          placeholder="Código de acceso"
          autoFocus
        />
        <button type="submit" className="navBtn primary">Entrar</button>
      </form>
      {error && <span className="reflectionError">Ese código no es válido. Revisa el correo de tu compra.</span>}
    </div>
  );
}

/* ---------------------------------------------------------------
   APP
--------------------------------------------------------------- */
export default function App() {
  const [unlocked, setUnlocked] = useState(null); // null = comprobando, true/false
  const [screen, setScreen] = useState("home");
  const [partIndex, setPartIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const expected = import.meta.env.VITE_ACCESS_CODE;
      const requireGate = !!expected;
      if (!requireGate) { setUnlocked(true); return; }

      // Si el link trae ?code=... (por ejemplo, desde la página de
      // agradecimiento de Hotmart/Gumroad), y coincide, desbloquea sola.
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get("code");
      if (codeFromUrl && codeFromUrl.trim().toUpperCase() === expected.trim().toUpperCase()) {
        await storage.set("unlocked", "yes");
        setUnlocked(true);
        return;
      }

      const res = await storage.get("unlocked");
      setUnlocked(res ? res.value === "yes" : false);
    })();
  }, []);

  if (unlocked === null) return null;
  if (unlocked === false) return <div className="app"><div className="appFrame"><AccessGate onUnlock={() => setUnlocked(true)} /></div></div>;

  const goHome = () => setScreen("home");
  const openPart = (i) => { setPartIndex(i); setScreen("part"); };
  const openChapter = (i) => { setChapterIndex(i); setScreen("chapter"); };
  const part = PARTS[partIndex];
  const chapter = part.chapters[chapterIndex];

  return (
    <div className="app">
      <div className="appFrame">
        {screen === "home" && <HomeScreen onNavigatePart={openPart} onNavigate={setScreen} />}
        {screen === "part" && <PartScreen part={part} onOpenChapter={openChapter} onBack={goHome} />}
        {screen === "chapter" && (
          <ChapterScreen
            part={part}
            chapter={chapter}
            index={chapterIndex}
            total={part.chapters.length}
            onPrev={() => setChapterIndex((c) => Math.max(0, c - 1))}
            onNext={() => setChapterIndex((c) => Math.min(part.chapters.length - 1, c + 1))}
            onBack={() => setScreen("part")}
          />
        )}
        {screen === "affirmations" && <AffirmationsScreen onBack={goHome} />}
        {screen === "bonus" && <BonusScreen onBack={goHome} />}
        {screen === "notes" && <NotesScreen onBack={goHome} />}
      </div>
    </div>
  );
}
