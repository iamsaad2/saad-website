// app.jsx — Saad's interactive 8-bit portfolio (walkable overworld home, see overworld.jsx).
const { useState, useEffect, useRef } = React;
const D = window.SAAD_DATA;
const IMG = 'portfolio/assets/';

// ---- atoms ----
function Pill({ c = 'coral', s = 22, style }) {
  const src = c === 'coral' ? IMG + 'pill.png' : IMG + 'pill-' + c + '.png';
  return <img src={src} alt="" className="p8-px" style={{ width: s, height: 'auto', ...style }} />;
}
function Cursor({ s = 20, style }) {
  return <img src={IMG + 'cursor.png'} alt="" className="p8-px" style={{ width: s, height: 'auto', ...style }} />;
}
function Typewriter({ text, speed = 20, className }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0); let i = 0;
    const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, speed);
    return () => clearInterval(id);
  }, [text]);
  const done = n >= text.length;
  return <span className={className}>{text.slice(0, n)}{!done && <span className="tw-caret">▌</span>}</span>;
}

const TYPE_PILL = { Original: 'coral', Review: 'mint', Education: 'sky', Survey: 'lav' };
const STATUS_COLOR = { Live: 'var(--mint)', Beta: 'var(--coral)', Active: 'var(--mint)', Recruiting: 'var(--coral)', Shipped: 'var(--sky)', Published: 'var(--lav)' };

function Tag({ type }) {
  return <span className="tag"><Pill c={TYPE_PILL[type] || 'coral'} s={16} /> {type.toUpperCase()}</span>;
}

// ---- HOME is now the walkable Overworld (see overworld.jsx) ----

// ---- MANUSCRIPTS ----
function Manuscripts({ sel, setSel }) {
  const cur = D.manuscripts[sel];
  return (
    <div className="view">
      <div className="view-head">
        <span className="vh-arrow">▸</span><span className="ps">MANUSCRIPTS</span>
        <span className="vh-count">{String(D.manuscripts.length).padStart(2, '0')} ENTRIES</span>
      </div>
      <div className="mss-wrap">
        <div className="p8-pixbox mss-list">
          {D.manuscripts.map((m, i) => (
            <div key={i} className={'mss-item' + (sel === i ? ' is-sel' : '')}
              onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
              <span className="mss-cur">{sel === i ? <Cursor s={16} /> : null}</span>
              <span className="mss-item-t">{m.title}</span>
              <span className="mss-item-y">{m.year}</span>
            </div>
          ))}
        </div>
        <div className="p8-pixbox mss-detail">
          <div className="mss-d-type"><Tag type={cur.type} /></div>
          <h2 className="mss-d-title">{cur.title}</h2>
          <div className="mss-d-meta"><b>{cur.role}</b> · {cur.venue} · {cur.year}</div>
          <p className="mss-d-blurb"><Typewriter text={cur.blurb} speed={14} /></p>
          <a className="btn" href={cur.link} target="_blank" rel="noopener">VIEW PAPER <span className="arr">▸</span></a>
        </div>
      </div>
    </div>
  );
}

// ---- WEBSITES (sites & apps, drag-drop screenshots) ----
function Websites() {
  return (
    <div className="view">
      <div className="view-head">
        <span className="vh-arrow">▸</span><span className="ps">WEBSITES</span>
        <span className="vh-count">{String(D.websites.length).padStart(2, '0')} BUILDS</span>
      </div>
      <div className="web-grid">
        {D.websites.map((w, i) => (
          <div key={i} className="p8-pixbox web-card">
            <div className="web-shot">
              <div className="web-bar">
                <span className="wb-dot" style={{ background: 'var(--coral)' }}></span>
                <span className="wb-dot" style={{ background: 'var(--cream)' }}></span>
                <span className="wb-dot" style={{ background: 'var(--mint)' }}></span>
              </div>
              <image-slot id={w.slot} shape="rect" placeholder="drop a screenshot" style={{ display: 'block', width: '100%', height: '172px', background: 'var(--bg)' }}></image-slot>
            </div>
            <div className="web-body">
              <div className="web-top"><Pill c={w.pill} s={18} /><span className="web-name">{w.name}</span></div>
              <p className="web-desc">{w.desc}</p>
              <div className="proj-chips">{w.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              <div className="proj-foot">
                <span className="status"><span className="dot" style={{ background: STATUS_COLOR[w.status] }}></span>{w.status}</span>
                <a className="btn btn-sm" href={w.url} target="_blank" rel="noopener">VISIT <span className="arr">▸</span></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- ABOUT (resident card + bio) ----
function About() {
  const p = D.profile;
  return (
    <div className="view">
      <div className="view-head"><span className="vh-arrow">▸</span><span className="ps">ABOUT</span></div>
      <div className="about-wrap">
        <div className="p8-pixbox p8-card">
          <div className="p8-card-top">
            <span className="ps" style={{ fontSize: 12 }}>STUDENT CARD</span>
            <span className="vt" style={{ fontSize: 20, opacity: .7 }}>No. {p.cardNo}</span>
          </div>
          <div className="p8-card-body">
            <div className="p8-card-photo"><img src={IMG + 'doctor.png'} alt="Saad" className="p8-px" style={{ width: 116 }} /></div>
            <div className="p8-card-info">
              <div className="ps" style={{ fontSize: 20 }}>SAAD</div>
              <div className="vt p8-card-role">Medical Student · Researcher</div>
              <div className="p8-stats">
                {p.stats.map(([k, v]) => (
                  <div key={k} className="p8-stat"><span className="vt p8-stat-k">{k}</span><span className="ps p8-stat-v">{v}</span></div>
                ))}
              </div>
              <div className="p8-badges">
                <span className="vt p8-badges-l">BADGES</span>
                <Pill c="coral" s={20} /><Pill c="mint" s={20} /><Pill c="sky" s={20} /><Pill c="lav" s={20} />
                <span className="vt" style={{ opacity: .4, fontSize: 20 }}>+2</span>
              </div>
            </div>
          </div>
          <div className="p8-card-foot vt"><span className="p8-next-inline">▸</span> Interests: {p.interests}.</div>
        </div>
        <div className="about-bio">
          <div className="p8-pixbox">
            {p.bio.map((line, i) => <p key={i} className={i === 0 ? 'lead' : ''}>{line}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- CONTACT ----
function Contact() {
  return (
    <div className="view">
      <div className="view-head"><span className="vh-arrow">▸</span><span className="ps">CONTACT</span></div>
      <div className="contact-wrap">
        <div className="p8-pixbox contact-box">
          <p className="contact-intro">Want to collaborate or chat?</p>
          <p className="contact-sub">Pick a channel — I usually reply within a day.</p>
          <div className="contact-grid">
            {D.contact.map((c, i) => (
              <a key={i} className="contact-link" href={c.link} target="_blank" rel="noopener">
                <Pill c={c.pill} s={22} />
                <span className="cl-tx"><span className="cl-label">{c.label}</span><span className="cl-value">{c.value}</span></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const TITLES = { manuscripts: 'MANUSCRIPTS', websites: 'WEBSITES', about: 'ABOUT', contact: 'CONTACT' };

function App() {
  const [view, setView] = useState('home');
  const [cameFrom, setCameFrom] = useState(null);
  const [mssSel, setMssSel] = useState(0);

  const goHome = () => { setCameFrom(view); setView('home'); };

  useEffect(() => {
    function onKey(e) {
      if (view === 'home') return; // overworld owns its own keys
      if (e.key === 'Escape' || e.key === 'Backspace') { goHome(); e.preventDefault(); }
      else if (view === 'manuscripts') {
        if (e.key === 'ArrowDown') { setMssSel((s) => (s + 1) % D.manuscripts.length); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { setMssSel((s) => (s - 1 + D.manuscripts.length) % D.manuscripts.length); e.preventDefault(); }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view]);

  const crumb = view === 'home' ? ('MD CANDIDATE · ' + D.profile.classOf) : TITLES[view];
  const hint = view === 'home'
    ? <><span><span className="key">↑↓←→</span> / <span className="key">WASD</span> walk</span><span><span className="key">↵</span> enter building</span><span>or use the menu</span></>
    : view === 'manuscripts'
      ? <><span><span className="key">↑↓</span> browse</span><span><span className="key">esc</span> back</span><span>click <b>VIEW</b> to open</span></>
      : <><span><span className="key">esc</span> back to town</span><span>click a card to open</span></>;

  return (
    <div className="app p8-tile">
      <div className="p8-hud app-hud">
        <div className="p8-hud-l">
          <span className="ps" style={{ fontSize: 13 }}>SAAD</span>
          <span className="p8-hud-sep">▸</span>
          <span className="vt p8-hud-sub">{crumb}</span>
        </div>
        <div className="p8-hud-r">
          {view !== 'home'
            ? <span className="back-chip" onClick={goHome}>◂ BACK</span>
            : <span className="app-crumb">walk up to a building or use the menu</span>}
        </div>
      </div>

      <div className={'app-main' + (view === 'home' ? ' app-main-center app-main-ow' : '')}>
        <div key={view}>
          {view === 'home' && <Overworld go={setView} spawn={cameFrom} />}
          {view === 'manuscripts' && <Manuscripts sel={mssSel} setSel={setMssSel} />}
          {view === 'websites' && <Websites />}
          {view === 'about' && <About />}
          {view === 'contact' && <Contact />}
        </div>
      </div>

      <div className="hint">{hint}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
