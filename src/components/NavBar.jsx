import { C } from "../tokens/colors";
import Icon from "./Icon";

const NAV_ITEMS = [
  { icon: "home",     label: "Início",   screen: "home" },
  { icon: "bell",     label: "Lembretes", screen: "reminders" },
  { icon: "calendar", label: "Consultas", screen: "appointments" },
  { icon: "chat",     label: "Ajuda",    screen: "chat" },
  { icon: "phone",    label: "Contatos", screen: "contacts" },
];

const NavBar = ({ current, setScreen }) => (
  <div
    style={{
      display: "flex",
      background: C.card,
      borderTop: `2px solid ${C.border}`,
      position: "sticky",
      bottom: 0,
      zIndex: 100,
    }}
  >
    {NAV_ITEMS.map((item) => {
      const active = current === item.screen || (current === "sos" && item.screen === "contacts");
      return (
        <button
          key={item.screen}
          onClick={() => setScreen(item.screen)}
          style={{
            flex: 1,
            border: "none",
            background: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0 8px",
            cursor: "pointer",
            borderTop: active ? `3px solid ${C.primary}` : "3px solid transparent",
          }}
        >
          <Icon name={item.icon} size={24} color={active ? C.primary : C.textMuted} />
          <span
            style={{
              fontSize: 11,
              color: active ? C.primary : C.textMuted,
              fontWeight: active ? 700 : 500,
              marginTop: 3,
            }}
          >
            {item.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default NavBar;
