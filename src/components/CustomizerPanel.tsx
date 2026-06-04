import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, X, Check, Copy, RefreshCw, MessageSquare } from "lucide-react";
import { SiteConfig } from "../types";

interface CustomizerPanelProps {
  config: SiteConfig;
  onChange: (newConfig: SiteConfig) => void;
}

export default function CustomizerPanel({ config, onChange }: CustomizerPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const presets = {
    veloflow: {
      companyName: "Velo Flow Tecnologia Ltda",
      cnpj: "33.654.987/0001-23",
      address: "Rua dos Cariris, 752, Sala 12, Tatuapé, São Paulo - SP, 03310-030",
      email: "contato@veloflow.com.br",
      phoneDisplay: "(11) 99999-8888",
      whatsAppNumber: "5511999998888"
    },
    mobilityplus: {
      companyName: "Mobility Plus Tech Ltda",
      cnpj: "33.654.987/0002-12",
      address: "Av. Paulista, 1000, 14º Andar, Bela Vista, São Paulo - SP, 01310-100",
      email: "contato@mobilityplus.tech",
      phoneDisplay: "(11) 98765-4321",
      whatsAppNumber: "5511987654321"
    }
  };

  const applyPreset = (key: "veloflow" | "mobilityplus") => {
    onChange(presets[key]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const basicLink = `https://wa.me/${config.whatsAppNumber}?text=${encodeURIComponent("Olá! Gostaria de assinar o Plano Básico da Velo Flow (R$ 99,90/ano).")}`;
  const premiumLink = `https://wa.me/${config.whatsAppNumber}?text=${encodeURIComponent("Olá! Gostaria de assinar o Plano Premium da Velo Flow (R$ 149,90/ano). Quero meus 30 dias grátis de teste.")}`;
  const corpLink = `https://wa.me/${config.whatsAppNumber}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista sobre frotas no Plano Corporativo.")}`;

  return (
    <>
      {/* Floating Gear Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="customizer-trigger-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-brand-orange text-white px-4 py-3 rounded-full font-display font-semibold shadow-lg hover:bg-opacity-90 transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5 animate-spin-slow" />
          <span>Configurar WhatsApp & CNPJ</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="customizer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Panel */}
            <motion.div
              id="customizer-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto flex flex-col custom-scrollbar"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-brand-blue text-white">
                <div>
                  <h3 className="font-display font-bold text-lg">Painel de Personalização</h3>
                  <p className="text-xs text-brand-light opacity-80">Configure o site sem modificar o código</p>
                </div>
                <button
                  id="customizer-close-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Presets and Controls */}
              <div className="p-5 flex-1 space-y-6">
                {/* Visual presets */}
                <div className="space-y-3">
                  <label className="text-xs font-display font-semibold text-gray-500 uppercase tracking-wider block">
                    Presets de Empresa
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="preset-veloflow-btn"
                      onClick={() => applyPreset("veloflow")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        config.cnpj === "33.654.987/0001-23"
                          ? "border-brand-blue bg-brand-light/30 text-brand-blue font-semibold ring-2 ring-brand-blue/30"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <span className="block text-xs text-brand-orange uppercase font-bold tracking-tight">Padrão</span>
                      <span className="block text-sm">Velo Flow SP</span>
                    </button>
                    <button
                      id="preset-mobilityplus-btn"
                      onClick={() => applyPreset("mobilityplus")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        config.cnpj === "33.654.987/0002-12"
                          ? "border-brand-blue bg-brand-light/30 text-brand-blue font-semibold ring-2 ring-brand-blue/30"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <span className="block text-xs text-brand-orange uppercase font-bold tracking-tight">Alternativo</span>
                      <span className="block text-sm">Mobility Plus Tech</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 border-t border-gray-100 pt-5">
                  <h4 className="font-display font-semibold text-sm text-gray-800">DADOS GERAIS DO SITE</h4>

                  {/* WhatsApp Link Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Número WhatsApp (DDI + DDD + Número completo sem espaços)
                    </label>
                    <div className="relative">
                      <input
                        id="custom-whats-input"
                        type="text"
                        value={config.whatsAppNumber}
                        onChange={(e) => onChange({ ...config, whatsAppNumber: e.target.value })}
                        placeholder="Ex: 5511999998888"
                        className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-800 font-mono"
                      />
                      <MessageSquare className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Este número guiará todos os botões de conversão e link direto.</p>
                  </div>

                  {/* Phone display */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Telefone para Exibição no Rodapé
                    </label>
                    <input
                      id="custom-phone-disp-input"
                      type="text"
                      value={config.phoneDisplay}
                      onChange={(e) => onChange({ ...config, phoneDisplay: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-800"
                    />
                  </div>

                  {/* Company Legal Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Razão Social
                    </label>
                    <input
                      id="custom-company-name-input"
                      type="text"
                      value={config.companyName}
                      onChange={(e) => onChange({ ...config, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-800"
                    />
                  </div>

                  {/* CNPJ */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      CNPJ Comercial
                    </label>
                    <input
                      id="custom-cnpj-input"
                      type="text"
                      value={config.cnpj}
                      onChange={(e) => onChange({ ...config, cnpj: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-800 font-mono"
                    />
                  </div>

                  {/* Alternate Headquarters Address */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Endereço (Coworking ou Comercial)
                    </label>
                    <textarea
                      id="custom-address-input"
                      value={config.address}
                      onChange={(e) => onChange({ ...config, address: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-800 resize-none"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      E-mail Oficial
                    </label>
                    <input
                      id="custom-email-input"
                      type="email"
                      value={config.email}
                      onChange={(e) => onChange({ ...config, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-800"
                    />
                  </div>
                </div>

                {/* Pre-Generated Links Helper */}
                <div className="border-t border-gray-100 pt-5 space-y-3">
                  <h4 className="font-display font-semibold text-sm text-gray-800">LINKS DE CONVERSÃO EXCLUSIVOS</h4>
                  <p className="text-xs text-gray-500">Copie os links completos já estilizados e configurados para uso imediato em campanhas de tráfego pago:</p>

                  {/* Premium plan link */}
                  <div className="bg-brand-slate p-3 rounded-xl space-y-1.5 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-brand-blue">Link Direto Plano Premium</span>
                      <button
                        id="copy-premium-link-btn"
                        onClick={() => handleCopy(premiumLink, "premium")}
                        className="text-gray-500 hover:text-brand-orange p-1 rounded hover:bg-white transition-all cursor-pointer"
                        title="Copiar Link"
                      >
                        {copiedText === "premium" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <code className="block text-[10px] text-gray-500 truncate bg-white p-1.5 rounded border border-gray-100 font-mono">
                      {premiumLink}
                    </code>
                  </div>

                  {/* Basic plan link */}
                  <div className="bg-brand-slate p-3 rounded-xl space-y-1.5 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-700">Link Direto Plano Básico</span>
                      <button
                        id="copy-basic-link-btn"
                        onClick={() => handleCopy(basicLink, "basic")}
                        className="text-gray-500 hover:text-brand-orange p-1 rounded hover:bg-white transition-all cursor-pointer"
                        title="Copiar Link"
                      >
                        {copiedText === "basic" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <code className="block text-[10px] text-gray-500 truncate bg-white p-1.5 rounded border border-gray-100 font-mono">
                      {basicLink}
                    </code>
                  </div>
                </div>
              </div>

              {/* Reset to Default */}
              <div className="p-4 bg-brand-slate border-t border-gray-100 flex gap-3">
                <button
                  id="reset-defaults-btn"
                  onClick={() => onChange(presets.veloflow)}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restaurar Padrão</span>
                </button>
                <button
                  id="customizer-done-btn"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 rounded-lg bg-brand-blue text-white text-xs font-semibold hover:bg-opacity-95 transition-all text-center cursor-pointer"
                >
                  Salvar Configurações
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
