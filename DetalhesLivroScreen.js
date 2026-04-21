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
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useCart } from './CartContext';

const DADOS_EXTRAS = {
  '1':  { descricao: 'A história do fidalgo espanhol Dom Quixote de la Mancha, que enlouquece lendo romances de cavalaria e decide tornar-se cavaleiro andante.', editora: 'Penguin Classics', publicacao: '1605' },
  '2':  { descricao: 'Ambientado na Revolução Francesa, acompanha Sidney Carton e Charles Darnay em uma história de amor, sacrifício e redenção.', editora: 'Penguin Classics', publicacao: '1859' },
  '3':  { descricao: 'Na Terra Média, o hobbit Frodo Bolseiro recebe a missão de destruir o Um Anel para salvar o mundo do Senhor das Trevas Sauron.', editora: 'HarperCollins', publicacao: '1954' },
  '4':  { descricao: 'Um piloto perdido no deserto encontra um pequeno príncipe vindo de outro planeta, em uma reflexão sobre a essência da vida.', editora: 'Agir', publicacao: '1943' },
  '5':  { descricao: 'Harry Potter descobre que é um bruxo e vai estudar na Escola de Magia e Bruxaria de Hogwarts, onde enfrenta seu primeiro grande desafio.', editora: 'Rocco', publicacao: '1997' },
  '6':  { descricao: 'As famílias nobres de Westeros disputam o Trono de Ferro enquanto uma ameaça sobrenatural cresce além da Muralha do Norte.', editora: 'Leya', publicacao: '1996' },
  '7':  { descricao: 'Elizabeth Bennet navega questões de educação, moral e casamento na Inglaterra do século XIX em uma das maiores obras da literatura.', editora: 'Penguin Classics', publicacao: '1813' },
  '8':  { descricao: 'Lily Bloom se muda para uma nova cidade e acaba conhecendo Ryle Kincaid, mas um retorno inesperado do passado complica tudo.', editora: 'Galera', publicacao: '2016' },
  '9':  { descricao: 'O professor Robert Langdon é chamado para investigar um assassinato no Museu do Louvre, desencadeando uma série de pistas ligadas a Da Vinci.', editora: 'Sextante', publicacao: '2003' },
  '10': { descricao: 'No planeta desértico Arrakis, Paul Atreides luta pela sobrevivência em meio a guerras pelo controle da especiaria mais valiosa do universo.', editora: 'Aleph', publicacao: '1965' },
  '11': { descricao: 'James Clear revela como pequenas mudanças de comportamento podem gerar resultados extraordinários ao longo do tempo.', editora: 'Alta Books', publicacao: '2018' },
  '12': { descricao: 'O diário de uma jovem judia que se escondeu com sua família em Amsterdã durante a ocupação nazista na Segunda Guerra Mundial.', editora: 'Record', publicacao: '1947' },
  '13': { descricao: 'Feyre, uma caçadora mortal, é levada para o mundo encantado das fadas, onde descobre segredos perigosos e um amor proibido.', editora: 'Galera', publicacao: '2015' },
  '14': { descricao: 'Louisa Clark começa a trabalhar como cuidadora de Will Traynor, um homem tetraplégico, e os dois mudam a vida um do outro.', editora: 'Intrínseca', publicacao: '2012' },
  '15': { descricao: 'Dez pessoas são convidadas para uma ilha isolada e começam a morrer uma a uma, sem que nenhum assassino externo pudesse ter entrado.', editora: 'HarperCollins', publicacao: '1939' },
  '16': { descricao: 'Nick Dunne torna-se o principal suspeito do desaparecimento de sua esposa Amy, em um thriller psicológico cheio de reviravoltas.', editora: 'Intrínseca', publicacao: '2012' },
  '17': { descricao: 'Jack Torrance aceita o emprego de zelador de um hotel isolado durante o inverno. O lugar começa a revelar seus segredos sombrios.', editora: 'Suma', publicacao: '1977' },
  '18': { descricao: 'Na distopia totalitária de Oceânia, Winston Smith trabalha reescrevendo a história para o Partido, enquanto busca encontrar a verdade.', editora: 'Companhia das Letras', publicacao: '1949' },
  '19': { descricao: 'Em um futuro onde a felicidade é controlada por condicionamento e drogas, Bernard Marx começa a questionar a sociedade perfeita.', editora: 'Globo', publicacao: '1932' },
  '20': { descricao: 'O astronauta Mark Watney é deixado para trás em Marte após uma tempestade. Ele precisa usar engenhosidade para sobreviver sozinho no planeta.', editora: 'Intrínseca', publicacao: '2011' },
  '21': { descricao: 'A autobiografia de Nelson Mandela, da infância na África do Sul rural até sua luta contra o apartheid e sua presidência.', editora: 'Maravilha', publicacao: '1994' },
  '22': { descricao: 'Malala conta sua história de vida no Paquistão, onde defendeu o direito das meninas à educação e sobreviveu a um atentado do Talibã.', editora: 'Companhia das Letras', publicacao: '2013' },
  '23': { descricao: 'Elie Wiesel narra sua experiência nos campos de concentração nazistas de Auschwitz e Buchenwald durante a Segunda Guerra Mundial.', editora: 'Intrínseca', publicacao: '1958' },
  '24': { descricao: 'Charles Duhigg explora a ciência por trás dos hábitos e como entendê-los pode transformar nossas vidas, empresas e sociedades.', editora: 'Objetiva', publicacao: '2012' },
  '25': { descricao: 'Dale Carnegie apresenta princípios atemporais para melhorar relacionamentos, ganhar aliados e influenciar pessoas de forma positiva.', editora: 'Companhia Nacional', publicacao: '1936' },
  '26': { descricao: 'Carol Dweck apresenta a diferença entre a mentalidade fixa e a mentalidade de crescimento, e como isso afeta nosso sucesso.', editora: 'Objetiva', publicacao: '2006' },
};

export default function DetalheLivroScreen({ route, navigation }) {
  const { livro } = route.params;
  const extra = DADOS_EXTRAS[livro.id] || {
    descricao: 'Descrição não disponível.',
    editora: 'Não informada',
    publicacao: 'Não informada',
  };

  const { adicionarAoCarrinho, toggleFavorito, isFavorito, carrinho } = useCart();
  const favoritado = isFavorito(livro.id);
  const noCarrinho = carrinho.some(item => item.id === livro.id);

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });
  if (!fontsLoaded) return null;

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
          <Text style={styles.textVoltar}>← VOLTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorito(livro)}>
          <Text style={{ fontSize: 24 }}>{favoritado ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* CAPA */}
        <View style={styles.capaContainer}>
          <Image source={livro.capa} style={styles.capa} />
          <View style={styles.badgeCategoria}>
            <Text style={styles.badgeTex}>{livro.categoria}</Text>
          </View>
        </View>

        {/* TÍTULO E AUTOR */}
        <Text style={styles.titulo}>{livro.titulo}</Text>
        <Text style={styles.autor}>{livro.autor}</Text>

        <View style={styles.divider} />

        {/* INFOS */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Editora</Text>
            <Text style={styles.infoValor}>{extra.editora}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Publicação</Text>
            <Text style={styles.infoValor}>{extra.publicacao}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Categoria</Text>
            <Text style={styles.infoValor}>{livro.categoria}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Preço</Text>
            <Text style={[styles.infoValor, { color: '#ad907d' }]}>{livro.preco}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* DESCRIÇÃO */}
        <Text style={styles.secaoTitulo}>Sobre o livro</Text>
        <Text style={styles.descricao}>{extra.descricao}</Text>

        {/* BOTÕES */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[styles.botaoCarrinho, noCarrinho && { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }]}
            onPress={handleCarrinho}
          >
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
  textVoltar: { fontSize: 12, color: '#ad907d', fontWeight: 'bold', letterSpacing: 1 },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },

  capaContainer: { alignItems: 'center', marginTop: 10, marginBottom: 24 },
  capa: {
    width: 180, height: 260, borderRadius: 10,
    elevation: 8, shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2, shadowRadius: 10,
  },
  badgeCategoria: {
    position: 'absolute', bottom: -10,
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20,
  },
  badgeTex: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },

  titulo: {
    fontFamily: 'PlayfairBold', fontSize: 26, color: '#2C2C2C',
    textAlign: 'center', marginTop: 18, lineHeight: 34,
  },
  autor: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 6, letterSpacing: 0.5 },

  divider: { height: 1, backgroundColor: '#E8E5E0', marginVertical: 20 },

  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  infoBox: {
    width: '47%', backgroundColor: '#FFF', borderRadius: 10, padding: 14,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4,
  },
  infoLabel: { fontSize: 11, color: '#AAA', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  infoValor: { fontSize: 14, fontWeight: '600', color: '#2C2C2C' },

  secaoTitulo: { fontFamily: 'PlayfairBold', fontSize: 18, color: '#2C2C2C', marginBottom: 10 },
  descricao: { fontSize: 14, color: '#666', lineHeight: 22 },

  botoesContainer: { marginTop: 30, gap: 12 },
  botaoCarrinho: {
    backgroundColor: '#FFF', borderWidth: 1.5, borderColor: '#2C2C2C',
    paddingVertical: 14, borderRadius: 8, alignItems: 'center',
  },
  textoBotaoCarrinho: { fontSize: 14, fontWeight: 'bold', color: '#2C2C2C', letterSpacing: 0.5 },
  botaoComprar: {
    backgroundColor: '#2C2C2C', paddingVertical: 16, borderRadius: 8, alignItems: 'center',
  },
  textoBotaoComprar: { color: '#FFF', fontSize: 14, fontWeight: 'bold', letterSpacing: 1.5 },
});