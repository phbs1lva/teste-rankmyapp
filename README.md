# teste-rankmyapp

## Variáveis de ambiente

Duas variáveis de ambiente são necessárias para rodar o projeto:
- NEXT_PUBLIC_API_URL=https://api.github.com
- NEXT_PUBLIC_GITHUB_TOKEN=

A API do GitHub permite até 60 requisições por hora sem token, por conta disso, é melhor utilizar um token para utilizar a aplicação. O token pode ser qualquer PAT gerado pelo modo clássico, não precisa configurar nenhum escopo nele.

## Rodando a aplicação com npm

```
npm run dev
```

## Rodando a aplicação com Docker para desenvolvimento

Primeiro, construa a image docker com:

```
docker build -f Dockerfile.dev -t app-dev .
```

Em seguida, execute:

```
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules app-dev
```

## Rodando a aplicação com Docker otimizado para ambientes containerizados

Primeiro, construa a image docker com:

```
docker build -f Dockerfile -t app-build .
```

Em seguida, execute:

```
docker run -p 3000:3000 app-build
```

## Rodando os testes

```
npm run test
```

## Principais decisões técnicas

- **Framework:** Next.js com App Router
- **Linguagem:** TypeScript para melhor experiência de desenvolvimento com type safety
- **Arquitetura:**
  - Context API para gerenciamento de estado
  - Pastas separando as camadas de domínio, configuração, serviços e componentes
  - Camada de integração com API do GitHub
- **Developer experience:**
  - Containers docker, tanto para desenvolvimento e produção
  - Testes automatizados, rodando também pelo GitHub Actions
