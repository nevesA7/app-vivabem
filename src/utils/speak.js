// Lê texto em voz alta via Web Speech API (pt-BR)
export const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  u.rate = 0.88;
  window.speechSynthesis.speak(u);
};
