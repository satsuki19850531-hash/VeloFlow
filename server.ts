import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize GoogleGenAI to prevent startup crash if GEMINI_API_KEY is not defined
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not configured properly.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Check server status & health
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
    timestamp: new Date().toISOString()
  });
});

// Interactive Route Companion & Mobility Chatbot Proxy
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem é obrigatória." });
  }

  const client = getGeminiClient();
  
  // High-fidelity fallback if key is missing or invalid, ensuring delightful UX
  if (!client) {
    // Generate intelligent static route mock calculations if someone runs a route-calculating query
    const textMsg = message.toLowerCase();
    let reply = "";
    
    if (textMsg.includes("rio") || textMsg.includes("rj") || textMsg.includes("são paulo") || textMsg.includes("sp")) {
      reply = `🚗 **Rota Proposta (São Paulo ~ Rio de Janeiro via Rodovia Dutra):**
      
• **Distância aproximada:** 435 km.
• **Pedágios Estimados (Sem Velo Flow):** R$ 74,80 (pago manualmente em 6 cabines).
• **Tempo médio desperdiçado em filas de pedágios:** ~25 minutos em dias de pico.
• **Solução Velo Flow Premium:** Você passa direto em todas as 6 cabines. O tempo estimado de espera cai para **zero**!
• **Plano Sugerido:** **Premium (R$ 149,90/ano)**. Com um único passeio por mês, você já economiza em tempo e combustível de frenagem!
      
*(Nota: Esta é uma rota simulada porque a chave API Gemini não está configurada nos segredos do projeto. Insira uma chave em Settings > Secrets para respostas via IA em tempo real!)*`;
    } else if (textMsg.includes("plano") || textMsg.includes("preço") || textMsg.includes("valor")) {
      reply = `Nossos planos foram pensados para todos os tipos de motoristas! 🛣️

1. **Básico (R$ 99,90/ano)**: Perfeito para quem viaja ocasionalmente. Foco em pedágios, com 10% de desconto no segundo ano.
2. **Premium (R$ 149,90/ano)**: **O Campeão de Vendas!** Acesso a pedágios E mais de 1.200 estacionamentos credenciados (shoppings, aeroportos). Upgrade grátis.
3. **Corporativo (Sob Orçamento)**: Perfeito para frotas de empresas, com cota ilimitada e relatórios mensais de fluxo de pedágios.

Qual deles se encaixa no seu dia a dia? Se quiser, posso gerar o link direto para falar com um especialista no WhatsApp no plano que escolher! 😉`;
    } else {
      reply = `Olá! Sou o **Flowy**, o assistente inteligente de rotas da **Velo Flow**. 

Estou aqui para responder suas dúvidas sobre como nossa tag inteligente ajuda você a passar sem parar em pedágios e estacionamentos por todo o Brasil. 

- Gostaria de calcular os pedágios de uma rota? (Diga-me a origem e destino, ex: *SP para Rio*)
- Quer saber mais sobre os planos ou cobertura nacional?
- Deseja receber o link direto de atendimento personalizado no WhatsApp?

*(Conexão simulada ativa. Adicione uma GEMINI_API_KEY para respostas geolocalizadas reais via IA!)*`;
    }

    return res.json({ text: reply });
  }

  try {
    const systemPrompt = `Você é o "Flowy", o Assistente de Inteligência em Rotas e Mobilidade da Velo Flow (veloflow.com.br). 
Velo Flow (CNPJ: 33.654.987/0001-23) é uma startup brasileira de tecnologia em mobilidade inteligente, alternativa direta à Veloe e Sem Parar.
Seu tom de voz deve ser amigável, ágil, extremamente profissional, objetivo e focado em demonstrar as vantagens de assinar a nossa tag inteligente sem filas.

Suas principais funções são:
1. Calcular e estimar as rotas de viagem fornecendo estimativas de pedágio em reais válidos para o Brasil (ex: rota de São Paulo para Rio, ou Santos, ou Curitiba), com ênfase no tempo economizado (geralmente economiza de 15 a 45 minutos dependendo das filas).
2. Tirar dúvidas frequentes dos usuários sobre a tag de forma clara e simples.
3. Recomendar os planos de assinatura:
    - Básico: R$ 99,90 por ano. Foco em pedágios nacionais. 10% de desconto no segundo ano de fidelidade.
    - Premium: R$ 149,90 por ano (recomende sempre este!). Pedágios + mais de 1.200 estacionamentos nacionais em shoppings e aeroportos com upgrade livre de taxa de serviço.
    - Corporativo: Sob Orçamento para frotas de veículos.
4. Estimular sutilmente o usuário a clicar no botão de WhatsApp para falar com um especialista e fechar o plano, oferecendo 30 dias grátis de teste (primeiro mês R$0).

AVISO: Mantenha as respostas bem estruturadas com bullet points e emojis. Destaque os custos estimados aproximados e realce e parabenize o motorista pelas escolhas inteligentes que reduzem emissões de carbono e tempo perdido de fila. Evite respostas longas demais. Seja sempre prestativo e fale português fluente do Brasil.`;

    // Process chat history in a format suitable for the API
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Add current user prompt
    const contents = [...formattedHistory, { role: "user", parts: [{ text: message }] }];

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({ 
      error: "Ocorreu um erro ao processar sua requisição no servidor.",
      details: error.message 
    });
  }
});

// Configure Vite middleware or serve static assets depending on Node environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Import dynamically in dev only to avoid bundler issues in prod build
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for local development.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static files in production from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Velo Flow App] backend server running on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to start server:", err);
});
