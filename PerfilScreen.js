import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [perfil, setPerfil] = useState(null);

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });

  useEffect(() => {
    async function carregar() {
      if (!user) return;
      const { data } = await supabase
        .from('perfils')
        .select('nome, email')
        .eq('id', user.id)
        .single();
      setPerfil(data);
    }
    carregar();
  }, [user]);

  if (!fontsLoaded) return null;

  const handleSair = () => {
    Alert.alert('Sair', 'Deseja realmente sair da conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.navigate('Login');
        },
      },
    ]);
  };

  const opcoes = [
    { icone: '👤', titulo: 'Dados pessoais', rota: 'DadosPessoais' },
    // Endereços e Histórico de Pedidos entram quando o pagamento for definido
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              {perfil?.nome?.[0]?.toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.nome}>{perfil?.nome || 'Carregando...'}</Text>
          <Text style={styles.email}>{perfil?.email || user?.email}</Text>
        </View>

        <View style={styles.lista}>
          {opcoes.map((opcao) => (
            <TouchableOpacity
              key={opcao.rota}
              style={styles.item}
              onPress={() => navigation.navigate(opcao.rota)}
            >
              <Text style={styles.itemIcone}>{opcao.icone}</Text>
              <Text style={styles.itemTexto}>{opcao.titulo}</Text>
              <Text style={styles.itemSeta}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoSair} onPress={handleSair}>
          <Text style={styles.botaoSairTexto}>SAIR DA CONTA</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarTexto: { color: '#FFF', fontSize: 28, fontFamily: 'PlayfairBold' },
  nome: { fontFamily: 'PlayfairBold', fontSize: 20, color: '#2C2C2C' },
  email: { fontSize: 13, color: '#999', marginTop: 2 },

  lista: { paddingHorizontal: 20, marginTop: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  itemIcone: { fontSize: 20, marginRight: 14 },
  itemTexto: { flex: 1, fontSize: 14, color: '#2C2C2C', fontWeight: '600' },
  itemSeta: { fontSize: 20, color: '#CCC' },

  botaoSair: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C0392B',
    alignItems: 'center',
  },
  botaoSairTexto: { color: '#C0392B', fontWeight: 'bold', fontSize: 13, letterSpacing: 1 },
});