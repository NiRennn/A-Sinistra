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
            Добро пожаловать в корпорацию <br /> «TRANSHUMANISM INC.»
          </h1>
          <p className="onboarding1__bot-text">
            Мы всегда рады новым сотрудникам! Сразу к делу: ваш напарник Маркус
            Зоргенфрей уже отправился искать наших клиентов в XVI век.<br/><br /> Лучше вам
            не ждать и поплыть следом
          </p>
        </div>

        <div className="onboarding1__bot-buttons">
          <Button
            text="Отправиться к гондоле"
            bg="#FFFFFF"
            color="#000000"
            onClick={() => navigate(appRoutes.ONBOARDING2)}
          />
          <Button
            text="Слушать и читать A Sinistra в Яндекс Книгах"
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
