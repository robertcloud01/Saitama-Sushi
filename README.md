<h1 align="center">
  <br/>
  🍣 Saitama Delivery
  <br/>
</h1>

<p align="center">
  <strong>Plataforma premium de delivery de sushi com programa de fidelidade e experiência imersiva</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0.9-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge" alt="Status"/>
</p>

<p align="center">
  <a href="https://github.com/robertcloud01/Saitama-Sushi">Ver no GitHub</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-como-rodar">Como Rodar</a> •
  <a href="#-satimoney">Satimoney</a>
</p>

---

## 📖 Sobre o Projeto

O **Saitama Delivery** é uma plataforma full-stack de delivery de sushi premium, construída com Next.js 16, React 19 e Supabase. O projeto combina uma experiência de usuário cinematográfica com uma stack moderna para oferecer um sistema completo de pedidos, autenticação e programa de fidelidade exclusivo.

A identidade visual é inspirada na estética dark premium — com fundo preto, detalhes em rosa neon (`#FF2CA2`) e animações fluidas — criando uma experiência que vai além de um simples cardápio online.

> **⚠️ Status:** O projeto está em desenvolvimento ativo. A integração de pagamentos e o sistema Satimoney (fidelidade financeira) estão sendo implementados.

---

## ✨ Funcionalidades

### ✅ Implementadas

| Funcionalidade | Descrição |
|---|---|
| 🏠 **Página Inicial** | Hero animado, carrossel de categorias, pratos em destaque, seção de populares, banner promocional, avaliações e marcas |
| 🍱 **Menu** | Listagem de produtos com filtros por categoria, cards interativos com modal de detalhes |
| 🛒 **Carrinho** | Drawer lateral com persistência via `localStorage` (Zustand), controle de quantidade, total em tempo real |
| 👤 **Autenticação** | Login, cadastro e redefinição de senha via Supabase Auth |
| 👤 **Perfil** | Visualização e edição dos dados do usuário |
| 📦 **Confirmação de Pedido** | Tela de sucesso após finalização de compra |
| 🔍 **Produto** | Página de detalhe individual por slug |
| 🗺️ **Sitemap** | Gerado automaticamente (`/sitemap.ts`) para SEO |
| 🎨 **Design System** | Paleta de cores customizada via Tailwind + CSS Variables |

### 🚧 Em Desenvolvimento

| Funcionalidade | Status |
|---|---|
| 💰 **Integração de Pagamento** | Em progresso — checkout em `/checkout` |
| 🪙 **Satimoney (Saldo/Cashback)** | UI pronta, lógica de backend pendente |
| 📊 **Dashboard de Fidelidade** | Tiers, progresso e histórico de pontos |
| 🔔 **Notificações em Tempo Real** | WebSockets via Supabase Realtime |

---

## 🏗️ Arquitetura

```
saitama-delivery/
├── src/
│   ├── app/                    # App Router (Next.js 16)
│   │   ├── layout.tsx          # Layout raiz (Header + CartDrawer globais)
│   │   ├── page.tsx            # Página inicial
│   │   ├── menu/               # Listagem do cardápio
│   │   ├── product/            # Página de detalhe do produto
│   │   ├── checkout/           # Fluxo de pagamento [WIP]
│   │   ├── order-confirmation/ # Tela de sucesso
│   │   ├── satimoney/          # Programa de fidelidade [WIP]
│   │   ├── login/              # Autenticação
│   │   ├── signup/             # Cadastro
│   │   ├── profile/            # Perfil do usuário
│   │   └── sitemap.ts          # Sitemap automático para SEO
│   │
│   ├── components/
│   │   ├── home/               # Seções da página inicial
│   │   │   ├── Hero.tsx
│   │   │   ├── CategoriesCarousel.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── PopularDishesSection.tsx
│   │   │   ├── PromoBanner.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   └── BrandsMarquee.tsx
│   │   ├── layout/             # Componentes estruturais globais
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── FloatingMenuButton.tsx
│   │   ├── menu/               # Componentes do cardápio
│   │   └── ui/                 # Componentes reutilizáveis
│   │       ├── ProductCard.tsx
│   │       ├── ProductModal.tsx
│   │       └── MarqueeContainer.tsx
│   │
│   ├── services/               # Camada de acesso a dados (Supabase)
│   │   ├── auth.service.ts     # Autenticação completa
│   │   ├── product.service.ts  # CRUD de produtos
│   │   └── profile.service.ts  # Perfil do usuário
│   │
│   ├── store/
│   │   └── cart.store.ts       # Estado global do carrinho (Zustand)
│   │
│   ├── lib/
│   │   ├── supabase.ts         # Cliente Supabase configurado
│   │   ├── mock-data.ts        # Dados de desenvolvimento
│   │   └── utils.ts            # Funções utilitárias
│   │
│   └── types/
│       └── index.ts            # Interfaces TypeScript (Product, CartItem, etc.)
│
├── public/                     # Assets estáticos
├── seed_data.sql               # Seed do banco de dados
├── tailwind.config.ts          # Design system tokens
└── next.config.ts              # Configuração do Next.js
```

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| **Next.js** | 16.0.9 | Framework React com App Router e SSR |
| **React** | 19.2.1 | UI Components |
| **TypeScript** | ^5 | Tipagem estática |
| **Tailwind CSS** | ^3.4 | Estilização utilitária |
| **Framer Motion** | ^12 | Animações e transições |
| **Lucide React** | ^0.560 | Biblioteca de ícones |
| **Zustand** | ^5 | Gerenciamento de estado global (carrinho) |
| **clsx** | ^2.1 | Utilitário de classes condicionais |

### Backend & Dados
| Tecnologia | Uso |
|---|---|
| **Supabase** | Banco PostgreSQL, Auth e Realtime |
| **Supabase Auth** | Autenticação (email/senha) |
| **Supabase JS** | ^2.94 — Client SDK |

### DevOps & Qualidade
| Tecnologia | Uso |
|---|---|
| **ESLint** | Linting de código |
| **Vercel** | Deploy e hospedagem (configurado) |

---

## 🗄️ Banco de Dados

O projeto utiliza **Supabase (PostgreSQL)** com as seguintes tabelas principais:

```sql
-- Tabelas principais
Product     -- Produtos do cardápio (nome, preço, slug, imagem, etc.)
Category    -- Categorias dos pratos (sashimi, hot roll, etc.)
User        -- Perfil do usuário vinculado ao auth.users
Order       -- Pedidos realizados [planejado]
OrderItem   -- Itens de cada pedido [planejado]
```

> Os arquivos `seed_data.sql` e `seed_to_apply.sql` contém os dados iniciais para popular o banco.

---

## 🎨 Design System

O design é baseado em uma estética **dark premium** com os seguintes tokens:

```css
/* Cores Principais */
--background:      #000000   /* Preto — fundo global */
--foreground:      #FFFFFF   /* Branco — texto principal */
--accent:          #FF007A   /* Rosa neon — cor de destaque */
--accent-hover:    #D90068   /* Rosa escuro — hover states */
--muted:           Cinza escuro — textos secundários

/* Tipografia */
font-family: Inter (Google Fonts)
```

### Componentes Visuais Notáveis
- **Hero Section** — fullscreen com partículas e parallax
- **ProductModal** — drawer animado com detalhes completos do item
- **CartDrawer** — painel lateral deslizante
- **MarqueeContainer** — carrossel infinito horizontal
- **BrandsMarquee** — faixa de logos de marcas parceiras

---

## 🪙 Satimoney

O **Satimoney** é o programa de fidelidade proprietário do Saitama Delivery — uma "moeda do sabor" que recompensa clientes fiéis.

### Como funciona (conceito atual)
1. **Peça** — Realize pedidos no menu
2. **Acumule** — Ganhe 5% de cashback em Satimoney a cada compra
3. **Resgate** — Use seu saldo para pagar pedidos futuros

### Níveis de Fidelidade
| Nível | Benefícios |
|---|---|
| **Bronze** | Cashback padrão de 5% |
| **Ouro** | Entrega prioritária + Cashback 7% |
| **VIP** | Acesso ao Menu Secreto + Surpresas de aniversário + Eventos com pontos em dobro |

> **Status:** A interface da página `/satimoney` está completa com animações via Framer Motion. A integração com banco de dados e a lógica de acúmulo/resgate estão pendentes de implementação no backend.

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no [Supabase](https://supabase.com)

### 1. Clone o repositório
```bash
git clone https://github.com/robertcloud01/Saitama-Sushi.git
cd Saitama-Sushi
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

> Encontre esses valores em: Supabase Dashboard → Project Settings → API

### 4. Configure o banco de dados

Execute os arquivos SQL no editor do Supabase:
```sql
-- Aplique nesta ordem:
1. seed_data.sql
2. seed_to_apply.sql
```

### 5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint para verificação de código |

---

## 🗺️ Rotas da Aplicação

| Rota | Descrição | Status |
|---|---|---|
| `/` | Página inicial | ✅ Pronto |
| `/menu` | Cardápio completo | ✅ Pronto |
| `/product/[slug]` | Detalhe do produto | ✅ Pronto |
| `/checkout` | Finalização de compra | 🚧 WIP |
| `/order-confirmation` | Confirmação do pedido | ✅ Pronto |
| `/satimoney` | Programa de fidelidade | 🚧 WIP (UI pronto) |
| `/login` | Login de usuário | ✅ Pronto |
| `/signup` | Cadastro de usuário | ✅ Pronto |
| `/profile` | Perfil do usuário | ✅ Pronto |

---

## 📁 Serviços (Services Layer)

### `AuthService`
Gerencia todo o fluxo de autenticação via Supabase:
- `signIn()` — Login com email e senha
- `signUp()` — Cadastro com criação automática de perfil na tabela `User`
- `signOut()` — Logout
- `getSession()` — Recupera sessão ativa
- `getCurrentUser()` — Retorna usuário autenticado
- `resetPassword()` — Envia email de redefinição de senha
- `updatePassword()` — Atualiza senha do usuário

### `ProductService`
Consultas ao banco de produtos:
- `getPopularProducts(limit)` — Retorna pratos marcados como populares
- `getAllProducts()` — Retorna todo o cardápio ordenado por nome
- `getProductBySlug(slug)` — Busca produto pela URL amigável
- `getProductById(id)` — Busca produto pelo UUID

### `ProfileService`
Operações de perfil do usuário.

---

## 🛒 Gerenciamento de Estado (Zustand)

O carrinho de compras é gerenciado pelo `useCartStore` com persistência automática via `localStorage`:

```typescript
// Ações disponíveis
addItem(item)          // Adiciona item (incrementa quantidade se já existe)
removeItem(id)         // Remove item do carrinho
updateQuantity(id, delta) // Incrementa ou decrementa quantidade
clearCart()            // Esvazia o carrinho
toggleCart()           // Abre/fecha o drawer do carrinho

// Computados
totalItems()           // Total de unidades no carrinho
totalPrice()           // Valor total em R$
```

---

## 🚀 Deploy

O projeto está configurado para deploy na **Vercel**. Consulte o arquivo [`VERCEL_DEPLOY.md`](./VERCEL_DEPLOY.md) para instruções detalhadas de publicação.

---

## 🤝 Desenvolvedor

Desenvolvido por **VALHALLAS.DEV**

- 🌐 Portfólio: [my-portif-lio-three.vercel.app](https://my-portif-lio-three.vercel.app/)
- 📧 Contato: contato@saitamadelivery.com
- 📍 Boa Vista, Roraima — Brasil

---

## 📄 Licença

Este projeto é privado e está em desenvolvimento. Todos os direitos reservados © 2025 Saitama Delivery.

---

<p align="center">
  Feito com ❤️ e muito 🍣 em Boa Vista - RR
</p>
