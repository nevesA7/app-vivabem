import { useState, useRef, useEffect } from "react";
import { C } from "../tokens/colors";
import { inputStyle } from "../utils/styles";
import { speak } from "../utils/speak";
import { askClaude } from "../utils/askClaude";
import { Btn, ScreenHeader } from "../components/UI";
import Icon from "../components/Icon";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Olá! Sou o assistente VivaBem. Estou aqui para te ajudar com dúvidas de saúde, medicamentos, ou qualquer outra coisa. Como posso te ajudar hoje? 😊",
};

const ChatScreen = ({ setScreen }) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const apiMsgs = next.map((m) => ({ role: m.role, content: m.content }));
      const reply = await askClaude(apiMsgs);
      setMessages([...next, { role: "assistant", content: reply }]);
      speak(reply);
    } catch {
      setMessages([...next, { role: "assistant", content: "Desculpe, tive um problema para responder. Tente novamente." }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", paddingBottom: 0 }}>
      <ScreenHeader title="🤖 Assistente" subtitle="Pergunte o que quiser" onBack={() => setScreen("home")} />

      {/* Mensagens */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                maxWidth: "82%",
                background: m.role === "user" ? C.primary : C.card,
                color: m.role === "user" ? "#fff" : C.text,
                borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                padding: "14px 18px",
                fontSize: 18,
                lineHeight: 1.5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: m.role === "assistant" ? `1px solid ${C.border}` : "none",
              }}
            >
              {m.content}
              {m.role === "assistant" && (
                <button
                  onClick={() => speak(m.content)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.textMuted,
                    fontSize: 13,
                  }}
                >
                  <Icon name="volume" size={14} color={C.textMuted} /> Ouvir
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: C.card,
                borderRadius: "20px 20px 20px 4px",
                padding: "14px 20px",
                fontSize: 22,
                border: `1px solid ${C.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <span style={{ animation: "pulse 1.2s infinite" }}>⏳ Pensando...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Digite sua pergunta..."
          rows={2}
          style={{ ...inputStyle, flex: 1, resize: "none", margin: 0, fontSize: 18, padding: "12px 16px", borderRadius: 16 }}
        />
        <Btn
          onClick={send}
          icon="send"
          disabled={!input.trim() || loading}
          style={{ padding: "16px 18px", borderRadius: 16 }}
        >
          Enviar
        </Btn>
      </div>
    </div>
  );
};

export default ChatScreen;
