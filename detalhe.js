import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';


const ACERVO_COMPLETO = [
  { id: '1', titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', preco: 'R$ 49,90', categoria: 'Clássico', capa: require('./populares/dom_quixote.jpg') },
  { id: '2', titulo: 'Um Conto de Duas Cidades', autor: 'Charles Dickens', preco: 'R$ 44,90', categoria: 'Clássico', capa: require('./populares/conto_duas.jpg') },
  { id: '3', titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', preco: 'R$ 59,90', categoria: 'Fantasia', capa: require('./fantasia/senhorDosAneis.jpg') },
  { id: '4', titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', preco: 'R$ 29,90', categoria: 'Clássico', capa: require('./populares/Pequeno.jpg') },

  { id: '5', titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', preco: 'R$ 45,90', categoria: 'Fantasia', capa: require('./fantasia/harryPotter.jpg') },
  { id: '6', titulo: 'A Game of Thrones', autor: 'George R.R. Martin', preco: 'R$ 64,90', categoria: 'Fantasia', capa: require('./fantasia/GOT.jpg') },

  { id: '7', titulo: 'Orgulho e Preconceito', autor: 'Jane Austen', preco: 'R$ 39,90', categoria: 'Romance', capa: require('./Romance/orgulho.jpg') },
  { id: '8', titulo: 'É Assim que Acaba', autor: 'Colleen Hoover', preco: 'R$ 37,90', categoria: 'Romance', capa: require('./Romance/collen.jpg') },

  { id: '9', titulo: 'O Código Da Vinci', autor: 'Dan Brown', preco: 'R$ 42,90', categoria: 'Suspense', capa: require('./suspense/davinci.jpg') },

  { id: '10', titulo: 'Duna', autor: 'Frank Herbert', preco: 'R$ 55,90', categoria: 'Ficção', capa: require('./ficcao/Duna.jpg') },

  { id: '11', titulo: 'Hábitos Atômicos', autor: 'James Clear', preco: 'R$ 54,90', categoria: 'Autoajuda', capa: require('./autoajuda/Habitos.jpg') },

  { id: '12', titulo: 'O Diário de Anne Frank', autor: 'Anne Frank', preco: 'R$ 71,95', categoria: 'Histórico', capa: require('./Historico/Anne_Frank.jpg') },

  { id: '13', titulo: 'A Corte de Espinhos e Rosas', autor: 'Sarah J. Maas', preco: 'R$ 52,90', categoria: 'Fantasia', capa: require('./fantasia/corte.jpg') },

  { id: '14', titulo: 'Como Eu era Antes de Você', autor: 'Jojo Moyes', preco: 'R$ 45,90', categoria: 'Romance', capa: require('./Romance/Livros-Jojo-Moyes.png') },

  { id: '15', titulo: 'E Não Sobrou Ninguém', autor: 'Agatha Christie', preco: 'R$ 36,90', categoria: 'Suspense', capa: require('./suspense/Agatha.png') },

  { id: '16', titulo: 'Garota Exemplar', autor: 'Gillian Flynn', preco: 'R$ 41,90', categoria: 'Suspense', capa: require('./suspense/garotaExemplar.png') },

  { id: '17', titulo: 'O iluminado', autor: 'Stephen King', preco: 'R$ 46,90', categoria: 'Suspense', capa: require('./suspense/Oiluminado.jpg') },

  { id: '18', titulo: '1984', autor: 'George Orwell', preco: 'R$ 34,90', categoria: 'Ficção', capa: require('./ficcao/1984.jpg') },

   { id: '19', titulo: 'Admirável Mundo Novo', autor: 'Aldous Huxley', preco: 'R$ 38,90', categoria: 'Ficção', capa: require('./ficcao/admir_vel_mundo_novo_.jpg') },

   { id: '20', titulo: 'The Martian', autor: 'Andy', preco: 'R$ 47,90', categoria: 'Ficção', capa: require('./ficcao/Martian.jpg') },

   { id: '21', titulo: 'Um Longo Caminho Para a Liberdade', autor: 'Nelson Mandela', preco: 'R$ 71,95', categoria: 'Histórico', capa: require('./Historico/UM_LONGO_CAMINHO_PARA_A_LIBERD_.jpg') },

   { id: '22', titulo: 'Eu Sou Malala', autor: 'Malala Yousafzai', preco: 'R$ 71,95', categoria: 'Histórico', capa: require('./Historico/Malala.jpg') },

   { id: '23', titulo: 'Noite', autor: 'Elie Wiesel', preco: 'R$ 71,95', categoria: 'Histórico', capa: require('./Historico/Noite.jpg') },

{ id: '24', titulo: 'O poder do Habito', autor: 'Charles Duhigg', preco: 'R$ 49,90', categoria: 'Autoajuda', capa: require('./autoajuda/poder_Habito.jpg') },

{ id: '25', titulo: 'Como Fazer Amigos e influenciar Pessoas', autor: 'Dale Carnegie', preco: 'R$ 44,90', categoria: 'Autoajuda', capa: require('./autoajuda/dale.jpg') },

{ id: '26', titulo: 'Mindset', autor: 'Carol S. Dweck', preco: 'R$ 46,90', categoria: 'Autoajuda', capa: require('./autoajuda/Mindset.jpg') },
  
];

export default function DetalhesScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'PlayfairBold': PlayfairDisplay_700Bold,
  });

  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [favoritos, setFavoritos] = useState([]);

  if (!fontsLoaded) return null;

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const livrosFiltrados = ACERVO_COMPLETO.filter(livro => {
    const matchNome = livro.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria =
      categoriaSelecionada === 'Todos' ||
      livro.categoria === categoriaSelecionada;

    return matchNome && matchCategoria;
  });

  const renderItem = ({ item }) => {
    const isFavorito = favoritos.includes(item.id);

    return (
      <TouchableOpacity 
        style={styles.cardItem}
        onPress={() => navigation.navigate('DetalheLivro', { livro: item })}
      >
        <Image source={item.capa} style={styles.capaMiniatura} />

        <View style={styles.infoContainer}>
          <Text style={styles.tituloLivro}>{item.titulo}</Text>
          <Text style={styles.autorLivro}>{item.autor}</Text>
          <Text style={styles.precoLivro}>{item.preco}</Text>
        </View>

        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorito(item.id);
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {isFavorito ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoComprar}
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate('DetalheLivro', { livro: item });
          }}
        >
          <Text style={styles.textoBotaoComprar}>COMPRAR</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acervo Completo</Text>
      </View>

      {/* 🔍 BUSCA */}
      <TextInput
        placeholder="Buscar livro..."
        value={busca}
        onChangeText={setBusca}
        style={{
          backgroundColor: '#FFF',
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      />

      {/* 🎯 FILTRO */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
        {['Todos','Fantasia','Romance','Suspense','Ficção','Histórico','Autoajuda','Clássico'].map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategoriaSelecionada(cat)}
            style={{
              backgroundColor: categoriaSelecionada === cat ? '#2C2C2C' : '#DDD',
              padding: 8,
              margin: 5,
              borderRadius: 5
            }}
          >
            <Text style={{ color: categoriaSelecionada === cat ? '#FFF' : '#000' }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={livrosFiltrados}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', paddingHorizontal: 20 },
  header: { marginTop: 40, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  voltar: { fontSize: 12, color: '#ad907d', fontWeight: 'bold' },
  headerTitle: { fontFamily: 'PlayfairBold', fontSize: 24, color: '#2C2C2C', marginLeft: 20 },
  lista: { paddingBottom: 30 },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  capaMiniatura: { width: 60, height: 90, borderRadius: 4 },
  infoContainer: { flex: 1, marginLeft: 15 },
  tituloLivro: { fontFamily: 'PlayfairBold', fontSize: 16, color: '#2C2C2C' },
  autorLivro: { fontSize: 13, color: '#888', marginTop: 2 },
  precoLivro: { fontSize: 14, color: '#ad907d', fontWeight: 'bold', marginTop: 5 },
  botaoComprar: { backgroundColor: '#2C2C2C', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4, marginLeft: 8 },
  textoBotaoComprar: { color: '#FFF', fontSize: 10, fontWeight: 'bold' }
});