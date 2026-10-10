import { useState, useEffect, useCallback } from "react";

export const SCREENS = ["home", "reminders", "appointments", "chat", "contacts", "sos"];

const read = () => {
  const h = window.location.hash.replace(/^#\/?/, "");
  return SCREENS.includes(h) ? h : "home";
};

// Roteamento por hash (#/lembretes -> URLs por tela e botão "voltar" do navegador funcionando)
export const useRoute = () => {
  const [screen, setScreenState] = useState(read);

  useEffect(() => {
    const onChange = () => setScreenState(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const setScreen = useCallback((next) => {
    const target = SCREENS.includes(next) ? next : "home";
    if (read() === target && window.location.hash) return;
    window.location.hash = `/${target}`;
  }, []);

  return [screen, setScreen];
};
