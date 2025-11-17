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

## Testes
- O arquivo `app.js` pode ser importado em ferramentas de teste como Supertest.
- Para testar a API GraphQL, importe `graphql/app.js` nos testes.

---

Para dúvidas, consulte a documentação Swagger, GraphQL Playground ou o código-fonte.
