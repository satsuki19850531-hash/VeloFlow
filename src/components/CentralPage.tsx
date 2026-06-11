import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Check, 
  FileText, 
  ArrowRight, 
  X, 
  Sparkles, 
  HelpCircle,
  Smartphone,
  CheckCircle,
  Lock,
  ArrowUpRight,
  UserCheck,
  Briefcase,
  Sliders,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Configurable constants
const PHONE_NUMBER_FMT = "+55 21 97967-4070";
const WHATSAPP_URL = "https://wa.me/5521979674070?text=Ol%C3%A1%2C%20quero%20atendimento";
const LOGO_IMAGE_URL = "https://i.ibb.co/rfK9fvjf/logo.jpg";

// High-fidelity vector SVG for official WhatsApp logo
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.012 2c-5.506 0-9.988 4.471-9.988 9.971 0 1.764.459 3.483 1.33 5.001L2 22l5.188-1.355a9.92 9.92 0 0 0 4.819 1.258c5.506 0 9.988-4.471 9.988-9.971C22 6.471 17.518 2 12.012 2zm0 1.691c4.58 0 8.3 3.709 8.3 8.28 0 4.571-3.72 8.28-8.3 8.28a8.212 8.212 0 0 1-4.186-1.144l-.3-.178-3.11.813.83-3.023-.195-.31a8.232 8.232 0 0 1-1.229-4.358c.005-4.57 3.725-8.28 8.305-8.28zm-3.6 4.904c-.2 0-.33.1-.48.27-.15.17-.58.57-.58 1.39s.6 1.62.68 1.73c.08.11 1.18 1.8 2.86 2.53.4.17.71.28.95.36.4.13.77.11 1.06.07.32-.05 1-.41 1.14-.81.14-.4.14-.75.1-.82-.04-.07-.15-.11-.33-.2-.18-.09-1.06-.52-1.22-.58-.17-.06-.29-.09-.41.09-.12.18-.48.61-.59.73-.11.12-.22.14-.4.05-.18-.09-.77-.28-1.47-.91-.55-.49-.92-1.09-1.03-1.27-.11-.18-.01-.28.08-.37.08-.08.18-.21.27-.32.09-.11.12-.18.18-.3.06-.12.03-.22-.01-.31-.05-.09-.41-.99-.56-1.36-.15-.36-.31-.31-.43-.31h-.25z"/>
  </svg>
);

interface CentralPageProps {
  config: {
    companyName: string;
    cnpj: string;
    address: string;
    email: string;
  };
}

export default function CentralPage({ config }: CentralPageProps) {
  // Page SEO compliance dynamically applied
  useEffect(() => {
    document.title = "Central de Atendimento | Atendimento Online";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Fale com nossa equipe pelo WhatsApp e receba atendimento personalizado de forma simples e rápida.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Fale com nossa equipe pelo WhatsApp e receba atendimento personalizado de forma simples e rápida.";
      document.head.appendChild(meta);
    }
  }, []);

  // Modal open states
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Floating widget states
  const [showFloatingTip, setShowFloatingTip] = useState(false);

  useEffect(() => {
    // Show a floating visual tip after 3 seconds for high conversion
    const timer = setTimeout(() => {
      setShowFloatingTip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="central-view-container" className="bg-white min-h-screen text-gray-800 font-sans flex flex-col selection:bg-brand-blue selection:text-white relative pb-16 md:pb-0">
      
      {/* 1. HERO / TOPO */}
      <header className="relative overflow-hidden bg-gradient-to-b from-brand-blue/[0.08] via-brand-light/40 to-white pt-14 pb-20 border-b border-gray-100">
        
        {/* Background decorative glowing shapes reminiscent of the logo's premium vibrant colors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40 z-0">
          <div className="absolute top-[-10%] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-blue/10 blur-[80px]" />
          <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-brand-orange/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[25%] w-[400px] h-[400px] rounded-full bg-brand-pink/10 blur-[90px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 z-10 relative text-center">
          
          {/* LOGO REDONDA (strictly adhering to design rules) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-6 inline-block"
          >
            <div className="relative group p-1 inline-block">
              {/* Pulsing colored ring pairing with the logo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-blue via-brand-orange to-brand-pink opacity-80 blur-xs group-hover:scale-105 transition-transform duration-500 animate-spin-slow" />
              
              <img 
                src={LOGO_IMAGE_URL} 
                alt="Logo Velo Flow" 
                className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full object-cover border-[3px] border-white shadow-xl relative z-10 block"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#25D366] border-2 border-white rounded-full z-20 animate-pulse" title="Atendimento Online" />
            </div>
          </motion.div>

          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 bg-brand-blue/10 text-brand-blue text-[11px] font-display font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
              Atendimento Online
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-blue tracking-tight leading-tight"
          >
            Central de Atendimento
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Resolva tudo de forma simples, rápida e segura com atendimento personalizado pelo WhatsApp.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-4 mt-6 max-w-sm sm:max-w-md mx-auto inline-block relative overflow-hidden"
          >
            {/* Fine gradient line inside card */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-blue via-brand-orange to-brand-pink" />
            <p className="text-brand-dark text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#25D366] relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              </span>
              Precisa de atendimento? Fale com nossa equipe agora.
            </p>
          </motion.div>

          {/* Botões de Ação Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 max-w-lg mx-auto"
          >
            {/* Botão Principal Estilo WhatsApp (Highly striking green with glowing shadow) */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-extrabold px-8 py-4.5 rounded-2xl transition-all duration-300 hover:scale-104 shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] group cursor-pointer text-center text-sm uppercase tracking-wide"
              whileTap={{ scale: 0.98 }}
            >
              <WhatsAppIcon className="w-5.5 h-5.5 fill-white animate-bounce-slow" />
              <span>Iniciar Atendimento</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            {/* Botão Secundário WhatsApp (Highly premium styling) */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-blue font-display font-bold px-8 py-4.5 rounded-2xl transition-all duration-300 hover:scale-102 border border-white/10 shadow-lg cursor-pointer text-sm"
              whileTap={{ scale: 0.98 }}
            >
              <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
              <span>Pedir Tag</span>
            </motion.a>
          </motion.div>

        </div>
      </header>

      {/* 2. BOTÕES RÁPIDOS - Replacements with professional Lucide icons styled beautifully */}
      <section className="py-12 bg-white relative z-10 -mt-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-6 shadow-[0_15px_40px_-15px_rgba(35,12,135,0.12)] border border-brand-light/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {[
              { label: "Iniciar Atendimento", icon: MessageSquare, color: "bg-[#25D366]/10 text-[#25D366]" },
              { label: "Pedir Tag", icon: Smartphone, color: "bg-brand-blue/10 text-brand-blue" },
              { label: "Atualizar Cadastro", icon: UserCheck, color: "bg-brand-pink/10 text-brand-pink" },
              { label: "Outros Serviços", icon: Sliders, color: "bg-amber-100 text-amber-600" }
            ].map((node, i) => {
              const IconComp = node.icon;
              return (
                <motion.a
                  key={i}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-slate/40 hover:bg-brand-blue/5 border border-gray-100/80 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-md group cursor-pointer relative"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <div className={`p-3 rounded-2xl ${node.color} mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-xs`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="block font-display font-extrabold text-[12px] sm:text-xs text-brand-dark leading-tight mb-2">
                    {node.label}
                  </span>
                  
                  {/* Styled Green Micro Badge */}
                  <span className="inline-flex items-center gap-1 text-[9px] text-[#25D366] font-bold font-mono">
                    <WhatsAppIcon className="w-2.5 h-2.5 fill-current" />
                    ACESSAR
                  </span>
                </motion.a>
              );
            })}

          </div>
        </div>
      </section>

      {/* 3. SEÇÃO “SERVIÇOS RÁPIDOS” - Highly colored, beautiful layouts */}
      <section className="py-16 bg-gradient-to-b from-brand-slate via-brand-light/35 to-white relative">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-12 max-w-xl mx-auto">
            <span className="text-[11px] font-display font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-4 py-1.5 rounded-full inline-block">
              Serviços rápidos
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3.5xl text-brand-blue mt-3 leading-tight">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-gray-500 text-sm mt-3.5 leading-relaxed">
              Acesse os principais canais de atendimento de forma simples e rápida. Nossa equipe está pronta para ajudar você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-[#25D366]" />
              <div>
                <div className="w-12 h-12 bg-[#25D366]/15 rounded-2xl flex items-center justify-center mb-5 shadow-xs">
                  <Smartphone className="w-6 h-6 text-[#25D366]" />
                </div>
                <h3 className="font-display font-extrabold text-brand-dark text-base sm:text-lg">
                  Pedir Tag
                </h3>
                <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                  Solicite atendimento para iniciar sua solicitação de forma simples e rápida.
                </p>
              </div>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-extrabold text-xs py-3.5 px-4 rounded-xl transition-all shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Pedir minha Tag</span>
              </a>
            </motion.div>

            {/* CARD 2 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-blue" />
              <div>
                <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-5 shadow-xs">
                  <FileText className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="font-display font-extrabold text-brand-dark text-base sm:text-lg">
                  Atualizar Cadastro
                </h3>
                <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                  Fale com nossa equipe para atualizar suas informações com praticidade.
                </p>
              </div>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-extrabold text-xs py-3.5 px-4 rounded-xl transition-all shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Atualizar Cadastro</span>
              </a>
            </motion.div>

            {/* CARD 3 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-pink" />
              <div>
                <div className="w-12 h-12 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-5 shadow-xs">
                  <MessageSquare className="w-6 h-6 text-brand-pink" />
                </div>
                <h3 className="font-display font-extrabold text-brand-dark text-base sm:text-lg">
                  Outros Serviços
                </h3>
                <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">
                  Receba suporte personalizado para outras solicitações pelo WhatsApp.
                </p>
              </div>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-extrabold text-xs py-3.5 px-4 rounded-xl transition-all shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Falar com Atendente</span>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. SEÇÃO “SOBRE NÓS” & 5. BENEFÍCIOS */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Texto Sobre Nós */}
            <div>
              <span className="text-[11px] font-display font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 px-3.5 py-1.5 rounded-full inline-block">
                Sobre nós
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-dark mt-3 leading-tight">
                Atendimento próximo, soluções rápidas
              </h2>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Oferecemos atendimento personalizado para ajudar você de forma prática, segura e sem complicação. Nossa equipe orienta cada etapa pelo WhatsApp com agilidade e clareza.
              </p>
              
              <div className="mt-8">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-display font-bold text-sm text-brand-blue hover:text-brand-pink transition-colors group cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-500 fill-current" />
                  <span>Verificar vantagens e planos no atendimento</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Blocos de Benefícios - Styled with vibrant brand color bands and icons */}
            <div className="space-y-4">
              
              <div className="flex gap-4 p-5 rounded-2xl bg-brand-blue/[0.03] border border-brand-blue/5 hover:bg-brand-blue/[0.05] transition-colors">
                <div className="w-11 h-11 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0 text-white font-display font-extrabold text-sm shadow-sm shadow-brand-blue/30">
                  01
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Atendimento rápido</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Nossa equipe de consultoria está de prontidão para orientar você.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-[#25D366]/[0.03] border border-[#25D366]/5 hover:bg-[#25D366]/[0.05] transition-colors">
                <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0 text-white font-display font-extrabold text-sm shadow-sm shadow-[#25D366]/30">
                  02
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Seguro e confiável</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Tratamos suas informações cadastrais com máximo cuidado e responsabilidade.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-brand-pink/[0.03] border border-brand-pink/5 hover:bg-brand-pink/[0.05] transition-colors">
                <div className="w-11 h-11 bg-brand-pink rounded-xl flex items-center justify-center flex-shrink-0 text-white font-display font-extrabold text-sm shadow-sm shadow-brand-pink/30">
                  03
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Resolução ágil</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Suporte desburocratizado para facilitar a postagem da sua tag.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. CHAMADA FINAL */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-brand-blue via-brand-dark/95 to-brand-dark opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/10 via-transparent to-brand-orange/10 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-4 text-center z-10 relative">
          
          <span className="inline-block p-3 rounded-full bg-[#25D366]/20 text-[#25D366] mb-4 animate-bounce">
            <WhatsAppIcon className="w-8 h-8 fill-current" />
          </span>

          <h2 className="font-display font-black text-3xl sm:text-4xl leading-tight">
            Pronto para resolver agora?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Nossa equipe está disponível para atender você pelo WhatsApp. Clique abaixo e fale com a gente.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Highly clickable green CTA button */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-black px-10 py-5 rounded-2xl shadow-[0_15px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 cursor-pointer text-sm uppercase tracking-wider"
              whileTap={{ scale: 0.98 }}
            >
              <WhatsAppIcon className="w-5.5 h-5.5 fill-white" />
              <span>Chamar no WhatsApp</span>
            </motion.a>

            <span className="text-xs text-blue-200/80 font-mono bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
              Número Operacional: {PHONE_NUMBER_FMT}
            </span>
          </div>

        </div>
      </section>

      {/* FLOATING ACTION WHATSAPP CHAT COUNTER (For extreme conversion rates!) */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <AnimatePresence>
          {showFloatingTip && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-xs text-xs text-gray-700 font-sans flex items-start gap-3 relative mr-2"
            >
              {/* Close tooltip */}
              <button 
                onClick={() => setShowFloatingTip(false)}
                className="absolute top-1 text-gray-400 hover:text-gray-600 right-1 p-1 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              
              <div className="relative mt-1">
                <img 
                  src={LOGO_IMAGE_URL} 
                  alt="Agent" 
                  className="w-9 h-9 rounded-full object-cover border border-brand-blue"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p className="font-extrabold text-brand-blue text-[11px] mb-0.5">Suporte Velo Flow</p>
                <p className="text-[11px] text-gray-500 leading-normal">Olá! Posso auxiliar você a pedir sua tag agora mesmo pelo WhatsApp?</p>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#25D366] text-[10px] mt-2 bg-emerald-50 px-2 py-1 rounded hover:underline"
                >
                  <WhatsAppIcon className="w-3 h-3 fill-current" />
                  Chamar suporte
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all hover:scale-110 active:scale-95 duration-300 pointer-events-auto relative cursor-pointer"
          animate={{
            boxShadow: ["0 4px 10px rgba(37,211,102,0.3)", "0 4px 20px rgba(37,211,102,0.6)", "0 4px 10px rgba(37,211,102,0.3)"]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
        >
          {/* Notification Counter badge */}
          <span className="absolute top-[-2px] right-[-2px] bg-[#ff2b85] text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
            1
          </span>
          <WhatsAppIcon className="w-7 h-7 fill-white" />
        </motion.a>
      </div>

      {/* 7. RODAPÉ IGUAL PAGINA HOME COM AJUSTE DE REGRAS */}
      <footer className="bg-[#002244] text-white pt-12 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-white/10">
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center p-[2px] shadow-sm">
                  <img 
                    src={LOGO_IMAGE_URL} 
                    alt="Logo" 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-baseline leading-none">
                  <span className="font-display font-black text-lg text-white tracking-tight">VELO</span>
                  <span className="font-display font-black text-lg text-brand-orange tracking-tight">FLOW</span>
                </div>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
                A <strong>Velo Flow</strong> ({config.companyName}) é uma plataforma privada de tecnologia e soluções independentes para facilitar seus deslocamentos e rotinas de mobilidade inteligente.
              </p>
              <div className="text-[10px] text-gray-400 space-y-1 font-mono">
                <p>📍 Razão Social: {config.companyName}</p>
                <p>🏢 CNPJ: {config.cnpj}</p>
                <p>🏢 Endereço: {config.address}</p>
                <p>✉️ Suporte: {config.email}</p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col justify-between md:items-end">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-3">
                  Suporte Ativo
                </span>
                <p className="text-xs text-blue-100 mb-1">Dúvidas rápidas via WhatsApp:</p>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-black text-base text-[#25D366] hover:underline flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  {PHONE_NUMBER_FMT}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-blue-100/60 font-sans leading-relaxed">
            
            {/* Disclaimer */}
            <p className="text-justify max-w-lg leading-relaxed">
              Empresa privada e independente. Atendimento realizado por equipe própria. Não representamos marcas de terceiros. Focamos exclusivamente em consultoria e facilitação logística de tecnologia.
            </p>

            {/* Links Políticas */}
            <div className="flex gap-4 text-blue-100/80 font-medium">
              <button 
                onClick={() => setIsTermsOpen(true)}
                className="hover:text-brand-orange transition-colors hover:underline cursor-pointer bg-transparent border-0 p-0"
              >
                Termos de Uso
              </button>
              <span>•</span>
              <button 
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-brand-orange transition-colors hover:underline cursor-pointer bg-transparent border-0 p-0"
              >
                Política de Privacidade
              </button>
            </div>

          </div>

          <div className="text-center text-[9px] text-blue-100/45 pt-6 mt-6 border-t border-white/5">
            © 2026 {config.companyName}. Todos os direitos reservados. CNPJ {config.cnpj}.
          </div>

        </div>
      </footer>

      {/* POLICY OVERLAYS FOR COMPLIANCE */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-gray-800"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between">
                <h3 className="font-display font-semibold text-sm">Termos de Uso | Central</h3>
                <button onClick={() => setIsTermsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full cursor-pointer text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-600 custom-scrollbar">
                <p className="font-bold text-brand-dark">Última atualização: Junho de 2026</p>
                <p>
                  Estes Termos regulam o acesso e o uso dos canais de suporte técnico e consultivo da Velo Flow. Ao utilizar nosso site e acionar nossos canais personalizados de WhatsApp, você declara conformidade integral com nossas normas de operação.
                </p>
                <h4 className="font-semibold text-brand-dark font-display">1. Objeto e Serviços Privados</h4>
                <p>
                  A Velo Flow atua como desenvolvedora de soluções logísticas e atendimento personalizado. Esclarecemos que somos uma prestadora de serviços privada e independente, sem qualquer vinculação ou representação de administração administrativa governamental.
                </p>
                <h4 className="font-semibold text-brand-dark font-display">2. Atendimento ao Usuário</h4>
                <p>
                  Os dados inseridos para contato são mantidos de forma confidencial. Todo o suporte ao utilizador visa unicamente auxiliar na resolução de dúvidas e acompanhamento logístico sem taxas rescisórias ou cobranças imprevistas de fidelização.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button onClick={() => setIsTermsOpen(false)} className="bg-brand-blue hover:bg-opacity-95 text-white font-display font-medium text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isPrivacyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-gray-800"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between">
                <h3 className="font-display font-semibold text-sm">Política de Privacidade | Central</h3>
                <button onClick={() => setIsPrivacyOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full cursor-pointer text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-600 custom-scrollbar">
                <p className="font-bold text-brand-dark">Última atualização: Junho de 2026</p>
                <p>
                  Tratamos as suas informações com máximo respeito, segurança e zelo. Esta declaração descreve quais são as informações coletadas e de que forma realizamos o processamento inteligente.
                </p>
                <h4 className="font-semibold text-brand-dark font-display">1. Coleta Qualificada de Dados</h4>
                <p>
                  Coletamos suas informações de identificação (como Nome Completo e WhatsApp) no momento em que você solicita suporte espontâneo em nossa central viária eletrônica. Tais dados têm o propósito estrito de processamento logístico express e resposta personalizada.
                </p>
                <h4 className="font-semibold text-brand-dark font-display">2. Utilização de Cookies</h4>
                <p>
                  O site utiliza tecnologias de navegação anônima para aprimorar as dinâmicas e o carregamento ágil das páginas para todos os utilizadores. Nenhuma informação pessoal ou confidencial será repassada sem o devido consentimento do titular.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button onClick={() => setIsPrivacyOpen(false)} className="bg-brand-blue hover:bg-opacity-95 text-white font-display font-medium text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
