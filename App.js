import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import HomeScreen from './homescreen';
import DetalhesScreen from './detalhe';
import DetalheLivroScreen from './DetalhesLivroScreen'; // ← nome exato do seu arquivo
import CarrinhoScreen from './CarrinhosScreen';
import FavoritosScreen from './FavortitosScreen';

import { CartProvider, useCart } from './CartContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack do fluxo principal (Início → Detalhes → Livro)
function InicioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="DetalheLivro" component={DetalheLivroScreen} />
    </Stack.Navigator>
  );
}

// Ícone do carrinho com badge
function IconeCarrinho({ color, size }) {
  const { totalItens } = useCart();
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size - 4, color }}>🛒</Text>
      {totalItens > 0 && (
        <View style={{
          position: 'absolute',
          top: -4,
          right: -6,
          backgroundColor: '#ad907d',
          borderRadius: 8,
          minWidth: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 3,
        }}>
          <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>{totalItens}</Text>
        </View>
      )}
    </View>
  );
}

// Tabs principais
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#EEE',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#2C2C2C',
        tabBarInactiveTintColor: '#BBB',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="InicioStack"
        component={InicioStack}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size - 2, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          tabBarLabel: 'Carrinho',
          tabBarIcon: ({ color, size }) => (
            <IconeCarrinho color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size - 2, color }}>❤️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </CartProvider>
  );
}