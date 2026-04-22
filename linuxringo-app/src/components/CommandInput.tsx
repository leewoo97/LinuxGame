import Block from "./Block";
import "./CommandInput.css";

interface Props {
  blocks: string[];
  onRemove: (index: number) => void;
}

export default function CommandInput({ blocks, onRemove }: Props) {
  return (
    <div className="command-input">
      <span className="command-input__prompt">$</span>
      <div className="command-input__area">
        {blocks.length === 0 ? (
          <span className="command-input__placeholder">
            아래 블록을 선택해 명령어를 조합하세요
          </span>
        ) : (
          blocks.map((b, i) => (
            <Block
              key={`${b}-${i}`}
              text={b}
              location="input"
              onClick={() => onRemove(i)}
            />
          ))
        )}
      </div>
    </div>
  );
}
