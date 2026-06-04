import { Plan, Testimonial, FAQItem, CoverageRegion } from "./types";

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Plano Básico",
    price: "99,90",
    period: "/ano",
    highlight: false,
    tagline: "Perfeito para viagens ocasionais",
    features: [
      "Livre de mensalidades fixas",
      "Aceito em 90% de pedágios no Brasil",
      "10% de desconto no 2º ano de uso",
      "Relatório mensal de despesas via app",
      "Suporte exclusivo via WhatsApp"
    ],
    ctaText: "Escolher Plano Básico",
    whatsappMessage: "Olá! Gostaria de assinar o Plano Básico da Velo Flow (R$ 99,90/ano)."
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: "149,90",
    period: "/ano",
    highlight: true,
    tagline: "Nosso plano campeão de vendas",
    features: [
      "Mensalidade ZERO no 1º mês",
      "Pedágios + Estacionamentos Integrados",
      "Mais de 1.250 pontos com cobertura oficial",
      "Upgrade gratuito para 2º carro/moto",
      "Suporte Premium prioritário 24h",
      "Tag física grátis enviada em até 5 dias"
    ],
    ctaText: "Escolher Plano Premium",
    whatsappMessage: "Olá! Gostaria de assinar o Plano Premium da Velo Flow (R$ 149,90/ano). Quero meus 30 dias grátis de teste."
  },
  {
    id: "corp",
    name: "Corporativo",
    price: "Sob Consulta",
    period: "",
    highlight: false,
    tagline: "Gestão inteligente de frotas",
    features: [
      "Faturamento unificado quinzenal ou mensal",
      "Crédito ilimitado por veículo cadastrado",
      "Plataforma completa de gestão Web",
      "Dashboard com métricas e exportação XLS/PDF",
      "Gerente de contas exclusivo",
      "Descontos progressivos a partir de 5 tags"
    ],
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de falar com um especialista sobre frotas no Plano Corporativo da Velo Flow."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "João Silva",
    role: "Motorista de Viagem",
    location: "São Paulo - SP",
    comment: "Parei de perder mais de 20 minutos por pedágio na Rodovia dos Bandeirantes. Velo Flow mudou minha rotina semanal, de longe a melhor alternativa que já usei!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Ana Moura",
    role: "Representante Comercial",
    location: "Rio de Janeiro - RJ",
    comment: "O aplicativo é tão intuitivo que até meus pais aprenderam a usar de primeira. Econômico, prático, zero burocracia para recarregar ou ver os extratos.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Roberto Cabral",
    role: "Gerente de Logística",
    location: "Brasília - DF",
    comment: "Trabalho gerenciando pequenas frotas urbanas e usamos a Velo Flow todos os dias. O processo de faturamento e suporte ágil resolvem tudo em instantes. Super recomendo!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Como funciona a tag inteligente da Velo Flow?",
    answer: "A Velo Flow é uma tag colada no para-brisa do seu veículo. Ela utiliza radiofrequência (RFID) homologada para enviar sinais para as antenas das cabines de pedágio e estacionamentos parceiros. A cancela abre automaticamente, eliminando suas paradas e filas."
  },
  {
    question: "Aceita em todos os pedágios e estacionamentos?",
    answer: "Nossa cobertura atinge mais de 90% dos pedágios de rodovias estaduais e federais concessionadas de todo o Brasil, além de mais de 1.200 shoppings, aeroportos, hotéis, e estacionamentos privados das principais capitais brasileiras."
  },
  {
    question: "Como funciona o período de testes de 30 dias grátis?",
    answer: "Ao assinar o Plano Premium, o primeiro mês de taxas de serviço de adesão do veículo é totalmente isento (R$ 0). Você pode desfrutar de toda a comodidade da tag sem riscos. Caso queira cancelar, é só nos chamar no WhatsApp."
  },
  {
    question: "Posso cancelar ou trocar de veículo a qualquer momento?",
    answer: "Sim! Não temos fidelidades engessadas para usuários individuais. O cancelamento pode ser feito 100% online através de nosso WhatsApp de atendimento de forma bem tranquila. Caso compre um carro novo, você pode transferir a cobertura de forma rápida via app."
  },
  {
    question: "Como são feitas as recargas e o pagamento?",
    answer: "Oferecemos modalidades pré-paga inteligente (com recarga automática por PIX ou cartão de crédito quando seu saldo atinge um valor mínimo personalizável) e pós-paga via faturamento empresarial. Tudo controlado pelo celular de forma instantânea de onde estiver."
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
