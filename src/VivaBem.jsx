import { useState } from "react";
import { C } from "./tokens/colors";
import { useLocalState } from "./utils/useLocalState";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import RemindersScreen from "./screens/RemindersScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import ChatScreen from "./screens/ChatScreen";
import ContactsScreen from "./screens/ContactsScreen";
import SOSScreen from "./screens/SOSScreen";

const DEFAULT_REMINDERS = [
  { id: 1, name: "Losartana 50mg", time: "08:00", freq: "Diário", active: true },
  { id: 2, name: "Atenolol 25mg",  time: "20:00", freq: "Diário", active: true },
];

const DEFAULT_APPOINTMENTS = [
  { id: 1, doc: "Dra. Ana — Cardiologista", date: "2026-07-10T09:00", local: "Clínica São Lucas", note: "Levar último ECG" },
];

const DEFAULT_CONTACTS = [
  { id: 1, name: "Maria (filha)", phone: "11999990001", rel: "Filho(a)" },
  { id: 2, name: "João (genro)",  phone: "11999990002", rel: "Outro" },
];

export default function VivaBem() {
  const [screen, setScreen] = useState("home");
  const [reminders,    setReminders]    = useLocalState("reminders",    DEFAULT_REMINDERS);
  const [appointments, setAppointments] = useLocalState("appointments", DEFAULT_APPOINTMENTS);
  const [contacts,     setContacts]     = useLocalState("contacts",     DEFAULT_CONTACTS);

  const sharedProps = { setScreen, reminders, setReminders, appointments, setAppointments, contacts, setContacts };

  const renderScreen = () => {
    switch (screen) {
      case "home":         return <HomeScreen         {...sharedProps} />;
      case "reminders":    return <RemindersScreen    {...sharedProps} />;
      case "appointments": return <AppointmentsScreen {...sharedProps} />;
      case "chat":         return <ChatScreen         {...sharedProps} />;
      case "contacts":     return <ContactsScreen     {...sharedProps} />;
      case "sos":          return <SOSScreen          {...sharedProps} />;
      default:             return <HomeScreen         {...sharedProps} />;
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        background: C.bg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: 430,
        margin: "0 auto",
        boxShadow: "0 0 40px rgba(0,0,0,0.12)",
        position: "relative",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #e8e5e0; }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: ${C.primary} !important;
          box-shadow: 0 0 0 3px ${C.primaryLight};
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
      `}</style>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {renderScreen()}
      </div>

      <NavBar current={screen} setScreen={setScreen} />
    </div>
  );
}
