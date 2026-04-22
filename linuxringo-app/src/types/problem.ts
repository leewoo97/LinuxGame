export type FileNode = "file" | FileTree;
export type FileTree = { [name: string]: FileNode };

export type ProblemType = "filesystem" | "output";
export type Level = "beginner" | "elementary" | "intermediate" | "advanced";

export interface Problem {
  id: string;
  type: ProblemType;
  level: Level;
  topic: string;
  tags: string[];
  instruction: string;
  hint?: string;

  // filesystem type
  before?: FileTree;
  after?: FileTree;

  // output type
  context?: FileTree;
  currentPath?: string;
  expectedOutput?: string;

  blocks: string[];
  answer: string[];
  acceptedAnswers: string[][];
  explanation: string;

  nextProblemId?: string;
}
