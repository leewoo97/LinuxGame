import type { FileTree } from "../types/problem";

export function renderFileTree(
  tree: FileTree,
  rootName: string = ".",
  prefix: string = ""
): string {
  const lines: string[] = [`${rootName}/`];
  const entries = Object.entries(tree);

  entries.forEach(([name, value], index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";

    if (value === "file") {
      lines.push(`${prefix}${connector}${name}`);
    } else {
      lines.push(`${prefix}${connector}${name}/`);
      const childEntries = Object.entries(value as FileTree);
      childEntries.forEach(([childName, childValue], childIndex) => {
        const childIsLast = childIndex === childEntries.length - 1;
        const childConnector = childIsLast ? "└── " : "├── ";
        const grandChildPrefix = childIsLast ? "    " : "│   ";
        if (childValue === "file") {
          lines.push(`${prefix}${childPrefix}${childConnector}${childName}`);
        } else {
          lines.push(`${prefix}${childPrefix}${childConnector}${childName}/`);
          const grandChildEntries = Object.entries(childValue as FileTree);
          grandChildEntries.forEach(([gcName, gcValue], gcIndex) => {
            const gcIsLast = gcIndex === grandChildEntries.length - 1;
            const gcConnector = gcIsLast ? "└── " : "├── ";
            lines.push(
              `${prefix}${childPrefix}${grandChildPrefix}${gcConnector}${gcName}${gcValue === "file" ? "" : "/"}`
            );
          });
        }
      });
    }
  });

  return lines.join("\n");
}
