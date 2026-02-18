# Documentação do Projeto Saitama Sushi

Esta documentação fornece uma visão geral técnica, estrutural e operacional do projeto Saitama Sushi.

## 1. Visão Geral

O Saitama Sushi é uma aplicação web moderna de delivery de sushi, focada em uma experiência de usuário premium, com design responsivo, animações fluidas e alta performance.

## 2. Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias principais:

-   **Next.js 15 (App Router)**: Framework React para renderização híbrida (Server/Client Components), roteamento e otimização.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática, garantindo maior segurança e manutenibilidade ao código.
-   **Tailwind CSS**: Framework de CSS utilitário para estilização rápida, responsiva e consistente.
-   **Zustand**: Biblioteca de gerenciamento de estado leve e performática (usada para o Carrinho de Compras).
-   **Supabase**: Backend-as-a-Service (BaaS) utilizado para autenticação (Auth) e banco de dados (PostgreSQL).
-   **Framer Motion**: Biblioteca para animações complexas e gestos.
-   **Lucide React**: Biblioteca de ícones leve e consistente.

## 3. Estrutura de Pastas

A estrutura do projeto segue as melhores práticas do Next.js (App Router) e Clean Architecture simplificada.

```
src/
├── app/                 # Rotas da aplicação (App Router)
│   ├── layout.tsx       # Layout raiz (HTML, Body, Providers)
│   ├── page.tsx         # Página inicial (Home)
│   ├── globals.css      # Estilos globais e configuração do Tailwind
│   ├── login/           # Rota de Login
│   ├── menu/            # Rota do Cardápio
│   ├── product/         # Rota de Detalhes do Produto
│   └── profile/         # Rotas de Perfil do Usuário
│
├── components/          # Componentes React reutilizáveis
│   ├── home/            # Componentes específicos da Home
│   ├── layout/          # Componentes estruturais (Header, Footer)
│   ├── menu/            # Componentes específicos do Menu
│   ├── profile/         # Componentes específicos do Perfil
│   └── ui/              # Componentes de UI genéricos (Botões, Modais, Cards)
│
├── lib/                 # Utilitários e configurações
│   ├── supabase.ts      # Cliente do Supabase
│   ├── utils.ts         # Funções auxiliares (clsx, twMerge)
│   └── mock-data.ts     # Dados estáticos/mockados (Fallback)
│
├── services/            # Camada de serviço (Comunicação com API/Supabase)
│   ├── auth.service.ts  # Lógica de Autenticação
│   ├── product.service.ts # Lógica de Produtos
│   └── profile.service.ts # Lógica de Perfil
│
├── store/               # Gerenciamento de Estado Global
│   └── cart.store.ts    # Store do Carrinho (Zustand)
│
└── types/               # Definições de Tipos TypeScript globais
    └── index.ts         # Interfaces (Product, Category, Sauce, etc.)
```

## 4. Arquitetura e Decisões Técnicas

-   **Modularização**: Componentes foram separados por contexto (`feature-based`), facilitando a manutenção. Componentes genéricos ficam em `ui/`.
-   **Camada de Serviços**: Toda a lógica de comunicação com o Supabase foi abstraída para a pasta `services/`. Os componentes não chamam o Supabase diretamente, mas sim os serviços, permitindo fácil troca de backend ou mockagem se necessário.
-   **Gerenciamento de Estado**: Utilizamos `Zustand` para o carrinho de compras devido à sua simplicidade e performance superior ao Context API para este caso de uso (evita re-renderizações desnecessárias).
-   **Tipagem Compartilhada**: Tipos fundamentais (`Product`, `Category`) estão centralizados em `src/types`, evitando duplicação e garantindo consistência entre mocks e dados reais.

## 5. Configuração e Execução

### Pré-requisitos
-   Node.js (versão 18 ou superior)
-   npm ou yarn

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com as chaves do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### Comandos Disponíveis

-   `npm install`: Instala as dependências.
-   `npm run dev`: Inicia o servidor de desenvolvimento em `http://localhost:3000`.
-   `npm run build`: Cria a build de produção otimizada.
-   `npm run start`: Inicia o servidor de produção (após o build).
-   `npm run lint`: Verifica erros de código e estilo (ESLint).

## 6. Deploy

O projeto está configurado para deploy contínuo na **Vercel**.

1.  Conecte o repositório GitHub à Vercel.
2.  Configure as variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, etc.) no painel da Vercel.
3.  A Vercel detectará automaticamente o Next.js e fará o deploy.

## 7. Manutenção e Evolução

-   **Adicionar novos ícones**: Use `lucide-react`.
-   **Novas rotas**: Crie novas pastas dentro de `src/app`.
-   **Banco de Dados**: Para alterar o esquema, atualize o Supabase e reflita as mudanças nas interfaces em `src/types`.
