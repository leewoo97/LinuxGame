import Block from "./Block";
import "./BlockPalette.css";

interface Props {
  blocks: string[];
  onSelect: (text: string) => void;
}

export default function BlockPalette({ blocks, onSelect }: Props) {
  return (
    <div className="block-palette">
      {blocks.map((b, i) => (
        <Block
          key={`${b}-${i}`}
          text={b}
          location="palette"
          onClick={() => onSelect(b)}
        />
      ))}
    </div>
  );
}
