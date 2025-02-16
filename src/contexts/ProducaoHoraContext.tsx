import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';

export type ProducaoHora = {
  id: string;
  horaInicio: string;
  horaFim: string;
  meta: number;
  realProduzido: number;
  turno: string;
  paradas: Array<{
    codigo: number;
    descricao: string;
    minutosPerdidos: number;
  }>;
}

type ProducaoHoraContextData = {
  producoesHora: ProducaoHora[];
  adicionarProducaoHora: (producao: Omit<ProducaoHora, 'id'>) => void;
  buscarProducaoHora: (id: string) => ProducaoHora | undefined;
  removerProducaoHora: (id: string) => void;
  clearProducoesHora: () => Promise<void>;
  atualizarProducaoHora: (id: string, producao: Omit<ProducaoHora, 'id'>) => void;
}

const ProducaoHoraContext = createContext<ProducaoHoraContextData>({} as ProducaoHoraContextData);

export function ProducaoHoraProvider({ children }: { children: React.ReactNode }) {
  const [producoesHora, setProducoesHora] = useState<ProducaoHora[]>([]);

  // Carregar dados salvos quando o app iniciar
  useEffect(() => {
    async function loadStoredData() {
      try {
        const storedProducoes = await storage.getProducaoHora();
        if (storedProducoes && Array.isArray(storedProducoes)) {
          setProducoesHora(storedProducoes);
        } else {
          setProducoesHora([]);
        }
      } catch (error) {
        console.error('Erro ao carregar produções:', error);
        setProducoesHora([]);
      }
    }
    loadStoredData();
  }, []);

  // Salvar dados sempre que houver mudanças
  useEffect(() => {
    storage.saveProducaoHora(producoesHora);
  }, [producoesHora]);

  function adicionarProducaoHora(producao: ProducaoHora) {
    setProducoesHora(prev => {
      // Se já existir uma produção com este ID, atualiza
      if (producao.id && prev.some(p => p.id === producao.id)) {
        return prev.map(p => p.id === producao.id ? producao : p);
      }
      // Caso contrário, adiciona nova produção
      return [...prev, producao];
    });
  }

  function buscarProducaoHora(id: string) {
    return producoesHora.find(producao => producao.id === id);
  }

  function removerProducaoHora(id: string) {
    setProducoesHora(prev => prev.filter(p => p.id !== id));
  }

  async function clearProducoesHora() {
    await storage.clearProducaoHora();
    setProducoesHora([]);
  }

  function atualizarProducaoHora(id: string, producao: Omit<ProducaoHora, 'id'>) {
    setProducoesHora(prev => prev.map(item => 
      item.id === id 
        ? { ...producao, id } 
        : item
    ));
  }

  return (
    <ProducaoHoraContext.Provider value={{
      producoesHora,
      adicionarProducaoHora,
      buscarProducaoHora,
      removerProducaoHora,
      clearProducoesHora,
      atualizarProducaoHora,
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