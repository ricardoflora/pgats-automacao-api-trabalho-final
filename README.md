# Sistema de Biblioteca Digital API

API completa para gerenciamento de biblioteca digital, cadastro de membros, catálogo de livros e sistema de empréstimos. Desenvolvida para fins educacionais e testes automatizados de APIs.

## Tecnologias
- Node.js
- Express.js
- GraphQL (Apollo Server)
- Swagger UI (documentação interativa)
- JWT (autenticação)
- bcryptjs (criptografia de senhas)
- Banco de dados em memória

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/dennyscaetano/pgats-automacao-api-trabalho-final.git
   cd pgats-automacao-api-trabalho-final
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Como rodar

- Para iniciar o servidor REST:
  ```sh
  npm run start-rest
  ```
- Para iniciar o servidor GraphQL:
  ```sh
  npm run start-graphql
  ```
- API REST disponível em `http://localhost:3000`
- API GraphQL disponível em `http://localhost:4000/graphql`
- Documentação Swagger em `http://localhost:3000/api-docs`

## Endpoints principais

### Cadastro de membros
- `POST /members/register`
  - Body: `{ "username": "string", "password": "string", "membershipType": "standard|premium" }`

### Autenticação
- `POST /members/login`
  - Body: `{ "username": "string", "password": "string" }`

### Consulta de membros
- `GET /members`

### Catálogo de livros
- `GET /books` - Listar todos os livros
- `GET /books/search?q=termo` - Buscar livros
- `GET /books/{id}` - Detalhes de um livro

### Sistema de empréstimos
- `POST /loans/borrow` - Emprestar livro
  - Body: `{ "bookId": number, "days": number }`
- `POST /loans/return` - Devolver livro
  - Body: `{ "bookId": number }`
- `GET /loans` - Listar todos os empréstimos
- `GET /loans/my-loans` - Meus empréstimos
- `GET /loans/overdue` - Empréstimos em atraso

### GraphQL Types, Queries e Mutations

Rode `npm run start-graphql` para executar a API do GraphQL e acesse a URL http://localhost:4000/graphql para acessá-la.

- **Types:**
  - `Member`: username, membershipType, maxBooks, borrowedBooks
  - `Book`: id, title, author, isbn, available, category
  - `Loan`: id, memberUsername, bookId, bookTitle, borrowDate, dueDate, returnDate, status
- **Queries:**
  - `members`: lista todos os membros
  - `books`: lista todos os livros
  - `searchBooks(query)`: busca livros por termo
  - `loans`: lista todos os empréstimos (requer autenticação JWT)
  - `myLoans`: lista empréstimos do membro logado (requer autenticação JWT)
  - `overdueLoans`: lista empréstimos em atraso (requer autenticação JWT)
- **Mutations:**
  - `registerMember(username, password, membershipType)`: retorna Member
  - `loginMember(username, password)`: retorna token + Member
  - `borrowBook(bookId, days)`: retorna Loan (requer autenticação JWT)
  - `returnBook(bookId)`: retorna Loan (requer autenticação JWT)

## Regras de negócio
- Não é permitido cadastrar membros com nomes de usuário duplicados.
- Autenticação exige credenciais válidas.
- Membros standard podem emprestar até 3 livros simultaneamente.
- Membros premium podem emprestar até 5 livros simultaneamente.
- Período de empréstimo padrão é de 14 dias (máximo 30 dias).
- Um livro não pode ser emprestado se já estiver emprestado.
- Um membro não pode emprestar o mesmo livro duas vezes.
- Token JWT expira em 2 horas.


## Testes Automatizados

### Testes de API (Mocha)
- O arquivo `app.js` pode ser importado em ferramentas de teste como Supertest.
- Para testar a API GraphQL, importe `graphql/app.js` nos testes.
- Execute todos os testes automatizados:
  ```sh
  npm test
  ```

### Testes de Performance (k6)
Testes de performance são realizados com o [k6](https://k6.io/), uma ferramenta moderna para testes de carga.

#### Pré-requisitos
- Instale o k6 globalmente, se ainda não tiver:
  ```sh
  brew install k6
  # ou
  choco install k6
  # ou consulte https://k6.io/docs/getting-started/installation/
  ```

#### Executando o teste de performance
1. Certifique-se de que a API REST está rodando (`npm run start-rest`).
2. Execute o teste de performance:
   ```sh
   npm run k6:performance
   ```
   Isso executa o script localizado em `test/k6/script-performance.js`.

#### Gerando relatório resumido
Para exportar um resumo dos resultados em JSON:
```sh
npm run k6:performance:summary
```
O arquivo será salvo em `mochawesome-report/k6-summary.json`.

#### Boas práticas para testes de performance
- Execute os testes em ambiente isolado, sem outros processos consumindo recursos.
- Monitore CPU, memória e rede durante o teste.
- Analise os percentis de resposta (`p(90)`, `p(95)`) e taxa de erro.
- Ajuste o número de usuários virtuais (`vus`) e duração conforme o cenário desejado.
- Documente e versiona scripts de teste.

---

Para dúvidas, consulte a documentação Swagger, GraphQL Playground, o código-fonte ou abra uma issue.
