# VivaBem 💚

Aplicativo web de apoio a pessoas 60+ (e seus cuidadores), com foco em acessibilidade: fonte grande, alto contraste (WCAG AA), navegação simples e leitura em voz alta.

🔗 **Demo:** [app-vivabem.vercel.app](https://app-vivabem.vercel.app)

## Funcionalidades

- **Início** — resumo do dia: próximos lembretes de remédio e atalhos rápidos.
- **Lembretes** — cadastro de medicamentos com horário e frequência.
- **Consultas** — agenda de consultas médicas (médico, data, local, observações).
- **Contatos** — lista de contatos de confiança (família, cuidadores) + números de emergência do Brasil (SAMU, Bombeiros, Polícia, CVV).
- **SOS** — tela de emergência com aviso sonoro e botão de pedir ajuda.
- **Ajuda (chat)** — assistente conversacional simples para tirar dúvidas do dia a dia.

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) — sem router e sem gerenciador de estado externo; a navegação entre telas é feita por um `useState` na raiz (`src/VivaBem.jsx`).
- Estilos em JS (objetos inline), sem biblioteca de CSS.
- `SpeechSynthesis` (Web Speech API) para leitura em voz alta em pt-BR.

## Estrutura do projeto

```
src/
├── VivaBem.jsx          # componente raiz: estado global e roteamento por tela
├── main.jsx             # entry point
├── components/
│   ├── Icon.jsx          # ícones SVG inline
│   ├── NavBar.jsx        # barra de navegação inferior
│   └── UI.jsx            # componentes de UI reutilizáveis (Card, Btn, Tag, Toast, ...)
├── screens/
│   ├── HomeScreen.jsx
│   ├── RemindersScreen.jsx
│   ├── AppointmentsScreen.jsx
│   ├── ContactsScreen.jsx
│   ├── SOSScreen.jsx
│   └── ChatScreen.jsx
├── tokens/
│   └── colors.js         # paleta de cores e tamanho de fonte base
└── utils/
    ├── useRoute.js        # roteamento por hash (#/lembretes): URL por tela e botão voltar
    ├── sos.js             # mensagem SOS, localização e links de WhatsApp/SMS
    ├── useLocalState.js   # hook de persistência (localStorage, com prefixo `vivabem:`)
    ├── styles.js          # estilos compartilhados (inputs, labels, botões)
    ├── speak.js            # wrapper da Web Speech API
    └── askClaude.js        # integração com a API da Anthropic para o chat
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` por padrão.

Outros scripts:

```bash
npm run build     # build de produção
npm run preview   # preview do build
npm run lint      # eslint
```

## Estado atual / limitações conhecidas

- **Persistência**: os dados (lembretes, consultas, contatos) ficam em `localStorage` do navegador — sobrevivem ao fechar a aba, mas são locais àquele aparelho/navegador. Sincronizar entre aparelhos exigiria um backend.
- **SOS**: o navegador não envia SMS/WhatsApp sozinho. O app monta a mensagem (com localização, se permitida) e abre o WhatsApp/SMS do contato; a pessoa confirma o envio com um toque.
- **Chat com IA**: `askClaude.js` chama `api.anthropic.com` diretamente do navegador, sem chave de API configurada — hoje só funciona em ambientes que já injetam essa chamada (como o Claude para artifacts). Para rodar fora desse contexto, é necessário um backend/proxy que guarde a chave com segurança.
- **Navegação**: não usa React Router, então não há URLs por tela nem suporte ao botão "voltar" do navegador.
- Sem testes automatizados até o momento.

## Sobre

Projeto acadêmico desenvolvido por [Adriano Neves](https://github.com/nevesA7) — Análise e Desenvolvimento de Sistemas, UNIJORGE.
