import React from 'react';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModelosProvider } from './src/contexts/ModelosContext';
import { HomeProvider } from './src/contexts/HomeContext';
import { useState } from 'react';
import { Modelo } from './src/contexts/ModelosContext';
import { ProducaoProvider } from './src/contexts/ProducaoContext';
import { ProducaoHoraProvider } from './src/contexts/ProducaoHoraContext';
import { OrdersProvider } from './src/contexts/OrdersContext';
import { View } from 'react-native';

export default function App() {
  const [modelosBuscados, setModelosBuscados] = useState<Modelo[]>([]);

  function handleBuscarModelo(nomeModelo: string) {
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
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ModelosProvider>
          <HomeProvider handleBuscarModelo={handleBuscarModelo}>
            <ProducaoProvider>
              <ProducaoHoraProvider>
                <OrdersProvider>
                  <Routes />
                </OrdersProvider>
              </ProducaoHoraProvider>
            </ProducaoProvider>
          </HomeProvider>
        </ModelosProvider>
      </SafeAreaProvider>
    </View>
  );
} 