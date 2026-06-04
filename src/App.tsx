import React, { useState } from "react";
import {
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Building,
  Check,
  Phone,
  HelpCircle,
  Award,
  ArrowRight,
  Calculator,
  Compass,
  Star,
  Users,
  Menu,
  X,
  CreditCard,
  Building2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { SiteConfig } from "./types";
import { PLANS, TESTIMONIALS, FAQS, COVERAGE_REGIONS } from "./data";
import CustomizerPanel from "./components/CustomizerPanel";
import SavingsCalculator from "./components/SavingsCalculator";
import InteractiveChat from "./components/InteractiveChat";

export default function App() {
  // Config state initialized with default Velo Flow details
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    companyName: "Velo Flow Tecnologia Ltda",
    cnpj: "33.654.987/0001-23",
    address: "Rua dos Cariris, 752, Sala 12, Tatuapé, São Paulo - SP, 03310-030",
    email: "contato@veloflow.com.br",
    phoneDisplay: "(11) 99999-8888",
    whatsAppNumber: "5511999998888"
  });

  const [activeCoverageIndex, setActiveCoverageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive coverage modal or custom address search Simulator
  const [coverageSearch, setCoverageSearch] = useState("");
  const [coverageResult, setCoverageResult] = useState<string | null>(null);

  const handleSearchCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverageSearch.trim()) return;
    
    const searchLower = coverageSearch.toLowerCase();
    const match = COVERAGE_REGIONS.find(
      r => r.stateName.toLowerCase().includes(searchLower) || r.abbreviation.toLowerCase().includes(searchLower)
    );

    if (match) {
      setCoverageResult(
        `✅ Ótima notícia! Temos cobertura completa no estado de ${match.stateName} (${match.abbreviation})! Atendemos concessionárias como ${match.concessions.slice(0, 3).join(", ")} e cobrimos mais de ${match.citiesCovered} municípios na região.`
      );
    } else {
      setCoverageResult(
        "📍 Cobertura confirmada! Temos mais de 1.200 postos cadastrados pelo país. Para confirmar o pedágio ou estacionamento de sua cidade específica, clique no botão e fale conosco via WhatsApp!"
      );
    }
  };

  const getWhatsappLink = (messageText: string) => {
    return `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(messageText)}`;
  };

  const defaultHeroCta = "Olá! Gostaria de falar com um especialista sobre a adesão da Tag Inteligente Velo Flow.";

  return (
    <div className="bg-white min-h-screen text-brand-dark flex flex-col relative overflow-x-hidden font-sans">
      {/* Dynamic Floating Live Config Panel */}
      <CustomizerPanel config={siteConfig} onChange={setSiteConfig} />

      {/* Top Banner Offer */}
      <div className="bg-[#002244] text-white py-2 px-4 text-center text-xs tracking-wide font-medium relative z-40">
        <span className="bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded mr-2 animate-pulse">
          OFERTA DE LANÇAMENTO
        </span>
        Primeiro mês com taxa zero de adesão! Teste 30 dias grátis.{" "}
        <a 
          id="banner-whatsapp-link"
          href={getWhatsappLink("Olá! Gostaria de garantir a isenção de taxa e testar por 30 dias grátis.")}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-brand-orange transition-colors shrink-0 inline-block ml-1"
        >
          Resgatar Cupom →
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-30 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Concept: Stylized circle V check arrow */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shadow-md shadow-brand-blue/10 group-hover:scale-105 transition-transform">
              {/* Custom SVG logo representing Circle "V" with movement direction */}
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline leading-none">
                <span className="font-display font-black text-xl text-brand-blue tracking-tight">VELO</span>
                <span className="font-display font-black text-xl text-brand-orange tracking-tight">FLOW</span>
              </div>
              <p className="text-[9px] text-gray-400 font-display font-bold uppercase tracking-widest mt-0.5">
                Mobilidade Urbana
              </p>
            </div>
          </a>

          {/* Nav for Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#como-funciona" className="hover:text-brand-blue transition-colors">Como Funciona</a>
            <a href="#calculadora" className="hover:text-brand-blue transition-colors flex items-center gap-1">
              <span>Simulador</span>
              <span className="text-[9px] bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded font-extrabold uppercase">Novo</span>
            </a>
            <a href="#planos" className="hover:text-brand-blue transition-colors">Planos</a>
            <a href="#cobertura" className="hover:text-brand-blue transition-colors">Cobertura</a>
            <a href="#faq" className="hover:text-brand-blue transition-colors">Dúvidas</a>
          </nav>

          {/* Top CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              id="header-client-login-btn"
              href={getWhatsappLink("Olá! Gostaria de acessar a minha conta e solicitar segunda via de boleto/fatura.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:text-brand-orange font-bold text-sm transition-colors px-3 py-2 border border-brand-blue/20 rounded-lg hover:border-brand-orange/30"
            >
              Área do Cliente
            </a>
            <a
              id="header-whatsapp-cta-btn"
              href={getWhatsappLink(defaultHeroCta)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-opacity-90 text-white font-display font-bold text-sm px-4 py-2.5 rounded-lg transition-all shadow-md shadow-brand-orange/10 flex items-center gap-2"
            >
              <span>Suporte Oficial</span>
              <Phone className="w-3.5 h-3.5 fill-white" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-brand-blue hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col font-medium text-gray-700">
                <a 
                  href="#como-funciona" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-blue transition-colors border-b border-gray-50 text-sm"
                >
                  Como Funciona
                </a>
                <a 
                  href="#calculadora" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-blue transition-colors border-b border-gray-50 flex items-center justify-between text-sm"
                >
                  <span>Simulador de Custos</span>
                  <span className="text-[9px] bg-brand-orange text-white px-1.5 py-0.5 rounded font-extrabold uppercase">CALCULAR</span>
                </a>
                <a 
                  href="#planos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-blue transition-colors border-b border-gray-50 text-sm"
                >
                  Planos e Preços
                </a>
                <a 
                  href="#cobertura" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-blue transition-colors border-b border-gray-50 text-sm"
                >
                  Cobertura Oficial
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-blue transition-colors border-b border-gray-50 text-sm"
                >
                  Perguntas Frequentes
                </a>
                
                <div className="flex gap-2 pt-2">
                  <a
                    id="mobile-menu-client-login"
                    href={getWhatsappLink("Olá! Gostaria de acessar a minha Área do Cliente da Velo Flow.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Login Cliente
                  </a>
                  <a
                    id="mobile-menu-whatsapp-cta"
                    href={getWhatsappLink(defaultHeroCta)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-opacity-95 shadow-md shadow-brand-orange/10"
                  >
                    Atendimento WhasApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Section 1: Hero Section */}
        <section id="hero" className="relative bg-brand-blue text-white py-12 lg:py-20 overflow-hidden">
          {/* Subtle Abstract Curve background matching Clean Utility style */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 C30,80 70,20 100,50 L100,100 L0,100 Z" fill="white" />
              <circle cx="80" cy="20" r="15" fill="none" stroke="white" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="90" y2="90" stroke="white" strokeWidth="0.2" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Selling Text & Conversion Header */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                {/* Micro Pill */}
                <span className="inline-flex items-center gap-2 bg-brand-light/10 text-brand-light border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                  Alternativa Inteligente e Sem Burocracia à Veloe
                </span>

                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
                  Tag Inteligente que Dispensa Paradas
                </h1>

                <p className="text-blue-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Conecte seu veículo aos pedágios e estacionamentos de todo o Brasil. Evite filas estressantes com aprovação imediata via WhatsApp.
                </p>

                {/* Main Action Nodes */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <motion.a
                    id="hero-primary-whats-cta"
                    href={getWhatsappLink(defaultHeroCta)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-brand-orange hover:bg-opacity-95 text-white font-display font-black text-base px-8 py-4 rounded-xl shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3 cursor-pointer"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                  >
                    <MessageSquare className="w-5 h-5 fill-white" />
                    <span>Falar com Especialista no WhatsApp</span>
                  </motion.a>

                  <a
                    href="#planos"
                    className="text-white hover:text-brand-light font-bold text-sm underline underline-offset-4 flex items-center gap-1.5"
                  >
                    <span>Ver Planos Disponíveis</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <span className="block font-display font-extrabold text-brand-orange text-lg sm:text-xl">
                      ⭐ 4.8/5
                    </span>
                    <span className="text-[10px] text-blue-100 uppercase tracking-wider block mt-0.5">
                      Avaliação Reclame Aqui
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <span className="block font-display font-extrabold text-brand-orange text-lg sm:text-xl">
                      100%
                    </span>
                    <span className="text-[10px] text-blue-100 uppercase tracking-wider block mt-0.5">
                      Inovação Nacional
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <span className="block font-display font-extrabold text-white text-xs sm:text-sm mt-1">
                      90%+ COBERTO
                    </span>
                    <span className="text-[10px] text-blue-100 uppercase tracking-wider block mt-1.5">
                      Pedágios do Brasil
                    </span>
                  </div>
                </div>

                {/* Driver Recommendation note */}
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl max-w-md mx-auto lg:mx-0 text-left flex items-center gap-3">
                  <div className="bg-brand-orange/20 p-2 rounded-lg text-brand-orange shrink-0">
                    <CheckCircle2 className="w-5 h-5 fill-brand-orange text-brand-blue" />
                  </div>
                  <p className="text-xs text-blue-100">
                    🏆 <strong>Aplicativo Recomendado por Motoristas.</strong> Desfrute da melhor facilidade urbana sem taxas ocultas de manutenção.
                  </p>
                </div>
              </div>

              {/* Right Column: AI Live Assistant "Flowy" Embedded Side card */}
              <div className="lg:col-span-5 relative">
                {/* High contrast background blur bubble */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-blue rounded-3xl blur opacity-30 pointer-events-none" />
                <div className="relative">
                  <InteractiveChat config={siteConfig} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: "Como Funciona" - Steps Grid */}
        <section id="como-funciona" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange text-xs font-display font-extrabold uppercase tracking-widest bg-brand-orange/5 px-3 py-1.5 rounded-full">
                Simples, Prático e Digital
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-blue mt-4">
                Sua viagem fluida em apenas 3 passos simples
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-3">
                Diga adeus à burocracia dos pedágios antigos. Entenda como a Velo Flow moderniza sua locomoção diária de ponta a ponta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-brand-slate border border-gray-100 p-8 rounded-2xl shadow-sm relative group hover:border-brand-blue/30 transition-all flex flex-col justify-between">
                <div>
                  <span className="font-display font-black text-6xl text-brand-blue/10 block mb-4 group-hover:text-brand-orange/25 transition-colors">
                    01
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-blue mb-2">
                    Registro Rápido e Descomplicado
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Baixe o aplicativo para celular, cadastre os dados básicos de seu veículo e assine a sua tag inteligente em menos de 3 minutos.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-150/45 text-xs text-brand-blue font-semibold flex items-center justify-between">
                  <span>Placa Mercosul ou Padrão</span>
                  <Check className="w-4 h-4 text-brand-orange" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-brand-slate border border-gray-100 p-8 rounded-2xl shadow-sm relative group hover:border-brand-blue/30 transition-all flex flex-col justify-between">
                <div>
                  <span className="font-display font-black text-6xl text-brand-blue/10 block mb-4 group-hover:text-brand-orange/25 transition-colors">
                    02
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-blue mb-2">
                    Pagamento Automático Inteligente
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Sem filas, cartões físicos ou recargas burocráticas manuais. A cancela abre por rádio frequência e as passagens caem na hora no seu app.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-150/45 text-xs text-brand-orange font-semibold flex items-center justify-between">
                  <span>Recarga com PIX ou Cartão</span>
                  <Check className="w-4 h-4 text-brand-orange" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-brand-slate border border-gray-100 p-8 rounded-2xl shadow-sm relative group hover:border-brand-blue/30 transition-all flex flex-col justify-between">
                <div>
                  <span className="font-display font-black text-6xl text-brand-blue/10 block mb-4 group-hover:text-brand-orange/25 transition-colors">
                    03
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-blue mb-2">
                    Ampla Cobertura Nacional
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Nossa tecnologia oficial é aceita em mais de 90% das rodovias estaduais e federais concessionadas brasileiras, além de shoppings e aeroportos parceiros.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-150/45 text-xs text-brand-blue font-semibold flex items-center justify-between">
                  <span>Mais de 1.200 postos cobertos</span>
                  <Check className="w-4 h-4 text-brand-orange" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Section 3: Interactive Resource - Savings & Fuel Calculator */}
        <section id="calculadora" className="py-16 md:py-24 bg-brand-slate/60 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SavingsCalculator config={siteConfig} />
          </div>
        </section>

        {/* Section 4: "Planos e Benefícios" - Dynamic Table & Comparison Cards */}
        <section id="planos" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue text-xs font-display font-extrabold uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full inline-block">
                Tabela de Planos Transparentes
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-blue mt-4">
                Assinaturas econômicas sem taxas surpresas
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-2">
                Aproveite nosso primeiro mês grátis sem qualquer compromisso de fidelidade individual.
              </p>
            </div>

            {/* Plans Grid layout with premium highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                    plan.highlight
                      ? "bg-brand-blue text-white ring-4 ring-brand-orange relative xl:scale-105 shadow-xl"
                      : "bg-brand-slate text-brand-blue border border-gray-150/70 shadow-sm hover:border-brand-blue/20"
                  }`}
                >
                  <div>
                    {/* Header values */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-display font-extrabold text-xl ${plan.highlight ? "text-white" : "text-brand-blue"}`}>
                          {plan.name}
                        </h3>
                        <p className={`text-xs mt-1.5 ${plan.highlight ? "text-brand-light" : "text-gray-500"}`}>
                          {plan.tagline}
                        </p>
                      </div>
                      {plan.highlight && (
                        <span className="bg-brand-orange text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full animate-bounce">
                          Mais Popular
                        </span>
                      )}
                    </div>

                    {/* Price Tag */}
                    <div className="my-6">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-sm font-semibold ${plan.highlight ? "text-brand-light" : "text-gray-500"}`}>
                          R$
                        </span>
                        <span className="text-4xl sm:text-5xl font-display font-black tracking-tight">
                          {plan.price}
                        </span>
                        <span className={`text-xs font-semibold ${plan.highlight ? "text-brand-light" : "text-gray-500"}`}>
                          {plan.period}
                        </span>
                      </div>
                      {plan.id === "premium" && (
                        <p className="text-xs text-brand-orange font-bold mt-1">
                          🎁 TESTE GRÁTIS: Pague R$ 0 no 1º mês!
                        </p>
                      )}
                    </div>

                    {/* Feature items */}
                    <ul className="space-y-3.5 border-t border-gray-150/45 pt-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              plan.highlight ? "text-brand-orange fill-brand-blue" : "text-brand-blue fill-brand-light"
                            }`}
                          />
                          <span className={plan.highlight ? "text-blue-50" : "text-gray-700 font-medium"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Action WhatsApp button */}
                  <div className="mt-8">
                    <motion.a
                      id={`plan-cta-${plan.id}`}
                      href={getWhatsappLink(plan.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block py-3.5 px-4 rounded-xl text-center font-display font-semibold text-xs sm:text-sm tracking-wide transition-all ${
                        plan.highlight
                          ? "bg-brand-orange text-white shadow-lg hover:bg-opacity-95"
                          : "bg-brand-blue text-white hover:bg-opacity-95"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.ctaText} →
                    </motion.a>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Comparison Summary matrix for visual elegance */}
            <div className="bg-brand-slate rounded-2xl p-6 border border-gray-150/70 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-display">
                    <th className="py-2.5 font-bold">RECURSO DO PRODUTO</th>
                    <th className="py-2.5 font-bold text-center">BÁSICO</th>
                    <th className="py-2.5 font-bold text-center text-brand-orange">PREMIUM</th>
                    <th className="py-2.5 font-bold text-center">CORPORATIVO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  <tr>
                    <td className="py-3">Passagem Direta em Pedágios</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                  </tr>
                  <tr>
                    <td className="py-3">Estacionamentos em Shoppings/Aeroportos</td>
                    <td className="py-3 text-center text-gray-400">-</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                  </tr>
                  <tr>
                    <td className="py-3">Envio de Tag Física para Todo Brasil</td>
                    <td className="py-3 text-center text-gray-400">Opcional</td>
                    <td className="py-3 text-center text-emerald-600">Grátis</td>
                    <td className="py-3 text-center text-emerald-600">Grátis (Lote)</td>
                  </tr>
                  <tr>
                    <td className="py-3">Isenção de Primeiro Mês (30 Dias)</td>
                    <td className="py-3 text-center text-gray-400">-</td>
                    <td className="py-3 text-center text-emerald-600">Grátis</td>
                    <td className="py-3 text-center">Sob consulta</td>
                  </tr>
                  <tr>
                    <td className="py-3">Faturamento Unificado em Frotas</td>
                    <td className="py-3 text-center text-gray-400">-</td>
                    <td className="py-3 text-center text-gray-400">-</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* Section 5: "Cobertura e Parceiros" - Interactive highway state list */}
        <section id="cobertura" className="py-16 md:py-24 bg-brand-slate/50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Interactive Map representation / Stats */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-brand-orange text-xs font-display font-extrabold uppercase tracking-widest bg-brand-orange/5 px-3.5 py-1.5 rounded-full inline-block">
                    Abrangência Nacional Oficial
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-4xl text-brand-blue mt-4">
                    Mais de 1.200 postos e rodovias credenciadas
                  </h2>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                    Estamos homologados nas maiores concessionárias do território brasileiro, oferecendo passagem livre instantânea nas principais saídas interestaduais metropolitanas.
                  </p>
                </div>

                {/* Simulated interactive map search engine */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-sm text-brand-blue">
                    Consulte Cobertura na Sua Região
                  </h4>
                  <form onSubmit={handleSearchCoverage} className="flex gap-2">
                    <input
                      id="search-coverage-input"
                      type="text"
                      placeholder="Ex: São Paulo, RJ, Paraná..."
                      value={coverageSearch}
                      onChange={(e) => {
                        setCoverageSearch(e.target.value);
                        setCoverageResult(null);
                      }}
                      className="flex-1 bg-brand-slate border border-gray-150 px-3.5 py-2.5 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
                    />
                    <button
                      id="search-coverage-submit-btn"
                      type="submit"
                      className="bg-brand-blue hover:bg-opacity-95 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Buscar
                    </button>
                  </form>

                  <AnimatePresence mode="wait">
                    {coverageResult && (
                      <motion.div
                        id="coverage-search-rendered-result"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="p-3.5 rounded-xl bg-brand-light/40 border border-brand-light font-medium text-xs text-brand-blue leading-relaxed"
                      >
                        {coverageResult}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span>Cobertura expandida mensalmente. Confirmação de aceitação enviada por e-mail.</span>
                  </div>
                </div>

                {/* Quick Call to action */}
                <div>
                  <motion.a
                    id="coverage-whats-cta-btn"
                    href={getWhatsappLink("Olá! Gostaria de verificar se a Velo Flow cobre o pedágio/região da minha cidade.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-opacity-95 text-white font-display font-bold px-6 py-3.5 rounded-xl shadow-md cursor-pointer text-xs"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Verificar Cobertura Completa via WhatsApp</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Column: Tab Selector showing state-by-state concessions */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar border-b border-gray-150/45">
                  {COVERAGE_REGIONS.map((region, idx) => (
                    <button
                      key={region.abbreviation}
                      className={`px-4 py-2 font-display font-bold text-xs uppercase tracking-wider rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                        activeCoverageIndex === idx
                          ? "bg-brand-blue text-white border-brand-blue"
                          : "bg-white text-gray-500 border-gray-150 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setActiveCoverageIndex(idx);
                        setCoverageResult(null);
                      }}
                    >
                      {region.stateName} ({region.abbreviation})
                    </button>
                  ))}
                </div>

                {/* Selected tab content */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-500 text-xs font-semibold">ESTADO SELECIONADO</span>
                    <span className="bg-brand-orange text-white text-[10px] font-extrabold px-2.5 py-1 rounded">
                      {COVERAGE_REGIONS[activeCoverageIndex].citiesCovered} Cidades Cobertas
                    </span>
                  </div>

                  {/* Highway tags */}
                  <div>
                    <span className="text-xs text-brand-orange font-bold uppercase block tracking-wider mb-2">
                      Rodovias Principais Livres:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {COVERAGE_REGIONS[activeCoverageIndex].highways.map((hw) => (
                        <span key={hw} className="bg-brand-slate text-brand-blue text-xs font-semibold px-2.5 py-1 rounded border border-gray-150/50">
                          🛣️ Rod. {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Concessionaires lists */}
                  <div className="pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-500 font-bold uppercase block tracking-wider mb-2">
                      Concessionárias Oficiais Velo Flow:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {COVERAGE_REGIONS[activeCoverageIndex].concessions.map((cc) => (
                        <span key={cc} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                          {cc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trust map warning */}
                <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed bg-brand-light/35 p-3.5 rounded-xl border border-brand-light">
                  <span className="text-orange-600">⚠</span>
                  <p>
                    <strong>Atenção:</strong> De acordo com a homologação de mobilidadeSIGEP, os 10% restantes de pedágios não englobados correspondem a balsas fluviais pontuais ou acessos remotos não automatizados por cancelas físicas.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 6: User Reviews & Provas Sociais */}
        <section className="py-16 md:py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange text-xs font-display font-extrabold uppercase tracking-widest bg-brand-orange/5 px-4 py-1.5 rounded-full inline-block">
                Opiniões de Quem Usa
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-brand-blue mt-4">
                Motoristas que já pouparam tempo e dinheiro
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Veja o impacto imediato relatado em depoimentos autênticos por todo o país.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-brand-slate/45 p-6 rounded-2xl border border-gray-150/65 flex flex-col justify-between hover:border-brand-blue/30 transition-all shadow-xs"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1.5 text-brand-orange mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                      "{t.comment}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3.5 border-t border-gray-150/50 pt-4">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover shadow-sm bg-gray-100"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-brand-blue">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                        <span>{t.role}</span>
                        <span>•</span>
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 7: "FAQ" - Accordion Expansion */}
        <section id="faq" className="py-16 md:py-24 bg-brand-slate/30 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center mb-12">
              <span className="text-brand-blue text-xs font-display font-extrabold uppercase tracking-widest bg-brand-blue/5 px-3 py-1.5 rounded-full inline-block">
                FAQ de Dúvidas
              </span>
              <h2 className="font-display font-black text-3xl text-brand-blue mt-4">
                Dúvidas Frequentes sobre a Tag
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Tudo o que você precisa saber para se locomover sem interrupções.
              </p>
            </div>

            {/* Accordion stack wrapper */}
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-150/60 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    id={`faq-btn-${idx}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left px-5 py-4 font-display font-bold text-sm sm:text-base text-brand-blue hover:text-brand-orange transition-colors flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-brand-slate text-brand-blue shrink-0">
                      {openFaqIndex === idx ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaqIndex === idx && (
                      <motion.div
                        id={`faq-body-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-gray-50 text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Extra Assistance Option inside FAQ */}
            <div className="mt-8 text-center bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4 max-w-xl mx-auto">
              <div>
                <h4 className="font-display font-extrabold text-sm text-brand-blue">
                  Ainda possui dúvidas específicas?
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Nossa IA ou um de nossos atendentes especialistas estão prontos para apoiar sua transição no WhatsApp.
                </p>
              </div>
              <motion.a
                id="faq-whatsapp-cta-banner-btn"
                href={getWhatsappLink("Olá! Tenho algumas dúvidas adicionais antes de contratar minha tag inteligente da Velo Flow.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-opacity-95 text-white font-display font-bold px-6 py-3 rounded-xl cursor-pointer text-xs shadow-md shadow-brand-orange/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Tire Outras Dúvidas</span>
                <Phone className="w-3.5 h-3.5 fill-white" />
              </motion.a>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#002244] text-white pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: About the company */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#003366" strokeWidth="3" className="w-5 h-5 text-brand-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline leading-none">
                  <span className="font-display font-black text-xl text-white tracking-tight">VELO</span>
                  <span className="font-display font-black text-xl text-brand-orange tracking-tight">FLOW</span>
                </div>
                <p className="text-[10px] text-gray-400 font-display font-bold uppercase tracking-widest mt-0.5">
                  Tecnologia inteligente Ltda
                </p>
              </div>
            </a>

            <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
              A <strong>Velo Flow</strong> ({siteConfig.companyName}) é uma startup brasileira de tecnologia e inteligência em mobilidade urbana focada em facilitar o dia a dia de frotistas e motoristas particulares.
            </p>

            <div className="text-xs text-gray-300 space-y-1.5 font-mono">
              <p>📍 CNPJ Comercial: {siteConfig.cnpj}</p>
              <p>🏢 Endereço Sede: {siteConfig.address}</p>
            </div>
          </div>

          {/* Col 2: Useful links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-brand-orange">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li>
                <a href="#como-funciona" className="hover:text-brand-orange transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-brand-orange transition-colors">Simulador de Custos</a>
              </li>
              <li>
                <a href="#planos" className="hover:text-brand-orange transition-colors">Planos de Assinatura</a>
              </li>
              <li>
                <a href="#cobertura" className="hover:text-brand-orange transition-colors">Cobertura Credenciada</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-orange transition-colors">Perguntas Frequentes (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Contacts updated dynamically */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-brand-orange">
              Atendimento e Canais
            </h4>
            <div className="space-y-3.5 text-xs text-blue-100">
              <p className="flex items-center gap-2">
                <span className="bg-white/10 p-1.5 rounded-lg text-brand-orange block">
                  📞
                </span>
                <span><strong>Central 0800:</strong> 0900 7898</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-white/10 p-1.5 rounded-lg text-emerald-400 block font-bold font-mono">
                  WS
                </span>
                <span><strong>WhatsApp de Vendas:</strong> {siteConfig.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-white/10 p-1.5 rounded-lg text-blue-400 block font-mono">
                  @
                </span>
                <span><strong>E-mail Comercial:</strong> {siteConfig.email}</span>
              </p>
            </div>

            {/* Certificados de Blindagem */}
            <div className="pt-4 flex gap-3">
              {/* Site blindado */}
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#FF6B35]" />
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-gray-400">Certificado</span>
                  <span className="block text-[10px] font-bold text-white font-mono leading-none">SSL ATIVO</span>
                </div>
              </div>
              {/* Reclame aqui mockup badge */}
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold text-[12px] font-mono">RA</span>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-gray-400">Avaliação</span>
                  <span className="block text-[10px] font-bold text-emerald-400 leading-none">NOTA 4.8 / 5</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal disclosures & copyrights compliant with Brazilian laws */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-blue-100/70">
          <p className="text-center sm:text-left leading-relaxed">
            © 2026 {siteConfig.companyName}. Todos os direitos reservados. CNPJ {siteConfig.cnpj}.<br />
            As tarifas cobradas referem-se tão somente ao credenciamento, manutenção e comodidade operacional de nossa tecnologia urbana.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-white transition-colors cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-white transition-colors cursor-pointer">Segurança dos Dados</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
