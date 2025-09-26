import { useState } from "react";
import Button from "../Button/Button";
import "./Scrolls.scss";

type ScrollsProps = {
  collected?: number[];
  onOpen?: (id: number) => void;
};

export default function Scrolls({
  collected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  onOpen,
}: ScrollsProps) {
  const TOTAL = 30;
  const [openId, setOpenId] = useState<number | null>(null);

  const isCollected = (n: number) => collected.includes(n);

  const handleOpen = (n: number) => {
    if (!isCollected(n)) return;
    onOpen?.(n);
    setOpenId(n);
  };
  
  return (
    <div className="scrolls">
      <header className="scrolls__hdr">
        <div className="hdr__title">Мои свитки</div>
        <p className="hdr__hint">
          Нажмите на свиток,
          <br /> чтобы прочесть его
        </p>
      </header>

      <main className="scrolls__grid" role="grid" aria-label="Список свитков">
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => {
          const taken = isCollected(n);
          return (
            <button
              key={n}
              role="gridcell"
              className={`slot ${taken ? "slot--full" : "slot--empty"}`}
              onClick={() => handleOpen(n)}
              aria-label={taken ? `Свиток ${n}` : `Пусто ${n}`}
            >
              {taken ? (
                <>
                  <img
                    src="/icons/scrolls/scroll.svg"
                    alt=""
                    className="slot__img"
                    draggable={false}
                  />
                  <span className="slot__badge">{n}</span>
                </>
              ) : (
                <>
                  <img
                    src="/icons/scrolls/empty-scroll.svg"
                    alt=""
                    className="slot__img"
                    draggable={false}
                  />
                  <span className="slot__empty-badge">{n}</span>
                </>
              )}
            </button>
          );
        })}
      </main>

      {openId !== null && (
        <div
          className="scrolls__modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <div className=""></div>
            <div className="modal__scroll">
              <span className="modal__seal">{openId}</span>
              <p className="modal__text">
                Lorem ipsum dolor sit amet consectetur. Tortor fames viverra
                habitant proin. Ornare suspendisse varius mattis non nisl in. Ut
                ut iaculis dictumst tellus viverra tincidunt.
              </p>
            </div>

            <div className="modal__cta">
              <Button
                text="ЗАКРЫТЬ"
                bg="#FFFFFF"
                color="#000000"
                onClick={() => setOpenId(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
