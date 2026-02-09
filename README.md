# Desafio Frontend Nexdom

Este projeto é uma aplicação web desenvolvida como parte do Desafio Frontend da Nexdom. Ele fornece um painel para gerenciamento de produtos e movimentação de estoque.

## 🚀 Tecnologias Utilizadas

- **Vue 3** (Script Setup)
- **TypeScript**
- **Vite**
- **TailwindCSS v4**
- **Pinia** (com persistência de estado)
- **Vue Router**
- **Tanstack Vue Table**
- **Zod** & **Vee-Validate** (para validação de formulários)
- **Lucide** & **Tabler Icons**

## 📦 Funcionalidades

### 1. Dashboard (`/`)

- Visão geral dos produtos.
- Estatísticas de estoque.
- Tabelas de produtos organizadas por **Tipo** e **Lucro**.

### 2. Produtos (`/produtos`)

- Listagem completa de produtos.
- Gerenciamento de dados (CRUD).

### 3. Movimentação de Estoque (`/movimentacao`)

- Controle de entrada e saída de estoque.

## 🛠️ Instalação e Execução

Pré-requisitos: Node.js instalado.

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Execute o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

3. **Build para produção:**

   ```bash
   npm run build
   ```

4. **Visualizar o build:**
   ```bash
   npm run preview
   ```

## 📂 Estrutura do Projeto

- `src/views`: Páginas principais (Home, Produtos, Movimentação).
- `src/components`: Componentes reutilizáveis e de UI.
- `src/stores`: Gerenciamento de estado (Pinia).
- `src/router`: Configuração de rotas.
