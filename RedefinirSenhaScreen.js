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

export default function RedefinirSenhaScreen({ navigation }) {
  const { redefinirSenha, logout } = useAuth();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [fontsLoaded] = useFonts({
    PlayfairBold: PlayfairDisplay_700Bold,
    Playfair: PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleRedefinir = async () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha os dois campos.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    if (novaSenha.length < 12) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 12 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      await redefinirSenha(novaSenha);
      Alert.alert('Sucesso', 'Senha redefinida! Faça login novamente.', [
        {
          text: 'OK',
          onPress: async () => {
            await logout();
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro ao redefinir senha', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>AETERNA</Text>
        <View style={styles.linha} />
        <Text style={styles.subtitulo}>Criar nova senha</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nova senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 12 caracteres"
          placeholderTextColor="#AAA"
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar nova senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••••••"
          placeholderTextColor="#AAA"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleRedefinir}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.textoBotao}>SALVAR NOVA SENHA</Text>
          )}
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
  titulo: { fontFamily: 'PlayfairBold', fontSize: 38, color: '#2C2C2C', letterSpacing: 8 },
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
});