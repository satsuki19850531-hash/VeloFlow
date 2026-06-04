import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, X, HelpCircle, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SiteConfig } from "../types";

interface Message {
  role: "user" | "model";
  text: string;
}

interface InteractiveChatProps {
  config: SiteConfig;
}

export default function InteractiveChat({ config }: InteractiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Olá! Sou o **Flowy**, seu assistente de rotas inteligentes. 🗺️\n\nDigite sua origem e destino (ex: *São Paulo para Rio*) ou pergunte sobre nossos planos e taxas. Posso simular seus pedágios e tempo poupado com a nossa tag!"
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest response
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || isLoading) return;

    const userText = inputMsg;
    setInputMsg("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Resposta do servidor não está ok.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (error) {
      console.warn("Chat API error, falling back to client-side smart simulated responses:", error);
      
      const textMsg = userText.toLowerCase();
      let reply = "";
      
      if (textMsg.includes("rio") || textMsg.includes("rj") || textMsg.includes("são paulo") || textMsg.includes("sp")) {
        reply = `🚗 **Rota Proposta (São Paulo ~ Rio de Janeiro via Rodovia Dutra):**
        
• **Distância aproximada:** 435 km.
• **Pedágios Estimados (Sem Velo Flow):** R$ 74,80 (pago manualmente em 6 cabines de pedágio).
• **Tempo médio economizado em filas de pedágios:** ~25 a 40 minutos em dias de pico.
• **Solução Velo Flow Premium:** Você passa direto em todas as cancelas. O tempo de espera cai para **zero**!
• **Plano Sugerido:** **Premium (R$ 149,90/ano)**. Com apenas uma viagem por mês, você já economiza tempo, embreagem e combustível!

Quer assinar esse plano agora com 30 dias grátis direto no WhatsApp? 😉`;
      } else if (textMsg.includes("plano") || textMsg.includes("preço") || textMsg.includes("valor") || textMsg.includes("taxa") || textMsg.includes("custo")) {
        reply = `Nossos planos foram pensados para todos os perfis de motoristas! 🛣️

1. **Básico (R$ 99,90/ano)**: Ideal para pedágios nacionais, com 10% de desconto no segundo ano de assinatura. Sem taxa de recarga!
2. **Premium (R$ 149,90/ano)**: **O Campeão de Vendas!** Acesso a pedágios e mais de 1.200 estacionamentos nacionais livres de taxas extras de conveniência.
3. **Corporativo (Sob Orçamento)**: Perfeito para frotas de empresas, com cota ilimitada e relatórios de fluxo mensais.

Qual desses planos se encaixa melhor na sua rotina? Se quiser, clique no link de WhatsApp abaixo para falar com um especialista especializado!`;
      } else if (textMsg.includes("funcion") || textMsg.includes("como") || textMsg.includes("tag") || textMsg.includes("pedágio")) {
        reply = `A tag inteligente da **Velo Flow** funciona por radiofrequência inteligente. 📡
        
Você cola o adesivo Velo Flow no para-brisa do seu carro e, ao se aproximar de qualquer cancela de pedágio ou estacionamento credenciado, ela abre automaticamente! O valor é debitado de forma prática e segura no seu cartão de crédito ou saldo pré-pago. 

Evite filas e trânsito agora mesmo!`;
      } else if (textMsg.includes("minas") || textMsg.includes("mg") || textMsg.includes("cobertura") || textMsg.includes("onde")) {
        reply = `Sim! Cobrimos praticamente todo o território nacional! 🗺️
        
Todas as principais rodovias pedagiadas de São Paulo, Rio de Janeiro, Minas Gerais, Paraná, Rio Grande do Sul e todo o resto do Brasil aceitam Velo Flow. Além disso, você tem passagem livre em shoppings, aeroportos e estacionamentos comerciais credenciados.`;
      } else {
        reply = `Olá! Sou o **Flowy**, o assistente virtual da **Velo Flow**. 

Como estamos operando em modo offline para o Netlify, possuo algumas respostas configuradas. Diga-me sobre o que gostaria de conversar:

- Gostaria de simular pedágios de uma rota? (Ex: diga *SP para Rio*)
- Quer saber mais sobre os planos ou cobertura nacional?
- Deseja o link do WhatsApp oficial de suporte para falar com nossa equipe? Fale em **${config.phoneDisplay}**!`;
      }

      // Add a slight delay to simulate server network processing for superior UX
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMsg(question);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Histórico redefinido! Como posso ajudar você a ganhar tempo e economizar combustível no trânsito hoje?"
      }
    ]);
  };

  const formatMessageText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Basic markdown parser for bold styling
      let renderedLine = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      let match;
      const parts = [];
      let lastIndex = 0;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-brand-blue font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }
      
      return (
        <span key={idx} className="block min-h-[1.2rem]">
          {parts.length > 0 ? parts : line}
        </span>
      );
    });
  };

  const directWhatsappText = `Olá! Estava tirando dúvidas com o assistente virtual da Velo Flow e gostaria de falar com um especialista de vendas oficial.`;
  const whatsappLink = `https://wa.me/${config.whatsAppNumber}?text=${encodeURIComponent(directWhatsappText)}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[520px] overflow-hidden">
      {/* Bot Header info */}
      <div className="bg-brand-blue p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-light/25 rounded-full flex items-center justify-center border border-white/10 relative">
            <Bot className="w-5 h-5 text-brand-light" />
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-brand-blue" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm">Flowy • IA Assistente</span>
              <span className="text-[9px] bg-brand-orange text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Online
              </span>
            </div>
            <p className="text-[10px] text-brand-light/75">Simulador de Rotas, Pedágios e Suporte</p>
          </div>
        </div>

        <button
          id="chat-clear-btn"
          onClick={clearChat}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Limpar Conversa"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Feed container */}
      <div className="flex-1 overflow-y-auto p-4 bg-brand-slate/40 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === "user"
                  ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange"
                  : "bg-brand-blue/15 border-brand-blue/20 text-brand-blue"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-3.5 text-xs inline-block shadow-sm ${
                msg.role === "user"
                  ? "bg-brand-blue text-white rounded-tr-none"
                  : "bg-white text-gray-700 border border-gray-100 rounded-tl-none leading-relaxed"
              }`}
            >
              <div className="space-y-1.5 text-sm">
                {formatMessageText(msg.text)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-blue/15 border border-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3.5 shadow-sm max-w-[80%]">
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion prompt chips */}
      <div className="px-4 py-2 border-t border-gray-150/45 bg-white shrink-0 flex gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
        <button
          id="chip-sp-rj"
          onClick={() => handleQuickQuestion("Qual o custo de pedágio de SP para o Rio de Janeiro?")}
          className="bg-brand-slate text-brand-blue hover:bg-brand-light hover:text-brand-blue border border-gray-100 text-[10px] font-semibold px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          📍 SP para Rio de Janeiro
        </button>
        <button
          id="chip-valoe"
          onClick={() => handleQuickQuestion("Qual o melhor plano para evitar filas de pedágio?")}
          className="bg-brand-slate text-brand-blue hover:bg-brand-light hover:text-brand-blue border border-gray-100 text-[10px] font-semibold px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          🎫 Melhores Planos
        </button>
        <button
          id="chip-coverage"
          onClick={() => handleQuickQuestion("Vocês cobrem cidades de Minas Gerais?")}
          className="bg-brand-slate text-brand-blue hover:bg-brand-light hover:text-brand-blue border border-gray-100 text-[10px] font-semibold px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          🗺️ Cobertura em MG
        </button>
      </div>

      {/* Message Input bar */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white shrink-0 flex gap-2">
        <input
          id="chat-input-field"
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Ex: Calcular pedágio São Paulo para Campinas..."
          className="flex-1 bg-brand-slate px-3 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30 text-gray-800"
        />
        <button
          id="chat-send-btn"
          type="submit"
          className="bg-brand-blue hover:bg-opacity-95 text-white p-2.5 rounded-xl cursor-pointer transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* WhatsApp sticky banner to conversion */}
      <div className="bg-emerald-50 px-4 py-2.5 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-800 shrink-0">
        <span className="font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse fill-emerald-600" />
          Adesão em 3 minutos no WhatsApp:
        </span>
        <a
          id="chat-whatsapp-banner-cta"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          FECHAR AGORA
        </a>
      </div>
    </div>
  );
}
