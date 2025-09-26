import { useState } from "react";
import "./Hints.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";

// type HintsProps = {
//   onFinish?: () => void;
// };

export default function Hints() {
  const [step, setStep] = useState(0);
  const TOTAL = 3;

  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(TOTAL - 1, s + 1));
  const goto = (i: number) => setStep(i);

  const handleCTA = () => {
    if (step === TOTAL - 1) {
      navigate(appRoutes.GAME);
    } else {
      next();
    }
  };

  return (
    <div className="hints">
      <img className="hint-score" src="/images/hint-score.svg" alt="" />
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

      <div className="hint-under-overlay" aria-hidden />

      {step === 0 && (
        <img
          className="hint-overlay"
          src="/images/hints-overlay.svg"
          alt=""
          aria-hidden="true"
        />
      )}

      {step === 1 && (
        <img
          className="hint-overlay"
          src="/images/hints-overlay.svg"
          alt=""
          aria-hidden="true"
        />
      )}

      {step === 2 && (
        <img
          className="hint-overlay dark"
          src="/images/hints-overlay-dark.svg"
          alt=""
          aria-hidden="true"
        />
      )}

      {/* обучающий оверлей */}
      <div className="tut" role="dialog" aria-modal="true">
        {step === 0 && (
          <div className="tut__content tut__content--center">
            <img
              className="tut__badge"
              src="/images/info.svg"
              alt=""
              aria-hidden
            />

            <h2 className="tut__title">
              Это твоя гондола
              <br />
              управляй ей нажатиями
              <br />в левую или правую часть экрана
            </h2>

            <div className="tut__art tut__art--boat">
              <img
                src="/images/arrow-left.svg"
                className="arrow arrow--left"
                alt=""
                aria-hidden
              />
              <img
                src="/icons/game-boat/boat-full.svg"
                className="boat"
                alt=""
              />
              <img
                src="/images/arrow-right.svg"
                className="arrow arrow--right"
                alt=""
                aria-hidden
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="tut__content tut__content--center">
            <img
              className="tut__badge"
              src="/images/info.svg"
              alt=""
              aria-hidden
            />

            <h2 className="tut__title">
              Маски накреняют твоё судно,
              <br />
              старайся держать уровень крена
              <br />
              по центру
            </h2>

            <div className="tut__art tut__art--tilt">
              <img
                className="mask mask--left"
                src="/icons/game-icons/skull-left.svg"
                alt=""
              />
              <img
                className="gauge"
                src="/icons/game-statuses/ship-1left.svg"
                alt=""
              />
              <img
                className="mask mask--right"
                src="/icons/game-icons/skull-right.svg"
                alt=""
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="tut__content tut__content--list">
            <ul className="tut__cards">
              <li className="card">
                <img src="/icons/game-icons/coin.svg" alt="" />
                <p>
                  Соберите <b>20 монет</b>
                  <br />
                  чтобы пройти игру
                </p>
              </li>
              <li className="card gold-icon">
                <img
                  src="/icons/game-icons/goldbar.svg"
                  alt=""
                  className="scroll-icon"
                />
                <p>
                  Золотые слитки тянут
                  <br />
                  гондолу ко дну
                </p>
              </li>
              <li className="card">
                <img src="/icons/game-statuses/weight-2.svg" alt="" />
                <p>
                  Следите за весом
                  <br />
                  три слитка — вы на дне!
                </p>
              </li>
              <li className="card">
                <img src="/icons/game-statuses/ship-mid.svg" alt="" />
                <p>
                  Не забывайте следить
                  <br />
                  за уровнем крена
                </p>
              </li>
              <li className="card">
                <img
                  src="/icons/scrolls-3.svg"
                  alt=""
                  className="scroll-icon"
                />
                <p>
                  Собирайте свитки
                  <br />с тайным писанием
                </p>
              </li>
            </ul>
          </div>
        )}

        <div className="tut__dots" aria-label="Навигация по обучению">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              className={`${step === 2 ? "dot-dark" : "dot"} ${
                i === step ? "is-active" : ""
              }`}
              onClick={() => goto(i)}
              aria-label={`Экран ${i + 1}`}
            />
          ))}
        </div>

        <div className="tut__cta">
          <Button
            text={step === TOTAL - 1 ? "НАЧАТЬ ИГРУ!" : "ПРОДОЛЖИТЬ"}
            bg={step === TOTAL - 1 ? "#FFFFFF" : "#000000"}
            color={step === TOTAL - 1 ? "#000000" : "#FFFFFF"}
            border="none"
            uppercase
            onClick={handleCTA}
          />
        </div>
      </div>
    </div>
  );
}
