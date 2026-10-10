// Utilitários do botão SOS: mensagem, localização e links de envio.
// Navegadores não enviam SMS/WhatsApp sozinhos: abrimos o app com a mensagem pronta
// e a pessoa confirma o envio com um toque.

// "(11) 99999-0001" -> "5511999990001" (assume Brasil quando não há DDI)
export const normalizePhone = (raw = "") => {
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
};

export const getLocation = (timeoutMs = 6000) =>
  new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 60000 }
    );
  });

export const buildSosMessage = (loc) => {
  const base = "🆘 Preciso de ajuda! Mensagem enviada pelo app VivaBem. Por favor, me ligue.";
  if (!loc) return `${base} (Não consegui obter minha localização.)`;
  return `${base} Minha localização: https://maps.google.com/?q=${loc.lat},${loc.lon}`;
};

export const whatsappLink = (phone, text) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(text)}`;

// "?&body=" funciona tanto no Android quanto no iOS
export const smsLink = (phone, text) =>
  `sms:+${normalizePhone(phone)}?&body=${encodeURIComponent(text)}`;
