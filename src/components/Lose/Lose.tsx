import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import "./Lose.scss";
import appRoutes from "../../routes/routes";

type LoseReason = "tilt" | "weight";

type LoseProps = {
  reason?: LoseReason;
};
 
export default function Lose({ reason }: LoseProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const r: LoseReason =
    (reason ?? (params.get("r") as LoseReason)) === "weight"
      ? "weight"
      : "tilt";
 
  const content = useMemo(
    () =>
      r === "tilt"
        ? {
            icon: "/icons/game-statuses/ship-2right.svg",
            title: "Ваша гондола на дне",
            sub: "Крен стал слишком большой",
          }
        : {
            icon: "/icons/game-statuses/weight-3.svg",
            title: "Ваша гондола на дне",
            sub: "Вес стал невыносимо большим",
          },
    [r]
  );

  return (
    <div className={`lose lose--${r}`}>
      <img className="lose-score" src="/images/hint-score.svg" alt="" />
      <img
        className="itm itm--skullR"
        src="/icons/game-icons/skull-right.svg"
        alt=""
      />
      <img
        className="itm itm--skullL"
        src="/icons/game-icons/skull-left.svg"
        alt=""
      />
      <img className="itm itm--coin" src="/icons/game-icons/coin.svg" alt="" />
      <img
        className="itm itm--bar"
        src="/icons/game-icons/goldbar.svg"
        alt=""
      />
      <img
        className="status-bar-item left"
        src="/icons/game-statuses/ship-1left.svg"
        alt=""
      />
      <img
        className="status-bar-item right"
        src="/icons/game-statuses/weight-2.svg"
        alt=""
      />

      <div className="lose-under-overlay" aria-hidden />
      <img
        className="lose-overlay"
        src="/images/hints-overlay.svg"
        alt=""
        aria-hidden
      />

      <div className="lose__panel">
        <img
          className="lose__crashed"
          src="/icons/ship-crashed.png"
          alt=""
          aria-hidden
        />

        <div className="lose-info">
          <img className="lose__icon" src={content.icon} alt="" />
          <h2 className="lose__title">{content.title}</h2>
          <div className="lose__subtitle">{content.sub}</div>
        </div>

        <div className="lose__cta">
          <Button
            text="ПОВТОРИТЬ ПОПЫТКУ"
            bg="#000000"
            color="#FFFFFF"
            border="none"
            uppercase
            onClick={() => navigate(appRoutes.GAME, { replace: true })}
          />
          <Button
            text="ЗАВЕРШИТЬ ИГРУ"
            bg="transparent"
            color="#000000"
            border="1px solid #000000"
            uppercase
            blur={14}
            onClick={() => navigate(appRoutes.FINAL || "/", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
}
