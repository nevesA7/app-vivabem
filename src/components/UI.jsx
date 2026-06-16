import { C, BASE_FONT } from "../tokens/colors";
import Icon from "./Icon";

// ── Botão principal ──────────────────────────
export const Btn = ({
  children,
  onClick,
  color = C.primary,
  textColor = "#fff",
  icon,
  full,
  sm,
  disabled,
  style = {},
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: disabled ? C.border : color,
      color: disabled ? C.textMuted : textColor,
      border: "none",
      borderRadius: 16,
      padding: sm ? "12px 20px" : "18px 28px",
      fontSize: sm ? 17 : BASE_FONT,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      width: full ? "100%" : "auto",
      fontFamily: "inherit",
      boxShadow: disabled ? "none" : "0 3px 10px rgba(0,0,0,0.13)",
      transition: "transform 0.1s",
      ...style,
    }}
    onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
    onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    onTouchStart={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
    onTouchEnd={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
  >
    {icon && <Icon name={icon} size={sm ? 20 : 24} color={disabled ? C.textMuted : textColor} />}
    {children}
  </button>
);

// ── Card ─────────────────────────────────────
export const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: C.card,
      borderRadius: 20,
      padding: "20px 22px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      border: `1px solid ${C.border}`,
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Tag / Badge ───────────────────────────────
export const Tag = ({ children, color = C.primaryLight, textColor = C.primary }) => (
  <span
    style={{
      background: color,
      color: textColor,
      borderRadius: 99,
      padding: "4px 14px",
      fontSize: 15,
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);

// ── Toast de feedback ─────────────────────────
export const Toast = ({ msg }) => (
  <div
    style={{
      background: C.primary,
      color: "#fff",
      borderRadius: 14,
      padding: "14px 20px",
      fontSize: 17,
      fontWeight: 600,
      textAlign: "center",
      boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    }}
  >
    {msg}
  </div>
);

// ── Cabeçalho de tela ─────────────────────────
export const ScreenHeader = ({ title, subtitle, onBack }) => (
  <div
    style={{
      background: C.card,
      padding: "20px 20px 16px",
      borderBottom: `1px solid ${C.border}`,
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}
  >
    <button
      onClick={onBack}
      style={{
        background: C.bg,
        border: "none",
        borderRadius: 12,
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <Icon name="arrow_left" size={22} color={C.text} />
    </button>
    <div>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text }}>{title}</h2>
      {subtitle && <p style={{ margin: 0, fontSize: 15, color: C.textMuted }}>{subtitle}</p>}
    </div>
  </div>
);
