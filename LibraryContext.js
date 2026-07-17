import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const { user } = useAuth();
  const [biblioteca, setBiblioteca] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarBiblioteca = useCallback(async () => {
    if (!user) {
      setBiblioteca([]);
      return;
    }
    setCarregando(true);

    const { data, error } = await supabase
      .from('biblioteca')
      .select(
        `
        id,
        comprado_em,
        preco_pago,
        livros (
          id,
          titulo,
          autor,
          categoria,
          capa_url,
          descricao,
          editora,
          publicacao
        )
      `
      )
      .eq('usuario_id', user.id)
      .order('comprado_em', { ascending: false });

    if (error) {
      console.error('Erro ao carregar biblioteca:', error.message);
      setCarregando(false);
      return;
    }

    const formatado = (data || []).map((item) => ({
      ...item.livros,
      compradoEm: item.comprado_em,
      precoPago: item.preco_pago,
    }));

    setBiblioteca(formatado);
    setCarregando(false);
  }, [user]);

  useEffect(() => {
    carregarBiblioteca();
  }, [carregarBiblioteca]);

  const finalizarCompra = async () => {
    if (!user) throw new Error('Usuário não autenticado.');

    const { error } = await supabase.rpc('finalizar_compra', {
      p_usuario_id: user.id,
    });

    if (error) throw error;

    await carregarBiblioteca();
  };

  const removerDaBiblioteca = async (bookId) => {
    if (!user) return;

    const { error } = await supabase
      .from('biblioteca')
      .delete()
      .eq('usuario_id', user.id)
      .eq('livro_id', bookId);

    if (error) throw error;

    setBiblioteca((prev) => prev.filter((livro) => livro.id !== bookId));
  };

  const possuiLivro = (bookId) => biblioteca.some((livro) => livro.id === bookId);

  return (
    <LibraryContext.Provider
      value={{
        biblioteca,
        carregando,
        carregarBiblioteca,
        finalizarCompra,
        removerDaBiblioteca,
        possuiLivro,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}