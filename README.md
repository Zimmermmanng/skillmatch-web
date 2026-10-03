# SkillMatch — Plataforma de Compatibilidade de Vagas

O **SkillMatch** é uma aplicação web desenvolvida em **HTML5, CSS3 e JavaScript puro (ES6+)**, sem frameworks ou bibliotecas externas.

A aplicação analisa o perfil profissional de um candidato, compara as suas competências com as vagas disponíveis no catálogo e indica as oportunidades com maior nível de compatibilidade, fornecendo recomendações de estudo personalizadas.

---

## 🎯 Funcionalidades

- **Registo e Persistência:** Guardado automático no `localStorage`.
- **Análise Automática:** Cálculo em tempo real da compatibilidade com as vagas.
- **Classificação:** Níveis Alta (≥80%), Média (50–79%) e Baixa (<50%).
- **Destaque:** Exibição da vaga ideal com maior correspondência.
- **Recomendação de Estudo:** Indicação dos requisitos que faltam ao candidato.
- **Consumo de Dados:** Carregamento dinâmico via `fetch` a partir de JSON local.

---

## 🛠️ Requisitos Técnicos Implementados

- **HTML Semântico & Acessibilidade:** Uso de tags semânticas e atributo `aria-live`.
- **CSS Mobile-First & Flexbox:** Layout responsivo sem o uso de CSS Grid.
- **POO:** Classes `Vaga` e `VagaFrontEnd` com herança (`extends`, `super`) e `this`.
- **Métodos de Array:** `map`, `filter` e `reduce` para processamento dos dados.
- **JS Avançado:** Implementação de **Closure** e **Callback**.
- **Módulos ES6:** Estrutura em ficheiros separados (`motor.js`, `dados.js`, `ui.js`, `main.js`).

---

## 📁 Estrutura do Projeto

```text
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── styles/
    │   └── style.css
    ├── scripts/
    │   ├── main.js
    │   ├── motor.js
    │   ├── ui.js
    │   └── dados.js
    └── data/
        └── vagas.json