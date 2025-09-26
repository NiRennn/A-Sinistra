import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";
import "./Game.scss";
import Score from "../Score/Score";

type ItemType = "coin" | "bar" | "skullL" | "skullR" | "scroll";
type Item = {
  id: number;
  type: ItemType;
  lane: 0 | 1 | 2;
  y: number;
  speed: number;
  collected?: boolean;
};

const LANES: [number, number, number] = [16.666, 50, 83.333];
const TARGET_COINS = 20;
const MAX_BARS = 3;
const MAX_TILT = 3;
const TARGET_SCROLLS = 30;

const SPRITES: Record<ItemType | "ship", string> = {
  ship: "/icons/game-boat/boat-full.svg",
  coin: "/icons/game-icons/coin.svg",
  bar: "/icons/game-icons/goldbar.svg",
  skullL: "/icons/game-icons/skull-left.svg",
  skullR: "/icons/game-icons/skull-right.svg",
  scroll: "/icons/game-icons/scroll.svg",
};

const SHIP_ASSETS = [
  "/icons/game-boat/boat-full.svg",
  "/icons/game-boat/boat-1left.svg",
  "/icons/game-boat/boat-2left.svg",
  "/icons/game-boat/boat-leftmax.svg",
  "/icons/game-boat/boat-1right.svg",
  "/icons/game-boat/boat-2right.svg",
  "/icons/game-boat/boat-rightmax.svg",
] as const;

function shipSpriteForTilt(t: number): string {
  if (t === 0) return "/icons/game-boat/boat-full.svg";
  if (t <= -3) return "/icons/game-boat/boat-leftmax.svg";
  if (t >= 3) return "/icons/game-boat/boat-rightmax.svg";
  const a = Math.abs(t); // 1 или 2
  return t < 0
    ? `/icons/game-boat/boat-${a}left.svg`
    : `/icons/game-boat/boat-${a}right.svg`;
}

const SPAWN_WEIGHTS = {
  coin: 0.35,
  bar: 0.19,
  skullL: 0.19,
  skullR: 0.19,
  scroll: 0.08,
} as const;
function pickItemType(): ItemType {
  const r = Math.random();
  let acc = 0;
  for (const t of Object.keys(SPAWN_WEIGHTS) as ItemType[]) {
    acc += SPAWN_WEIGHTS[t];
    if (r <= acc) return t;
  }
  return "coin";
}

const SCROLL_SPEED = 120;
const PARALLAX_K = 1;
const TILE_SIZE = 2048;
const SCROLL_DIR = 1;

let idSeq = 1;

export default function Game() {
  const playRef = useRef<HTMLDivElement>(null);

  const [lane, setLane] = useState<0 | 1 | 2>(1);
  const [items, setItems] = useState<Item[]>([]);
  const [coins, setCoins] = useState(0);
  const [bars, setBars] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [scrolls, setScrolls] = useState(0);

  const [running, setRunning] = useState(true);

  const [scroll, setScroll] = useState(0);
  const waterY = SCROLL_DIR * scroll;
  const housesY = SCROLL_DIR * scroll * PARALLAX_K;

  const dialAngle = useMemo(() => (tilt / MAX_TILT) * 40, [tilt]);
  const shipSrc = useMemo(() => shipSpriteForTilt(tilt), [tilt]);

  const moveLeft = () => setLane((l) => (l > 0 ? ((l - 1) as 0 | 1 | 2) : l));
  const moveRight = () => setLane((l) => (l < 2 ? ((l + 1) as 0 | 1 | 2) : l));

  const handlePointer = (clientX: number, target: HTMLDivElement) => {
    if (!running) return;
    const rect = target.getBoundingClientRect();
    clientX - rect.left > rect.width / 2 ? moveRight() : moveLeft();
  };
  // const onClick = (e: React.MouseEvent<HTMLDivElement>) =>
  //   handlePointer(e.clientX, e.currentTarget);
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) =>
    handlePointer(e.clientX, e.currentTarget);
  // const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
  //   e.touches[0] && handlePointer(e.touches[0].clientX, e.currentTarget);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!running) return;
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") moveLeft();
      if (k === "arrowright" || k === "d") moveRight();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  useEffect(() => {
    SHIP_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // главный цикл
  useEffect(() => {
    let raf = 0,
      last = performance.now(),
      spawnAcc = 0;
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;

      if (running) {
        setScroll((s) => (s + SCROLL_SPEED * dt) % TILE_SIZE);

        setItems((prev) => {
          const h = playRef.current?.clientHeight ?? 600;
          const shipY = h - 200;
          const colDist = 62;

          const next = prev
            .map((it) => ({ ...it, y: it.y + it.speed * dt }))
            .filter((it) => it.y < h + 80 && !it.collected);

          for (const it of next) {
            if (it.lane !== lane) continue;
            if (Math.abs(it.y - shipY) <= colDist) {
              it.collected = true;
              if (it.type === "coin") setCoins((c) => c + 1);
              if (it.type === "bar") setBars((b) => b + 1);
              if (it.type === "skullL")
                setTilt((v) => Math.max(-MAX_TILT, v - 1));
              if (it.type === "skullR")
                setTilt((v) => Math.min(MAX_TILT, v + 1));
              if (it.type === "scroll") setScrolls((s) => s + 1);
            }
          }
          return next.filter((i) => !i.collected);
        });

        spawnAcc += dt;
        const spawnEvery = 0.8;
        while (spawnAcc >= spawnEvery) {
          spawnAcc -= spawnEvery;
          setItems((prev) => [
            ...prev,
            {
              id: idSeq++,
              type: pickItemType(),
              lane: Math.floor(Math.random() * 3) as 0 | 1 | 2,
              y: -60,
              speed: 140 + Math.random() * 90,
            },
          ]);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, lane]);

  // ===== перехoд на экран проигрыша по причине =====
  const navigate = useNavigate();
  const navigatedRef = useRef(false);

  useEffect(() => {
    if (!running || navigatedRef.current) return;

    if (coins >= TARGET_COINS) {
      setRunning(false);
      navigatedRef.current = true;
      navigate(`${appRoutes.FINAL || "/final"}`, { replace: true });
      return;
    }

    if (bars >= MAX_BARS) {
      navigatedRef.current = true;
      setRunning(false);
      navigate(`${appRoutes.LOSE || "/lose"}?r=weight`, { replace: true });
      return;
    }

    if (Math.abs(tilt) >= MAX_TILT) {
      navigatedRef.current = true;
      setRunning(false);
      navigate(`${appRoutes.LOSE || "/lose"}?r=tilt`, { replace: true });
    }
  }, [coins, bars, tilt, running, navigate]);

  // const reset = () => {
  //   setItems([]);
  //   setCoins(0);
  //   setBars(0);
  //   setTilt(0);
  //   setLane(1);
  //   setRunning(true);
  //   setResult(null);
  //   navigatedRef.current = false;
  // };

  const tiltLabel =
    tilt === 0
      ? "Крен в норме"
      : `Крен: ${tilt < 0 ? "влево" : "вправо"} ${Math.abs(tilt)}/${MAX_TILT}`;
  const barsLabel = `Вес: ${bars}/${MAX_BARS}`;
  const barsLevel = Math.min(bars, MAX_BARS);
  const barsIcon = `/icons/game-statuses/weight-${barsLevel}.svg`;

  return (
    <div className="Game">
      {/* HUD */}
      <div className="Game__hud">
        <Score
          coins={coins}
          coinsTarget={TARGET_COINS}
          scrolls={scrolls}
          scrollsTarget={TARGET_SCROLLS}
        />
      </div>

      {/* Поле */}
      <div className="Game__field" style={{ ["--gutter" as any]: "64px" }}>
        <div
          className="Game__water"
          style={{ backgroundPosition: `center ${waterY}px` }}
          aria-hidden
        />
        <div
          className="Game__banks"
          style={{ ["--banks-y" as any]: `${waterY}px` }}
          aria-hidden
        />
        <div
          className="Game__side Game__side--left"
          style={{ backgroundPosition: `center ${housesY}px` }}
          aria-hidden
        />
        <div
          className="Game__side Game__side--right"
          style={{ backgroundPosition: `center ${housesY}px` }}
          aria-hidden
        />

        <div
          ref={playRef}
          className="Game__play"
          onPointerDown={onPointerDown}
          role="button"
          aria-label="Игровое поле"
        >
          <div className="lanes">
            {LANES.map((x, i) => (
              <div key={i} className="lane" style={{ left: `${x}%` }} />
            ))}
          </div>

          {items.map((it) => (
            <div
              key={it.id}
              className={`itm itm--${it.type}`}
              style={{ left: `${LANES[it.lane]}%`, top: it.y }}
            >
              <img src={SPRITES[it.type]} alt={it.type} draggable={false} />
            </div>
          ))}

          <div
            className="ship"
            style={{
              left: `${LANES[lane]}%`,
              transform: `translate(-50%,-50%)`,
            }}
          >
            <img src={shipSrc} alt="ship" draggable={false} />
          </div>

<div className="Game__gauges">
  {/* КРЕН: текст над иконкой и крутится вместе */}
  <div className={`gauge gauge--tilt ${tilt !== 0 ? "gauge--warn" : ""}`}>
    <div
      className="gauge__rotor"
      style={{ transform: `rotate(${dialAngle}deg)` }}
    >
      <img
        className="gauge__dial"
        src="/icons/game-statuses/ship-mid.svg"
        alt=""
      />
      {/* верхняя дуга */}
      <svg className="gauge__arc gauge__arc--top" viewBox="0 0 120 70" aria-hidden="true">
        <defs>
    <path id="arc-tilt-top" d="M 28 24 A 30 30 0 0 1 92 24" />
        </defs>
        <text className="gauge__text">
          <textPath href="#arc-tilt-top" startOffset="50%" textAnchor="middle">
            {tiltLabel}
          </textPath>
        </text>
      </svg>
    </div>
  </div>

  {/* ВЕС: текст над иконкой (без вращения) */}
  <div className={`gauge gauge--bars ${bars >= MAX_BARS ? "gauge--warn" : ""}`}>
    <img className="gauge__icon" src={barsIcon} alt="Вес" />
    <svg className="gauge__arc gauge__arc--top" viewBox="0 0 120 70" aria-hidden="true">
      <defs>
    <path id="arc-bars-top" d="M 28 24 A 30 30 0 0 1 92 24" />
      </defs>
      <text className="gauge__text">
        <textPath href="#arc-bars-top" startOffset="50%" textAnchor="middle">
          {barsLabel}
        </textPath>
      </text>
    </svg>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
