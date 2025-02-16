import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Home } from '../screens/Home';
import { Orders } from '../screens/Orders';
import { Dashboard } from '../screens/Dashboard';
import { ModelosList } from '../screens/ModelosList';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { storage } from '../services/storage';
import { COLORS } from '../theme/colors';
import { firebase } from '../services/firebase';
import { TouchableOpacity, Alert, View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ModelosList" 
        component={ModelosList}
        options={{ 
          title: 'Modelos Criados',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function AppRoutes() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadUserName() {
      const user = await storage.getLoggedUser();
      if (user?.email) {
        // Pegar o nome antes do @ do email
        const name = user.email.split('@')[0];
        // Capitalizar a primeira letra
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    }
    loadUserName();
  }, []);

  async function handleLogout() {
    try {
      await firebase.signOut();
      await storage.removeLoggedUser();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer logout');
    }
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        headerRight: () => (
          <TouchableOpacity 
            onPress={handleLogout}
            style={{ marginRight: 16 }}
          >
            <MaterialIcons name="logout" size={24} color="#FFF" />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <View style={styles.welcomeContainer}>
            <MaterialIcons name="person" size={24} color="#FFF" />
            <Text style={styles.welcomeText}>Olá, {userName}</Text>
          </View>
        ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#B0C4DE',
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
        }
      }}
    >
      <Tab.Screen 
        name="dashboard" 
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="insert-chart" size={size} color={color} />
          ),
          tabBarLabel: 'Produção',
          headerTitle: 'Produção',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="inventory" size={size} color={color} />
          ),
          tabBarLabel: 'Modelos',
          headerTitle: 'Modelos'
        }}
      />
      <Tab.Screen
        name="Ordens"
        component={Orders}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    gap: 8,
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export function Routes() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar estado de autenticação do Firebase
    const unsubscribe = firebase.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Se tiver usuário no Firebase, atualiza o storage local
        await storage.setLoggedUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
        });
        setUser(firebaseUser);
      } else {
        // Se não tiver usuário no Firebase, limpa o storage local
        await storage.removeLoggedUser();
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
} 