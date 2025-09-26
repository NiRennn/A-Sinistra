import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./OnBoarding1.scss";
import appRoutes from "../../routes/routes";

export default function OnBoarding1() {
  const navigate = useNavigate();
 
  return (
    <div className="onboarding1">
      <div className="onboarding1__top">
        <img
          src="/images/OB1.jpg"
          alt="Pelevin Cover"
          className="onboarding1__card"
        />
      </div> 
      <div className="onboarding1__bot">
        <div className="onboarding1__bot-content">
          <h1 className="onboarding1__bot-title">
            Заголовок онбординга <br /> в две строки
          </h1>
          <p className="onboarding1__bot-text">
            Lorem ipsum dolor sit amet consectetur. Congue ante donec viverra
            luctus laoreet. Gravida a lacinia lobortis vestibulum. Pretium enim
            feugiat viverra pellentesque sagittis pulvinar id. Neque ante
            adipiscing integer cras convallis cursus.
          </p>
        </div>

        <div className="onboarding1__bot-buttons">
          <Button
            text="Продолжить"
            bg="#FFFFFF"
            color="#000000"
            onClick={() => navigate(appRoutes.ONBOARDING2)}
          />
          <Button
            text="Читать или слушать книгу"
            bg="#FFFFFF14"
            color="#FFFFFF"
            border="1px solid rgba(255,255,255,0.2)"
            glass
            blur={14}
            onClick={() => navigate(appRoutes.ONBOARDING2)}
          />
        </div>
      </div>
    </div>
  );
}
