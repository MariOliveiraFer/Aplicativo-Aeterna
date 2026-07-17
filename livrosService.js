import { supabase } from './supabaseClient';

/** Lista todos os livros (usado na Home e no Explorar Acervo) */
export async function listarLivros() {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/** Busca livros por título, autor ou categoria (Explorar Acervo) */
export async function buscarLivros(termo) {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .or(`titulo.ilike.%${termo}%,autor.ilike.%${termo}%,categoria.ilike.%${termo}%`)
    .order('titulo', { ascending: true });

  if (error) throw error;
  return data;
}

/** Busca um único livro pelo id (usado, por exemplo, na tela de Detalhes) */
export async function buscarLivroPorId(id) {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

