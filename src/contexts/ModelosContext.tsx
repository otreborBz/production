import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';

export type Modelo = {
  id: string;
  familia: string;
  modelo: string;
  fioMarcha: {
    modeloFio: string;
    resistencia: string;
  };
  fioAuxiliar: {
    modeloFio: string;
    resistencia: string;
  };
};

type ModelosContextData = {
  modelos: Modelo[];
  addModelo: (modelo: Omit<Modelo, 'id'>) => Promise<void>;
  updateModelo: (id: string, modelo: Omit<Modelo, 'id'>) => Promise<void>;
  deleteModelo: (id: string) => Promise<void>;
  findModeloByName: (name: string) => Modelo | undefined;
  clearModelos: () => Promise<void>;
};

const ModelosContext = createContext<ModelosContextData>({} as ModelosContextData);

export function ModelosProvider({ children }: { children: React.ReactNode }) {
  const [modelos, setModelos] = useState<Modelo[]>([]);

  useEffect(() => {
    async function loadStoredData() {
      const storedModelos = await storage.getModelos();
      if (storedModelos) {
        setModelos(storedModelos);
      }
    }
    loadStoredData();
  }, []);

  useEffect(() => {
    storage.saveModelos(modelos);
  }, [modelos]);

  async function addModelo(modelo: Omit<Modelo, 'id'>) {
    const novoModelo: Modelo = {
      ...modelo,
      id: String(Date.now()),
    };

    setModelos(prev => [...prev, novoModelo]);
  }

  async function updateModelo(id: string, modeloAtualizado: Omit<Modelo, 'id'>) {
    setModelos(prev => prev.map(modelo => 
      modelo.id === id ? { ...modeloAtualizado, id } : modelo
    ));
  }

  async function deleteModelo(id: string) {
    setModelos(prev => prev.filter(modelo => modelo.id !== id));
  }

  function findModeloByName(name: string) {
    return modelos.find(modelo => modelo.modelo === name);
  }

  async function clearModelos() {
    await storage.clearModelos();
    setModelos([]);
  }

  return (
    <ModelosContext.Provider value={{
      modelos,
      addModelo,
      updateModelo,
      deleteModelo,
      findModeloByName,
      clearModelos,
    }}>
      {children}
    </ModelosContext.Provider>
  );
}

export function useModelos() {
  const context = useContext(ModelosContext);
  if (!context) {
    throw new Error('useModelos deve ser usado dentro de um ModelosProvider');
  }
  return context;
} 