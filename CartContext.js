import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // ── CARRINHO ──────────────────────────────────────────
  const adicionarAoCarrinho = (livro) => {
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === livro.id);
      if (existe) {
        return prev.map(item =>
          item.id === livro.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...livro, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const aumentarQuantidade = (id) => {
    setCarrinho(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const diminuirQuantidade = (id) => {
    setCarrinho(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter(item => item.quantidade > 0)
    );
  };

  const totalCarrinho = carrinho.reduce((acc, item) => {
    const preco = parseFloat(
      item.preco.replace('R$ ', '').replace(',', '.')
    );
    return acc + preco * item.quantidade;
  }, 0);

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  // ── FAVORITOS ─────────────────────────────────────────
  const toggleFavorito = (livro) => {
    setFavoritos(prev => {
      const existe = prev.find(item => item.id === livro.id);
      if (existe) return prev.filter(item => item.id !== livro.id);
      return [...prev, livro];
    });
  };

  const isFavorito = (id) => favoritos.some(item => item.id === id);

  return (
    <CartContext.Provider
      value={{
        carrinho,
        favoritos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        totalCarrinho,
        totalItens,
        toggleFavorito,
        isFavorito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}