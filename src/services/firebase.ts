import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from './storage';

const firebaseConfig = {
 //adicionar configuração do firebase
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

const db = getFirestore(app);

// Constantes para nomes de coleções
const COLLECTIONS = {
  PRODUCAO_HORA: 'producao_hora',
  PRODUCAO_DIARIA: 'producao_diaria',
  USUARIOS: 'usuarios',
  MODELOS: 'modelos'
} as const;

export const firebase = {
  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Salvar usuário no storage local
      const newUser = {
        id: result.user.uid,
        email: result.user.email,
      };
      
      const users = await storage.getUsers();
      users.push(newUser);
      await storage.saveUser(newUser);
      
      return result.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signOut() {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(callback);
  },

  // Funções para Produção por Hora
  async saveProducaoHora(producaoHora: any) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCAO_HORA), {
        ...producaoHora,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        linha: producaoHora.linha || '',
        turno: producaoHora.turno || '',
        data: producaoHora.data || new Date().toISOString()
      });

      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async getProducaoHora() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      const q = query(
        collection(db, COLLECTIONS.PRODUCAO_HORA), 
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updateProducaoHora(id: string, data: any) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      await updateDoc(doc(db, COLLECTIONS.PRODUCAO_HORA, id), {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async deleteProducaoHora(id: string) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      await deleteDoc(doc(db, COLLECTIONS.PRODUCAO_HORA, id));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async clearAllProducaoHora() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      // Buscar todas as produções do usuário
      const q = query(
        collection(db, COLLECTIONS.PRODUCAO_HORA),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Deletar cada documento
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}; 