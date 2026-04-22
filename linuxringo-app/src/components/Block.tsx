import "./Block.css";

type BlockVariant = "command" | "option" | "path";

interface Props {
  text: string;
  variant?: BlockVariant;
  location: "palette" | "input";
  onClick: () => void;
}

function detectVariant(text: string): BlockVariant {
  if (text.startsWith("-")) return "option";
  const commands = ["rm", "cp", "mv", "mkdir", "touch", "ls", "pwd", "cat", "cd", "grep", "find"];
  if (commands.includes(text)) return "command";
  return "path";
}

export default function Block({ text, variant, location, onClick }: Props) {
  const v = variant ?? detectVariant(text);
  return (
    <button
      className={`block block--${v} block--${location}`}
      onClick={onClick}
      type="button"
      aria-label={location === "palette" ? `블록 추가: ${text}` : `블록 제거: ${text}`}
    >
      {text}
    </button>
  );
}
