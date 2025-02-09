import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PRODUCAO_DIARIA: '@app_producao:producao_diaria',
  PRODUCAO_HORA: '@app_producao:producao_hora',
  MODELOS: '@app_producao:modelos',
  FILTROS: '@app_producao:filtros',
};

const ORDERS_COLLECTION = '@codebr:orders';

export const storage = {
  async saveProducaoDiaria(data: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRODUCAO_DIARIA, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar produção diária:', error);
    }
  },

  async getProducaoDiaria() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCAO_DIARIA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar produção diária:', error);
      return null;
    }
  },

  async saveProducaoHora(data: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRODUCAO_HORA, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar produção hora:', error);
    }
  },

  async getProducaoHora() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCAO_HORA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar produção hora:', error);
      return null;
    }
  },

  async saveModelos(data: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MODELOS, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar modelos:', error);
    }
  },

  async getModelos() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MODELOS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
      return null;
    }
  },

  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.PRODUCAO_DIARIA,
        STORAGE_KEYS.PRODUCAO_HORA,
        STORAGE_KEYS.MODELOS,
        STORAGE_KEYS.FILTROS,
        ORDERS_COLLECTION,
      ]);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  },

  async clearProducaoDiaria() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PRODUCAO_DIARIA);
    } catch (error) {
      console.error('Erro ao limpar produção diária:', error);
    }
  },

  async clearProducaoHora() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PRODUCAO_HORA);
    } catch (error) {
      console.error('Erro ao limpar produção hora:', error);
    }
  },

  async clearModelos() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.MODELOS);
    } catch (error) {
      console.error('Erro ao limpar modelos:', error);
    }
  },

  async clearFiltros() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.FILTROS);
    } catch (error) {
      console.error('Erro ao limpar filtros:', error);
    }
  },

  async saveFiltros(data: { data: string; linha: string; turno: string }) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FILTROS, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar filtros:', error);
    }
  },

  async getFiltros() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FILTROS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar filtros:', error);
      return null;
    }
  },

  async saveOrders(orders: Order[]) {
    try {
      console.log('Storage - Salvando ordens:', orders); // Debug
      await AsyncStorage.setItem(ORDERS_COLLECTION, JSON.stringify(orders));
      // Verificar se salvou
      const saved = await AsyncStorage.getItem(ORDERS_COLLECTION);
      console.log('Storage - Ordens salvas:', saved); // Debug
    } catch (error) {
      console.error('Erro ao salvar ordens:', error);
    }
  },

  async getOrders() {
    try {
      const storage = await AsyncStorage.getItem(ORDERS_COLLECTION);
      console.log('Storage - Buscando ordens:', storage); // Debug
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
      return [];
    }
  },

  async clearOrders() {
    try {
      await AsyncStorage.removeItem(ORDERS_COLLECTION);
    } catch (error) {
      console.error('Erro ao limpar ordens:', error);
    }
  },
}; 