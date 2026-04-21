import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { Card } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const CARD_WIDTH = 150;
const CARD_MARGIN = 15;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

// Certifique-se que estes arquivos existem na sua pasta ./aula04/
const IMAGENS_DESTAQUE = [
  { id: '1', img: require('./telas/img1.jpg') },
  { id: '2', img: require('./telas/Livraria3.png') },
];

const LIVROS_MAIS_VENDIDOS = [
  {
    id: '1',
    titulo: 'Dom Quixote',
    autor: 'Miguel de Cervantes',
    capa: require('./populares/dom_quixote.jpg'),
  },
  {
    id: '2',
    titulo: 'Um Conto de Duas Cidades',
    autor: 'Charles Dickens',
    capa: require('./populares/conto_duas.jpg'),
  },
  {
    id: '3',
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    capa: require('./populares/senhorDosAneis.jpg'),
  },
  {
    id: '4',
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    capa: require('./populares/Pequeno.jpg'),
  },
];

const LIVROS_FANTASIA = [
  {
    id: '1',
    titulo: 'Harry Potter e a Pedra Filosofal',
    autor: 'J.K. Rowling',
    capa: require('./fantasia/harryPotter.jpg'),
  },
  {
    id: '2',
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    capa: require('./fantasia/senhorDosAneis.jpg'),
  },
  {
    id: '3',
    titulo: 'A Game of Thrones',
    autor: 'George R.R. Martin',
    capa: require('./fantasia/GOT.jpg'),
  },
  {
    id: '4',
    titulo: 'A corte de espinhos e rosas',
    autor: 'Sarah J. Maas',
    capa: require('./fantasia/corte.jpg'),
  },
];

const LIVROS_ROMANCE = [
  {
    id: '1',
    titulo: 'Orgulho e Preconceito',
    autor: 'Jane Austen',
    capa: require('./Romance/orgulho.jpg'),
  },
  {
    id: '2',
    titulo: 'Como Eu Era Antes de Você',
    autor: 'Jojo Moyes',
    capa: require('./Romance/Livros-Jojo-Moyes.png'),
  },
  {
    id: '3',
    titulo: 'É Assim que Acaba',
    autor: 'Colleen Hoover',
    capa: require('./Romance/collen.jpg'),
  },
  {
    id: '4',
    titulo: 'O Morro dos Ventos Uivantes',
    autor: 'Emily Brontë',
    capa: require('./Romance/images.jpg'),
  },
];

const LIVROS_SUSPENSE = [
  {
    id: '1',
    titulo: 'E Não Sobrou Nenhum',
    autor: 'Agatha Christie',
    capa: require('./suspense/Agatha.png'),
  },
  {
    id: '2',
    titulo: 'O Código Da Vinci',
    autor: 'Dan Brown',
    capa: require('./suspense/davinci.jpg'),
  },
  {
    id: '3',
    titulo: 'Garota Exemplar',
    autor: 'Gillian Flynn',
    capa: require('./suspense/garotaExemplar.png'),
  },
  {
    id: '4',
    titulo: 'O Iluminado',
    autor: 'Stephen King',
    capa: require('./suspense/Oiluminado.jpg'),
  },
];

const LIVROS_FiCCAO_CIENTIFICA = [
  {
    id: '1',
    titulo: 'Duna',
    autor: 'Frank Herbert',
    capa: require('./ficcao/Duna.jpg'),
  },
  {
    id: '2',
    titulo: '1984',
    autor: 'George Orwell',
    capa: require('./ficcao/1984.jpg'),
  },
  {
    id: '3',
    titulo: 'Admirável Mundo Novo',
    autor: 'Aldous Huxley',
    capa: require('./ficcao/admir_vel_mundo_novo_.jpg'),
  },
  {
    id: '4',
    titulo: 'The Martian',
    autor: 'Andy Weir',
    capa: require('./ficcao/Martian.jpg'),
  },
];

const LIVROS_FICCAO_HISTORICA = [
  {
    id: '1',
    titulo: 'O Nome da Rosa',
    autor: 'Umberto eco' ,
    capa: require('./ficcao_historica/Umberto.jpg'),
  },
  {
    id: '2',
    titulo: 'A Menina que Roubava Livros',
    autor: 'Markus Zusak',
    capa: require('./ficcao_historica/A_menina_que_roubava_livros.jpg'),
  },
  {
    id: '3',
    titulo: 'Os Pilares da Terra',
    autor: 'Ken Follett',
    capa: require('./ficcao_historica/Ken_Follet.jpg'),
  },
  {
    id: '4',
    titulo: 'Guerra e Paz',
    autor: 'Liev Tolstói',
    capa: require('./ficcao_historica/Guerra_Paz.jpg'),
  },
];

const LIVROS_AUTO_AJUDA = [
  {
    id: '1',
    titulo: 'Hábitos Atômicos',
    autor: 'James Clear',
    capa: require('./autoajuda/Habitos.jpg'),
  },
  {
    id: '2',
    titulo: 'O Poder do Hábito',
    autor: 'Charles Duhigg',
    capa: require('./autoajuda/poder_Habito.jpg'),
  },
  {
    id: '3',
    titulo: 'Como Fazer Amigos e Influenciar Pessoas',
    autor: 'Dale Carnegie',
    capa: require('./autoajuda/dale.jpg'),
  },
  {
    id: '4',
    titulo: 'Mindset',
    autor: 'Carol S. Dweck',
    capa: require('./autoajuda/Mindset.jpg'),
  },
];

const LIVROS_HISTORICOS = [

  { id: '1', 
  titulo: 'O Diário de Anne Frank', 
  autor: 'Anne Frank', 
  capa: require('./Historico/Anne_Frank.jpg'),
  },

  {
    id: '2',
    titulo: 'Eu sou Malala',
    autor: 'Malala Yousafzai',
    capa: require('./Historico/Malala.jpg'),
  },

  {
    id: '3',
    titulo: 'Noite',
    autor: 'Elie Wiesel',
    capa: require('./Historico/Noite.jpg'),
  },
  {
    id: '4',
    titulo: 'Um Longo Caminho Para a Liberdade',
    autor: 'Nelson Mandela',
    capa: require('./Historico/UM_LONGO_CAMINHO_PARA_A_LIBERD_.jpg'),
  },

];

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Playfair: PlayfairDisplay_400Regular,
    PlayfairBold: PlayfairDisplay_700Bold,
  });

  // ================== REFS ==================
  const refMaisVendidos = useRef(null);
  const refFantasia = useRef(null);
  const refAutoAjuda = useRef(null);
  const refRomance = useRef(null);
  const refSuspense = useRef(null);
  const refFiccao = useRef(null);
  const refHistorico = useRef(null);
  const refFiccaoHistorica = useRef(null);

  // ================== STATES ==================
  const [indexMaisVendidos, setIndexMaisVendidos] = useState(0);
  const [indexFantasia, setIndexFantasia] = useState(0);
  const [indexAutoAjuda, setIndexAutoAjuda] = useState(0);
  const [indexRomance, setIndexRomance] = useState(0);
  const [indexSuspense, setIndexSuspense] = useState(0);
  const [indexFiccao, setIndexFiccao] = useState(0);
  const [indexHistorico, setIndexHistorica] = useState(0);
  const [indexFiccaoHistorica, setIndexFiccaoHistorica] = useState(0);


  //================== CONST PAUSA ==================
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);
  // Efeito de Scroll Automático para a seção de Obras Primas
  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexMaisVendidos + 1;
    if (next >= LIVROS_MAIS_VENDIDOS.length) next = 0;

    refMaisVendidos.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexMaisVendidos(next);
  }, 2800);

  return () => clearInterval(i);
}, [indexMaisVendidos, isPaused]);

  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexFantasia + 1;
    if (next >= LIVROS_FANTASIA.length) next = 0;

    refFantasia.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexFantasia(next);
  }, 2800);

  return () => clearInterval(i);
}, [indexFantasia, isPaused]);

  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexAutoAjuda + 1;
    if (next >= LIVROS_AUTO_AJUDA.length) next = 0;

    refAutoAjuda.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexAutoAjuda(next);
  }, 2800);

  return () => clearInterval(i);
}, [indexAutoAjuda, isPaused]);

  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexRomance + 1;
    if (next >= LIVROS_ROMANCE.length) next = 0;

    refRomance.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexRomance(next);
  }, 3500);

  return () => clearInterval(i);
}, [indexRomance, isPaused]);

  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexSuspense + 1;
    if (next >= LIVROS_SUSPENSE.length) next = 0;

    refSuspense.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexSuspense(next);
  }, 3500);

  return () => clearInterval(i);
}, [indexSuspense, isPaused]);

  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexFiccao + 1;
    if (next >= LIVROS_FiCCAO_CIENTIFICA.length) next = 0;

    refFiccao.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexFiccao(next);
  }, 2800);

  return () => clearInterval(i);
}, [indexFiccao, isPaused]);

  useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexFiccaoHistorica + 1;
    if (next >= LIVROS_FICCAO_HISTORICA.length) next = 0;

    refHistorica.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexFiccaoHistorica(next);
  }, 2800);

  return () => clearInterval(i);
}, [indexFiccaoHistorica, isPaused]);

useEffect(() => {
  if (isPaused) return;

  const i = setInterval(() => {
    let next = indexHistorico + 1;
    if (next >= LIVROS_HISTORICOS.length) next = 0;

    refHistorica.current?.scrollToIndex({
      index: next,
      animated: true,
    });

    setIndexHistorica(next);
  }, 2800);

  return () => clearInterval(i);
}, [indexHistorico, isPaused]);

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container} 
    showsVerticalScrollIndicator={false}
  onScrollBeginDrag={() => {
  setIsPaused(true);

  if (pauseTimeout.current) {
    clearTimeout(pauseTimeout.current);
  }
}}

onMomentumScrollEnd={() => {
  if (pauseTimeout.current) {
    clearTimeout(pauseTimeout.current);
  }

  pauseTimeout.current = setTimeout(() => {
    setIsPaused(false);
  }, 2800);
}}
  >
      {/* 1. Hero Section */}
      <View style={styles.heroSection}>
        <ImageBackground
          source={require('./telas/Livraria3.png')}
          style={styles.fundoHero}
          resizeMode="cover">
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      {/* 2. Seção de Proposta */}
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

          {/* O BOTÃO QUE VOCÊ PEDIU: */}
          <TouchableOpacity
            style={styles.botaoExplorar}
            onPress={() => navigation.navigate('Detalhes')}>
            <Text style={styles.textoBotao}>EXPLORAR ACERVO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Seção de Obras Primas */}
      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>Obras mais Vendidas</Text>
        <FlatList
          ref={refMaisVendidos}
          data={LIVROS_MAIS_VENDIDOS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>Fantasia</Text>
        <FlatList
          ref={refFantasia}
          data={LIVROS_FANTASIA}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>
          Desenvolvimento Pessoal/Auto-Ajuda
        </Text>
        <FlatList
          ref={refAutoAjuda}
          data={LIVROS_AUTO_AJUDA}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>Romance</Text>
        <FlatList
          ref={refRomance}
          data={LIVROS_ROMANCE}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>Suspense/Mistério/Crime</Text>
        <FlatList
          ref={refSuspense}
          data={LIVROS_SUSPENSE}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>Ficção Científica</Text>
        <FlatList
          ref={refFiccao}
          data={LIVROS_FiCCAO_CIENTIFICA}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}> Ficção Historica</Text>
        <FlatList
          ref={refFiccaoHistorica}
          data={LIVROS_FICCAO_HISTORICA}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.secaoLivros}>
        <Text style={styles.tituloSecao}>Historica</Text>
        <FlatList
          ref={refHistorico}
          data={LIVROS_HISTORICOS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollLivros}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + CARD_MARGIN,
            offset: (CARD_WIDTH + CARD_MARGIN) * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalhesLivro', { livro: item })
              }>
              <Card style={styles.cardLivro}>
                <Image source={item.capa} style={styles.capaLivro} />
                <View style={styles.infoLivro}>
                  <Text style={styles.tituloLivro}>{item.titulo}</Text>
                  <Text style={styles.autorLivro}>{item.autor}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
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
  scrollLivros: {
     paddingLeft: 20,
   paddingRight: 10 },

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
  infoLivro: { 
    padding: 8,
  height: 60,
    },
  tituloLivro: { 
    fontFamily: 'PlayfairBold', 
    fontSize: 13, 
    color: '#2C2C2C'
    },
  autorLivro: { 
    fontSize: 11, 
    color: '#888', 
    marginTop: 2 
    },
});
