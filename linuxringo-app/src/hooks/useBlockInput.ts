import { useState, useCallback } from "react";
import { shuffleArray } from "../utils/shuffle";

export function useBlockInput(initialBlocks: string[]) {
  const [paletteBlocks, setPaletteBlocks] = useState<string[]>(
    shuffleArray(initialBlocks)
  );
  const [inputBlocks, setInputBlocks] = useState<string[]>([]);

  const selectBlock = useCallback((text: string) => {
    setPaletteBlocks((prev) => {
      const idx = prev.indexOf(text);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
    setInputBlocks((prev) => [...prev, text]);
  }, []);

  const removeBlock = useCallback((index: number) => {
    setInputBlocks((prev) => {
      const removed = prev[index];
      const next = [...prev];
      next.splice(index, 1);
      setPaletteBlocks((p) => [...p, removed]);
      return next;
    });
  }, []);

  const resetBlocks = useCallback((blocks: string[]) => {
    setPaletteBlocks(shuffleArray(blocks));
    setInputBlocks([]);
  }, []);

  return { paletteBlocks, inputBlocks, selectBlock, removeBlock, resetBlocks };
}
