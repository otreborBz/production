import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PRODUCAO_DIARIA: '@app_producao:producao_diaria',
  PRODUCAO_HORA: '@app_producao:producao_hora',
  MODELOS: '@app_producao:modelos',
  FILTROS: '@app_producao:filtros',
};

const ORDERS_COLLECTION = '@codebr:orders';
const USER_COLLECTION = '@codebr:users';
const LOGGED_USER = '@codebr:logged_user';

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
      console.log('Dados de produção hora limpos do AsyncStorage');
    } catch (error) {
      console.error('Erro ao limpar produção hora:', error);
      throw error;
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

  async getUsers() {
    try {
      const storage = await AsyncStorage.getItem(USER_COLLECTION);
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  },

  async saveUser(user: any) {
    try {
      const users = await this.getUsers();
      users.push(user);
      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(users));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  },

  async setLoggedUser(user: any) {
    try {
      await AsyncStorage.setItem(LOGGED_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar usuário logado:', error);
    }
  },

  async getLoggedUser() {
    try {
      const user = await AsyncStorage.getItem(LOGGED_USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
      return null;
    }
  },

  async removeLoggedUser() {
    try {
      await AsyncStorage.removeItem(LOGGED_USER);
    } catch (error) {
      console.error('Erro ao remover usuário logado:', error);
    }
  },
}; 