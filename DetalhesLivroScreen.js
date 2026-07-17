import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { useCart } from './CartContext';

export default function DetalheLivroScreen({ route, navigation }) {
  const { livro } = route.params;

  const { adicionarAoCarrinho, toggleFavorito, isFavorito, carrinho } =
    useCart();
  const favoritado = isFavorito(livro.id);
  const noCarrinho = carrinho.some((item) => item.id === livro.id);

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });
  if (!fontsLoaded) return null;

  const precoFormatado = `R$ ${Number(livro.preco).toFixed(2).replace('.', ',')}`;

  const handleCarrinho = () => {
    adicionarAoCarrinho(livro);
    Alert.alert('Carrinho 🛒', `"${livro.titulo}" adicionado ao carrinho!`);
  };

  const handleComprar = () => {
    adicionarAoCarrinho(livro);
    Alert.alert('Compra 🎉', `Iniciando compra de "${livro.titulo}"...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}>
          <Text style={styles.textVoltar}>← VOLTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorito(livro)}>
          <Text style={{ fontSize: 24 }}>{favoritado ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        {/* CAPA */}
        <View style={styles.capaContainer}>
          {livro.capa_url ? (
            <Image source={{ uri: livro.capa_url }} style={styles.capa} />
          ) : (
            <View style={[styles.capa, styles.capaSemImagem]}>
              <Text style={{ fontSize: 48 }}>📖</Text>
            </View>
          )}
          {!!livro.categoria && (
            <View style={styles.badgeCategoria}>
              <Text style={styles.badgeTex}>{livro.categoria}</Text>
            </View>
          )}
        </View>

        {/* TÍTULO E AUTOR */}
        <Text style={styles.titulo}>{livro.titulo}</Text>
        <Text style={styles.autor}>{livro.autor}</Text>

        <View style={styles.divider} />

        {/* INFOS */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Editora</Text>
            <Text style={styles.infoValor}>{livro.editora || 'Não informada'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Publicação</Text>
            <Text style={styles.infoValor}>{livro.publicacao || 'Não informada'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Categoria</Text>
            <Text style={styles.infoValor}>{livro.categoria || 'Não informada'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Preço</Text>
            <Text style={[styles.infoValor, { color: '#ad907d' }]}>
              {precoFormatado}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* DESCRIÇÃO */}
        <Text style={styles.secaoTitulo}>Sobre o livro</Text>
        <Text style={styles.descricao}>
          {livro.descricao || 'Descrição não disponível.'}
        </Text>

        {/* BOTÕES */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[
              styles.botaoCarrinho,
              noCarrinho && {
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
              },
            ]}
            onPress={handleCarrinho}>
            <Text style={styles.textoBotaoCarrinho}>
              {noCarrinho ? '✓ No Carrinho' : '🛒 Adicionar ao Carrinho'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoComprar} onPress={handleComprar}>
            <Text style={styles.textoBotaoComprar}>COMPRAR AGORA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textVoltar: {
    fontSize: 12,
    color: '#ad907d',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },

  capaContainer: { alignItems: 'center', marginTop: 10, marginBottom: 24 },
  capa: {
    width: 180,
    height: 260,
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  capaSemImagem: {
    backgroundColor: '#EFECE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCategoria: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTex: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  titulo: {
    fontFamily: 'PlayfairBold',
    fontSize: 26,
    color: '#2C2C2C',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 34,
  },
  autor: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 0.5,
  },

  divider: { height: 1, backgroundColor: '#E8E5E0', marginVertical: 20 },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoBox: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  infoLabel: {
    fontSize: 11,
    color: '#AAA',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  infoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },

  secaoTitulo: {
    fontFamily: 'PlayfairBold',
    fontSize: 18,
    color: '#2C2C2C',
    marginBottom: 10,
  },

  descricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },

  botoesContainer: {
    marginTop: 30,
    gap: 12,
  },

  botaoCarrinho: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoCarrinho: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C2C2C',
    letterSpacing: 0.5,
  },
  botaoComprar: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoComprar: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});