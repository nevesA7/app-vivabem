import { useState } from "react";

// Storage helper com fallback in-memory via sessionStorage
export const useLocalState = (key, initial) => {
  const [val, setVal] = useState(() => {
    try {
      const s = sessionStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch {
      return initial;
    }
  });

  const save = (v) => {
    setVal(v);
    try {
      sessionStorage.setItem(key, JSON.stringify(v));
    } catch {}
  };

  return [val, save];
};
