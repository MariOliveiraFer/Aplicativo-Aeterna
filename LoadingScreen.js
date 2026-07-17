import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';

export default function LoadingScreen({ navigation }) {
  const paginas = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

  const bolinha1 = useRef(new Animated.Value(1)).current;
  const bolinha2 = useRef(new Animated.Value(0.3)).current;
  const bolinha3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // ── PÁGINAS VIRANDO EM LOOP ──
    const animarPaginas = () => {
      const sequencia = paginas.map((pagina) =>
        Animated.timing(pagina, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      );

      const resetar = paginas.map((pagina) =>
        Animated.timing(pagina, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      );

      Animated.loop(
        Animated.sequence([
          ...sequencia,
          Animated.delay(300),
          Animated.parallel(resetar),
        ])
      ).start();
    };

    // ── BOLINHAS ──
    const animarBolinhas = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(bolinha1, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(bolinha2, { toValue: 0.3, duration: 250, useNativeDriver: true }),
            Animated.timing(bolinha3, { toValue: 0.3, duration: 250, useNativeDriver: true }),
          ]),
          Animated.delay(150),
          Animated.parallel([
            Animated.timing(bolinha1, { toValue: 0.3, duration: 250, useNativeDriver: true }),
            Animated.timing(bolinha2, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(bolinha3, { toValue: 0.3, duration: 250, useNativeDriver: true }),
          ]),
          Animated.delay(150),
          Animated.parallel([
            Animated.timing(bolinha1, { toValue: 0.3, duration: 250, useNativeDriver: true }),
            Animated.timing(bolinha2, { toValue: 0.3, duration: 250, useNativeDriver: true }),
            Animated.timing(bolinha3, { toValue: 1, duration: 250, useNativeDriver: true }),
          ]),
          Animated.delay(150),
        ])
      ).start();
    };

    animarPaginas();
    animarBolinhas();

    const timer = setTimeout(() => {
      navigation.navigate('MainTabs');
    }, 4000);

      return () => clearTimeout(timer);
}, [bolinha1, bolinha2, bolinha3, navigation, paginas]);

  const coresPaginas = [
    '#F5F0E8',
    '#EDE8DC',
    '#E5DFD0',
    '#DDD8C4',
    '#D5D0BC',
    '#CCC8B0',
  ];

  return (
    <View style={styles.container}>

      {/* LIVRO ABERTO */}
      <View style={styles.livroContainer}>

        {/* METADE ESQUERDA */}
        <View style={styles.metadeEsquerda}>
          {/* linhas simulando texto */}
          {[...Array(6)].map((_, i) => (
            <View key={i} style={[styles.linha, { width: i % 3 === 2 ? '60%' : '90%' }]} />
          ))}
        </View>

        {/* LOMBADA CENTRAL */}
        <View style={styles.lombada} />

        {/* METADE DIREITA — onde as páginas viram */}
        <View style={styles.metadeDireita}>
          {paginas.map((pagina, index) => {
            const rotateY = pagina.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-180deg'],
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.pagina,
                  {
                    backgroundColor: coresPaginas[index],
                    zIndex: paginas.length - index,
                    transform: [{ perspective: 800 }, { rotateY }],
                  },
                ]}
              >
                {/* linhas simulando texto na página */}
                {[...Array(6)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.linhaTexto,
                      { width: i % 3 === 2 ? '60%' : '88%' },
                    ]}
                  />
                ))}
              </Animated.View>
            );
          })}
        </View>

      </View>

      {/* SOMBRA DO LIVRO */}
      <View style={styles.sombra} />

      {/* BOLINHAS */}
      <View style={styles.bolinhasContainer}>
        <Animated.View style={[styles.bolinha, { opacity: bolinha1 }]} />
        <Animated.View style={[styles.bolinha, { opacity: bolinha2 }]} />
        <Animated.View style={[styles.bolinha, { opacity: bolinha3 }]} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },

  // ── LIVRO ──
  livroContainer: {
    flexDirection: 'row',
    width: 260,
    height: 200,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  metadeEsquerda: {
    width: 120,
    height: 200,
    backgroundColor: '#F0EBE0',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 14,
    justifyContent: 'center',
    gap: 10,
  },

  lombada: {
    width: 20,
    height: 200,
    backgroundColor: '#3a2a1a',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  metadeDireita: {
    width: 120,
    height: 200,
    backgroundColor: '#F0EBE0',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
  },

  pagina: {
    position: 'absolute',
    width: 120,
    height: 200,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: 14,
    justifyContent: 'center',
    gap: 10,
    backfaceVisibility: 'hidden',
    transformOrigin: 'left',
  },

  linha: {
    height: 8,
    backgroundColor: '#C8C0B0',
    borderRadius: 4,
  },

  linhaTexto: {
    height: 8,
    backgroundColor: '#C8C0B0',
    borderRadius: 4,
  },

  sombra: {
    width: 200,
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 50,
    marginTop: -20,
  },

  // ── BOLINHAS ──
  bolinhasContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },

  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ad907d',
  },
});