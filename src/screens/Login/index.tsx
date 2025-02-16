import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { storage } from '../../services/storage';
import { firebase } from '../../services/firebase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    setLoading(true);
    try {
      const user = await firebase.signIn(email, password);
      
      // Salvar dados do usuário localmente se necessário
      await storage.setLoggedUser({
        id: user.uid,
        email: user.email,
      });
      
      // Removemos o navigation.replace pois a navegação será
      // automática através do estado de autenticação
    } catch (error: any) {
      Alert.alert('Erro', 'Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  }

  function handleRegister() {
    // @ts-ignore
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Controle de Produção</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button 
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          icon="login"
          fullWidth
        />

        <Button
          title="Criar conta"
          onPress={handleRegister}
          variant="secondary"
          icon="person-add"
          fullWidth
        />
      </View>
    </View>
  );
} 