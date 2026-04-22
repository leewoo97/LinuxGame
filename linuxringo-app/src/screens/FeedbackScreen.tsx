import type { Problem } from "../types/problem";
import FileTreeView from "../components/FileTreeView";
import { getPartialFeedback } from "../utils/judgeAnswer";
import "./FeedbackScreen.css";

interface Props {
  isCorrect: boolean;
  problem: Problem;
  userAnswer: string[];
  onNext: () => void;
}

export default function FeedbackScreen({
  isCorrect,
  problem,
  userAnswer,
  onNext,
}: Props) {
  const afterTree =
    problem.type === "filesystem" && problem.after ? problem.after : null;
  const afterRootName =
    afterTree && Object.keys(afterTree).length === 1
      ? Object.keys(afterTree)[0]
      : ".";
  const hint = isCorrect ? null : getPartialFeedback(userAnswer, problem.answer);

  return (
    <div className="feedback">
      {/* Scrollable upper area */}
      <div className="feedback__content">
        {/* Answer display */}
        <div className="feedback__answer-card">
          <div className="feedback__answer-row">
            <span className="feedback__answer-label">내 답</span>
            <code className={`feedback__code ${isCorrect ? "feedback__code--correct" : "feedback__code--wrong"}`}>
              {userAnswer.join(" ") || "(없음)"}
            </code>
          </div>
          {!isCorrect && (
            <div className="feedback__answer-row">
              <span className="feedback__answer-label">정답</span>
              <code className="feedback__code feedback__code--show">
                {problem.answer.join(" ")}
              </code>
            </div>
          )}
        </div>

        {/* After file tree (correct + filesystem) */}
        {isCorrect && afterTree && (
          <div className="feedback__after">
            <FileTreeView
              tree={
                afterRootName !== "." &&
                afterTree[afterRootName] &&
                afterTree[afterRootName] !== "file"
                  ? (afterTree[afterRootName] as Parameters<typeof FileTreeView>[0]["tree"])
                  : afterTree
              }
              rootName={afterRootName}
              label="After"
            />
          </div>
        )}
      </div>

      {/* Duolingo-style bottom result panel */}
      <div className={`feedback__panel feedback__panel--${isCorrect ? "correct" : "wrong"}`}>
        <div className="feedback__panel-inner">
          <div className="feedback__result-row">
            <span className="feedback__result-icon">
              {isCorrect ? "✓" : "✗"}
            </span>
            <div className="feedback__result-texts">
              <p className="feedback__result-title">
                {isCorrect ? "훌륭해요!" : "정답을 확인하세요"}
              </p>
              {hint && <p className="feedback__hint-text">{hint}</p>}
              <p className="feedback__explanation">{problem.explanation}</p>
            </div>
          </div>
          <button
            className={`feedback__continue-btn btn btn--lg feedback__continue-btn--${isCorrect ? "correct" : "wrong"}`}
            onClick={onNext}
            type="button"
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
