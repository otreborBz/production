import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  findModeloByName: (modelo: string) => Modelo | undefined;
  deleteModelo: (id: string) => Promise<void>;
  updateModelo: (id: string, modelo: Omit<Modelo, 'id'>) => Promise<void>;
};

const ModelosContext = createContext<ModelosContextData>({} as ModelosContextData);

export function ModelosProvider({ children }: { children: React.ReactNode }) {
  const [modelos, setModelos] = useState<Modelo[]>([]);

  useEffect(() => {
    loadModelos();
  }, []);

  async function loadModelos() {
    try {
      const storedModelos = await AsyncStorage.getItem('@ProductionApp:modelos');
      if (storedModelos) {
        setModelos(JSON.parse(storedModelos));
      }
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
    }
  }

  async function addModelo(newModelo: Omit<Modelo, 'id'>) {
    try {
      const modelo = {
        id: String(Date.now()),
        ...newModelo
      };

      const updatedModelos = [...modelos, modelo];
      setModelos(updatedModelos);
      await AsyncStorage.setItem('@ProductionApp:modelos', JSON.stringify(updatedModelos));
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
    }
  }

  function findModeloByName(modeloName: string) {
    if (!modeloName) return undefined;
    return modelos.find(m => 
      m.modelo.toLowerCase().trim() === modeloName.toLowerCase().trim()
    );
  }

  async function deleteModelo(id: string) {
    try {
      const updatedModelos = modelos.filter(modelo => modelo.id !== id);
      setModelos(updatedModelos);
      await AsyncStorage.setItem('@ProductionApp:modelos', JSON.stringify(updatedModelos));
    } catch (error) {
      console.error('Erro ao deletar modelo:', error);
    }
  }

  async function updateModelo(id: string, modeloAtualizado: Omit<Modelo, 'id'>) {
    try {
      const updatedModelos = modelos.map(modelo => 
        modelo.id === id ? { ...modeloAtualizado, id } : modelo
      );
      setModelos(updatedModelos);
      await AsyncStorage.setItem('@ProductionApp:modelos', JSON.stringify(updatedModelos));
    } catch (error) {
      console.error('Erro ao atualizar modelo:', error);
    }
  }

  return (
    <ModelosContext.Provider value={{ 
      modelos, 
      addModelo, 
      findModeloByName,
      deleteModelo,
      updateModelo
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