import React, { createContext, useContext, useState } from 'react';

export type ProducaoDiaria = {
  id: string;
  modelo: string;
  meta: number;
  marcha: number;
  teste: number;
  restante: number;
  concluido: boolean;
}

type ProducaoContextData = {
  producaoDiaria: ProducaoDiaria[];
  adicionarProducao: (modelo: string, quantidade: number) => void;
  atualizarMarcha: (id: string, valor: number) => void;
  atualizarTeste: (id: string, valor: number) => void;
  removerProducao: (modelo: string) => void;
}

const ProducaoContext = createContext<ProducaoContextData>({} as ProducaoContextData);

export function ProducaoProvider({ children }: { children: React.ReactNode }) {
  const [producaoDiaria, setProducaoDiaria] = useState<ProducaoDiaria[]>([]);

  function adicionarProducao(modelo: string, quantidade: number) {
    const novaProducao: ProducaoDiaria = {
      id: String(Date.now()),
      modelo,
      meta: quantidade,
      marcha: 0,
      teste: 0,
      restante: quantidade,
      concluido: false,
    };

    setProducaoDiaria(prev => [...prev, novaProducao]);
  }

  function atualizarMarcha(id: string, valor: number) {
    setProducaoDiaria(prev => prev.map(item => {
      if (item.id === id) {
        const restante = item.meta - valor;
        return {
          ...item,
          marcha: valor,
          restante,
          concluido: restante <= 0
        };
      }
      return item;
    }));
  }

  function atualizarTeste(id: string, valor: number) {
    setProducaoDiaria(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          teste: valor
        };
      }
      return item;
    }));
  }

  function removerProducao(modelo: string) {
    setProducaoDiaria(prev => prev.filter(item => item.modelo !== modelo));
  }

  return (
    <ProducaoContext.Provider value={{
      producaoDiaria,
      adicionarProducao,
      atualizarMarcha,
      atualizarTeste,
      removerProducao
    }}>
      {children}
    </ProducaoContext.Provider>
  );
}

export function useProducao() {
  const context = useContext(ProducaoContext);
  if (!context) {
    throw new Error('useProducao deve ser usado dentro de um ProducaoProvider');
  }
  return context;
} 