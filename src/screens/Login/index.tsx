import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Button,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { storage } from '../../services/storage';
import { firebase } from '../../services/firebase';
import { COLORS } from '../../theme/colors';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged((user) => {
      if (user) {
        console.log("Usuário está autenticado:", user);
        // Redirecionar para a tela principal ou fazer outra ação
      } else {
        console.log("Usuário não está autenticado");
        // Redirecionar para a tela de login
      }
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Por favor, preencha todos os campos');
    }

    setLoading(true);
    try {
      const user = await firebase.signIn(email, password);
      
      // Pegar o nome antes do @ do email
      const name = email.split('@')[0];
      // Capitalizar a primeira letra
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      await storage.setLoggedUser({
        id: user.uid,
        email: user.email,
        name: formattedName
      });
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Production</Text>
            <Text style={styles.subtitle}>Monitoramento em tempo real</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={COLORS.textLight}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons 
                  name={showPassword ? "visibility-off" : "visibility"} 
                  size={24} 
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Entrar</Text>
                  <MaterialIcons name="arrow-forward" size={24} color={COLORS.white} />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.registerButton, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>Criar conta</Text>
              <MaterialIcons name="person-add" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 