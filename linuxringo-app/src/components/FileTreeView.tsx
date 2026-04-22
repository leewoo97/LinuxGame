import type { FileTree } from "../types/problem";
import { renderFileTree } from "../utils/renderFileTree";
import "./FileTreeView.css";

interface Props {
  tree: FileTree;
  rootName?: string;
  label?: string;
}

export default function FileTreeView({ tree, rootName = ".", label }: Props) {
  const text = renderFileTree(tree, rootName);
  return (
    <div className="file-tree-view">
      {label && <span className="file-tree-label">{label}</span>}
      <pre className="file-tree-pre">{text}</pre>
    </div>
  );
}
