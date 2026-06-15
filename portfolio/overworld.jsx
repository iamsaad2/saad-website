(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const D = window.SAAD_DATA;
  const IMG = 'portfolio/assets/';

  // IMPORTANT: keep this the same aspect ratio as the reference map image.
  // The previous square stage stretched/cropped the map, which made collisions
  // and door prompts feel wrong.
  const OW_W = 510, OW_H = 475;
  const PW = 34, PH = 42;
  const SPEED = 124;

  // Coordinates are based on the actual 510 × 475 Twinleaf-style map asset.
  const MENU = [
    { id: 'manuscripts', label: 'MANUSCRIPTS', icon: 'icon-manuscript', note: D.manuscripts.length + ' papers', x: 126, y: 94,  w: 94,  h: 99,  doorX: 156, doorY: 190 },
    { id: 'websites',    label: 'WEBSITES',    icon: 'icon-web',        note: D.websites.length + ' built',      x: 300, y: 114, w: 73,  h: 80,  doorX: 328, doorY: 194 },
    { id: 'about',       label: 'ABOUT',       icon: 'icon-cross',      note: 'the student',                    x: 128, y: 229, w: 93,  h: 76,  doorX: 166, doorY: 304 },
    { id: 'contact',     label: 'CONTACT',     icon: null, pill: 'lav', note: 'say hi',                         x: 299, y: 204, w: 105, h: 101, doorX: 331, doorY: 304 },
  ];

  function Cursor({ s = 18 }) {
    return <img src={IMG + 'cursor.png'} alt="" className="p8-px" style={{ width: s, height: 'auto' }} />;
  }
  function Pill({ c = 'coral', s = 18 }) {
    const src = c === 'coral' ? IMG + 'pill.png' : IMG + 'pill-' + c + '.png';
    return <img src={src} alt="" className="p8-px" style={{ width: s, height: 'auto' }} />;
  }

  function hit(a, r) {
    return a.x < r.x + r.w && a.x + a.w > r.x && a.y < r.y + r.h && a.y + a.h > r.y;
  }

  const houseBlock = (b) => ({ x: b.x + 4, y: b.y + 7, w: b.w - 8, h: b.h - 12 });
  const doorZone = (b) => ({ x: b.doorX - 10, y: b.doorY - 5, w: 20, h: 18 });

  // Foot blockers stop the character from entering buildings/water/trees.
  // Body blockers are only for the tree/fence border so the sprite cannot
  // visually walk deep into the trees. Houses intentionally use feet only so
  // the player can stand directly in front of doors like in Pokémon.
  const TREE_BLOCKS = [
    { x: 0,   y: 0,   w: 97,  h: 356 },
    { x: 413, y: 0,   w: 97,  h: 356 },
    { x: 0,   y: 0,   w: 224, h: 58  },
    { x: 287, y: 0,   w: 223, h: 58  },
    { x: 0,   y: 351, w: 194, h: 124 },
    { x: 318, y: 351, w: 192, h: 124 },
    { x: 194, y: 424, w: 124, h: 51  },
  ];

  const FENCE_BLOCKS = [
    { x: 96,  y: 37, w: 102, h: 35 },
    { x: 313, y: 37, w: 102, h: 35 },
  ];

  const FOOT_BLOCKS = MENU.map(houseBlock).concat([
    { x: 193, y: 382, w: 125, h: 45 }, // pond
    { x: 245, y: 204, w: 20,  h: 22 }, // town sign
    ...TREE_BLOCKS,
    ...FENCE_BLOCKS,
  ]);

  const BODY_BLOCKS = TREE_BLOCKS.concat(FENCE_BLOCKS);

  function Overworld({ go, spawn }) {
    const fitRef = useRef(null);
    const playerRef = useRef(null);
    const keys = useRef({});
    const posRef = useRef({ x: OW_W / 2 - PW / 2, y: 230 });
    const faceRef = useRef('down');
    const walkRef = useRef(false);
    const nearRef = useRef(null);
    const rafRef = useRef(0);
    const lastRef = useRef(0);

    const [face, setFace] = useState('down');
    const [walking, setWalking] = useState(false);
    const [near, setNear] = useState(null);
    const [scale, setScale] = useState(1);
    const [menuSel, setMenuSel] = useState(0);

    useEffect(() => {
      const b = MENU.find((x) => x.id === spawn);
      if (b) {
        posRef.current = { x: b.doorX - PW / 2, y: b.doorY + 6 };
        faceRef.current = 'down';
        setFace('down');
      }
    }, [spawn]);

    useEffect(() => {
      function fit() {
        const el = fitRef.current;
        if (!el) return;
        const availableW = el.clientWidth || OW_W;
        const maxH = window.innerHeight - 168;
        const k = Math.min(1.28, availableW / OW_W, maxH / OW_H);
        setScale(k);
        el.style.height = OW_H * k + 'px';
      }
      fit();
      const ro = new ResizeObserver(fit);
      if (fitRef.current) ro.observe(fitRef.current);
      window.addEventListener('resize', fit);
      return () => {
        ro.disconnect();
        window.removeEventListener('resize', fit);
      };
    }, []);

    const enter = useCallback((id) => {
      if (id) {
        go(id);
        return;
      }
      if (nearRef.current) go(nearRef.current);
    }, [go]);

    useEffect(() => {
      const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right' };
      const clearKeys = () => { keys.current = {}; };
      function down(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'e' || e.key === 'E') {
          enter();
          e.preventDefault();
          return;
        }
        const k = map[e.key];
        if (k) {
          keys.current[k] = true;
          e.preventDefault();
        }
      }
      function up(e) {
        const k = map[e.key];
        if (k) {
          keys.current[k] = false;
          e.preventDefault();
        }
      }
      window.addEventListener('keydown', down, { passive: false });
      window.addEventListener('keyup', up, { passive: false });
      window.addEventListener('blur', clearKeys);
      window.addEventListener('pointercancel', clearKeys);
      return () => {
        window.removeEventListener('keydown', down);
        window.removeEventListener('keyup', up);
        window.removeEventListener('blur', clearKeys);
        window.removeEventListener('pointercancel', clearKeys);
      };
    }, [enter]);

    useEffect(() => {
      const feetAt = (x, y) => ({ x: x + 8, y: y + PH - 10, w: PW - 16, h: 10 });
      const bodyAt = (x, y) => ({ x: x + 5, y: y + 12, w: PW - 10, h: PH - 16 });
      function blockedAt(x, y) {
        const feet = feetAt(x, y);
        const body = bodyAt(x, y);
        return FOOT_BLOCKS.some((r) => hit(feet, r)) || BODY_BLOCKS.some((r) => hit(body, r));
      }
      function frame(t) {
        const last = lastRef.current || t;
        const dt = Math.min(0.025, (t - last) / 1000);
        lastRef.current = t;

        const k = keys.current;
        let vx = (k.right ? 1 : 0) - (k.left ? 1 : 0);
        let vy = (k.down ? 1 : 0) - (k.up ? 1 : 0);
        const moving = vx !== 0 || vy !== 0;
        if (vx && vy) {
          vx *= Math.SQRT1_2;
          vy *= Math.SQRT1_2;
        }

        const p = posRef.current;
        const tryX = Math.max(10, Math.min(OW_W - PW - 10, p.x + vx * SPEED * dt));
        if (!blockedAt(tryX, p.y)) p.x = tryX;
        const tryY = Math.max(0, Math.min(OW_H - PH - 8, p.y + vy * SPEED * dt));
        if (!blockedAt(p.x, tryY)) p.y = tryY;

        if (moving) {
          const f = Math.abs(vx) >= Math.abs(vy) ? (vx < 0 ? 'left' : 'right') : (vy < 0 ? 'up' : 'down');
          if (f !== faceRef.current) {
            faceRef.current = f;
            setFace(f);
          }
        }
        if (moving !== walkRef.current) {
          walkRef.current = moving;
          setWalking(moving);
        }

        const feet = feetAt(p.x, p.y);
        let n = null;
        for (const b of MENU) {
          if (hit(feet, doorZone(b))) {
            n = b.id;
            break;
          }
        }
        if (n !== nearRef.current) {
          nearRef.current = n;
          setNear(n);
          if (n) {
            const idx = MENU.findIndex((m) => m.id === n);
            if (idx >= 0) setMenuSel(idx);
          }
        }

        if (playerRef.current) {
          playerRef.current.style.transform = 'translate3d(' + p.x.toFixed(2) + 'px,' + p.y.toFixed(2) + 'px,0)';
          playerRef.current.style.zIndex = String(Math.round(p.y + PH) + 300);
        }
        rafRef.current = requestAnimationFrame(frame);
      }
      rafRef.current = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const sprite = face === 'up' ? 'prof-up.png' : face === 'down' ? 'prof-down.png' : 'prof-side.png';
    const flip = face === 'left' ? 'scaleX(-1)' : 'none';
    const press = (dir, v) => (e) => {
      keys.current[dir] = v;
      if (e.currentTarget) {
        if (v && e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
        }
        e.currentTarget.blur();
      }
      e.preventDefault();
    };

    return (
      <div className="ow-home">
        <div className="ow-fit" ref={fitRef}>
          <div className="ow-stage" style={{ transform: 'scale(' + scale + ')' }}>
            <div className="ow-mapbg"></div>

            {MENU.map((b) => (
              <button
                key={b.id}
                className={'ow-door-target' + (near === b.id ? ' is-near' : '')}
                style={{ left: b.doorX - 14, top: b.doorY - 13, width: 28, height: 34, zIndex: b.doorY + 120 }}
                onClick={() => enter(b.id)}
                onMouseEnter={() => setMenuSel(MENU.findIndex((m) => m.id === b.id))}
                aria-label={b.label}
              >
                {near === b.id && <span className="ow-prompt"><span className="ow-prompt-cur">▶</span> ENTER</span>}
              </button>
            ))}

            <div className={'ow-player' + (walking ? ' is-walk' : '')} ref={playerRef}
              style={{ width: PW, height: PH, transform: 'translate3d(' + posRef.current.x + 'px,' + posRef.current.y + 'px,0)' }}>
              <div className="ow-shadow"></div>
              <img src={IMG + sprite} alt="Saad Badat" className="p8-px ow-player-img" style={{ transform: flip }} />
            </div>
          </div>
        </div>

        <div className="p8-pixbox home-menu ow-main-menu">
          <div className="ps p8-menu-title">MAIN MENU</div>
          {MENU.map((m, i) => (
            <div
              key={m.id}
              className={'p8-mi' + (i === menuSel ? ' is-sel' : '')}
              onClick={() => enter(m.id)}
              onMouseEnter={() => setMenuSel(i)}
            >
              <span className="p8-mi-cur">{i === menuSel ? <Cursor s={18} /> : null}</span>
              {m.icon ? <img src={IMG + m.icon + '.png'} alt="" className="p8-px" style={{ width: 22 }} /> : <Pill c={m.pill} s={18} />}
              <span className="vt p8-mi-k">{m.label}</span>
              <span className="vt p8-mi-note">{m.note}</span>
            </div>
          ))}
        </div>

        <div className="ow-touch">
          <div className="ow-dpad">
            <button className="ow-dbtn ow-up" onPointerDown={press('up', true)} onPointerUp={press('up', false)} onPointerCancel={press('up', false)} onPointerLeave={press('up', false)} onContextMenu={(e) => e.preventDefault()} aria-label="up">▲</button>
            <button className="ow-dbtn ow-left" onPointerDown={press('left', true)} onPointerUp={press('left', false)} onPointerCancel={press('left', false)} onPointerLeave={press('left', false)} onContextMenu={(e) => e.preventDefault()} aria-label="left">◀</button>
            <button className="ow-dbtn ow-right" onPointerDown={press('right', true)} onPointerUp={press('right', false)} onPointerCancel={press('right', false)} onPointerLeave={press('right', false)} onContextMenu={(e) => e.preventDefault()} aria-label="right">▶</button>
            <button className="ow-dbtn ow-down" onPointerDown={press('down', true)} onPointerUp={press('down', false)} onPointerCancel={press('down', false)} onPointerLeave={press('down', false)} onContextMenu={(e) => e.preventDefault()} aria-label="down">▼</button>
          </div>
          <button className="ow-abtn" onClick={() => enter()} onContextMenu={(e) => e.preventDefault()} aria-label="enter">A</button>
        </div>
      </div>
    );
  }

  window.Overworld = Overworld;
})();
