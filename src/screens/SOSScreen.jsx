import { useState, useEffect } from "react";
import { C } from "../tokens/colors";
import { speak } from "../utils/speak";
import { Btn, Card, ScreenHeader } from "../components/UI";
import { getLocation, buildSosMessage, whatsappLink, smsLink } from "../utils/sos";

const SOSScreen = ({ contacts, setScreen }) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    speak("Atenção! Tela de emergência aberta. Toque em Pedir Ajuda para alertar seus contatos.");
  }, []);

  const handleSend = async () => {
    setSending(true);
    speak("Preparando seu pedido de ajuda. Aguarde um instante.");
    const loc = await getLocation();
    setMessage(buildSosMessage(loc));
    setSending(false);
    setSent(true);
    speak(
      contacts.length > 0
        ? "Mensagem pronta. Toque em cada contato para enviar. Em caso grave, ligue para o SAMU, um nove dois."
        : "Você ainda não tem contatos cadastrados. Ligue para o SAMU, um nove dois."
    );
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
            disabled={sending}
            style={{ fontSize: 22, padding: "22px 0", borderRadius: 20 }}
          >
            {sending ? "PREPARANDO..." : "PEDIR AJUDA AGORA"}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ textAlign: "center", padding: "16px 0 4px" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>📨</div>
            <p style={{ fontSize: 22, fontWeight: 800, color: C.primary, margin: "0 0 8px" }}>
              Mensagem pronta!
            </p>
            <p style={{ fontSize: 17, color: C.textMuted, margin: 0 }}>
              Toque em cada contato abaixo para enviar. O envio só acontece depois que você confirmar no aplicativo que abrir.
            </p>
          </div>

          <a href="tel:192" style={{ textDecoration: "none" }}>
            <Btn full color={C.accent} icon="phone" style={{ fontSize: 20, padding: "18px 0", borderRadius: 18 }}>
              Caso grave: ligar SAMU — 192
            </Btn>
          </a>

          {contacts.length > 0 ? (
            <Card>
              {contacts.map((c) => (
                <div key={c.id} style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                  <p style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700 }}>{c.name}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href={whatsappLink(c.phone, message)} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                      <Btn sm color={C.primary}>WhatsApp</Btn>
                    </a>
                    <a href={smsLink(c.phone, message)} style={{ textDecoration: "none" }}>
                      <Btn sm color={C.blue}>SMS</Btn>
                    </a>
                    <a href={`tel:${c.phone}`} style={{ textDecoration: "none" }}>
                      <Btn sm color={C.accent}>Ligar</Btn>
                    </a>
                  </div>
                </div>
              ))}
            </Card>
          ) : (
            <Card>
              <p style={{ margin: 0, fontSize: 17 }}>
                Você ainda não tem contatos cadastrados. Cadastre na aba Contatos para usar o envio rápido.
              </p>
            </Card>
          )}

          <Btn onClick={() => { setSent(false); setScreen("home"); }} color={C.primary} full>
            Voltar ao início
          </Btn>
        </div>
      )}
    </div>
  );
};

export default SOSScreen;
