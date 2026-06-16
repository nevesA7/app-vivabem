import { useState } from "react";
import { C } from "../tokens/colors";
import { labelStyle, inputStyle, iconBtn } from "../utils/styles";
import { speak } from "../utils/speak";
import { Btn, Card, Tag, Toast, ScreenHeader } from "../components/UI";
import Icon from "../components/Icon";

const AppointmentsScreen = ({ appointments, setAppointments, setScreen }) => {
  const [adding, setAdding] = useState(false);
  const [doc, setDoc] = useState("");
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const add = () => {
    if (!doc.trim() || !date) return;
    const a = { id: Date.now(), doc: doc.trim(), date, local: local.trim(), note: note.trim() };
    setAppointments([...appointments, a]);
    setDoc(""); setDate(""); setLocal(""); setNote(""); setAdding(false);
    showToast("✅ Consulta agendada!");
    speak(
      `Consulta com ${doc} marcada para ${new Date(date + "T12:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })}.`
    );
  };

  const remove = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
    showToast("Consulta removida.");
  };

  const sorted = [...appointments].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ paddingBottom: 32 }}>
      <ScreenHeader
        title="🏥 Consultas"
        subtitle="Seu histórico de agendamentos"
        onBack={() => setScreen("home")}
      />
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {toast && <Toast msg={toast} />}

        <Btn icon="plus" full onClick={() => setAdding(true)} disabled={adding} color={C.blue}>
          Agendar consulta
        </Btn>

        {adding && (
          <Card style={{ border: `2px solid ${C.blue}` }}>
            <p style={{ fontSize: 19, fontWeight: 700, margin: "0 0 16px", color: C.blue }}>
              Nova consulta
            </p>
            <label style={labelStyle}>Médico ou especialidade</label>
            <input
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
              placeholder="Ex: Dra. Ana – Cardiologista"
              style={inputStyle}
            />
            <label style={labelStyle}>Data e hora</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
            <label style={labelStyle}>Local (opcional)</label>
            <input
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Ex: UBS São João, Clínica Saúde Total"
              style={inputStyle}
            />
            <label style={labelStyle}>Observações (opcional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Levar exames anteriores"
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Btn onClick={add} full color={C.blue}>Salvar</Btn>
              <Btn onClick={() => setAdding(false)} color={C.border} textColor={C.text} full sm>
                Cancelar
              </Btn>
            </div>
          </Card>
        )}

        {sorted.length === 0 && !adding && (
          <Card style={{ textAlign: "center", padding: 32 }}>
            <p style={{ fontSize: 18, color: C.textMuted }}>Nenhuma consulta agendada ainda. 🏥</p>
          </Card>
        )}

        {sorted.map((a) => {
          const dt = new Date(a.date + (a.date.includes("T") ? "" : "T12:00"));
          const past = dt < new Date();
          return (
            <Card
              key={a.id}
              style={{
                border: `2px solid ${past ? C.border : C.blueLight}`,
                opacity: past ? 0.65 : 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: C.text }}>{a.doc}</p>
                  <p style={{ margin: "0 0 4px", fontSize: 16, color: C.blue }}>
                    📅{" "}
                    {dt.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                    {a.date.includes("T") &&
                      " · " + dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {a.local && (
                    <p style={{ margin: "0 0 4px", fontSize: 15, color: C.textMuted }}>📍 {a.local}</p>
                  )}
                  {a.note && (
                    <p style={{ margin: 0, fontSize: 15, color: C.textMuted }}>📝 {a.note}</p>
                  )}
                  <Tag
                    color={past ? C.border : C.blueLight}
                    textColor={past ? C.textMuted : C.blue}
                    style={{ marginTop: 8, display: "inline-block" }}
                  >
                    {past ? "Realizada" : "Próxima"}
                  </Tag>
                </div>
                <button onClick={() => remove(a.id)} style={iconBtn(C.accentLight)}>
                  <Icon name="trash" size={20} color={C.accent} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsScreen;
