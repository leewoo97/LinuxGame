import { useEffect } from "react";
import type { Problem } from "../types/problem";
import { useBlockInput } from "../hooks/useBlockInput";
import { judgeAnswer } from "../utils/judgeAnswer";
import FileTreeView from "../components/FileTreeView";
import CommandInput from "../components/CommandInput";
import BlockPalette from "../components/BlockPalette";
import ProgressBar from "../components/ProgressBar";
import "./QuizScreen.css";

interface Props {
  problem: Problem;
  currentIndex: number;
  sessionTotal: number;
  onSubmit: (isCorrect: boolean, userBlocks: string[]) => void;
  onQuit: () => void;
}

export default function QuizScreen({
  problem,
  currentIndex,
  sessionTotal,
  onSubmit,
  onQuit,
}: Props) {
  const { paletteBlocks, inputBlocks, selectBlock, removeBlock, resetBlocks } =
    useBlockInput(problem.blocks);

  // Reset blocks when problem changes
  useEffect(() => {
    resetBlocks(problem.blocks);
  }, [problem.id, resetBlocks, problem.blocks]);

  function handleSubmit() {
    if (inputBlocks.length === 0) return;
    const correct = judgeAnswer(inputBlocks, problem.acceptedAnswers);
    onSubmit(correct, inputBlocks);
  }

  const tree = problem.type === "filesystem" ? problem.before : problem.context;
  const rootName =
    tree && Object.keys(tree).length === 1 ? Object.keys(tree)[0] : ".";

  return (
    <div className="quiz">
      <header className="quiz__header">
        <button className="quiz__quit-btn" onClick={onQuit} type="button">
          ✕
        </button>
        <div className="quiz__progress">
          <ProgressBar current={currentIndex} total={sessionTotal} />
        </div>
      </header>

      <div className="quiz__body">
        {/* Before 파일 구조 */}
        {tree && Object.keys(tree).length > 0 && (
          <section className="quiz__section">
            <FileTreeView
              tree={
                rootName !== "." && tree[rootName] && tree[rootName] !== "file"
                  ? (tree[rootName] as Record<string, unknown>) as Parameters<typeof FileTreeView>[0]["tree"]
                  : tree
              }
              rootName={rootName}
              label={problem.type === "filesystem" ? "Before" : "현재 구조"}
            />
          </section>
        )}

        {/* 문제 설명 */}
        <section className="quiz__instruction">
          <p className="quiz__instruction-text">{problem.instruction}</p>
          {problem.hint && (
            <p className="quiz__hint">💡 힌트: {problem.hint}</p>
          )}
        </section>

        {/* 명령어 입력 영역 */}
        <section className="quiz__section">
          <label className="quiz__label">내 명령어</label>
          <CommandInput blocks={inputBlocks} onRemove={removeBlock} />
        </section>

        {/* 블록 팔레트 */}
        <section className="quiz__section">
          <label className="quiz__label">사용 가능한 블록</label>
          <BlockPalette blocks={paletteBlocks} onSelect={selectBlock} />
        </section>
      </div>

      <footer className="quiz__footer">
        <button
          className="btn btn--primary btn--lg"
          onClick={handleSubmit}
          disabled={inputBlocks.length === 0}
          type="button"
        >
          제출하기
        </button>
      </footer>
    </div>
  );
}
