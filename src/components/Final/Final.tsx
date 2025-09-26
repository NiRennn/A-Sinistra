import "./Final.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";

export default function Final() {
  const navigate = useNavigate();

  return (
    <div className="final">
      <div className="final__top">
        <img src="/images/final.svg" alt="Final" className="final__top-image" />
      </div>
      <div className="final__bot">
        <div className="final__bot-content">
          <h1 className="final__bot-title">
            Вы справились! <br /> И готовы к следующему уровню
          </h1>
          <p className="final__bot-text">
            Маркус уже ждёт вас в Яндекс Книгах — он сильно продвинулся в деле и
            ему очень нужна ваша помощь.
          </p>
        </div>

        <div className="final__bot-buttons">
          <Button
            text="Слушать и читать A Sinistra в Яндекс Книгах"
            bg="#FFCD11"
            color="#000000"
            onClick={() => navigate(appRoutes.GAME)}
          />
          <div className="final__bot_buttons-bot">
            <button
              className="final__bot-restart"
              onClick={() => navigate(appRoutes.GAME)}
            >
              <img src="/icons/restart.svg" alt="" />
            </button>
            <button
              className="final__bot-btn"
              onClick={() => navigate(appRoutes.SCROLLS)}
            >
              <p>МОИ СВИТКИ</p>
              <img src="/icons/scrolls/scroll.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
