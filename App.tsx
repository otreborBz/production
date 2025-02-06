import React from 'react';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModelosProvider } from './src/contexts/ModelosContext';
import { HomeProvider } from './src/contexts/HomeContext';
import { useState } from 'react';
import { Modelo } from './src/contexts/ModelosContext';
import { NavigationContainer } from '@react-navigation/native';
import { ProducaoProvider } from './src/contexts/ProducaoContext';
import { ProducaoHoraProvider } from './src/contexts/ProducaoHoraContext';

export default function App() {
  const [modelosBuscados, setModelosBuscados] = useState<Modelo[]>([]);

  function handleBuscarModelo(nomeModelo: string) {
    // Movemos a lógica para cá para ser compartilhada
    const modeloJaExiste = modelosBuscados.some(m => m.modelo === nomeModelo);
    
    if (!modeloJaExiste) {
      setModelosBuscados(prev => [...prev, {
        id: String(Date.now()),
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
      }]);
    }
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ModelosProvider>
          <HomeProvider handleBuscarModelo={handleBuscarModelo}>
            <ProducaoProvider>
              <ProducaoHoraProvider>
                <Routes />
              </ProducaoHoraProvider>
            </ProducaoProvider>
          </HomeProvider>
        </ModelosProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
} 