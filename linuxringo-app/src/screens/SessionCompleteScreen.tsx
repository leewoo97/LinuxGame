import "./SessionCompleteScreen.css";

interface Props {
  correctCount: number;
  sessionTotal: number;
  onRestart: () => void;
  onHome: () => void;
}

export default function SessionCompleteScreen({
  correctCount,
  sessionTotal,
  onRestart,
  onHome,
}: Props) {
  const pct =
    sessionTotal === 0 ? 0 : Math.round((correctCount / sessionTotal) * 100);
  const isPerfect = pct === 100;
  const isGood = pct >= 60;

  const emoji = isPerfect ? "🏆" : isGood ? "🎉" : "💪";
  const message = isPerfect
    ? "완벽해요! 모두 맞혔어요!"
    : isGood
    ? "잘했어요! 계속 연습하면 완벽해질 거예요."
    : "괜찮아요, 반복이 실력을 만듭니다!";

  return (
    <div className="complete">
      {/* Decorative dots */}
      <div className="complete__confetti" aria-hidden="true">
        {["🟢", "🔵", "🟡", "🔴", "🟣"].map((c, i) => (
          <span key={i} className="complete__dot" style={{ animationDelay: `${i * 0.1}s` }}>{c}</span>
        ))}
      </div>

      <div className="complete__body">
        <div className="complete__emoji">{emoji}</div>
        <h1 className="complete__title">세션 완료!</h1>

        {/* Score ring */}
        <div className="complete__ring-wrap">
          <svg className="complete__ring-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E5E5" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke={isPerfect ? "#FFC800" : isGood ? "#58CC02" : "#1CB0F6"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div className="complete__ring-label">
            <span className="complete__ring-pct">{pct}%</span>
            <span className="complete__ring-sub">정확도</span>
          </div>
        </div>

        <div className="complete__score-row">
          <div className="complete__score-box complete__score-box--correct">
            <span className="complete__score-icon">✓</span>
            <span className="complete__score-num">{correctCount}</span>
            <span className="complete__score-lbl">정답</span>
          </div>
          <div className="complete__score-box complete__score-box--wrong">
            <span className="complete__score-icon">✗</span>
            <span className="complete__score-num">{sessionTotal - correctCount}</span>
            <span className="complete__score-lbl">오답</span>
          </div>
        </div>

        <p className="complete__message">{message}</p>
      </div>

      <div className="complete__actions">
        <button className="btn btn--secondary" onClick={onRestart} type="button">
          🔄 다시 풀기
        </button>
        <button className="btn btn--primary" onClick={onHome} type="button">
          🏠 홈으로
        </button>
      </div>
    </div>
  );
}
