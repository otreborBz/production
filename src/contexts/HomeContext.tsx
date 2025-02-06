import React, { createContext, useContext, useState, useEffect } from 'react';
import { Modelo } from './ModelosContext';
import { useModelos } from './ModelosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeContextData = {
  handleBuscarModelo: (nomeModelo: string) => void;
  modelosBuscados: Modelo[];
  removeModeloBuscado: (modeloId: string) => Promise<void>;
};

const HomeContext = createContext<HomeContextData>({} as HomeContextData);

type HomeProviderProps = {
  children: React.ReactNode;
};

export function HomeProvider({ children }: HomeProviderProps) {
  const { findModeloByName } = useModelos();
  const [modelosBuscados, setModelosBuscados] = useState<Modelo[]>([]);

  useEffect(() => {
    loadModelosBuscados();
  }, []);

  async function loadModelosBuscados() {
    try {
      const stored = await AsyncStorage.getItem('@ProductionApp:modelosBuscados');
      if (stored) {
        setModelosBuscados(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
    }
  }

  async function handleBuscarModelo(nomeModelo: string) {
    const modeloEncontrado = findModeloByName(nomeModelo);
    const novoModelo = modeloEncontrado || {
      id: `modelo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      modelo: nomeModelo,
      familia: '',
      fioMarcha: {
        modeloFio: '',
        resistencia: '',
      },
      fioAuxiliar: {
        modeloFio: '',
        resistencia: '',
      }
    };

    const modeloJaExiste = modelosBuscados.some(m => m.modelo === nomeModelo);
    if (!modeloJaExiste) {
      const updatedModelos = [...modelosBuscados, novoModelo];
      setModelosBuscados(updatedModelos);
      await AsyncStorage.setItem('@ProductionApp:modelosBuscados', JSON.stringify(updatedModelos));
    }
  }

  async function removeModeloBuscado(modeloId: string) {
    try {
      const updatedModelos = modelosBuscados.filter(modelo => modelo.id !== modeloId);
      setModelosBuscados(updatedModelos);
      await AsyncStorage.setItem('@ProductionApp:modelosBuscados', JSON.stringify(updatedModelos));
    } catch (error) {
      console.error('Erro ao remover modelo buscado:', error);
    }
  }

  return (
    <HomeContext.Provider value={{ 
      handleBuscarModelo, 
      modelosBuscados,
      removeModeloBuscado 
    }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeNavigation() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeNavigation deve ser usado dentro de um HomeProvider');
  }
  return context;
} 