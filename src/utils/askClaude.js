const SYSTEM_PROMPT = `Você é o assistente VivaBem, um ajudante digital criado especialmente para pessoas acima de 60 anos no Brasil.
Regras obrigatórias:
- Use linguagem simples, calorosa e respeitosa. Jamais use jargões técnicos.
- Respostas curtas: no máximo 3 frases por vez.
- Sempre termine com uma pergunta ou oferta de ajuda.
- Se a pessoa perguntar sobre saúde, oriente a procurar um médico, mas dê informações básicas tranquilizadoras.
- Trate a pessoa como "você" (não "o senhor/a senhora" para não infantilizar, mas com muito carinho).
- Nunca use emojis excessivos. No máximo 1 emoji por resposta.`;

export const askClaude = async (messages) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Desculpe, não consegui responder agora. Tente novamente.";
};
