import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useCart } from './CartContext';

export default function CarrinhoScreen() {
  const {
    carrinho,
    removerDoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    totalCarrinho,
    totalItens,
  } = useCart();

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });
  if (!fontsLoaded) return null;

  const handleFinalizar = () => {
    Alert.alert('Pedido Confirmado! 🎉', `Total: R$ ${totalCarrinho.toFixed(2).replace('.', ',')}`, [
      { text: 'OK' }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.capa} style={styles.capa} />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.autor}>{item.autor}</Text>
        <Text style={styles.preco}>{item.preco}</Text>

        {/* Controle de quantidade */}
        <View style={styles.quantidadeRow}>
          <TouchableOpacity
            style={styles.btnQtd}
            onPress={() => diminuirQuantidade(item.id)}
          >
            <Text style={styles.btnQtdText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantidade}>{item.quantidade}</Text>
          <TouchableOpacity
            style={styles.btnQtd}
            onPress={() => aumentarQuantidade(item.id)}
          >
            <Text style={styles.btnQtdText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnRemover}
        onPress={() => removerDoCarrinho(item.id)}
      >
        <Text style={styles.btnRemoverText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  if (carrinho.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Carrinho</Text>
        </View>
        <View style={styles.vazio}>
          <Text style={styles.vaziIcon}>🛒</Text>
          <Text style={styles.vaziTitulo}>Carrinho vazio</Text>
          <Text style={styles.vaziSub}>Adicione livros para continuar</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrinho</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItens}</Text>
        </View>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      {/* RODAPÉ COM TOTAL */}
      <View style={styles.rodape}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total ({totalItens} {totalItens === 1 ? 'item' : 'itens'})</Text>
          <Text style={styles.totalValor}>
            R$ {totalCarrinho.toFixed(2).replace('.', ',')}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnFinalizar} onPress={handleFinalizar}>
          <Text style={styles.btnFinalizarText}>FINALIZAR COMPRA</Text>
        </TouchableOpacity>
      </View>
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
    gap: 10,
  },
  headerTitle: {
    fontFamily: 'PlayfairBold',
    fontSize: 28,
    color: '#2C2C2C',
  },
  badge: {
    backgroundColor: '#ad907d',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },

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

  quantidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  btnQtd: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnQtdText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', lineHeight: 20 },
  quantidade: { fontSize: 16, fontWeight: 'bold', color: '#2C2C2C', minWidth: 20, textAlign: 'center' },

  btnRemover: { padding: 6 },
  btnRemoverText: { fontSize: 16, color: '#CCC' },

  // VAZIO
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  vaziIcon: { fontSize: 60 },
  vaziTitulo: { fontFamily: 'PlayfairBold', fontSize: 22, color: '#2C2C2C' },
  vaziSub: { fontSize: 14, color: '#999' },

  // RODAPÉ
  rodape: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    gap: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 14, color: '#888' },
  totalValor: { fontFamily: 'PlayfairBold', fontSize: 22, color: '#2C2C2C' },
  btnFinalizar: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnFinalizarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});