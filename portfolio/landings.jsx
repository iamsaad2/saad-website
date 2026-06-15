// landings.jsx — four pastel 8-bit landing directions for Saad's portfolio.
// Exports LandingA..D to window. Relies on classes defined in index.html.

const A = 'portfolio/assets/'; // not used directly; imgs use relative paths below
const IMG = 'assets/';

// ---- shared atoms ----------------------------------------------------------
function Pill({ c = 'coral', s = 22, style }) {
  const src = c === 'coral' ? IMG + 'pill.png'
    : IMG + 'pill-' + c + '.png';
  return <img src={src} alt="" className="p8-px" style={{ width: s, height: 'auto', ...style }} />;
}
function Cursor({ s = 20, style }) {
  return <img src={IMG + 'cursor.png'} alt="" className="p8-px" style={{ width: s, height: 'auto', ...style }} />;
}
function HudBar({ right }) {
  return (
    <div className="p8-hud">
      <div className="p8-hud-l">
        <span className="ps" style={{ fontSize: 13 }}>SAAD</span>
        <span className="p8-hud-sep">▸</span>
        <span className="vt p8-hud-sub">MD CANDIDATE · CLASS OF ’27</span>
      </div>
      <div className="p8-hud-r">{right}</div>
    </div>
  );
}

// ---- A · Dialog Intro (overworld scene) -----------------------------------
function LandingA() {
  return (
    <div className="p8-screen p8-scene">
      <HudBar right={<span className="vt" style={{ fontSize: 20, opacity: .7 }}>♥ menu</span>} />
      <div className="p8-clouds">
        <span className="p8-cloud" style={{ left: '12%', top: 78 }}></span>
        <span className="p8-cloud" style={{ left: '66%', top: 54, transform: 'scale(.8)' }}></span>
      </div>
      <div className="p8-stage">
        <Pill c="mint" s={26} style={{ position: 'absolute', left: '24%', top: 40 }} />
        <Pill c="sky" s={22} style={{ position: 'absolute', right: '26%', top: 70 }} />
        <img src={IMG + 'doctor.png'} alt="Saad Badat" className="p8-px p8-bob" style={{ width: 132, height: 'auto' }} />
        <div className="p8-shadow"></div>
      </div>
      <div className="p8-dialog">
        <div className="vt p8-dlg-name">SAAD</div>
        <p className="vt p8-dlg-text">
          <span className="p8-type" style={{ '--w': '34ch' }}>Hi! I’m a medical student & researcher.</span>
        </p>
        <p className="vt p8-dlg-text" style={{ opacity: .92 }}>
          Welcome to my lab. Press START to browse my work.
        </p>
        <span className="p8-next">▼</span>
      </div>
    </div>
  );
}

// ---- B · START Menu --------------------------------------------------------
const MENU = [
  { k: 'HOME', icon: 'icon-cross', note: 'start' },
  { k: 'MANUSCRIPTS', icon: 'icon-manuscript', note: '6 papers' },
  { k: 'RESEARCH', icon: 'icon-research', note: '4 projects' },
  { k: 'ABOUT', icon: null, note: 'the trainer' },
  { k: 'CONTACT', icon: null, note: 'say hi' },
];
function LandingB() {
  return (
    <div className="p8-screen p8-tile">
      <HudBar />
      <div className="p8-menu-wrap">
        <div className="p8-menu-aside">
          <div className="p8-photo">
            <img src={IMG + 'doctor.png'} alt="Saad Badat" className="p8-px" style={{ width: 92, height: 'auto' }} />
          </div>
          <div className="ps" style={{ fontSize: 12, marginTop: 14 }}>SAAD</div>
          <p className="vt" style={{ fontSize: 21, lineHeight: 1.15, marginTop: 8, opacity: .8 }}>
            Medicine, research &amp; the occasional web app. Choose a menu.
          </p>
        </div>
        <div className="p8-pixbox p8-menu">
          <div className="ps p8-menu-title">MENU</div>
          {MENU.map((m, i) => (
            <div key={m.k} className={'p8-mi' + (i === 0 ? ' is-sel' : '')}>
              <span className="p8-mi-cur">{i === 0 ? <Cursor s={18} /> : null}</span>
              {m.icon
                ? <img src={IMG + m.icon + '.png'} alt="" className="p8-px" style={{ width: 22 }} />
                : <Pill c={['lav', 'sky'][i % 2]} s={18} />}
              <span className="vt p8-mi-k">{m.k}</span>
              <span className="vt p8-mi-note">{m.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- C · Resident Card (trainer/stat screen) ------------------------------
const STATS = [
  ['MANUSCRIPTS', '06'], ['PROJECTS', '04'], ['POSTERS', '03'], ['CITATIONS', '38'],
];
function LandingC() {
  return (
    <div className="p8-screen p8-tile p8-center">
      <div className="p8-pixbox p8-card">
        <div className="p8-card-top">
          <span className="ps" style={{ fontSize: 12 }}>RESIDENT CARD</span>
          <span className="vt" style={{ fontSize: 20, opacity: .7 }}>No. 002714</span>
        </div>
        <div className="p8-card-body">
          <div className="p8-card-photo">
            <img src={IMG + 'doctor.png'} alt="Saad Badat" className="p8-px" style={{ width: 116, height: 'auto' }} />
          </div>
          <div className="p8-card-info">
            <div className="ps" style={{ fontSize: 20 }}>SAAD</div>
            <div className="vt p8-card-role">Medical Student · Researcher</div>
            <div className="p8-stats">
              {STATS.map(([k, v]) => (
                <div key={k} className="p8-stat">
                  <span className="vt p8-stat-k">{k}</span>
                  <span className="ps p8-stat-v">{v}</span>
                </div>
              ))}
            </div>
            <div className="p8-badges">
              <span className="vt p8-badges-l">BADGES</span>
              <Pill c="coral" s={20} /><Pill c="mint" s={20} /><Pill c="sky" s={20} />
              <Pill c="lav" s={20} /><span className="vt" style={{ opacity: .4, fontSize: 20 }}>+2</span>
            </div>
          </div>
        </div>
        <div className="p8-card-foot vt">
          <span className="p8-next-inline">▸</span> Interests: critical care, ML in medicine, med-ed tools.
        </div>
      </div>
    </div>
  );
}

// ---- D · Title Screen ------------------------------------------------------
function LandingD() {
  return (
    <div className="p8-screen p8-title">
      <div className="p8-title-pills">
        <Pill c="coral" s={26} /><Pill c="mint" s={26} /><Pill c="sky" s={26} /><Pill c="lav" s={26} />
      </div>
      <div className="ps p8-wordmark">SAAD</div>
      <div className="vt p8-subtitle">MEDICINE&nbsp;&nbsp;·&nbsp;&nbsp;RESEARCH&nbsp;&nbsp;·&nbsp;&nbsp;CODE</div>
      <div className="ps p8-press">
        <span className="p8-blink">PRESS START</span>
      </div>
      <div className="vt p8-title-foot">a portfolio of manuscripts &amp; projects · © Saad Badat ’26</div>
    </div>
  );
}

Object.assign(window, { LandingA, LandingB, LandingC, LandingD });
