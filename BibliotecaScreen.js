import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { useLibrary } from "./LibraryContext";

export default function BibliotecaScreen({ navigation }) {
  const { biblioteca, carregando, carregarBiblioteca } = useLibrary();

  const [fontsLoaded] = useFonts({ PlayfairBold: PlayfairDisplay_700Bold });
  if (!fontsLoaded) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("InicioStack", {
          screen: "DetalheLivro",
          params: { livro: item },
        })
      }
    >
      <Image
        source={item.capa_url ? { uri: item.capa_url } : item.capa}
        style={styles.capa}
      />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>
          {item.titulo}
        </Text>
        <Text style={styles.autor}>{item.autor}</Text>
        <Text style={styles.data}>
          Comprado em {new Date(item.compradoEm).toLocaleDateString("pt-BR")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (carregando) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#ad907d" />
        </View>
      </SafeAreaView>
    );
  }

  if (biblioteca.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Biblioteca</Text>
        </View>
        <View style={styles.vazio}>
          <Text style={styles.vaziIcon}>📚</Text>
          <Text style={styles.vaziTitulo}>Sua biblioteca está vazia</Text>
          <Text style={styles.vaziSub}>
            Os livros que você comprar aparecerão aqui
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Biblioteca</Text>
        <Text style={styles.contagem}>
          {biblioteca.length} {biblioteca.length === 1 ? "livro" : "livros"}
        </Text>
      </View>

      <FlatList
        data={biblioteca}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        onRefresh={carregarBiblioteca}
        refreshing={carregando}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF9F6" },
  centro: { flex: 1, alignItems: "center", justifyContent: "center" },

  header: {
    marginTop: 40,
    marginBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: "PlayfairBold",
    fontSize: 28,
    color: "#2C2C2C",
  },
  contagem: { fontSize: 13, color: "#ad907d", fontWeight: "bold" },

  lista: { paddingHorizontal: 20, paddingBottom: 20 },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignItems: "center",
  },
  capa: { width: 60, height: 88, borderRadius: 6 },
  info: { flex: 1, marginLeft: 14 },
  titulo: {
    fontFamily: "PlayfairBold",
    fontSize: 15,
    color: "#2C2C2C",
    lineHeight: 20,
  },
  autor: { fontSize: 12, color: "#999", marginTop: 2 },
  data: { fontSize: 11, color: "#ad907d", marginTop: 4 },

  vazio: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  vaziIcon: { fontSize: 60 },
  vaziTitulo: { fontFamily: "PlayfairBold", fontSize: 22, color: "#2C2C2C" },
  vaziSub: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
