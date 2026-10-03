// 1. CLASSE, HERANÇA e THIS
export class Vaga {
    constructor(id, empresa, cargo, area, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.area = area;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
    }
}

export class VagaFrontEnd extends Vaga {
    constructor(id, empresa, cargo, area, requisitos, salario, modalidade) {
        // O super chama o construtor da classe pai (Vaga)
        super(id, empresa, cargo, area, requisitos, salario, modalidade);
        this.categoria = "Vaga Tech Específica";
    }

    // Exemplo de uso do 'this' em um método da classe
    obterResumo() {
        return `${this.cargo} na empresa ${this.empresa}`;
    }
}

// 2. CLOSURE e MÉTODOS DE ARRAY (map, filter, reduce)
// Esta função cria um escopo fechado (closure) que "lembra" do perfil do candidato
export function criarAnalisadorDeVagas(perfilCandidato) {
    // MAP: Padroniza as habilidades do candidato (tudo minúsculo e sem espaço extra)
    const habCandidato = perfilCandidato.habilidades.map(h => h.toLowerCase().trim());

    // A função retornada é a Closure, ela tem acesso à variável 'habCandidato'
    return function analisar(listaDeVagas, callbackFormatacao) {
        
        // FILTER: Pega apenas as vagas que batem com a área de interesse do candidato
        const vagasDaArea = listaDeVagas.filter(vaga => vaga.area === perfilCandidato.area);

        // MAP: Transforma os dados brutos da vaga no resultado da análise
        const vagasAnalisadas = vagasDaArea.map(vaga => {
            const reqVaga = vaga.requisitos.map(r => r.toLowerCase().trim());

            // REDUCE: Conta quantas habilidades da vaga o candidato possui
            const acertos = reqVaga.reduce((acumulador, requisito) => {
                if (habCandidato.includes(requisito)) {
                    return acumulador + 1;
                }
                return acumulador;
            }, 0);

            // Calcula a porcentagem
            const percentual = reqVaga.length > 0 ? Math.round((acertos / reqVaga.length) * 100) : 0;

            // Classificação Alta/Média/Baixa
            let classificacao = "Baixa";
            if (percentual >= 80) classificacao = "Alta";
            else if (percentual >= 50) classificacao = "Média";

            // FILTER: Descobre o que o candidato ainda precisa estudar
            const faltamEstudar = reqVaga.filter(req => !habCandidato.includes(req));

            const resultado = {
                vagaOriginal: vaga,
                percentual,
                classificacao,
                recomendacao: faltamEstudar
            };

            // 3. CALLBACK
            // Se passarmos uma função de callback, ela formata ou altera o resultado final
            if (callbackFormatacao) {
                return callbackFormatacao(resultado);
            }
            return resultado;
        });

        // Ordena da maior compatibilidade para a menor
        vagasAnalisadas.sort((a, b) => b.percentual - a.percentual);
        
        return vagasAnalisadas;
    };
}