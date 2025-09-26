import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";
import "./Loading.scss";
import Loader from "../Loader/Loader";
import { preloadImages } from "../../utils/preloadImages";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp;
    const platform: string | undefined = tg?.platform;

    try {
      if (
        platform === "android" ||
        platform === "ios" ||
        platform === "android_x" ||
        platform === "unigram"
      ) {
        tg?.requestFullscreen?.();
      } else if (
        platform === "tdesktop" ||
        platform === "weba" ||
        platform === "webk" ||
        platform === "unknown"
      ) {
        tg?.exitFullscreen?.();
        tg?.setMinimumHeight?.(700);
      }
      tg?.expand?.();
    } catch {
      tg?.expand?.();
    }
    try {
      tg?.disableVerticalSwipes?.();
    } catch {}

    tg?.setHeaderColor?.("#f3f9ff");
    tg?.setBackgroundColor?.("#f3f9ff");
    tg?.setBottomBarColor?.("#f3f9ff");

    const parseQuery = (queryString: string) => {
      const q: Record<string, string> = {};
      const raw = (
        queryString[0] === "?" ? queryString.substring(1) : queryString
      ).split("&");
      for (const kv of raw) {
        if (!kv) continue;
        const [k, v] = kv.split("=");
        q[decodeURIComponent(k)] = decodeURIComponent(v || "");
      }
      return q;
    };

    const parseTgUserId = (): number | null => {
      try {
        const initData: string = tg?.initData ?? "";
        const userStr = parseQuery(initData).user;
        const user = userStr ? JSON.parse(userStr) : null;
        const id = user?.id ? Number(user.id) : NaN;
        return Number.isFinite(id) ? id : null;
      } catch {
        return null;
      }
    };

    const getUserIdFromQuery = (): number | null => {
      try {
        const p = new URLSearchParams(window.location.search).get("user_id");
        const id = p ? Number(p) : NaN;
        return Number.isFinite(id) ? id : null;
      } catch {
        return null;
      }
    };

    const effectiveUserId = parseTgUserId() ?? getUserIdFromQuery();
    // Чтобы TS не ругался на «неиспользуемо», а заодно можно дебажить:
    (window as any).__uid = effectiveUserId ?? null;

    // --- ассеты для прелоада ---
    const soonAssets = [
      // Loading / фон
      "/images/loader-waves.png",
      "/icons/loading-ship.svg",
      "/icons/loading-skull.svg",
      // Onboarding
      "/images/OnBoardingTop.svg",
      "/images/OnBoardingBotWBlur.png",
      "/images/OB1.jpg",
      "/images/OB2_houses.svg",
      "/images/OB2_ship.svg",
      "/icons/game-icons/coin.svg",
      // Hints
      "/images/hint-score.svg",
      "/images/info.svg",
      "/images/arrow-left.svg",
      "/images/arrow-right.svg",
      "/images/hints-overlay.svg",
      "/images/hints-overlay-dark.svg",
      "/images/hint-field.svg",
      "/icons/game-icons/goldbar.svg",
      "/icons/game-icons/skull-left.svg",
      "/icons/game-icons/skull-right.svg",
      "/icons/scrolls-3.svg",
      "/icons/game-statuses/ship-1left.svg",
      "/icons/game-statuses/ship-mid.svg",
      "/icons/game-statuses/weight-0.svg",
      "/icons/game-statuses/weight-1.svg",
      "/icons/game-statuses/weight-2.svg",
      "/icons/game-statuses/weight-3.svg",
      // Game
      "/images/game-water.svg",
      "/images/river-banks-mask.png",
      "/images/houses.svg",
      "/icons/game-boat/boat-full.svg",
      "/icons/game-boat/boat-1left.svg",
      "/icons/game-boat/boat-2left.svg",
      "/icons/game-boat/boat-leftmax.svg",
      "/icons/game-boat/boat-1right.svg",
      "/icons/game-boat/boat-2right.svg",
      "/icons/game-boat/boat-rightmax.svg",
      // Scrolls
      "/images/final.svg",
      "/icons/scrolls/open-scroll.png",
      "/images/scrolls-bg.png",
      "/icons/scrolls/scroll.svg",
      "/icons/scrolls/empty-scroll.svg",
      "/icons/ship-crashed.png",
    ];

    // --- тайминги ---
    const HARD_TIMEOUT_MS = 3000; // принудительный переход, если что-то зависло
    const EXTRA_AFTER_PRELOAD_MS = 2000; // +2 секунды «после прелоада» (как просил)

    let navigated = false;
    let afterTimer: number | undefined;

    const go = () => {
      if (navigated) return;
      navigated = true;
      navigate(appRoutes.ONBOARDING1, { replace: true });
    };

    const hard = window.setTimeout(go, HARD_TIMEOUT_MS);

    preloadImages(soonAssets).finally(() => {
      // даём ровно +2 секунды поверх фактической подгрузки
      afterTimer = window.setTimeout(() => {
        requestAnimationFrame(go);
      }, EXTRA_AFTER_PRELOAD_MS);
    });

    return () => {
      window.clearTimeout(hard);
      if (afterTimer) window.clearTimeout(afterTimer);
    };
  }, [navigate]);

  return (
    <div className="Loading">
      <div className="Loading__content">
        <div className="Loading__top">
          <img
            src="/icons/yandex-logo.svg"
            alt="Яндекс Книги"
            className="Loading__logo"
          />
          <img
            src="/icons/loading-skull.svg"
            alt="Pelevin Skull"
            className="Loading__skull"
          />
          <img
            src="/icons/a_sinistra.svg"
            alt="A Sinistra"
            className="Loading__sinistra"
          />
        </div>

        <div className="Loading__bot">
          <img
            src="/icons/loading-ship.svg"
            alt="Loading Ship"
            className="Loading__ship"
          />
          <Loader />
        </div>
      </div>
    </div>
  );
}
