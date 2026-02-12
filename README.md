Saitama Delivery — Aplicativo de Delivery de Sushi

Visão Geral
- Plataforma de delivery focada em performance, UX moderna e SEO.
- Construída em Next.js (App Router) com UI animada e integração a Supabase.
- Deploy na Vercel com rotas estáticas e dinâmicas otimizadas.

Principais Funcionalidades
- Catálogo com categorias e destaques.
- Página de produto dinâmica: /product/[id].
- Carrinho persistente (Zustand + persist).
- Checkout com visual moderno.
- Perfil com cartões, endereços, pedidos e “Satimoney”.
- Sitemap em /sitemap.xml e robots.txt configurado.

Stack Técnica
- Next.js 16 (App Router, Metadata, Image).
- React 19 e TailwindCSS.
- Framer Motion para animações.
- Zustand para estado do carrinho.
- Supabase para dados (produtos populares, perfil, etc.).
- Vercel para deploy e edge.

Pré‑requisitos
- Node.js 18+.
- Conta e projeto no Supabase (variáveis de ambiente).
- Conta na Vercel (opcional para deploy).

Instalação
```bash
pnpm install # ou npm install / yarn
```

Executar em Desenvolvimento
```bash
pnpm dev # ou npm run dev
```
Abra http://localhost:3000.

Build de Produção
```bash
pnpm build # ou npm run build
pnpm start # ou npm run start
```

Scripts
- dev: next dev
- build: next build
- start: next start
- lint: eslint

Variáveis de Ambiente
Crie .env.local com:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
Se necessário, variáveis adicionais para funcionalidades futuras.

Estrutura de Pastas (simplificada)
- src/app: rotas e layouts (App Router).
- src/components: UI e layout.
- src/lib: store do carrinho, utilitários, mock‑data.
- public: assets estáticos, images e robots.txt.

SEO
- robots.txt em public/robots.txt referencia /sitemap.xml.
- sitemap gerado em src/app/sitemap.ts.
- Metadados definidos em src/app/layout.tsx.

Integração com Supabase
- Consulta de produtos populares na Home ([page.tsx](src/app/page.tsx)).
- Telas de perfil e recursos associados (endereços, cartões, etc.).
- Garanta chaves válidas em .env.local.

Qualidade
- TypeScript estrito, lint com eslint-config-next.
- Imagens otimizadas via next/image.
- UI responsiva e acessível.

Deploy (Vercel)
- Faça build local e conecte o projeto à Vercel.
- As rotas estáticas e dinâmicas são tratadas pelo App Router.
- Verifique logs de deploy e status de rotas especiais (sitemap).

Roadmap
- Finalizar páginas institucionais (about, locations, careers, contact).
- Expandir checkout com integrações reais de pagamento.
- Observabilidade (logs, métricas).

Licença
- Uso interno. Avalie adicionar uma licença conforme necessidade do projeto.

Contato
- Sugestões e melhorias são bem‑vindas.
