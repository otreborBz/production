import React, { createContext, useContext, useState } from 'react';

export type ProducaoHora = {
  id: string;
  horaInicio: string;
  horaFim: string;
  meta: number;
  realProduzido: number;
  codigoParada?: string;
  descricaoParada?: string;
  total: number;
}

type ProducaoHoraContextData = {
  producoesHora: ProducaoHora[];
  adicionarProducaoHora: (producao: Omit<ProducaoHora, 'id' | 'total'>) => void;
  buscarProducaoHora: (id: string) => ProducaoHora | undefined;
}

const ProducaoHoraContext = createContext<ProducaoHoraContextData>({} as ProducaoHoraContextData);

export function ProducaoHoraProvider({ children }: { children: React.ReactNode }) {
  const [producoesHora, setProducoesHora] = useState<ProducaoHora[]>([]);

  function adicionarProducaoHora(producao: Omit<ProducaoHora, 'id' | 'total'>) {
    const novaProducao: ProducaoHora = {
      id: String(Date.now()),
      ...producao,
      total: calcularTotal(producao.realProduzido)
    };

    setProducoesHora(prev => [...prev, novaProducao]);
  }

  function calcularTotal(realProduzido: number): number {
    const totalAnterior = producoesHora[producoesHora.length - 1]?.total || 0;
    return totalAnterior + realProduzido;
  }

  function buscarProducaoHora(id: string) {
    return producoesHora.find(producao => producao.id === id);
  }

  return (
    <ProducaoHoraContext.Provider value={{
      producoesHora,
      adicionarProducaoHora,
      buscarProducaoHora,
    }}>
      {children}
    </ProducaoHoraContext.Provider>
  );
}

export function useProducaoHora() {
  const context = useContext(ProducaoHoraContext);
  if (!context) {
    throw new Error('useProducaoHora deve ser usado dentro de um ProducaoHoraProvider');
  }
  return context;
} 