import React, { useEffect, useState } from 'react';
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
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

export default function DadosPessoaisScreen({ navigation }) {
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from('perfils')
        .select('nome, telefone')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setNome(data.nome || '');
        setTelefone(data.telefone || '');
      }
      setCarregando(false);
    }
    carregar();
  }, [user]);

  if (!fontsLoaded || carregando) return null;

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome não pode ficar vazio.');
      return;
    }

    setSalvando(true);
    const { error } = await supabase
      .from('perfils')
      .update({ nome: nome.trim(), telefone: telefone.trim() })
      .eq('id', user.id);
    setSalvando(false);

    if (error) {
      Alert.alert('Erro ao salvar', error.message);
      return;
    }

    Alert.alert('Sucesso', 'Dados atualizados!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Dados Pessoais</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, styles.inputDesabilitado]}
          value={user?.email}
          editable={false}
        />
        <Text style={styles.hint}>O e-mail não pode ser alterado por aqui.</Text>

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleSalvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.botaoTexto}>SALVAR ALTERAÇÕES</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 16 },
  voltar: { fontSize: 12, color: '#ad907d', fontWeight: 'bold', letterSpacing: 1, marginBottom: 12 },
  titulo: { fontFamily: 'PlayfairBold', fontSize: 24, color: '#2C2C2C' },
  form: { paddingHorizontal: 20 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#555',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E8E5E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  inputDesabilitado: { color: '#999', backgroundColor: '#F2F2F2' },
  hint: { fontSize: 11, color: '#AAA', marginTop: 4 },
  botao: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  botaoTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 13, letterSpacing: 1 },
});