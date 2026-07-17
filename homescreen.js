import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { Card } from 'react-native-paper';
import { listarLivros } from './livrosService';

const { width, height } = Dimensions.get('window');

const CARD_WIDTH = 150;
const CARD_MARGIN = 15;

// Imagens de destaque do topo continuam locais (são só banner, não livro)
const IMAGENS_DESTAQUE = [
  { id: '1', img: require('./telas/img1.jpg') },
  { id: '2', img: require('./telas/Livraria3.png') },
];

function SecaoLivros({ titulo, data, navigation }) {
  if (!data || data.length === 0) return null;

  return (
    <View style={styles.secaoLivros}>
      <Text style={styles.tituloSecao}>{titulo}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollLivros}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetalheLivro', { livro: item })}
          >
            <Card style={styles.cardLivro}>
              {item.capa_url ? (
                <Image source={{ uri: item.capa_url }} style={styles.capaLivro} />
              ) : (
                <View style={[styles.capaLivro, styles.capaSemImagem]}>
                  <Text style={{ fontSize: 28 }}>📖</Text>
                </View>
              )}
              <View style={styles.infoLivro}>
                <Text style={styles.tituloLivro} numberOfLines={2}>
                  {item.titulo}
                </Text>
                <Text style={styles.autorLivro} numberOfLines={1}>
                  {item.autor}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Playfair: PlayfairDisplay_400Regular,
    PlayfairBold: PlayfairDisplay_700Bold,
  });

  const [livrosPorCategoria, setLivrosPorCategoria] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarLivros = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const livros = await listarLivros();

      // Agrupa os livros por categoria
      const agrupado = {};
      livros.forEach((livro) => {
        const categoria = livro.categoria || 'Outros';
        if (!agrupado[categoria]) agrupado[categoria] = [];
        agrupado[categoria].push(livro);
      });

      setLivrosPorCategoria(agrupado);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarLivros();
  }, [carregarLivros]);

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <ImageBackground
          source={require('./telas/Livraria3.png')}
          style={styles.fundoHero}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      <View style={styles.secaoProposta}>
        <View style={styles.cardProposta}>
          <Text style={styles.tagline}>CURADORIA EXCLUSIVA</Text>
          <Text style={styles.tituloProposta}>Livraria Virtual</Text>
          <View style={styles.linha} />

          <FlatList
            data={IMAGENS_DESTAQUE}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={item.img} style={styles.imagemCarrossel} />
            )}
            style={styles.containerCarrossel}
          />

          <Text style={styles.subtituloProposta}>
            Onde a literatura clássica encontra o conforto do seu lar.
          </Text>

          <TouchableOpacity
            style={styles.botaoExplorar}
            onPress={() => navigation.navigate('ExplorarAcervo')}
          >
            <Text style={styles.textoBotao}>EXPLORAR ACERVO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {carregando && (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#ad907d" />
        </View>
      )}

      {erro && (
        <View style={styles.centro}>
          <Text style={styles.erroTexto}>Não foi possível carregar os livros.</Text>
        </View>
      )}

      {!carregando &&
        !erro &&
        Object.entries(livrosPorCategoria).map(([categoria, livros]) => (
          <SecaoLivros
            key={categoria}
            titulo={categoria}
            data={livros}
            navigation={navigation}
          />
        ))}

      {!carregando && !erro && Object.keys(livrosPorCategoria).length === 0 && (
        <View style={styles.centro}>
          <Text style={styles.vazioTexto}>
            Nenhum livro cadastrado ainda. Assim que o admin cadastrar, os livros aparecem aqui.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  heroSection: { height: height * 0.4, width: width },
  fundoHero: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  secaoProposta: {
    marginTop: -60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardProposta: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 25,
    borderRadius: 2,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 3,
    color: '#ad907d',
    marginBottom: 10,
    fontWeight: '600',
  },
  tituloProposta: {
    fontFamily: 'PlayfairBold',
    fontSize: 28,
    color: '#2C2C2C',
  },
  linha: {
    width: 40,
    height: 1,
    backgroundColor: '#ad907d',
    marginVertical: 15,
  },
  containerCarrossel: { width: width - 90, height: 180, marginVertical: 15 },
  imagemCarrossel: {
    width: width - 90,
    height: 180,
    borderRadius: 4,
    marginRight: 10,
  },
  subtituloProposta: {
    fontFamily: 'Playfair',
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  botaoExplorar: {
    marginTop: 20,
    backgroundColor: '#2C2C2C',
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  secaoLivros: { paddingVertical: 30 },
  tituloSecao: {
    fontFamily: 'PlayfairBold',
    fontSize: 22,
    marginLeft: 20,
    marginBottom: 15,
    color: '#2C2C2C',
  },
  scrollLivros: { paddingLeft: 20, paddingRight: 10 },
  cardLivro: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 4,
  },
  capaLivro: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  capaSemImagem: {
    backgroundColor: '#EFECE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLivro: {
    padding: 8,
    height: 60,
  },
  tituloLivro: {
    fontFamily: 'PlayfairBold',
    fontSize: 13,
    color: '#2C2C2C',
  },
  autorLivro: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  centro: { paddingVertical: 40, alignItems: 'center' },
  erroTexto: { color: '#C0392B', fontSize: 13 },
  vazioTexto: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});