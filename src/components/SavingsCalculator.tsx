import { useState } from "react";
import { Clock, Fuel, ShieldAlert, Zap, Compass, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { SiteConfig } from "../types";

interface SavingsCalculatorProps {
  config: SiteConfig;
}

export default function SavingsCalculator({ config }: SavingsCalculatorProps) {
  const [trips, setTrips] = useState(12);
  const [waitTime, setWaitTime] = useState(6);

  // Math equations driven by genuine Brazilian roadway statistics
  const annualTrips = trips * 12;
  const minutesWastedPerYear = annualTrips * waitTime;
  const hoursSaved = Math.round(minutesWastedPerYear / 60);

  // Estimating 0.04L of gasoline wasted per minute of idling in toll queue
  const literPerMinute = 0.04;
  const fuelLiterCost = 6.10; // Average cost / liter
  const fuelLitersSaved = minutesWastedPerYear * literPerMinute;
  const fuelValueSaved = Math.round(fuelLitersSaved * fuelLiterCost);

  // 1 Liter of gasoline produces approx 2.3 kg of CO2 equivalent
  const co2Factor = 2.3;
  const co2Reduction = Math.round(fuelLitersSaved * co2Factor);

  const getWhatsappLink = () => {
    const textMsg = `Olá! Usei a calculadora de economia da Velo Flow e vi que perco ${hoursSaved} horas por ano em filas! Quero parar de gastar R$ ${fuelValueSaved} de combustível e assinar o Plano Premium para passar livre.`;
    return `https://wa.me/${config.whatsAppNumber}?text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="bg-brand-light text-brand-blue text-xs font-display font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block">
          Simulador de Economia Velo Flow
        </span>
        <h3 className="font-display font-extrabold text-2xl md:text-3xl text-brand-blue mt-3">
          Quanto você gasta esperando no pedágio?
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Selecione a frequência de suas viagens e veja o tempo e dinheiro desperdiçados que você salvaria com a nossa tag.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Configuration */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slider 1: Trips */}
          <div className="bg-brand-slate p-5 rounded-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="font-display font-semibold text-gray-700 text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-blue" />
                Viagens por mês (Ida e Volta)
              </span>
              <span className="bg-brand-blue text-white font-mono text-sm px-3 py-1 rounded-full font-bold">
                {trips} {trips === 1 ? "viagem" : "viagens"}
              </span>
            </div>
            <input
              id="calculator-trips-slider"
              type="range"
              min="1"
              max="40"
              value={trips}
              onChange={(e) => setTrips(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
              <span>1 viagem</span>
              <span>20</span>
              <span>40 viagens</span>
            </div>
          </div>

          {/* Slider 2: Wait time */}
          <div className="bg-brand-slate p-5 rounded-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="font-display font-semibold text-gray-700 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-blue" />
                Tempo médio na fila (Booths)
              </span>
              <span className="bg-brand-orange text-white font-mono text-sm px-3 py-1 rounded-full font-bold">
                {waitTime} {waitTime === 1 ? "minuto" : "minutos"}
              </span>
            </div>
            <input
              id="calculator-wait-time-slider"
              type="range"
              min="1"
              max="15"
              value={waitTime}
              onChange={(e) => setWaitTime(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
              <span>1 min</span>
              <span>8 min</span>
              <span>15 mins</span>
            </div>
          </div>

          {/* Alert Message */}
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Você sabia?</strong> No trânsito pesado de feriados ou fins de semana, a espera média individual nos pedágios de São Paulo e Rio de Janeiro pode ultrapassar <strong>25 minutos por barreira</strong>.
            </p>
          </div>
        </div>

        {/* Dynamic visual results (Bento box style) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Result 1: Hours Wasted */}
          <div className="bg-brand-blue text-white rounded-2xl p-5 border border-blue-900 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-3 top-3 bg-white/10 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-brand-light" />
            </div>
            <div>
              <span className="text-brand-light/80 text-xs font-semibold uppercase tracking-wider block">
                Tempo Recuperado / Ano
              </span>
              <span className="text-4xl md:text-5xl font-display font-black mt-2 block tracking-tight">
                {hoursSaved} hrs
              </span>
            </div>
            <p className="text-xs text-brand-light/70 mt-3 border-t border-white/10 pt-3">
              Tempo livre para curtir a família, trabalhar ou relaxar, em vez de encarar filas exaustivas.
            </p>
          </div>

          {/* Result 2: Fuel Spent Idling */}
          <div className="bg-brand-slate text-brand-blue rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-3 top-3 bg-brand-light p-2 rounded-lg">
              <Fuel className="w-6 h-6 text-brand-blue" />
            </div>
            <div>
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider block">
                Combustível Poluente / Ano
              </span>
              <span className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 block tracking-tight">
                R$ {fuelValueSaved}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-3 border-t border-gray-100 pt-3">
              Economia estimada em litros de combustível perdidos puramente em marcha lenta na cabine.
            </p>
          </div>

          {/* Result 3: Carbon Saved */}
          <div className="bg-green-50 text-emerald-800 rounded-2xl p-5 border border-green-100 shadow-sm relative overflow-hidden flex flex-col justify-between sm:col-span-2">
            <div className="absolute right-3 top-3 bg-green-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <span className="text-emerald-700/80 text-xs font-semibold uppercase tracking-wider block">
                  Redução de Pegada de Carbono
                </span>
                <span className="text-3xl font-display font-extrabold text-emerald-900 mt-1 block">
                  {co2Reduction} kg de CO²
                </span>
              </div>
              <div className="text-xs text-emerald-800/80 max-w-sm sm:border-l sm:border-emerald-200 sm:pl-4">
                Pulsar a embreagem e reacelerar gera combustão incompleta. Você economiza o equivalente a plantar <strong>{Math.ceil(co2Reduction / 7)} árvores brasileiras</strong> ao ano!
              </div>
            </div>
          </div>

          {/* Bottom CTA to sign up */}
          <div className="sm:col-span-2 mt-2">
            <motion.a
              id="calculator-whats-cta"
              href={getWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-brand-orange hover:bg-opacity-95 text-white font-display font-bold py-4 px-6 rounded-xl shadow-lg transition-all text-center cursor-pointer text-sm"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Zap className="w-5 h-5 text-white fill-white animate-pulse" />
              <span>Garantir Meu Premium & Parar de Desperdiçar Dinheiro!</span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
