# Checklist de Deploy na Vercel

Este documento lista verificações essenciais para garantir que o projeto Next.js funcione corretamente na Vercel, evitando erros comuns como 404 e falhas de build.

## 1. Configurações do Projeto (Project Settings)

No painel da Vercel, vá em **Settings** -> **General** e verifique:

*   **Framework Preset**: Deve estar como `Next.js`.
*   **Build Command**: Deve estar como `next build` (ou padrão).
*   **Output Directory**: Deve estar **VAZIO** (padrão).
    *   ⚠️ **Atenção**: Não coloque `dist` ou `build` aqui. O Next.js gerencia isso automaticamente.

## 2. Variáveis de Ambiente

Vá em **Settings** -> **Environment Variables** e adicione as chaves do Supabase (iguais ao seu `.env.local`):

*   `NEXT_PUBLIC_SUPABASE_URL`
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> **Importante**: Se essas variáveis faltarem, o build pode falhar ou a autenticação não funcionará.

## 3. Estrutura do App Router

O projeto já segue a estrutura correta:
*   `src/app/page.tsx` (Home)
*   `src/app/layout.tsx` (Root Layout)

## 4. Rotas Dinâmicas e Supabase

Para evitar erros de renderização estática em rotas que dependem de dados do Supabase (ex: página de produto), configuramos explicitamente:

```typescript
export const dynamic = "force-dynamic";
```

Isso garante que o Next.js renderize a página no servidor a cada requisição, em vez de tentar gerar um HTML estático que falharia sem os dados.

## 5. Passos para Deploy

1.  Faça o push do código para o GitHub:
    ```bash
    git push origin main
    ```
2.  A Vercel detectará o commit e iniciará o deploy automaticamente.
3.  Acompanhe os logs na aba "Deployments".
4.  Se houver erro, verifique se as variáveis de ambiente foram salvas corretamente (pode ser necessário fazer um "Redeploy" após adicionar as variáveis).
