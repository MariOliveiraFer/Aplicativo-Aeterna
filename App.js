import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet } from "react-native";

import HomeScreen from "./homescreen";
import DetalhesScreen from "./detalhe";
import DetalheLivroScreen from "./DetalhesLivroScreen";
import CarrinhoScreen from "./CarrinhosScreen";
import FavoritosScreen from "./FavortitosScreen";
import BibliotecaScreen from "./BibliotecaScreen";
import ExplorarAcervoScreen from "./ExplorarAcervoScreen";
import PerfilScreen from "./PerfilScreen"; // ✅ novo
import DadosPessoaisScreen from "./DadosPessoaisScreen"; // ✅ novo
import LoginScreen from "./LoginScreen";
import CadastroScreen from "./CadastroScreen";
import LoadingScreen from "./LoadingScreen";
import EsqueciSenhaScreen from "./EsqueciSenhaScreen"; // ✅ novo
import RedefinirSenhaScreen from "./RedefinirSenhaScreen"; // ✅ novo

import { CartProvider, useCart } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import { LibraryProvider } from "./LibraryContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Home, Detalhes e Explorar Acervo aqui
function InicioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="ExplorarAcervo" component={ExplorarAcervoScreen} />
    </Stack.Navigator>
  );
}

// ✅ Perfil e Dados Pessoais aqui (Endereços/Pagamento entram depois)
function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilPrincipal" component={PerfilScreen} />
      <Stack.Screen name="DadosPessoais" component={DadosPessoaisScreen} />
    </Stack.Navigator>
  );
}

function IconeCarrinho({ color, size }) {
  const { totalItens } = useCart();
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: size - 4, color }}>🛒</Text>
      {totalItens > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{totalItens}</Text>
        </View>
      )}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={styles.tabOptions}>
      <Tab.Screen
        name="InicioStack"
        component={InicioStack}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size - 2, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: ({ color, size }) => (
            <IconeCarrinho color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size - 2, color }}>❤️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Biblioteca"
        component={BibliotecaScreen}
        options={{
          tabBarLabel: "Biblioteca",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size - 2, color }}>📚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size - 2, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="EsqueciSenha" component={EsqueciSenhaScreen} />
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="DetalheLivro" component={DetalheLivroScreen} />
    </Stack.Navigator>
  );
}

const linking = {
  prefixes: ["aeterna://"],
  config: {
    screens: {
      RedefinirSenha: "redefinir-senha",
    },
  },
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LibraryProvider>
          <NavigationContainer linking={linking}>
            <RootStack />
          </NavigationContainer>
        </LibraryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#ad907d",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeTexto: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
  tabOptions: {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#FFF",
      borderTopColor: "#EEE",
      height: 60,
      paddingBottom: 8,
      paddingTop: 6,
    },
    tabBarActiveTintColor: "#2C2C2C",
    tabBarInactiveTintColor: "#BBB",
    tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
  },
});
