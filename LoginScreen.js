import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  useFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular,
} from '@expo-google-fonts/playfair-display';
import { useAuth } from './AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [fontsLoaded] = useFonts({
    PlayfairBold: PlayfairDisplay_700Bold,
    Playfair: PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setCarregando(true);
    try {
      await login({ email, senha });
      navigation.navigate('Loading'); // Loading -> MainTabs, como já era no seu fluxo
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>AETERNA</Text>
        <View style={styles.linha} />
        <Text style={styles.subtitulo}>Sua livraria virtual</Text>
      </View>

      <View style={styles.form}>
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
          placeholder="••••••••"
          placeholderTextColor="#AAA"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={carregando}>
          {carregando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.textoBotao}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoEsqueciSenha}
          onPress={() => navigation.navigate('EsqueciSenha')}
        >
          <Text style={styles.textoEsqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoCadastro}>
            Não tem conta? <Text style={styles.textoCadastroLink}>Cadastre-se</Text>
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
  topo: { alignItems: 'center', marginBottom: 48 },
  titulo: { fontFamily: 'PlayfairBold', fontSize: 42, color: '#2C2C2C', letterSpacing: 10 },
  linha: { width: 40, height: 1.5, backgroundColor: '#ad907d', marginVertical: 12 },
  subtitulo: { fontFamily: 'Playfair', fontSize: 14, color: '#888', letterSpacing: 1 },
  form: { gap: 10 },
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
    marginLeft: 2,
    width: '98%',
  },
  botao: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 13, letterSpacing: 2 },
  botaoEsqueciSenha: { alignItems: 'center', marginTop: 14 },
  textoEsqueciSenha: { fontSize: 12, color: '#ad907d', fontWeight: '600' },
  botaoCadastro: { alignItems: 'center', marginTop: 16 },
  textoCadastro: { fontSize: 13, color: '#888' },
  textoCadastroLink: { color: '#ad907d', fontWeight: 'bold' },
});