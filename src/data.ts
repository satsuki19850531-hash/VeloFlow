import { Plan, Testimonial, FAQItem, CoverageRegion } from "./types";

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Plano Básico",
    price: "19,99",
    period: "/mês",
    highlight: false,
    tagline: "30 Dias de Isenção – Praticidade para o seu dia a dia",
    features: [
      "Mensalidade ZERO no 1º mês (30 dias de isenção)",
      "Taxa de Envio do Adesivo 100% Grátis",
      "Adesão Inicial Grátis",
      "Cancelamento a qualquer momento (Sem Multa)",
      "Pague apenas o que utilizar em seus trajetos",
      "Cobertura nacional em toda a rede de utilização",
      "Controle total de consumos pelo WhatsApp"
    ],
    ctaText: "Pedir Básico – Grátis 30 Dias",
    whatsappMessage: "Olá! Gostaria de assinar o Plano Básico da Velo Flow (R$ 19,99/mês com 30 Dias de Isenção e Frete Grátis)."
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: "49,99",
    period: "/mês",
    highlight: true,
    tagline: "Nosso plano mais completo com suporte personalizado",
    features: [
      "Mensalidade ZERO no 1º mês (30 dias de isenção)",
      "Envio Expresso Prioritário 100% Grátis",
      "Adesão Inicial Grátis",
      "Cancelamento a qualquer momento (Sem Multa)",
      "Pague apenas o que usar em seus deslocamentos",
      "Passagem fluida em vias e estabelecimentos parceiros",
      "Atendimento prioritário de suporte humanizado 24h"
    ],
    ctaText: "Pedir Premium – Grátis 30 Dias",
    whatsappMessage: "Olá! Gostaria de assinar o Plano Premium da Velo Flow (R$ 49,99/mês com 30 Dias de Isenção e Frete Grátis)."
  },
  {
    id: "corp",
    name: "Corporativo",
    price: "Sob Consulta",
    period: "",
    highlight: false,
    tagline: "Gestão inteligente para frotas de empresas",
    features: [
      "30 Dias de Isenção para testar toda a frota",
      "Envio de todos os adesivos 100% Grátis",
      "Adesão Inicial Grátis",
      "Faturamento unificado quinzenal ou mensal",
      "Plataforma completa de gestão Web e relatórios customizados",
      "Sem carência – cancele quando desejar livre de multas"
    ],
    ctaText: "Falar com Consultor",
    whatsappMessage: "Olá! Gostaria de falar com um especialista sobre frotas no Plano Corporativo da Velo Flow com teste sob medida."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "João Silva",
    role: "Motorista de Viagem",
    location: "São Paulo - SP",
    comment: "Parei de perder tempo e ganhei minutos preciosos nas minhas viagens. A Velo Flow mudou minha rotina semanal, de longe a melhor alternativa que já usei!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Ana Moura",
    role: "Representante Comercial",
    location: "Rio de Janeiro - RJ",
    comment: "O sistema é tão intuitivo que até meus pais aprenderam a usar de primeira. Econômico, prático, zero burocracia para acompanhar os deslocamentos e ver os saldos.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Roberto Cabral",
    role: "Gerente de Logística",
    location: "Brasília - DF",
    comment: "Trabalho gerenciando pequenas frotas urbanas e usamos a Velo Flow todos os dias para dar mais fluidez. O processo de faturamento e suporte ágil resolvem tudo em instantes. Super recomendo!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Como funciona a solução da Velo Flow?",
    answer: "A Velo Flow é um adesivo inteligente com chip RFID que você cola no para-brisa do seu veículo. Ao passar pelas cabines de leitura em vias de deslocamento e estabelecimentos parceiros, a antena lê a identificação e libera a passagem de forma prática, debitando apenas a taxa de utilização convencional."
  },
  {
    question: "O envio do adesivo físico para minha casa é realmente grátis?",
    answer: "Sim! O envio do adesivo inteligente para seu endereço residencial ou empresarial é 100% gratuito. Não cobramos frete, taxa operacional de postagem ou taxas de ativação para enviar e disponibilizar o adesivo para você."
  },
  {
    question: "Como funcionam os 30 dias de isenção de mensalidade?",
    answer: "Todos os nossos planos (Básico e Premium) vêm com os primeiros 30 dias de mensalidade totalmente isentos (R$ 0 no primeiro mês). Você realiza o cadastro e testa a comodidade por um mês sem mensalidade operacional. Se optar por continuar com a praticidade no seu dia a dia, a mensalidade correspondente ao plano passará a ser cobrada."
  },
  {
    question: "Como funciona o cancelamento? Pago alguma taxa ou multa?",
    answer: "O cancelamento é 100% livre, desburocratizado e sem custos extras. Você pode solicitar a desativação do adesivo a qualquer momento pelo suporte via WhatsApp (42) 99920-2204 ou e-mail contato.veloflow@gmail.com. Não há multas de fidelidade, prazos de permanência mínima ou termos de carência. Você paga apenas as taxas convencionais de passagens que efetivamente utilizou em seus deslocamentos e nada mais."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Disponibilizamos métodos práticos de carregamento inteligente por PIX e Cartão de Crédito (onde você define um saldo e ele se renova automaticamente quando atinge um valor mínimo controlado por você), e a modalidade pós-paga via faturamento para frotas e contas corporativas."
  }
];

export const COVERAGE_REGIONS: CoverageRegion[] = [
  {
    stateName: "São Paulo",
    abbreviation: "SP",
    highways: ["Bandeirantes", "Anhangüera", "Imigrantes", "Anchieta", "Dutra", "Castello Branco", "Rodoanel"],
    citiesCovered: 240,
    concessions: ["AutoBAn", "Ecovias", "CCR ViaOeste", "SPVias", "Ecopistas", "RodoAnel Oeste"]
  },
  {
    stateName: "Rio de Janeiro",
    abbreviation: "RJ",
    highways: ["Dutra", "Linha Amarela", "Ponte Rio-Niterói", "BR-040", "Via Lagos", "BR-101"],
    citiesCovered: 92,
    concessions: ["Lamsa", "Ecoponte", "Concer", "Via Lagos", "Rota de Surf"]
  },
  {
    stateName: "Minas Gerais",
    abbreviation: "MG",
    highways: ["Fernão Dias", "BR-040", "BR-050", "MG-050"],
    citiesCovered: 180,
    concessions: ["Arteris", "Via 040", "Eco050", "AB Nascentes"]
  },
  {
    stateName: "Paraná",
    abbreviation: "PR",
    highways: ["BR-116", "BR-376", "BR-277", "PR-151"],
    citiesCovered: 110,
    concessions: ["Arteris Planalto Sul", "Rodonorte", "Ecocataratas", "Caminhos do Paraná"]
  },
  {
    stateName: "Rio Grande do Sul",
    abbreviation: "RS",
    highways: ["Freeway (BR-290)", "BR-101", "BR-386", "RS-122"],
    citiesCovered: 85,
    concessions: ["CCR ViaSul", "EGR", "Caminhos da Serra Gaúcha"]
  }
];
