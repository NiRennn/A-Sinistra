import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./OnBoarding2.scss";
import appRoutes from "../../routes/routes";

export default function OnBoarding2() {
  const navigate = useNavigate();

  return (
    <div className="onboarding2">
      <div className="onboarding2__top">
        <img
          src="/images/OB2_houses.svg"
          alt="Houses"
          className="onboarding2__houses"
        />
        <img
          src="/images/OB2_ship.svg"
          alt="Ship"
          className="onboarding2__ship"
        />
        <img
          src="/icons/game-icons/coin.svg"
          alt="Coin"
          className="onboarding2__coin"
        />
      </div>

      <div className="onboarding2__bot">
        <div></div>
        <div className="onboarding2__bot-content">
          <h1 className="onboarding2__bot-title">Чувствуем, мы сработаемся!</h1>
          <p className="onboarding2__bot-text">
            Постарайтесь не топить и не перегружать гондолу. Небольшой совет:
            собирайте по пути бумажные свитки — они помогут больше узнать о
            нашей корпорации и вселенной
          </p>
        </div>

        <div className="onboarding2__bot-buttons">
          <Button
            text="Начать игру"
            uppercase
            bg="#FFCD11"
            color="#000000"
            onClick={() => navigate(appRoutes.HINTS)}
          />
        </div>
      </div>
    </div>
  );
}
