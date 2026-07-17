import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular,
} from "@expo-google-fonts/playfair-display";
import { useAuth } from "./AuthContext";

export default function EsqueciSenhaScreen({ navigation }) {
  const { recuperarSenha } = useAuth();
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [fontsLoaded] = useFonts({
    PlayfairBold: PlayfairDisplay_700Bold,
    Playfair: PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleEnviar = async () => {
    if (!email.trim()) {
      Alert.alert("Atenção", "Digite seu e-mail que foi cadastrado.");
      return;
    }

    setCarregando(true);
    try {
      await recuperarSenha(email.trim());
      setEnviado(true);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao enviar o e-mail de recuperação.");
      setEnviado(true);
    } finally {
      setCarregando(false);
      Alert.alert(
        "Sucesso",
        "Se esse e-mail estiver cadastrado, você vai receber um link para redefinir sua senha. Verifique também a caixa de spam.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>AETERNA</Text>
        <View style={styles.linha} />
        <Text style={styles.subtitulo}>Recuperar senha</Text>
      </View>

      {enviado ? (
        <View style={styles.form}>
          <Text style={styles.mensagemSucesso}>
            Se esse e-mail estiver cadastrado, você vai receber um link para
            redefinir sua senha. Verifique também a caixa de spam.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textoBotao}>VOLTAR AO LOGIN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.instrucao}>
            Digite o email que você utilizou para se cadastrar e enviaremos um
            link para redefinir a sua senha. Se você não receber o e-mail,
            verifique a caixa de spam ou tente novamente.
          </Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#AAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={handleEnviar}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.textoBotao}>ENVIAR LINK</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoVoltar}>← Voltar ao login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  topo: { alignItems: "center", marginBottom: 40 },
  titulo: {
    fontFamily: "PlayfairBold",
    fontSize: 38,
    color: "#2C2C2C",
    letterSpacing: 8,
  },
  linha: {
    width: 40,
    height: 1.5,
    backgroundColor: "#ad907d",
    marginVertical: 12,
  },
  subtitulo: {
    fontFamily: "Playfair",
    fontSize: 14,
    color: "#888",
    letterSpacing: 1,
  },
  form: { gap: 6 },
  instrucao: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  mensagemSucesso: {
    fontSize: 14,
    color: "#2E7D32",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2C2C2C",
    letterSpacing: 2,
    marginBottom: 4,
    marginLeft: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E8E5E0",
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: "#2C2C2C",
    width: "98%",
    marginLeft: 2,
  },
  botao: {
    backgroundColor: "#2C2C2C",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 2,
  },
  botaoVoltar: { alignItems: "center", marginTop: 16 },
  textoVoltar: { fontSize: 13, color: "#888" },
});
