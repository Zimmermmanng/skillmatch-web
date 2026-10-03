// Elementos da página
const areaResultados = document.getElementById("area-resultados");

// 1. OBTÊM E VALIDA DADOS DO FORMULÁRIO
export function obterDadosFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const area = document.getElementById("area").value;
    const habilidadesBrutas = document.getElementById("habilidades").value;
    const experiencia = document.getElementById("experiencia").value;

    // CORRIGIDO: experiencia sem acento
    if (!nome || !area || !habilidadesBrutas || experiencia === "") {
        return null;
    }

    // Divide a string por vírgula e remove espaços extras
    const habilidades = habilidadesBrutas
        .split(",")
        .map(h => h.trim())
        .filter(h => h.length > 0);

    return {
        nome,
        area,
        habilidades,
        experiencia: Number(experiencia)
    };
}

// 2. PREENCHE O FORMULÁRIO SE JÁ EXISTIR PERFIL SALVO
export function preencherFormulario(perfil) {
    if (!perfil) return;

    document.getElementById("nome").value = perfil.nome || "";
    document.getElementById("area").value = perfil.area || "";
    document.getElementById("habilidades").value = perfil.habilidades ? perfil.habilidades.join(", ") : "";
    document.getElementById("experiencia").value = perfil.experiencia !== undefined ? perfil.experiencia : "";
}

// 3. ESTADOS DE INTERFACE (Carregamento, Erro, Vazio)
export function exibirLoading() {
    areaResultados.innerHTML = `
        <div class="estado-loading">
            <p>🔄 Analisando perfil e buscando vagas compatíveis...</p>
        </div>
    `;
}

export function exibirErro(mensagem) {
    areaResultados.innerHTML = `
        <div class="estado-erro">
            <p>⚠️ ${mensagem}</p>
        </div>
    `;
}

export function exibirVazio() {
    areaResultados.innerHTML = `
        <div class="estado-vazio">
            <p>ℹ️ Nenhuma vaga encontrada para a sua área de interesse no momento.</p>
        </div>
    `;
}

// 4. RENDERIZAÇÃO DINÂMICA DOS CARDS NO DOM
export function renderizarResultados(vagasAnalisadas) {
    if (!vagasAnalisadas || vagasAnalisadas.length === 0) {
        exibirVazio();
        return;
    }

    // A primeira vaga é a de maior compatibilidade (melhor vaga)
    const melhorVaga = vagasAnalisadas[0];

    // HTML da seção "Melhor Oportunidade"
    let htmlMelhorVaga = `
        <article class="card-destaque">
            <span class="badge-destaque">⭐ Melhor Oportunidade Para Você</span>
            <h3>${melhorVaga.vagaOriginal.cargo}</h3>
            <p><strong>Empresa:</strong> ${melhorVaga.vagaOriginal.empresa}</p>
            <p><strong>Compatibilidade:</strong> ${melhorVaga.percentual}% (${melhorVaga.classificacao})</p>
            
            <div class="recomendacao-box">
                <h4>📚 Recomendação de Estudo:</h4>
                ${
                    melhorVaga.recomendacao.length > 0
                        ? `<p>Para aumentar suas chances nesta vaga, estude: <strong>${melhorVaga.recomendacao.join(", ").toUpperCase()}</strong></p>`
                        : `<p>🎉 Parabéns! Você atende a todos os requisitos técnicos desta vaga!</p>`
                }
            </div>
        </article>
    `;

    // HTML da lista com todas as vagas analisadas
    let htmlListaVagas = vagasAnalisadas.map(item => {
        const vaga = item.vagaOriginal;
        const requisitosLista = vaga.requisitos
            .map(req => `<li><code>${req.toUpperCase()}</code></li>`)
            .join("");

        return `
            <article class="card-vaga card-${item.classificacao.toLowerCase()}">
                <header class="card-header">
                    <h3>${vaga.cargo}</h3>
                    <span class="badge-classificacao ${item.classificacao.toLowerCase()}">${item.percentual}% — ${item.classificacao}</span>
                </header>
                <div class="card-body">
                    <p><strong>Empresa:</strong> ${vaga.empresa}</p>
                    <p><strong>Modalidade:</strong> ${vaga.modalidade}</p>
                    <p><strong>Salário:</strong> ${vaga.salario}</p>
                    <p><strong>Requisitos:</strong></p>
                    <ul class="lista-requisitos">
                        ${requisitosLista}
                    </ul>
                </div>
            </article>
        `;
    }).join("");

    areaResultados.innerHTML = `
        <section class="secao-resultados">
            <h2>Resultados da Análise</h2>
            ${htmlMelhorVaga}
            <h3>Outras Oportunidades</h3>
            <div class="grid-vagas">
                ${htmlListaVagas}
            </div>
        </section>
    `;
}