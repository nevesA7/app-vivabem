import { useState } from "react";
import { C } from "../tokens/colors";
import { labelStyle, inputStyle } from "../utils/styles";
import { Btn, Card, Toast, ScreenHeader } from "../components/UI";
import Icon from "../components/Icon";

const EMERGENCY_NUMBERS = [
  { name: "SAMU",      phone: "192", desc: "Urgência médica" },
  { name: "Bombeiros", phone: "193", desc: "Incêndio / resgate" },
  { name: "Polícia",   phone: "190", desc: "Segurança" },
  { name: "CVV",       phone: "188", desc: "Apoio emocional 24h" },
];

const RELATIONS = ["Filho(a)", "Neto(a)", "Cônjuge", "Irmão/Irmã", "Vizinho(a)", "Amigo(a)", "Médico(a)", "Outro"];

const ContactsScreen = ({ contacts, setContacts, setScreen }) => {
  const [adding, setAdding] = useState(false);
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cRel, setCRel] = useState("Filho(a)");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const add = () => {
    if (!cName.trim() || !cPhone.trim()) return;
    setContacts([...contacts, { id: Date.now(), name: cName.trim(), phone: cPhone.trim(), rel: cRel }]);
    setCName(""); setCPhone(""); setCRel("Filho(a)"); setAdding(false);
    showToast("✅ Contato adicionado!");
  };

  return (
    <div style={{ paddingBottom: 32 }}>
      <ScreenHeader title="📞 Contatos" subtitle="Pessoas de confiança" onBack={() => setScreen("home")} />
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {toast && <Toast msg={toast} />}

        {/* Números de emergência */}
        <Card style={{ border: `2px solid ${C.accentLight}` }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: C.accent, margin: "0 0 10px" }}>🚨 Emergências</p>
          {EMERGENCY_NUMBERS.map((e) => (
            <div
              key={e.phone}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  background: C.accentLight,
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name="phone" size={20} color={C.accent} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{e.name} — {e.phone}</p>
                <p style={{ margin: 0, fontSize: 14, color: C.textMuted }}>{e.desc}</p>
              </div>
              <a href={`tel:${e.phone}`} style={{ textDecoration: "none" }}>
                <Btn sm color={C.accent} style={{ padding: "10px 14px" }}>Ligar</Btn>
              </a>
            </div>
          ))}
        </Card>

        <Btn icon="plus" full onClick={() => setAdding(true)} disabled={adding} color={C.primary}>
          Adicionar contato pessoal
        </Btn>

        {adding && (
          <Card style={{ border: `2px solid ${C.primary}` }}>
            <p style={{ fontSize: 19, fontWeight: 700, margin: "0 0 16px", color: C.primary }}>Novo contato</p>
            <label style={labelStyle}>Nome</label>
            <input
              value={cName}
              onChange={(e) => setCName(e.target.value)}
              placeholder="Ex: Maria – minha filha"
              style={inputStyle}
            />
            <label style={labelStyle}>Telefone</label>
            <input
              type="tel"
              value={cPhone}
              onChange={(e) => setCPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              style={inputStyle}
            />
            <label style={labelStyle}>Parentesco</label>
            <select value={cRel} onChange={(e) => setCRel(e.target.value)} style={inputStyle}>
              {RELATIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Btn onClick={add} full>Salvar</Btn>
              <Btn onClick={() => setAdding(false)} color={C.border} textColor={C.text} full sm>
                Cancelar
              </Btn>
            </div>
          </Card>
        )}

        {contacts.map((c) => (
          <Card key={c.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  background: C.primaryLight,
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name="user" size={24} color={C.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>{c.name}</p>
                <p style={{ margin: 0, fontSize: 15, color: C.textMuted }}>{c.rel} · {c.phone}</p>
              </div>
              <a href={`tel:${c.phone}`} style={{ textDecoration: "none" }}>
                <Btn sm color={C.primary} style={{ padding: "10px 14px" }}>Ligar</Btn>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactsScreen;
