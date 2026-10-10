import { C } from "../tokens/colors";
import { Card } from "../components/UI";
import Icon from "../components/Icon";

const HomeScreen = ({ setScreen, reminders }) => {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const upcoming = reminders.filter((r) => r.active).slice(0, 3);

  return (
    <div style={{ padding: "0 0 24px" }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.primary} 0%, #3a8a5f 100%)`,
          padding: "32px 24px 28px",
          borderRadius: "0 0 28px 28px",
          color: "#fff",
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 18, margin: "0 0 4px", opacity: 0.85 }}>{greeting}! 👋</p>
        <h1 style={{ fontSize: 28, margin: "0 0 6px", fontWeight: 800 }}>VivaBem</h1>
        <p style={{ fontSize: 16, margin: 0, opacity: 0.8 }}>
          {now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Banner SOS */}
        <div
          onClick={() => setScreen("sos")}
          style={{
            background: `linear-gradient(135deg, ${C.accent} 0%, #c0392b 100%)`,
            borderRadius: 20,
            padding: "20px 24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: `0 4px 18px rgba(231,111,81,0.4)`,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              borderRadius: "50%",
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="sos" size={30} color="#fff" />
          </div>
          <div>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 2px" }}>Botão SOS</p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, margin: 0 }}>
              Precisa de ajuda urgente? Toque aqui
            </p>
          </div>
        </div>

        {/* Ações rápidas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { icon: "bell",     label: "Lembretes",  screen: "reminders",    bg: C.primaryLight, color: C.primary },
            { icon: "calendar", label: "Consultas",   screen: "appointments", bg: C.blueLight,    color: C.blue },
            { icon: "chat",     label: "Assistente",  screen: "chat",         bg: C.warnLight,    color: "#b05a00" },
            { icon: "phone",    label: "Contatos",    screen: "contacts",     bg: C.accentLight,  color: C.accent },
          ].map((item) => (
            <div
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              style={{
                background: item.bg,
                borderRadius: 20,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                border: "2px solid transparent",
                transition: "box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              }}
            >
              <Icon name={item.icon} size={32} color={item.color} />
              <span style={{ fontSize: 17, fontWeight: 700, color: item.color }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Lembretes do dia */}
        {upcoming.length > 0 ? (
          <Card>
            <p style={{ fontSize: 17, fontWeight: 700, color: C.textMuted, margin: "0 0 12px" }}>
              📋 Lembretes de hoje
            </p>
            {upcoming.map((r) => (
              <div
                key={r.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <Icon name="pill" size={22} color={C.primary} />
                <div>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text }}>{r.name}</p>
                  <p style={{ margin: 0, fontSize: 15, color: C.textMuted }}>{r.time}</p>
                </div>
              </div>
            ))}
          </Card>
        ) : (
          <Card style={{ textAlign: "center", padding: 28 }}>
            <p style={{ fontSize: 18, color: C.textMuted, margin: 0 }}>
              Nenhum lembrete ativo ainda.{" "}
              <span
                onClick={() => setScreen("reminders")}
                style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}
              >
                Adicionar
              </span>
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
