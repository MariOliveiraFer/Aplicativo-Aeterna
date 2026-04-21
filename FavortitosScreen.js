import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useCart } from './CartContext';

export default function FavoritosScreen({ navigation }) {
  const { favoritos, toggleFavorito, adicionarAoCarrinho } = useCart();

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });
  if (!fontsLoaded) return null;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardToque}
        onPress={() => navigation.navigate('InicioStack', {
          screen: 'DetalheLivro',
          params: { livro: item },
        })}
      >
        <Image source={item.capa} style={styles.capa} />
        <View style={styles.info}>
          <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
          <Text style={styles.autor}>{item.autor}</Text>
          <Text style={styles.preco}>{item.preco}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.btnCarrinho}
          onPress={() => adicionarAoCarrinho(item)}
        >
          <Text style={styles.btnCarrinhoText}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorito(item)}>
          <Text style={{ fontSize: 20 }}>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (favoritos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favoritos</Text>
        </View>
        <View style={styles.vazio}>
          <Text style={styles.vaziIcon}>🤍</Text>
          <Text style={styles.vaziTitulo}>Nenhum favorito</Text>
          <Text style={styles.vaziSub}>Salve livros que você amou</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <Text style={styles.contagem}>{favoritos.length} {favoritos.length === 1 ? 'livro' : 'livros'}</Text>
      </View>

      <FlatList
        data={favoritos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },

  header: {
    marginTop: 40,
    marginBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: 'PlayfairBold',
    fontSize: 28,
    color: '#2C2C2C',
  },
  contagem: { fontSize: 13, color: '#ad907d', fontWeight: 'bold' },

  lista: { paddingHorizontal: 20, paddingBottom: 20 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignItems: 'center',
  },
  cardToque: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  capa: { width: 60, height: 88, borderRadius: 6 },
  info: { flex: 1, marginLeft: 14 },
  titulo: {
    fontFamily: 'PlayfairBold',
    fontSize: 15,
    color: '#2C2C2C',
    lineHeight: 20,
  },
  autor: { fontSize: 12, color: '#999', marginTop: 2 },
  preco: { fontSize: 14, color: '#ad907d', fontWeight: 'bold', marginTop: 4 },

  acoes: { alignItems: 'center', gap: 10, marginLeft: 10 },
  btnCarrinho: {
    backgroundColor: '#2C2C2C',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCarrinhoText: { fontSize: 16 },

  // VAZIO
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  vaziIcon: { fontSize: 60 },
  vaziTitulo: { fontFamily: 'PlayfairBold', fontSize: 22, color: '#2C2C2C' },
  vaziSub: { fontSize: 14, color: '#999' },
});