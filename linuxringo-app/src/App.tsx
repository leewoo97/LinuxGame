import { useState } from 'react'
import { useQuizSession } from "./hooks/useQuizSession";
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import SessionCompleteScreen from "./screens/SessionCompleteScreen";
import SplashScreen from "./screens/SplashScreen";
import type { Problem } from "./types/problem";
import './App.css'

type Screen = "home" | "quiz" | "feedback" | "complete";

function App() {
  const {
    currentProblem,
    currentIndex,
    sessionTotal,
    correctCount,
    totalCompleted,
    startSession,
    markCorrect,
    nextProblem,
  } = useQuizSession();

  const [screen, setScreen] = useState<Screen>("home");
  const [lastAnswer, setLastAnswer] = useState<string[]>([]);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastProblem, setLastProblem] = useState<Problem | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | undefined>(undefined);
  const [showSplash, setShowSplash] = useState(true);

  function handleStart(topic?: string) {
    setActiveTopic(topic);
    startSession(topic);
    setScreen("quiz");
  }

  function handleSubmit(isCorrect: boolean, userBlocks: string[]) {
    setLastCorrect(isCorrect);
    setLastAnswer(userBlocks);
    setLastProblem(currentProblem);
    if (isCorrect) markCorrect();
    setScreen("feedback");
  }

  function onFeedbackNext() {
    const nextIndex = currentIndex + 1;
    nextProblem();
    if (nextIndex >= sessionTotal) {
      setScreen("complete");
    } else {
      setScreen("quiz");
    }
  }

  function handleQuit() {
    setScreen("home");
  }

  function handleRestart() {
    handleStart(activeTopic);
  }

  return (
    <div className="app">
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      {screen === "home" && (
        <HomeScreen totalCompleted={totalCompleted} onStart={handleStart} />
      )}
      {screen === "quiz" && currentProblem && (
        <QuizScreen
          problem={currentProblem}
          currentIndex={currentIndex}
          sessionTotal={sessionTotal}
          onSubmit={handleSubmit}
          onQuit={handleQuit}
        />
      )}
      {screen === "feedback" && lastProblem && (
        <FeedbackScreen
          isCorrect={lastCorrect}
          problem={lastProblem}
          userAnswer={lastAnswer}
          onNext={onFeedbackNext}
        />
      )}
      {screen === "complete" && (
        <SessionCompleteScreen
          correctCount={correctCount}
          sessionTotal={sessionTotal}
          onRestart={handleRestart}
          onHome={handleQuit}
        />
      )}
    </div>
  );
}

export default App
