import { useState, useCallback } from "react";
import type { Problem } from "../types/problem";
import { shuffleArray } from "../utils/shuffle";
import { allProblems } from "../data/problems";

const PROGRESS_KEY = "linuxringo_completed";
const SESSION_SIZE = 5;

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted(ids: Set<string>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...ids]));
}

export function useQuizSession() {
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);
  const [sessionProblems, setSessionProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const startSession = useCallback((topic?: string) => {
    const pool = topic
      ? allProblems.filter((p) => p.topic === topic)
      : allProblems;
    const shuffled = shuffleArray(pool);
    const session = shuffled.slice(0, SESSION_SIZE);
    setSessionProblems(session);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSessionStarted(true);
  }, []);

  const currentProblem: Problem | null =
    sessionProblems[currentIndex] ?? null;

  const markCorrect = useCallback(() => {
    if (!currentProblem) return;
    setCorrectCount((c) => c + 1);
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(currentProblem.id);
      saveCompleted(next);
      return next;
    });
  }, [currentProblem]);

  const nextProblem = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const isSessionDone = sessionStarted && currentIndex >= sessionProblems.length;

  const totalCompleted = completed.size;
  const totalProblems = allProblems.length;

  return {
    sessionStarted,
    currentProblem,
    currentIndex,
    sessionTotal: sessionProblems.length,
    isSessionDone,
    correctCount,
    totalCompleted,
    totalProblems,
    startSession,
    markCorrect,
    nextProblem,
  };
}
