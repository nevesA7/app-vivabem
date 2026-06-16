import { useState } from "react";
import { C } from "../tokens/colors";
import { labelStyle, inputStyle, iconBtn } from "../utils/styles";
import { speak } from "../utils/speak";
import { Btn, Card, Tag, Toast, ScreenHeader } from "../components/UI";
import Icon from "../components/Icon";

const RemindersScreen = ({ reminders, setReminders, setScreen }) => {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("08:00");
  const [freq, setFreq] = useState("Diário");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const add = () => {
    if (!name.trim()) return;
    const r = { id: Date.now(), name: name.trim(), time, freq, active: true };
    setReminders([...reminders, r]);
    setName(""); setTime("08:00"); setFreq("Diário"); setAdding(false);
    showToast("✅ Lembrete adicionado com sucesso!");
    speak(`Lembrete para ${name} adicionado. Você será avisado todos os dias às ${time}.`);
  };

  const toggle = (id) =>
    setReminders(reminders.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));

  const remove = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
    showToast("Lembrete removido.");
  };

  return (
    <div style={{ padding: "0 0 32px" }}>
      <ScreenHeader title="💊 Lembretes" subtitle="Seus medicamentos e horários" onBack={() => setScreen("home")} />
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {toast && <Toast msg={toast} />}

        <Btn icon="plus" full onClick={() => setAdding(true)} disabled={adding}>
          Adicionar lembrete
        </Btn>

        {adding && (
          <Card style={{ border: `2px solid ${C.primary}` }}>
            <p style={{ fontSize: 19, fontWeight: 700, margin: "0 0 16px", color: C.primary }}>
              Novo lembrete
            </p>
            <label style={labelStyle}>Nome do medicamento ou tarefa</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Losartana, Vitamina D..."
              style={inputStyle}
            />
            <label style={labelStyle}>Horário</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
            <label style={labelStyle}>Frequência</label>
            <select value={freq} onChange={(e) => setFreq(e.target.value)} style={inputStyle}>
              {["Diário", "Duas vezes ao dia", "Semanal", "Apenas hoje"].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Btn onClick={add} full>Salvar</Btn>
              <Btn onClick={() => setAdding(false)} color={C.border} textColor={C.text} full sm>
                Cancelar
              </Btn>
            </div>
          </Card>
        )}

        {reminders.length === 0 && !adding && (
          <Card style={{ textAlign: "center", padding: 32 }}>
            <p style={{ fontSize: 18, color: C.textMuted }}>Nenhum lembrete ainda. Adicione o primeiro! 💊</p>
          </Card>
        )}

        {reminders.map((r) => (
          <Card
            key={r.id}
            style={{
              border: r.active ? `2px solid ${C.primaryLight}` : `2px solid ${C.border}`,
              opacity: r.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: C.text }}>{r.name}</p>
                <p style={{ margin: "0 0 6px", fontSize: 17, color: C.textMuted }}>⏰ {r.time} · {r.freq}</p>
                <Tag
                  color={r.active ? C.primaryLight : C.border}
                  textColor={r.active ? C.primary : C.textMuted}
                >
                  {r.active ? "Ativo" : "Pausado"}
                </Tag>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => toggle(r.id)} style={iconBtn(C.blueLight)}>
                  <Icon name={r.active ? "check" : "bell"} size={20} color={C.blue} />
                </button>
                <button onClick={() => remove(r.id)} style={iconBtn(C.accentLight)}>
                  <Icon name="trash" size={20} color={C.accent} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RemindersScreen;
