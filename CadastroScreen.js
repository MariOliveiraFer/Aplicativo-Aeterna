import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  useFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular,
} from '@expo-google-fonts/playfair-display';
import { useAuth } from './AuthContext';

export default function CadastroScreen({ navigation }) {
  const { cadastrar } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [fontsLoaded] = useFonts({
    PlayfairBold: PlayfairDisplay_700Bold,
    Playfair: PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    if (senha.length < 12) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 12 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      await cadastrar({ nome, email, senha });
      Alert.alert(
        'Sucesso',
        'Cadastro realizado! Verifique seu e-mail para confirmar a conta (se a confirmação estiver ativada no Supabase).',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>AETERNA</Text>
        <View style={styles.linha} />
        <Text style={styles.subtitulo}>Crie sua conta</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          placeholderTextColor="#AAA"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor="#AAA"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••••••••"
          placeholderTextColor="#AAA"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••••••••"
          placeholderTextColor="#AAA"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleCadastro}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.textoBotao}>CADASTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoLogin}>
            Já tem conta? <Text style={styles.textoLoginLink}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  topo: { alignItems: 'center', marginBottom: 40 },
  titulo: { fontFamily: 'PlayfairBold', fontSize: 42, color: '#2C2C2C', letterSpacing: 6 },
  linha: { width: 40, height: 1.5, backgroundColor: '#ad907d', marginVertical: 12 },
  subtitulo: { fontFamily: 'Playfair', fontSize: 14, color: '#888', letterSpacing: 1 },
  form: { gap: 6 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2C2C2C',
    letterSpacing: 2,
    marginBottom: 4,
    marginTop: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E8E5E0',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: '#2C2C2C',
    width: '98%',
    marginLeft: 2,
  },
  botao: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 13, letterSpacing: 2 },
  botaoLogin: { alignItems: 'center', marginTop: 16 },
  textoLogin: { fontSize: 13, color: '#888' },
  textoLoginLink: { color: '#ad907d', fontWeight: 'bold' },
});