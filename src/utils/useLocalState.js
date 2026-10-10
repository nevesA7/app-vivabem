import { useState } from "react";

// Persistência em localStorage (sobrevive ao fechar a aba), com fallback em memória
// caso o storage esteja indisponível (modo privado, quota cheia etc.).
export const useLocalState = (key, initial) => {
  const storageKey = `vivabem:${key}`;

  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(storageKey);
      return s ? JSON.parse(s) : initial;
    } catch {
      return initial;
    }
  });

  const save = (v) => {
    setVal(v);
    try {
      localStorage.setItem(storageKey, JSON.stringify(v));
    } catch {
      // sem storage: mantém só em memória
    }
  };

  return [val, save];
};
