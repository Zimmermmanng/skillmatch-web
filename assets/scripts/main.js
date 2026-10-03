import { buscarVagas, salvarPerfilLocalStorage, carregarPerfilLocalStorage } from './dados.js';
import { criarAnalisadorDeVagas } from './motor.js';
import { 
    obterDadosFormulario, 
    preencherFormulario, 
    exibirLoading, 
    exibirErro, 
    renderizarResultados 
} from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    const formPerfil = document.getElementById("form-perfil");

    // 1. CARREGA PERFIL SALVO NO LOCALSTORAGE (Se existir)
    const perfilSalvo = carregarPerfilLocalStorage();
    if (perfilSalvo) {
        preencherFormulario(perfilSalvo);
        executarAnálise(perfilSalvo);
    }

    // 2. EVENTO DE SUBMIT DO FORMULÁRIO
    formPerfil.addEventListener("submit", (e) => {
        e.preventDefault();

        const perfil = obterDadosFormulario();
        if (!perfil) {
            alert("Por favor, preencha todos os campos do formulário.");
            return;
        }

        // Salva as informações no localStorage
        salvarPerfilLocalStorage(perfil);

        // Executa a análise das vagas
        executarAnálise(perfil);
    });
});

// Função principal que orquestra o Fetch + Motor + UI
async function executarAnálise(perfil) {
    exibirLoading();

    // Busca as vagas do arquivo vagas.json
    const resultadoBusca = await buscarVagas();

    if (resultadoBusca.status === "erro") {
        exibirErro(resultadoBusca.mensagem);
        return;
    }

    if (resultadoBusca.status === "vazio") {
        renderizarResultados([]);
        return;
    }

    // Instancia a closure do motor de análise
    const analisar = criarAnalisadorDeVagas(perfil);

    // Executa a análise sem callback extra (retorna o objeto padrão)
    const vagasAnalisadas = analisar(resultadoBusca.dados);

    // Renderiza a lista de resultados e o destaque na tela
    renderizarResultados(vagasAnalisadas);
}