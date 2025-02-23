import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
import { storage } from './storage';

const firebaseConfig = {
  apiKey: "AIzaSyASES_8k2Grx0Zo3za5Z0mJuZxoEkSAKio",
  authDomain: "production-f18dd.firebaseapp.com",
  projectId: "production-f18dd",
  storageBucket: "production-f18dd.firebasestorage.app",
  messagingSenderId: "953263823099",
  appId: "1:953263823099:web:a1beb9e56f7e2aedd4385e",
  measurementId: "G-YXRCWH0LVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

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
  },

  onConnectionStateChanged: (callback: (isConnected: boolean) => void) => {
    return db.enableNetwork()
      .then(() => callback(true))
      .catch(() => callback(false));
  },

  saveProducaoHora: async (data: any) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCAO_HORA), data);
    return docRef;
  },

  updateProducaoHora: async (id: string, data: any) => {
    await updateDoc(doc(db, COLLECTIONS.PRODUCAO_HORA, id), data);
  },
}; 