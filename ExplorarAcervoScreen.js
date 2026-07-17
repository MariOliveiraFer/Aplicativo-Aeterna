import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { listarLivros, buscarLivros } from "./livrosService";

export default function ExplorarAcervoScreen({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const dados = busca.trim()
        ? await buscarLivros(busca.trim())
        : await listarLivros();
      setLivros(dados);
    } catch (error) {
      console.error("Erro ao carregar acervo:", error.message);
    } finally {
      setCarregando(false);
    }
  }, [busca]);

  useEffect(() => {
    const timeout = setTimeout(carregar, 400);
    return () => clearTimeout(timeout);
  }, [carregar]);

  if (!fontsLoaded) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetalheLivro", { livro: item })}
    >
      {item.capa_url ? (
        <Image source={{ uri: item.capa_url }} style={styles.capa} />
      ) : (
        <View style={[styles.capa, styles.capaSemImagem]}>
          <Text style={styles.capaSemImagemTexto}>📖</Text>
        </View>
      )}
      <Text numberOfLines={2} style={styles.titulo}>
        {item.titulo}
      </Text>
      <Text numberOfLines={1} style={styles.autor}>
        {item.autor}
      </Text>
      <Text style={styles.preco}>
        R$ {Number(item.preco).toFixed(2).replace(".", ",")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Explorar Acervo</Text>

      <TextInput
        style={styles.busca}
        placeholder="Buscar por título, autor ou categoria"
        placeholderTextColor="#999"
        value={busca}
        onChangeText={setBusca}
      />

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#ad907d" />
        </View>
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.linha}
          contentContainerStyle={styles.lista}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum livro encontrado.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontFamily: "PlayfairBold",
    fontSize: 26,
    color: "#2C2C2C",
    marginTop: 40,
    marginBottom: 12,
    paddingHorizontal: 20,
  },

  busca: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E8E5E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  linha: {
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "47%",
  },
  capa: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    backgroundColor: "#EFECE6",
    marginBottom: 8,
  },
  capaSemImagem: { alignItems: "center", justifyContent: "center" },
  capaSemImagemTexto: {
    fontSize: 32,
  },
  titulo: {
    fontFamily: "PlayfairBold",
    fontSize: 13,
    color: "#2C2C2C",
  },
  autor: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  preco: {
    fontSize: 13,
    color: "#ad907d",
    fontWeight: "bold",
    marginTop: 4,
  },

  vazio: {
    textAlign: "center",
    marginTop: 60,
    color: "#999",
  },
});
