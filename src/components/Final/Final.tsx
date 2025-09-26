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
            Заголовок онбординга в две строки
          </h1>
          <p className="final__bot-text">
            Lorem ipsum dolor sit amet consectetur. Congue ante donec viverra
            luctus laoreet. Gravida a lacinia lobortis vestibulum. Pretium enim
            feugiat viverra pellentesque sagittis pulvinar id. Neque ante
            adipiscing integer cras convallis cursus.
          </p>
        </div>

        <div className="final__bot-buttons">
          <Button
            text="Продолжи путь в Яндекс Книгах"
            uppercase
            bg="#FFCD11"
            color="#000000"
            onClick={() => navigate(appRoutes.GAME)}
          />
          <Button
            text="Мои свитки"
            uppercase
            bg="transparent"
            color="#FFFFFF"
            border="1px solid #FFFFFF"
            onClick={() => navigate(appRoutes.SCROLLS)}
          />
        </div>
      </div>
    </div>
  );
}
