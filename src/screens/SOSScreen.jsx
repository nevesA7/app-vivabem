import { useState, useEffect } from "react";
import { C } from "../tokens/colors";
import { speak } from "../utils/speak";
import { Btn, Card, ScreenHeader } from "../components/UI";
import Icon from "../components/Icon";

const SOSScreen = ({ contacts, setScreen }) => {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    speak("Atenção! Tela de emergência aberta. Toque em Pedir Ajuda para alertar seus contatos.");
  }, []);

  const handleSend = () => {
    setSent(true);
    speak("Pedido de ajuda enviado. Seus contatos serão avisados. Fique calmo, a ajuda está chegando.");
  };

  return (
    <div style={{ padding: "0 16px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
      <ScreenHeader title="🆘 Emergência" subtitle="" onBack={() => setScreen("home")} />

      {!sent ? (
        <>
          <div
            style={{
              background: C.accentLight,
              border: `2px solid ${C.accent}`,
              borderRadius: 20,
              padding: 24,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 20, color: C.accent, fontWeight: 700, margin: "0 0 8px" }}>
              Precisa de socorro?
            </p>
            <p style={{ fontSize: 17, color: C.textMuted, margin: 0 }}>
              Toque no botão abaixo para alertar seus contatos de emergência.
            </p>
          </div>

          <Btn
            full
            color={C.accent}
            icon="sos"
            onClick={handleSend}
            style={{ fontSize: 22, padding: "22px 0", borderRadius: 20 }}
          >
            PEDIR AJUDA AGORA
          </Btn>

          <p style={{ textAlign: "center", fontSize: 16, color: C.textMuted }}>Ou ligue diretamente:</p>

          {[{ name: "SAMU", phone: "192" }, { name: "Bombeiros", phone: "193" }].map((e) => (
            <a key={e.phone} href={`tel:${e.phone}`} style={{ textDecoration: "none" }}>
              <Btn full color={C.blue} icon="phone" style={{ fontSize: 20, padding: "18px 0", borderRadius: 18 }}>
                {e.name} — {e.phone}
              </Btn>
            </a>
          ))}

          {contacts.length > 0 && (
            <Card>
              <p style={{ fontWeight: 700, fontSize: 17, margin: "0 0 12px", color: C.text }}>
                Seus contatos pessoais:
              </p>
              {contacts.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{c.name}</p>
                    <p style={{ margin: 0, fontSize: 14, color: C.textMuted }}>{c.rel}</p>
                  </div>
                  <a href={`tel:${c.phone}`} style={{ textDecoration: "none" }}>
                    <Btn sm color={C.accent}>Ligar</Btn>
                  </a>
                </div>
              ))}
            </Card>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <p style={{ fontSize: 24, fontWeight: 800, color: C.primary, margin: "0 0 12px" }}>
            Pedido enviado!
          </p>
          <p style={{ fontSize: 18, color: C.textMuted, margin: "0 0 32px" }}>
            Seus contatos foram avisados. Fique calmo — a ajuda está a caminho.
          </p>
          <Btn onClick={() => { setSent(false); setScreen("home"); }} color={C.primary} full>
            Voltar ao início
          </Btn>
        </div>
      )}
    </div>
  );
};

export default SOSScreen;
