import React, { useState, useEffect } from "react";
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
import SavingsCalculator from "./components/SavingsCalculator";
import CentralPage from "./components/CentralPage";

export default function App() {
  // Config state initialized with default VANDERLEY ANTONIO DA SILVA / SEU TRANSPORTE details
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    companyName: "VANDERLEY ANTONIO DA SILVA",
    cnpj: "06.912.488/0001-00",
    address: "R MANOEL ANTONIO DE LIMA, 755 - CHACARA SAO DOMINGOS SHOP, MOCOCA - SP, CEP 13.734-445",
    email: "contato.veloflow@gmail.com",
    phoneDisplay: "+55 21 97967-4070",
    whatsAppNumber: "5521979674070"
  });

  const [activeCoverageIndex, setActiveCoverageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Path routing detection
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname !== currentPath) {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener("popstate", handleLocationChange);
    const interval = setInterval(handleLocationChange, 350);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      clearInterval(interval);
    };
  }, [currentPath]);

  // Google Ads compliance modal states
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
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
        `✅ Ótima notícia! Temos cobertura ampla no estado de ${match.stateName} (${match.abbreviation})! Atendemos eixos viários integrados operados por empresas como ${match.concessions.slice(0, 3).join(", ")} e cobrimos mais de ${match.citiesCovered} municípios na região.`
      );
    } else {
      setCoverageResult(
        "📍 Cobertura confirmada! Temos mais de 1.200 trajetos e pontos cadastrados pelo país. Para confirmar o uso e os eixos integrados de sua cidade específica, clique no botão e fale conosco via WhatsApp!"
      );
    }
  };

  const getWhatsappLink = (messageText: string) => {
    return `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(messageText)}`;
  };

  const defaultHeroCta = "Olá! Gostaria de falar com um especialista sobre a adesão da Tag Inteligente Velo Flow.";

  if (currentPath === "/central" || currentPath === "/central/") {
    return <CentralPage config={siteConfig} />;
  }

  return (
    <div className="bg-brand-slate min-h-screen text-brand-dark flex flex-col relative overflow-x-hidden font-sans">

      {/* Top Banner Offer */}
      <div className="bg-brand-dark text-white py-2.5 px-4 text-center text-xs tracking-wide font-medium relative z-40 border-b border-white/5">
        <span className="bg-brand-pink text-white text-[9px] font-extrabold px-2 py-0.5 rounded mr-2 animate-pulse uppercase tracking-wider">
          Adesão Grátis
        </span>
        Primeiro mês com mensalidade zero! Peça sua tag pelo WhatsApp.{" "}
        <a 
          id="banner-whatsapp-link"
          href={getWhatsappLink("Olá! Gostaria de garantir a isenção de taxa e testar por 30 dias grátis.")}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-extrabold text-brand-orange hover:text-white transition-colors shrink-0 inline-block ml-1"
        >
          Resgatar Grátis →
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-brand-blue/95 backdrop-blur-md border-b border-white/10 z-30 transition-all shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4.5 flex items-center justify-between">
          
          {/* Logo Concept: Stylized circle V check arrow */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/20 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1c003d" strokeWidth="3.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline leading-none">
                <span className="font-display font-black text-2xl text-white tracking-tight">VELO</span>
                <span className="font-display font-black text-2xl text-brand-orange tracking-tight">FLOW</span>
              </div>
            </div>
          </a>

          {/* Nav for Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-bold text-white/90">
            <a href="#como-funciona" className="hover:text-brand-orange transition-colors">Como Funciona</a>
            <a href="#calculadora" className="hover:text-brand-orange transition-colors flex items-center gap-1.5">
              <span>Simulador</span>
              <span className="text-[9px] bg-brand-pink text-white px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">Economia</span>
            </a>
            <a href="#planos" className="hover:text-brand-orange transition-colors">Planos</a>
            <a href="#cobertura" className="hover:text-brand-orange transition-colors">Cobertura</a>
            <a href="#faq" className="hover:text-brand-orange transition-colors">Dúvidas</a>
          </nav>

          {/* Top CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              id="header-client-login-btn"
              href={getWhatsappLink("Olá! Gostaria de acessar a minha conta e solicitar segunda via de boleto/fatura.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-orange font-bold text-sm transition-colors px-3 py-2 border border-white/20 rounded-xl hover:border-brand-orange/50"
            >
              Área do Cliente
            </a>
            <a
              id="header-whatsapp-cta-btn"
              href={getWhatsappLink(defaultHeroCta)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-brand-orange/90 text-brand-blue font-display font-black text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-orange/10 flex items-center gap-2"
            >
              <span>Pedir Tag Grátis</span>
              <Phone className="w-4 h-4 text-brand-blue fill-brand-blue" />
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:text-brand-orange transition-colors cursor-pointer"
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
              className="md:hidden border-t border-white/10 bg-brand-blue overflow-hidden"
            >
              <div className="px-4 py-5 space-y-3.5 flex flex-col font-bold text-white/95">
                <a 
                  href="#como-funciona" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-orange transition-colors border-b border-white/5 text-sm"
                >
                  Como Funciona
                </a>
                <a 
                  href="#calculadora" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-orange transition-colors border-b border-white/5 flex items-center justify-between text-sm"
                >
                  <span>Simulador de Custos</span>
                  <span className="text-[9px] bg-brand-pink text-white px-2.5 py-1 rounded font-extrabold uppercase">Calcular</span>
                </a>
                <a 
                  href="#planos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-orange transition-colors border-b border-white/5 text-sm"
                >
                  Planos e Preços
                </a>
                <a 
                  href="#cobertura" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-orange transition-colors border-b border-white/5 text-sm"
                >
                  Rede de Cobertura
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-brand-orange transition-colors border-b border-white/5 text-sm"
                >
                  Perguntas Frequentes
                </a>
                
                <div className="flex gap-2 pt-3">
                  <a
                    id="mobile-menu-client-login"
                    href={getWhatsappLink("Olá! Gostaria de acessar a minha Área do Cliente.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/5"
                  >
                    Login Cliente
                  </a>
                  <a
                    id="mobile-menu-whatsapp-cta"
                    href={getWhatsappLink(defaultHeroCta)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl bg-brand-orange text-brand-blue text-xs font-black hover:bg-brand-orange/95 shadow-md shadow-brand-orange/10"
                  >
                    WhatsApp Vendas
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
                  Tecnologia Inteligente e Sem Burocracia para sua Jornada
                </span>

                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
                  Mais praticidade para sua rotina
                </h1>

                <p className="text-blue-100 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Conheça uma solução moderna para simplificar seus deslocamentos e ter mais conveniência no dia a dia.
                </p>

                {/* Main Action Nodes */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <motion.a
                      id="hero-primary-whats-cta"
                      href={getWhatsappLink(defaultHeroCta)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-brand-blue font-display font-black text-base px-8 py-4 rounded-xl shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3 cursor-pointer"
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 0 }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-blue">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.501 5.28 3.5 8.487-.018 6.657-5.357 11.996-11.967 11.996-2.005-.001-3.973-.504-5.713-1.463L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.884 1.45 5.515 0 10.002-4.49 10.014-10.024.006-2.68-1.038-5.2-2.932-7.099s-4.42-2.936-7.103-2.936c-5.524 0-10.014 4.49-10.026 10.025-.002 1.83.475 3.619 1.38 5.197L1.13 21.077l4.787-1.253c1.761.96 3.4 1.461 4.73 1.442z" />
                      </svg>
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
                  <p className="text-[10px] text-blue-100/70 text-center lg:text-left leading-normal select-none">
                    *O redirecionamento ao WhatsApp destina-se única e exclusivamente a conversação consultiva humana, possibilitando o esclarecimento de dúvidas e suporte ao consumidor sobre os nossos serviços de tecnologia de mobilidade.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <span className="block font-display font-extrabold text-brand-orange text-lg sm:text-xl">
                      ⭐ 4.8/5
                    </span>
                    <span className="text-[10px] text-blue-100 uppercase tracking-wider block mt-0.5">
                      Avaliação Satisfatória
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <span className="block font-display font-extrabold text-brand-orange text-lg sm:text-xl">
                      Praticidade
                    </span>
                    <span className="text-[10px] text-blue-100 uppercase tracking-wider block mt-0.5">
                      Foco no Motorista
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <span className="block font-display font-extrabold text-white text-xs sm:text-sm mt-1">
                      COBERTURA AMPLA
                    </span>
                    <span className="text-[10px] text-blue-100 uppercase tracking-wider block mt-1.5">
                      Em diversos eixos
                    </span>
                  </div>
                </div>

                {/* Driver Recommendation note */}
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl max-w-md mx-auto lg:mx-0 text-left flex items-center gap-3">
                  <div className="bg-brand-orange/20 p-2 rounded-lg text-brand-orange shrink-0">
                    <CheckCircle2 className="w-5 h-5 fill-brand-orange text-brand-blue" />
                  </div>
                  <p className="text-xs text-blue-100">
                    🏆 <strong>Recomendado por Motoristas.</strong> Desfrute de total conveniência urbana sem taxas ocultas de manutenção.
                  </p>
                </div>
              </div>

              {/* Right Column: Premium Active Tag Card Presentation with Instant WhatsApp buttons */}
              <div className="lg:col-span-5 relative">
                {/* High contrast background blur bubble */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-pink rounded-3xl blur opacity-30 pointer-events-none" />
                
                <div className="relative bg-brand-dark/55 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="text-[10px] bg-brand-pink text-white font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider animate-pulse">
                      Peça Grátis no WhatsApp
                    </span>
                    <span className="text-xs text-brand-orange font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-brand-orange rounded-full animate-ping" />
                      Adesão Imediata Online
                    </span>
                  </div>

                  {/* Virtual TAG Graphic representation */}
                  <div className="bg-gradient-to-br from-brand-blue to-brand-dark border-2 border-dashed border-brand-orange/30 rounded-2xl p-6 mb-6 text-center shadow-inner relative overflow-hidden group hover:border-brand-orange/60 transition-all">
                    {/* Gloss Light reflection effect */}
                    <div className="absolute inset-x-0 top-0 h-4 bg-white/5 skew-y-3 pointer-events-none" />
                    
                    <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-orange/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#230C87" strokeWidth="4" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    
                    <p className="font-display font-black text-lg tracking-wider text-white">VELO<span className="text-brand-orange">FLOW</span></p>
                    <p className="text-[9px] text-gray-300 tracking-widest uppercase font-bold mt-1">TAG INTELIGENTE DIGITAL</p>
                    
                    {/* Simulated RFID Chip Graphic */}
                    <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-400 to-amber-500 border border-yellow-600/30 mx-auto mt-4 flex items-center justify-center text-amber-950 font-mono text-[9px] font-extrabold">
                      RFID
                    </div>
                    <div className="text-[9px] text-gray-400 font-mono mt-2">
                      Adesivo autocolante de alta fixação para para-brisa
                    </div>
                  </div>

                  {/* Direct Advantages Checkpoints */}
                  <h3 className="font-display font-bold text-sm text-brand-orange uppercase tracking-wider mb-2">
                    Vantagens ao pedir hoje:
                  </h3>
                  
                  <ul className="space-y-2.5 text-xs text-gray-200 mb-6 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange font-bold text-sm leading-none pt-0.5">✓</span>
                      <span><strong>Mensalidade Zero no 1º mês</strong> para testar livre de custos de adesão.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange font-bold text-sm leading-none pt-0.5">✓</span>
                      <span><strong>Envio Expresso do Adesivo</strong> direto para sua residência ou matriz da frota.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange font-bold text-sm leading-none pt-0.5">✓</span>
                      <span><strong>Experiência mais fluida</strong> em pontos de passagens e estabelecimentos integrados de nossa ampla rede de utilização.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-orange font-bold text-sm leading-none pt-0.5">✓</span>
                      <span><strong>Sem taxas de recarga</strong> ou fidelidade. Você livre para ir e vir.</span>
                    </li>
                  </ul>

                  {/* High conversion WhatsApp Contact CTAs */}
                  <div className="space-y-3">
                    <a
                      id="hero-sidebar-whatsapp-purchase"
                      href={getWhatsappLink("Olá! Gostaria de falar com um especialista para solicitar minha Tag Velo Flow Grátis agora.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-brand-orange hover:bg-brand-orange/90 text-brand-blue font-display font-black text-sm px-6 py-4 rounded-xl shadow-xl shadow-brand-orange/20 transition-transform hover:-translate-y-0.5"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-blue">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.501 5.28 3.5 8.487-.018 6.657-5.357 11.996-11.967 11.996-2.005-.001-3.973-.504-5.713-1.463L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.884 1.45 5.515 0 10.002-4.49 10.014-10.024.006-2.68-1.038-5.2-2.932-7.099s-4.42-2.936-7.103-2.936c-5.524 0-10.014 4.49-10.026 10.025-.002 1.83.475 3.619 1.38 5.197L1.13 21.077l4.787-1.253c1.761.96 3.4 1.461 4.73 1.442z" />
                      </svg>
                      <span>Solicitar Tag pelo WhatsApp ➔</span>
                    </a>
                    <p className="text-[10px] text-gray-300/85 leading-normal text-center select-none mt-2">
                      *O botão direciona ao WhatsApp para atendimento humano que auxiliará pontualmente com dúvidas e com seu pedido personalizado.
                    </p>
                  </div>
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
                Diga adeus à lentidão em filas de espera. Entenda como a Velo Flow moderniza seus deslocamentos de ponta a ponta.
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
                    Nosso sistema privado de tecnologia oferece ampla aceitação em eixos viários nacionais, além de shoppings e aeroportos parceiros.
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
                        <span className="bg-brand-pink text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full animate-pulse">
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
                      {plan.id !== "corp" && (
                        <p className="text-xs text-brand-orange font-extrabold mt-1">
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
                          <span className={plan.highlight ? "text-blue-50" : "text-gray-700 font-semibold"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Action WhatsApp button */}
                  <div className="mt-8 flex flex-col gap-2">
                    <motion.a
                      id={`plan-cta-${plan.id}`}
                      href={getWhatsappLink(plan.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block py-4 px-4 rounded-xl text-center font-display font-black text-xs sm:text-sm tracking-wide transition-all ${
                        plan.highlight
                          ? "bg-brand-orange text-brand-blue shadow-lg hover:bg-brand-orange/95"
                          : "bg-brand-blue text-white hover:bg-brand-dark"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.ctaText} →
                    </motion.a>
                    <p className={`text-[9px] text-center px-1 font-medium ${plan.highlight ? 'text-blue-100/60' : 'text-gray-500'}`}>
                      *Ao clicar, você iniciará contato no WhatsApp com nossa assessoria comercial estritamente para tirar suas dúvidas sobre o plano e prosseguir com suporte humano.
                    </p>
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
                    <td className="py-3">Passagem Direta em Vias Conveniadas</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                    <td className="py-3 text-center text-emerald-600">✔</td>
                  </tr>
                  <tr>
                    <td className="py-3">Acesso Facilitado em Shoppings/Aeroportos</td>
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
                    Ampla Rede Integrada e Privada
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-4xl text-brand-blue mt-4">
                    Mais de 1.200 pontos e eixos viários atendidos
                  </h2>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                    Nossa tecnologia de leitura é plenamente compatível com as antenas de passagens das maiores redes de utilização do território brasileiro, oferecendo uma experiência mais fluida nas saídas que você utiliza.
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
                    href={getWhatsappLink("Olá! Gostaria de verificar se a Velo Flow cobre minha rota/região da minha cidade.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-opacity-95 text-white font-display font-bold px-6 py-3.5 rounded-xl shadow-md cursor-pointer text-xs"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Verificar Ampla Cobertura via WhatsApp</span>
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
                      Principais eixos integrados na região:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {COVERAGE_REGIONS[activeCoverageIndex].highways.map((hw) => (
                        <span key={hw} className="bg-brand-slate text-brand-blue text-xs font-semibold px-2.5 py-1 rounded border border-gray-150/50">
                          🛣️ Eixo {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Concessionaires lists */}
                  <div className="pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-500 font-bold uppercase block tracking-wider mb-2">
                      Redes e eixos atendidos pela Velo Flow:
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
                    <strong>Atenção:</strong> De acordo com diretrizes de gestão de mobilidade, alguns trajetos pontuais podem corresponder a balsas fluviais ou acessos específicos que necessitam de leitura presencial alternativa.
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
              <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1c003d" strokeWidth="3.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline leading-none">
                  <span className="font-display font-black text-xl text-white tracking-tight">VELO</span>
                  <span className="font-display font-black text-xl text-brand-orange tracking-tight">FLOW</span>
                </div>
              </div>
            </a>

            <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
              A <strong>Velo Flow</strong> ({siteConfig.companyName}) é uma plataforma privada de tecnologia e soluções independentes para otimização de mobilidade inteligente nacional.
            </p>

            <div className="text-xs text-gray-300 space-y-1.5 font-mono">
              <p>📍 Razão Social: {siteConfig.companyName}</p>
              <p>🏢 CNPJ Matriz: {siteConfig.cnpj}</p>
              <p>🏢 Endereço: {siteConfig.address}</p>
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
                <a href="#cobertura" className="hover:text-brand-orange transition-colors">Rede de Cobertura</a>
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
              <p className="text-gray-300 leading-relaxed mb-4">
                Solicite sua tag inteligente diretamente no WhatsApp de atendimento de forma personalizada e sem burocracia.
              </p>
              <a
                id="footer-whatsapp-chat-button"
                href={getWhatsappLink("Olá! Gostaria de falar com um especialista e solicitar minha tag inteligente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 bg-brand-orange text-brand-blue hover:bg-opacity-95 font-display font-black text-xs px-5 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-blue">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.501 5.28 3.5 8.487-.018 6.657-5.357 11.996-11.967 11.996-2.005-.001-3.973-.504-5.713-1.463L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.884 1.45 5.515 0 10.002-4.49 10.014-10.024.006-2.68-1.038-5.2-2.932-7.099s-4.42-2.936-7.103-2.936c-5.524 0-10.014 4.49-10.026 10.025-.002 1.83.475 3.619 1.38 5.197L1.13 21.077l4.787-1.253c1.761.96 3.4 1.461 4.73 1.442z" />
                </svg>
                <span>Falar com Vendas no WhatsApp</span>
              </a>
              <p className="text-[9px] text-gray-400 select-none text-center">
                *O canal de e-mail (contato.veloflow@gmail.com) e o suporte via WhatsApp destinam-se exclusivamente para auxílio, atendimento consultivo, esclarecimento de dúvidas e suporte ao cliente contratante.
              </p>
            </div>

            {/* Certificados de Blindagem */}
            <div className="pt-2 flex gap-3">
              {/* Site blindado */}
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-pink" />
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-gray-400">Certificado</span>
                  <span className="block text-[10px] font-bold text-white font-mono leading-none">SSL ATIVO</span>
                </div>
              </div>
              {/* Reclame aqui mockup badge */}
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
                <span className="text-brand-orange font-extrabold text-[12px] font-mono">RA</span>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-gray-400">Avaliação</span>
                  <span className="block text-[10px] font-bold text-brand-orange leading-none font-mono">NOTA 4.8 / 5</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal disclosures & copyrights compliant with Brazilian laws and Google Ads Policy */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col gap-6 text-[10px] text-blue-100/60 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-justify">
              <strong>Isenção de Responsabilidade e Licenciamento:</strong> A Velo Flow é uma empresa privada e independente. Não possui vínculo com órgãos públicos, entidades governamentais ou concessionárias. Todas as marcas eventualmente mencionadas pertencem aos seus respectivos proprietários. Todos os serviços são oferecidos de forma independente.
            </p>
            <p className="text-justify">
              <strong>Transparência de Ofertas, Envio e Cancelamento Sem Multas:</strong> O benefício de adesão com mensalidade isenta nos primeiros 30 (trinta) dias de teste (mensalidade grátis no primeiro mês) aplica-se de forma idêntica e sem restrições a todos os nossos planos e serviços de tag individual (Plano Básico e Plano Premium). O envio postal físico do adesivo inteligente de para-brisa para sua residência é 100% gratuito para todo o território nacional, livre de taxas adicionais de postagem ou frete. Não existe fidelidade contratual, termo de carência mínima obrigatória ou qualquer outra multa/taxa para solicitação de cancelamento. O usuário tem autonomia e liberdade plena para cancelar ou desativar o plano a qualquer momento sem pagar nenhuma multa ou taxa rescisória — devendo unicamente arcar com o saldo ou tarifas regulares de passagem da rede de utilização que de fato consumir. O cancelamento pode ser concluído imediatamente por WhatsApp pelo número a qualquer instante: <strong>+55 21 97967-4070</strong> ou pelo e-mail de suporte: <strong>contato.veloflow@gmail.com</strong>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5 text-[9px] text-blue-100/50">
            <p className="text-center sm:text-left">
              © 2026 {siteConfig.companyName}. Todos os direitos reservados. CNPJ {siteConfig.cnpj}.<br />
              Endereço: {siteConfig.address}. E-mail de Contato: {siteConfig.email}. Telefone: {siteConfig.phoneDisplay}.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-end text-blue-100/80">
              <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-brand-orange hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium">Sobre a Empresa</button>
              <span>•</span>
              <button onClick={() => setIsTermsModalOpen(true)} className="hover:text-brand-orange hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium">Termos de Uso</button>
              <span>•</span>
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-brand-orange hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium">Política de Privacidade</button>
              <span>•</span>
              <button onClick={() => setIsSecurityModalOpen(true)} className="hover:text-brand-orange hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium">Segurança dos Dados</button>
              <span>•</span>
              <button onClick={() => setIsCancellationModalOpen(true)} className="hover:text-brand-orange hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium text-brand-orange">Política de Cancelamento</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Google Ads Compliance Modals */}
      <AnimatePresence>
        {/* Termos de Uso Modal */}
        {isTermsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white text-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border border-gray-100"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between border-b">
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-brand-orange">Termos de Uso do Serviço</h3>
                <button onClick={() => setIsTermsModalOpen(false)} className="text-white hover:text-brand-orange transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-700 font-sans">
                <p className="font-bold text-brand-blue">Última atualização: Junho de 2026</p>
                <p>
                  Bem-vindo à plataforma <strong>Velo Flow</strong>, disponibilizada e operada por <strong>{siteConfig.companyName}</strong>, sob o CNPJ <strong>{siteConfig.cnpj}</strong>, com sede comercial localizada em <strong>{siteConfig.address}</strong>.
                </p>
                
                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">1. Objeto e Natureza dos Serviços</h4>
                <p>
                  A Velo Flow atua exclusivamente como desenvolvedora independente de soluções logísticas e intermediadora eletrônica de facilitadores de pagamento e entrega de fita de identificação eletrônica com tecnologia RFID. <strong>Esclarecemos expressamente que a Velo Flow é uma empresa privada e independente, de modo a não possuir nem representar nenhum tipo de caráter de administração pública ou vinculação governamental direta.</strong> Centralizamos e integramos a aquisição, o suporte, a postagem e o atendimento ao cliente para que ele usufrua de passagens automáticas em cancelas conveniadas.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">2. Adesão, Período de Testes e Isenção de Mensalidade</h4>
                <p>
                  Ao optar por qualquer um de nossos planos e serviços de assinatura (Plano Básico ou Plano Premium), o contratante tem direito incondicional ao benefício de mensalidade isenta nos primeiros 30 (trinta) dias de uso (mensalidade R$ 0 no primeiro mês). Adicionalmente, o envio do insumo físico (Tag adesiva RFID para-brisa) é inteiramente gratuito, sem nenhum custo extra de frete ou postagem nacional. Caso decida continuar com a tag de passagem automática ativa após os 30 dias de isenção, incidirá a mensalidade regular recorrente do plano contratado (R$ 19,99/mês para o Plano Básico e R$ 49,99/mês para o Plano Premium). Não existe taxa contratual de rescisão ou fidelidade de qualquer espécie; o cliente tem a liberdade de cancelar ou desativar o plano sem custos ou multas quando quiser, sendo faturado apenas referente ao saldo ou tarifas regulares de passagem da rede de utilização que efetivamente tiver consumido/utilizado em suas passagens.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">3. Direitos e Obrigações do Usuário</h4>
                <p>
                  O contratante compromete-se a fornecer informações verdadeiras e fidedignas sobre a titularidade e o veículo para-brisa. O uso indevido da tag em veículos não cadastrados ou modificados, bem como quaisquer tarifas pendentes por falta de saldo, é de responsabilidade estritamente pessoal e legal do motorista condutor.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">4. Modificações e Foro</h4>
                <p>
                  Reservamo-nos o direito de alterar os termos a qualquer momento, visando se adequar a novas resoluções de órgãos de trânsito ou financeiras do Banco Central do Brasil. Fica eleito o Foro de Mococa - SP para dirimir controvérsias decorrentes deste contrato, com exclusão de qualquer outro.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button onClick={() => setIsTermsModalOpen(false)} className="bg-brand-blue hover:bg-opacity-95 text-white font-display font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Entendi e Aceito
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Política de Privacidade Modal */}
        {isPrivacyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white text-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border border-gray-100"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between border-b">
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-brand-orange">Política de Privacidade</h3>
                <button onClick={() => setIsPrivacyModalOpen(false)} className="text-white hover:text-brand-orange transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-700 font-sans">
                <p className="font-bold text-brand-blue">Última atualização: Junho de 2026</p>
                <p>
                  Nossa equipe de privacidade e conformidade de dados da <strong>Velo Flow</strong>, sob gestão integrada de <strong>{siteConfig.companyName}</strong>, valoriza e protege as suas informações. Esta política explica de forma clara quais dados coletamos, a base jurídica para o tratamento adequado (em conformidade com a LGPD - Lei Geral de Proteção de Dados Pessoais do Brasil), e suas garantias como titular de dados.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">1. Dados coletados e sua finalidade</h4>
                <p>
                  Coletamos seus dados cadastrais (Nome Completo, CNPJ/CPF, Endereço de Entrega, E-mail, Detalhes do Veículo e Número de WhatsApp) para viabilizar a ativação do adesivo RFID, viabilizar a entrega terceirizada expressa domiciliar e permitir o contato de suporte e faturamento transparente.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">2. Uso de Cookies e Pixel de Rastreamento de Terceiros</h4>
                <p>
                  Utilizamos recursos tecnológicos padrões de internet como Cookies de Navegação, Pixels de Rastreamento do Google Analytics e Google Ads para entender de forma anônima a navegação no site, garantir o bom funcionamento do simulador de economia e otimizar campanhas de anúncios digitais em conformidade e respeito aos regulamentos de privacidade do Google.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">3. Compartilhamento e Direitos do Titular</h4>
                <p>
                  Seus dados pessoais não serão de nenhuma forma vendidos ou alugados para terceiros. O compartilhamento ocorre única e exclusivamente com os operadores logísticos de postagem física dos Correios ou transportadora parceira e os sistemas de processamento de cobrança eletrônica parceiros. Você possui direito a qualquer momento de solicitar a retificação, exclusão, correção e portabilidade gratuita de seus dados sob guarda corporativa diretamente pelo nosso canal de DPO no e-mail: <strong>{siteConfig.email}</strong>.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button onClick={() => setIsPrivacyModalOpen(false)} className="bg-brand-blue hover:bg-opacity-95 text-white font-display font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Entendi e Aceito
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Segurança dos Dados Modal */}
        {isSecurityModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white text-gray-850 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border border-gray-100"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between border-b">
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-brand-orange">Segurança e Proteção de Dados</h3>
                <button onClick={() => setIsSecurityModalOpen(false)} className="text-white hover:text-brand-orange transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-700 font-sans">
                <p className="font-bold text-brand-blue">Última atualização: Junho de 2026</p>
                <p>
                  A segurança cibernética e a integridade de sua infraestrutura transacional são tratadas pela <strong>Velo Flow</strong> sob os mais altos padrões de criptografia globais. Toda a troca de dados entre seu navegador de internet e nossa plataforma ocorre sob rigoroso protocolo criptografado <strong>HTTPS (SSL Ativo) de 256 bits</strong>, blindado contra interceptações maliciosas.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">1. Infraestrutura Server-Side Resiliente</h4>
                <p>
                  Nossos bancos de dados e chaves API sensíveis são armazenados integralmente em servidores cloud norte-americanos e nacionais redundantes, com rotinas de backup diárias e rastreabilidade total de logs para mitigar ativamente riscos de vazamentos.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">2. Transações Financeiras e PCI-DSS</h4>
                <p>
                  Nós não armazenamos dados de cartões de débito ou crédito em nossos servidores em texto plano. Todo o fluxo transacional é integrado via APIs tokenizadas aos gateways de pagamento que possuem certificação PCI-DSS Nível 1.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end font-medium">
                <button onClick={() => setIsSecurityModalOpen(false)} className="bg-brand-blue hover:bg-opacity-95 text-white font-display font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Fechar de Forma Segura
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Política de Cancelamento Modal */}
        {isCancellationModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white text-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border border-gray-100"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between border-b">
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-brand-orange">Política Transparente de Cancelamento</h3>
                <button onClick={() => setIsCancellationModalOpen(false)} className="text-white hover:text-brand-orange transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-700 font-sans">
                <p className="font-bold text-brand-blue">Última atualização: Junho de 2026</p>
                <p className="font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded border border-emerald-100">
                  Compromisso Velo Flow: Respeito integral ao consumidor segundo as normas do Código de Defesa do Consumidor brasileiro (Lei nº 8.078/90) e diretrizes internacionais de comércio digital transparente.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">1. Direito de Desistência, Arrependimento e Período de Testes</h4>
                <p>
                  O consumidor possui o direito incondicional de desistência e arrependimento decorrente de compras digitais nos termos das leis vigentes. Oferecemos 30 (trinta) dias de experimentação inteiramente gratuitos para todos os planos individuais. O frete e envio postal de postagem da tag adesiva física para o seu para-brisa é de custo zero (frete grátis) e não há taxas adicionais de seguro ou envio.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">2. Cancelamento Sem Multa Rescisória e Sem Taxas Extras</h4>
                <p>
                  Não cobramos tarifas adicionais de fidelização, prazos mínimos de carência obrigatória ou taxas contratuais rescisórias. O cancelamento do seu plano e a desativação da tag em nosso sistema podem ser efetuados a qualquer instante, livre de qualquer ônus financeiro. Você só precisará arcar com as despesas e tarifas de utilização das passagens que efetivamente realizou durante suas viagens e deslocamentos — não havendo qualquer tipo de cobrança de rescisão ou multas ocultas.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">3. Como Solicitar o Cancelamento de Forma Imediata?</h4>
                <p>
                  Para cancelar, basta encaminhar uma mensagem simples para o suporte técnico operacional via WhatsApp no número <strong>+55 21 97967-4070</strong> ou enviar um e-mail com a placa do veículo cadastrado para <strong>contato.veloflow@gmail.com</strong>. Nossa equipe de faturamento efetivará em sistema a desativação da tag e do plano dentro do expediente corporativo no prazo regulamentar máximo de 24 horas úteis, sem burocracias ou contrapropostas invasivas.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end gap-3 font-medium">
                <a 
                  href={getWhatsappLink("Olá! Preciso solicitar suporte rápido ou cancelamento de tag.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-pink hover:bg-opacity-95 text-white font-display font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center"
                >
                  Solicitar pelo WhatsApp
                </a>
                <button onClick={() => setIsCancellationModalOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-display font-medium text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Fechar Janela
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Sobre a Empresa Modal */}
        {isAboutModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white text-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative border border-gray-100"
            >
              <div className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between border-b">
                <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-brand-orange">Sobre Nós - Velo Flow</h3>
                <button onClick={() => setIsAboutModalOpen(false)} className="text-white hover:text-brand-orange transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-700 font-sans">
                <p className="font-bold text-brand-blue">Última atualização: Junho de 2026</p>
                <p>
                  A <strong>Velo Flow</strong> é uma plataforma digital privada pertencente e operada sob a responsabilidade de <strong>{siteConfig.companyName}</strong>, sob o CNPJ de inscrição cadastral <strong>{siteConfig.cnpj}</strong>, com endereço registrado em <strong>{siteConfig.address}</strong>.
                </p>
                
                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">1. Quem Somos e Nosso Propósito</h4>
                <p>
                  Surgimos com o firme propósito de desburocratizar a mobilidade diária de motoristas de frotas e particulares em todo o território nacional. Desenvolvemos soluções privadas de tecnologia que facilitam e otimizam a aquisição, a recepção e a utilização de adesivos inteligentes de identificação por radiofrequência (RFID) para-brisa. Atuamos como intermediários logísticos e facilitadores de atendimento especializado, garantindo suporte humanizado continuo para desobstruir processos de viagem.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">2. Natureza Jurídica 100% Independente e Privada</h4>
                <p className="bg-amber-50 text-amber-900 border border-amber-200 px-4 py-3 rounded-lg font-medium">
                  <strong>IMPORTANTE:</strong> A Velo Flow é uma empresa privada com capital exclusivamente independente. Esclarecemos de forma explícita e irrevogável que nossa organização <strong>NÃO possui nenhum tipo de vínculo com o Estado, autarquias de trânsito ou administradoras de eixos viários de nenhuma espécie.</strong> Todos os nossos serviços são prestados de maneira independente, com foco em facilitação comercial eletrônica de meios de pagamento e suporte operacional ao consumidor.
                </p>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">3. Nossos Serviços de Tecnologia</h4>
                <p>
                  Diferente de entidades estatais ou administradoras de eixos viários, a Velo Flow desempenha as seguintes tarefas comerciais:
                </p>
                <ul className="list-disc pl-5 space-y-2.5">
                  <li><strong>Assessoria e Configuração:</strong> Auxiliamos na identificação e indicação do melhor plano de consumo de passagens para o perfil do interessado;</li>
                  <li><strong>Envio Postal Expresso Garantido:</strong> Providenciamos a postagem física imediata da tag adesiva RFID direto ao endereço que você definir em cadastro comercial, sem repasse de cobranças de frete;</li>
                  <li><strong>Central de Atendimento e Suporte Humanizado:</strong> Prestamos atendimento unificado pelo WhatsApp ou e-mail de contato para sanar dúvidas, detalhar extratos de trânsito e processar requisições transparentes de cancelamento.</li>
                </ul>

                <h4 className="font-bold text-xs sm:text-sm text-brand-blue pt-2 font-display">4. Canais de Comunicação Comercial</h4>
                <p>
                  Qualquer cidadão ou empresa pode obter atendimento direto, esclarecimento de dúvidas pontuais ou cancelamento sem multas falando com nosso suporte pessoal através do e-mail <strong>{siteConfig.email}</strong> ou pelo WhatsApp <strong>{siteConfig.phoneDisplay}</strong>, com resposta rápida e descompromissada.
                </p>
              </div>
              <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button onClick={() => setIsAboutModalOpen(false)} className="bg-brand-blue hover:bg-opacity-95 text-white font-display font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer">
                  Fechar Janela
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Pill (explicitly stating it goes to WhatsApp for human support) */}
      <motion.a
        id="floating-whatsapp-bubble"
        href={getWhatsappLink("Olá! Gostaria de tirar dúvidas em tempo real sobre o funcionamento da Tag Inteligente Velo Flow.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D6E9] hover:bg-[#1fbccf] text-brand-blue px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-white/20 select-none cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#230C87]">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.501 5.28 3.5 8.487-.018 6.657-5.357 11.996-11.967 11.996-2.005-.001-3.973-.504-5.713-1.463L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.884 1.45 5.515 0 10.002-4.49 10.014-10.024.006-2.68-1.038-5.2-2.932-7.099s-4.42-2.936-7.103-2.936c-5.524 0-10.014 4.49-10.026 10.025-.002 1.83.475 3.619 1.38 5.197L1.13 21.077l4.787-1.253c1.761.96 3.4 1.461 4.73 1.442z" />
        </svg>
        <span className="font-display font-medium text-xs tracking-wide">Dúvidas no WhatsApp</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </motion.a>
    </div>
  );
}
