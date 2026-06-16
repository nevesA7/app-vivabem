import { C, BASE_FONT } from "../tokens/colors";

export const labelStyle = {
  display: "block",
  fontSize: 16,
  fontWeight: 700,
  color: C.textMuted,
  marginBottom: 6,
  marginTop: 12,
};

export const inputStyle = {
  width: "100%",
  fontSize: BASE_FONT - 2,
  padding: "14px 16px",
  borderRadius: 14,
  border: `2px solid ${C.border}`,
  background: C.bg,
  color: C.text,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

export const iconBtn = (bg) => ({
  background: bg,
  border: "none",
  borderRadius: 12,
  width: 42,
  height: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
});
