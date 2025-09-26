import "./Loader.scss";

export default function Loader() {
  return (
    <div className="Loader" aria-label="Загрузка">
      <img className="Loader__bg" src="/icons/loader.svg" alt="" aria-hidden="true" />
      <p className="Loader__text" aria-live="polite">
        Загрузка<span className="Loader__dots" />
      </p>
    </div>
  );
}
 