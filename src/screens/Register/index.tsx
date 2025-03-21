import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { storage } from '../../services/storage';
import { firebase } from '../../services/firebase';
import { COLORS } from '../../theme/colors';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Erro', 'As senhas não conferem');
    }

    setLoading(true);
    try {
      const user = await firebase.signUp(email, password);
      
      // Salvar dados adicionais do usuário se necessário
      await storage.saveUser({
        id: user.uid,
        name,
        email: user.email,
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.goBack();
    } catch (error: any) {
      if (error.message.includes('email-already-in-use')) {
        Alert.alert('Erro', 'Este email já está em uso');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao criar a conta');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <MaterialIcons name="person-add" size={80} color={COLORS.primary} />
              <Text style={styles.title}>Criar Conta</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.textLight}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.textLight}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={COLORS.textLight}
              />

              <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor={COLORS.textLight}
              />

              <Button 
                title="Criar conta"
                onPress={handleRegister}
                loading={loading}
                icon="person-add"
                fullWidth
              />

              <Button
                title="Voltar"
                onPress={() => navigation.goBack()}
                variant="secondary"
                icon="arrow-back"
                fullWidth
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 