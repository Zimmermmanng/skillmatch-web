import { VagaFrontEnd } from './motor.js';

const CHAVE_LOCALSTORAGE = "skillmatch_perfil";

// 1. FETCH COM ASYNC/AWAIT + TRATAMENTO DE ERROS E ESTADOS
export async function buscarVagas() {
    try {
        const resposta = await fetch("./assets/data/vagas.json");

        if (!resposta.ok) {
            throw new Error(`Erro de conexão HTTP: Status ${resposta.status}`);
        }

        const dadosJSON = await resposta.json();

        // ESTADO VAZIO: Trata o caso do arquivo JSON retornar uma lista sem vagas
        if (!dadosJSON || dadosJSON.length === 0) {
            return { status: "vazio", dados: [] };
        }

        // Instancia as vagas usando a classe VagaFrontEnd que criamos no motor.js
        const vagasInstanciadas = dadosJSON.map(v => 
            new VagaFrontEnd(v.id, v.empresa, v.cargo, v.area, v.requisitos, v.salario, v.modalidade)
        );

        // ESTADO DE SUCESSO
        return { status: "sucesso", dados: vagasInstanciadas };

    } catch (erro) {
        // ESTADO DE ERRO
        console.error("Falha ao carregar as vagas:", erro);
        return { status: "erro", mensagem: "Não foi possível carregar o catálogo de vagas. Tente novamente mais tarde." };
    }
}

// 2. LOCALSTORAGE (SALVAR E RECUPERAR COM TRATAMENTO DE NULL)
export function salvarPerfilLocalStorage(perfil) {
    try {
        const jsonPerfil = JSON.stringify(perfil);
        localStorage.setItem(CHAVE_LOCALSTORAGE, jsonPerfil);
    } catch (erro) {
        console.error("Erro ao salvar perfil no localStorage:", erro);
    }
}

export function carregarPerfilLocalStorage() {
    try {
        const dadosArmazenados = localStorage.getItem(CHAVE_LOCALSTORAGE);

        // Tratamento explícito de NULL (primeiro acesso do usuário)
        if (dadosArmazenados === null) {
            return null;
        }

        return JSON.parse(dadosArmazenados);
    } catch (erro) {
        console.error("Erro ao ler perfil do localStorage:", erro);
        return null;
    }
}