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
          <h1 className="onboarding2__bot-title">
            Заголовок онбординга <br /> в две строки
          </h1>
          <p className="onboarding2__bot-text">
            Lorem ipsum dolor sit amet consectetur. Congue ante donec viverra
            luctus laoreet. Gravida a lacinia lobortis vestibulum. Pretium enim
            feugiat viverra pellentesque sagittis pulvinar id. Neque ante
            adipiscing integer cras convallis cursus.
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
