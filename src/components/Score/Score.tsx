import "./Score.scss";

type ScoreProps = {
  coins: number;
  coinsTarget: number;
  scrolls: number;
  scrollsTarget: number;
};

export default function Score({
  coins,
  coinsTarget,
  scrolls,
  scrollsTarget,
}: ScoreProps) {
  return (
    <div className="score">
      <div className="score__bg">
        <span className="score__val">
          {" "}
          {coins}/{coinsTarget}
        </span>

        <span className="score__val">
          {scrolls}/{scrollsTarget}
        </span>
      </div>
    </div>
  );
}
