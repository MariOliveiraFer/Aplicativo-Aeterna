// Script compartilhado entre RedefinirSenhaADM.html (admin) e
// RedefinirSenha.html (usuário do app). Depende de:
// - <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// - Elementos com id: nova-senha, confirmar-senha, btn-submit, mensagem, tela-formulario

// TODO: preencher com as credenciais do seu projeto Supabase
const SUPABASE_URL = "https://SEU_PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_PUBLICA";

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const telaFormulario = document.getElementById("tela-formulario");
const elMensagem = document.getElementById("mensagem");
const btnSubmit = document.getElementById("btn-submit");

function mostrarMensagem(texto, tipo) {
  elMensagem.textContent = texto;
  elMensagem.className = tipo === "erro" ? "mt-3 small msg-erro" : "mt-3 small msg-sucesso";
}

function limparMensagem() {
  elMensagem.textContent = "";
  elMensagem.className = "mt-3 small";
}

// Ao carregar a página, lê o token que o Supabase manda no hash da URL
// (#access_token=...&refresh_token=...&type=recovery) e abre a sessão
// temporária necessária pra poder chamar updateUser depois.
async function validarLinkRedefinicao() {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  const type = hashParams.get("type");

  if (!accessToken || type !== "recovery") {
    telaFormulario.style.display = "none";
    mostrarMensagem(
      "Este link é inválido ou expirou. Solicite uma nova redefinição de senha.",
      "erro"
    );
    return;
  }

  const { error } = await supabaseClient.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    telaFormulario.style.display = "none";
    mostrarMensagem(
      "Este link é inválido ou expirou. Solicite uma nova redefinição de senha.",
      "erro"
    );
  }
}

async function redefinirSenha() {
  limparMensagem();

  const novaSenha = document.getElementById("nova-senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;

  if (novaSenha.length < 12) {
    mostrarMensagem("A senha deve ter no mínimo 12 caracteres.", "erro");
    return;
  }

  if (novaSenha !== confirmarSenha) {
    mostrarMensagem("As senhas não coincidem.", "erro");
    return;
  }

  btnSubmit.disabled = true;
  btnSubmit.textContent = "REDEFININDO...";

  const { error } = await supabaseClient.auth.updateUser({ password: novaSenha });

  btnSubmit.disabled = false;
  btnSubmit.textContent = "REDEFINIR SENHA";

  if (error) {
    // O Supabase retorna uma mensagem específica quando a senha aparece
    // em vazamentos conhecidos (proteção HaveIBeenPwned).
    mostrarMensagem("Erro ao redefinir a senha: " + error.message, "erro");
    return;
  }

  telaFormulario.style.display = "none";
  mostrarMensagem("Senha redefinida com sucesso! Você já pode fazer login.", "sucesso");
}

validarLinkRedefinicao();