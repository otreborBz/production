import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';

export type ProducaoDiaria = {
  id: string;
  modelo: string;
  meta: number;
  marcha: number;
  teste: number;
  recuperado: number;
  restante: number;
  concluido: boolean;
  data: string;
  turno: string;
}

type ProducaoContextData = {
  producaoDiaria: ProducaoDiaria[];
  adicionarProducao: (modelo: string, quantidade: number, data: string, turno: string) => void;
  atualizarMarcha: (id: string, valor: number) => void;
  atualizarTeste: (id: string, valor: number) => void;
  atualizarRecuperado: (id: string, valor: number) => void;
  removerProducao: (modelo: string) => void;
  clearProducoes: () => Promise<void>;
}

const ProducaoContext = createContext<ProducaoContextData>({} as ProducaoContextData);

export function ProducaoProvider({ children }: { children: React.ReactNode }) {
  const [producaoDiaria, setProducaoDiaria] = useState<ProducaoDiaria[]>([]);

  // Carregar dados salvos quando o app iniciar
  useEffect(() => {
    async function loadStoredData() {
      const storedProducoes = await storage.getProducaoDiaria();
      if (storedProducoes) {
        setProducaoDiaria(storedProducoes);
      }
    }
    loadStoredData();
  }, []);

  // Salvar dados sempre que houver mudanças
  useEffect(() => {
    storage.saveProducaoDiaria(producaoDiaria);
  }, [producaoDiaria]);

  function adicionarProducao(modelo: string, quantidade: number, data: string, turno: string) {
    const novaProducao: ProducaoDiaria = {
      id: String(Date.now()),
      modelo,
      meta: quantidade,
      marcha: 0,
      teste: 0,
      recuperado: 0,
      restante: quantidade,
      concluido: false,
      data,
      turno,
    };

    setProducaoDiaria(prev => {
      const updated = [...prev, novaProducao];
      storage.saveProducaoDiaria(updated); // Garantir que salve imediatamente
      return updated;
    });
  }

  function atualizarMarcha(id: string, valor: number) {
    setProducaoDiaria(prev => {
      const updated = prev.map(item => {
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
      });
      storage.saveProducaoDiaria(updated); // Garantir que salve imediatamente
      return updated;
    });
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

  function atualizarRecuperado(id: string, valor: number) {
    setProducaoDiaria(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          recuperado: valor || 0
        };
      }
      return item;
    }));
  }

  function removerProducao(modelo: string) {
    setProducaoDiaria(prev => prev.filter(item => item.modelo !== modelo));
  }

  // Adicionar função para limpar dados
  async function clearProducoes() {
    await storage.clearProducaoDiaria();
    setProducaoDiaria([]);
  }

  return (
    <ProducaoContext.Provider value={{
      producaoDiaria,
      adicionarProducao,
      atualizarMarcha,
      atualizarTeste,
      atualizarRecuperado,
      removerProducao,
      clearProducoes,
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