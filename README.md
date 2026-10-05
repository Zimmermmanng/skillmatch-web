# 🚀 SkillMatch Web - Módulo 1

Aplicação web desenvolvida em **JavaScript puro (Vanilla JS)**, estruturada com **Módulos ES6** e **Programação Orientada a Objetos (POO)**, criada para conectar perfis profissionais a oportunidades de vagas Front-End através de um cálculo dinâmico de compatibilidade.

O projeto foi desenvolvido como **Projeto Avaliativo Final do Módulo 1 — Desenvolvimento Web**.

---

## 🎯 Objetivo do Projeto

O **SkillMatch Web** transforma um motor de análise de compatibilidade profissional em uma aplicação web interativa, responsiva e acessível.

O utilizador informa seu perfil profissional, incluindo:

* Nome;
* Área de interesse;
* Tempo de experiência;
* Competências tecnológicas.

A aplicação compara essas informações com um catálogo de vagas Front-End e apresenta o percentual de compatibilidade de cada oportunidade.

Além disso, o sistema identifica a **Melhor Vaga** e apresenta uma recomendação de estudo baseada nas competências que ainda precisam ser desenvolvidas.

---

## ✨ Funcionalidades & Requisitos Atendidos

### 🔎 Busca de Vagas Assíncrona

Consumo de dados através da **Fetch API**, utilizando o arquivo JSON local `vagas.json`.

O sistema trata os diferentes estados da requisição:

* **Loading:** enquanto os dados estão sendo carregados;
* **Sucesso:** quando as vagas são carregadas corretamente;
* **Estado vazio:** quando não existem vagas disponíveis;
* **Erro:** quando ocorre uma falha na requisição ou leitura dos dados.

---

### 📊 Cálculo de Compatibilidade

O sistema compara as competências informadas pelo candidato com os requisitos de cada vaga.

São apresentados:

* Percentual de compatibilidade;
* Competências encontradas;
* Competências faltantes;
* Classificação da compatibilidade;
* Melhor vaga;
* Recomendação de estudo.

A classificação é realizada da seguinte forma:

| Percentual    | Classificação |
| ------------- | ------------- |
| 80% ou mais   | 🟢 Alta       |
| 50% a 79%     | 🟡 Média      |
| Abaixo de 50% | 🔴 Baixa      |

Em caso de empate no percentual de compatibilidade, o salário da vaga é utilizado como critério de desempate.

---

### 💾 Persistência de Dados

O perfil do candidato é armazenado utilizando o **Web Storage API (`localStorage`)**.

A aplicação consegue:

* Salvar o perfil;
* Recuperar os dados ao abrir novamente a aplicação;
* Restaurar automaticamente o formulário;
* Tratar o estado inicial quando não existem dados armazenados.

A chave utilizada para armazenamento é:

```text
skillmatch_perfil_candidato
```

---

### 🧠 Programação Orientada a Objetos

O projeto utiliza classes para representar as vagas.

Foi criada a classe base:

```javascript
Vaga
```

E uma subclasse:

```javascript
VagaFrontEnd
```

A herança é implementada através de `extends` e `super`.

A classe `Vaga` contém a lógica geral de cálculo de compatibilidade, enquanto `VagaFrontEnd` adiciona características específicas das vagas Front-End, como stack e senioridade.

---

### 🔄 Métodos Funcionais

O projeto utiliza métodos funcionais de arrays para processar os dados.

#### `map()`

Utilizado para transformar os dados recebidos do JSON em instâncias de `VagaFrontEnd`.

#### `filter()`

Utilizado para identificar:

* Competências encontradas;
* Competências faltantes.

#### `reduce()`

Utilizado para determinar a vaga com maior percentual de compatibilidade.

Também é utilizado `flatMap()` para reunir as competências faltantes e gerar a recomendação de estudo.

---

### 🔐 Closure

Foi implementada uma **closure** para controlar a quantidade de análises realizadas durante a sessão.

A função:

```javascript
criarContadorAnalises()
```

mantém a variável de contagem privada e retorna uma função responsável por incrementar o contador.

Isso permite que a aplicação mantenha o estado da quantidade de análises sem expor diretamente a variável interna.

---

### 📝 Validação do Formulário

O formulário possui validação dos campos obrigatórios:

* Nome;
* Área de interesse;
* Tempo de experiência;
* Competências tecnológicas.

As mensagens de erro são exibidas diretamente nos campos correspondentes.

O envio do formulário utiliza:

```javascript
event.preventDefault();
```

Dessa forma, a página não é recarregada durante a análise.

---

## 🛠️ Tecnologias Utilizadas

### HTML5

* Estrutura semântica;
* Formulários;
* Labels;
* Elementos de navegação;
* Acessibilidade;
* Meta tags.

### CSS3

* Variáveis CSS;
* Flexbox;
* Media Queries;
* Design responsivo;
* Abordagem Mobile-First;
* Componentização visual através de classes.

### JavaScript ES6+

* ES Modules;
* Programação Orientada a Objetos;
* Herança;
* `map()`;
* `filter()`;
* `reduce()`;
* `flatMap()`;
* Closures;
* Manipulação do DOM;
* Event Listeners;
* Fetch API;
* `async/await`;
* `try/catch`;
* `localStorage`.

### Ferramentas

* Git;
* GitHub;
* Trello;
* Visual Studio Code;
* Live Server.

---

## 📁 Estrutura do Projeto

```text
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── data/
    │   └── vagas.json
    ├── styles/
    │   └── index.style.css
    └── scripts/
        ├── main.js
        ├── motor.js
        ├── ui.js
        └── dados.js
```

### `index.html`

Documento principal da aplicação.

Contém a estrutura semântica da SPA, formulário, painel de resultados e carregamento do módulo principal.

### `vagas.json`

Arquivo JSON contendo o catálogo de vagas Front-End.

Cada vaga possui informações como:

* Empresa;
* Cargo;
* Requisitos;
* Salário;
* Modalidade;
* Stack;
* Senioridade.

### `index.style.css`

Responsável pela estilização da aplicação.

Utiliza Flexbox, variáveis CSS, Media Queries e abordagem Mobile-First para adaptar a interface a diferentes tamanhos de tela.

### `motor.js`

Responsável pela lógica de negócio da aplicação.

Contém:

* Classe `Vaga`;
* Classe `VagaFrontEnd`;
* Cálculo de compatibilidade;
* Classificação;
* Closure do contador;
* Processamento das vagas;
* Identificação da melhor vaga;
* Recomendação de estudo.

### `dados.js`

Responsável pelo carregamento dos dados e persistência do perfil.

Contém:

* Fetch das vagas;
* Tratamento dos estados da requisição;
* Salvamento no `localStorage`;
* Recuperação do perfil.

### `ui.js`

Responsável pela criação e atualização dos elementos visuais da aplicação.

Contém funções para:

* Exibir mensagens;
* Criar cards das vagas;
* Renderizar a melhor vaga;
* Exibir recomendações;
* Preencher o formulário;
* Exibir erros de validação.

### `main.js`

É o módulo responsável por integrar as diferentes partes da aplicação.

Coordena:

* Inicialização;
* Eventos do formulário;
* Validação;
* Carregamento das vagas;
* Recuperação do perfil;
* Execução das análises;
* Atualização da interface.

---

## 🌐 Links e Demonstração

### 💻 Demonstração Online

[Aceder ao SkillMatch Web](https://zimmermmanng.github.io/skillmatch-web/)

### 📦 Repositório no GitHub

[Ver repositório no GitHub](https://github.com/Zimmermmanng/skillmatch-web)

### 📋 Quadro Kanban

[Ver planejamento e gestão de tarefas no Trello](https://trello.com/b/ScjtGIij)

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Zimmermmanng/skillmatch-web.git
```

Depois, acesse a pasta:

```bash
cd skillmatch-web
```

---

### 2. Abrir no Visual Studio Code

Abra a pasta do projeto no **Visual Studio Code**.

---

### 3. Utilizar o Live Server

Instale a extensão **Live Server** no VS Code.

Depois:

1. Abra o arquivo `index.html`;
2. Clique com o botão direito no arquivo;
3. Selecione **Open with Live Server**;
4. A aplicação será aberta no navegador através de um servidor HTTP local.

---

## ⚠️ Importante: Servidor Local

O projeto utiliza **Módulos ES6** através de `import` e `export`, além da **Fetch API** para carregar o arquivo `vagas.json`.

Por questões de segurança dos navegadores, a abertura direta do arquivo através do protocolo:

```text
file://
```

pode impedir o funcionamento dos módulos e da requisição `fetch`.

Por esse motivo, o projeto deve ser executado através de um servidor HTTP local, como o **Live Server**.

---

## 🧪 Fluxo de Utilização

1. Abrir a aplicação através do Live Server;
2. Preencher o nome;
3. Informar a área de interesse;
4. Informar o tempo de experiência;
5. Inserir as competências separadas por vírgulas;
6. Clicar em **Analisar Compatibilidade**;
7. Visualizar os resultados;
8. Conferir a Melhor Vaga;
9. Verificar as competências encontradas e faltantes;
10. Conferir a recomendação de estudo;
11. Atualizar a página e verificar a persistência do perfil.

---

## 📱 Responsividade

A interface foi desenvolvida utilizando a metodologia **Mobile-First**.

O layout utiliza **CSS Flexbox** e Media Queries para adaptar a aplicação a diferentes dispositivos.

Em telas menores, os cards de vagas são apresentados em uma única coluna.

Em telas maiores, os resultados são organizados em duas colunas e o formulário permanece disponível ao lado do painel de resultados.

---

## ♿ Acessibilidade

Foram implementados recursos de acessibilidade utilizando:

* Elementos semânticos do HTML5;
* Labels associados aos campos;
* `aria-label`;
* `aria-labelledby`;
* `aria-live`;
* Mensagens de erro nos campos;
* Indicação visual de foco.

---

## 🌿 Git e Estratégia de Branches

O desenvolvimento utilizou Git e GitHub para controle de versão.

### `main`

Branch destinada à versão final e estável do projeto.

### `develop`

Branch utilizada para integração das funcionalidades durante o desenvolvimento.

### Feature branches

Foram utilizadas branches específicas para diferentes funcionalidades:

```text
feature/motor-poo
feature/ui-dom
feature/fetch-dados
feature/localstorage
```

Cada branch foi destinada ao desenvolvimento de uma parte específica da aplicação.

---

## 📋 Organização no Trello

O desenvolvimento foi organizado através de um quadro Kanban.

As tarefas foram distribuídas entre quatro colunas:

```text
A Fazer
Em Progresso
Em Testes
Concluído
```

O planejamento contemplou etapas como:

* Estruturação HTML;
* Estilização CSS;
* Desenvolvimento da lógica de negócio;
* Manipulação do DOM;
* Integração com `vagas.json`;
* Implementação do `localStorage`;
* Testes;
* Documentação.

---

## 🔮 Melhorias Futuras

### 🔎 Filtros avançados

Adicionar filtros por:

* Faixa salarial;
* Modalidade;
* Senioridade;
* Stack tecnológica.

### 🌙 Dark Mode

Implementar alternância entre tema claro e escuro.

### ♿ Acessibilidade avançada

Ampliar os recursos de acessibilidade para melhorar a navegação através de teclado e atalhos.

### 🗄️ Banco de dados

Substituir o arquivo JSON por um banco de dados para permitir atualização dinâmica das vagas.

### 👤 Sistema de usuários

Implementar autenticação para permitir que diferentes candidatos mantenham seus próprios perfis e históricos de análises.

---

## 👨‍💻 Autor

**Guilherme Fellype Zimmermann Correia**

Projeto desenvolvido para o **Módulo 1 — Desenvolvimento Web**.

**SkillMatch Web — Projeto Avaliativo Final — 2026.**
