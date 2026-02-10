// Bibliotecas
// Trigger GitHub Actions: ajuste forçado em 10/02/2026
const request = require('supertest')
const { expect } = require('chai')

// Testes de API REST External
// 1. Teste de autenticação de membro
// 2. Teste de empréstimo de livro
// 3. Teste de listagem de membros

describe('API REST External - Pipeline', () => {
    let token

    before(async () => {
        // Autentica e obtém token
        const respostaLogin = await request('http://localhost:3000')
            .post('/members/login')
            .send({
                username: 'alexandre',
                password: '123456'
            })
        token = respostaLogin.body.token
    })

    it('Deve autenticar membro com sucesso', async () => {
        const resposta = await request('http://localhost:3000')
            .post('/members/login')
            .send({
                username: 'alexandre',
                password: '123456'
            })
        expect(resposta.status).to.equal(200)
        expect(resposta.body).to.have.property('token')
    })

    it('Deve realizar empréstimo de livro com sucesso', async () => {
        const resposta = await request('http://localhost:3000')
            .post('/loans/borrow')
            .set('Authorization', `Bearer ${token}`)
            .send({
                bookId: 2,
                days: 7
            })
        expect(resposta.status).to.equal(201)
        expect(resposta.body).to.have.property('id')
        expect(resposta.body).to.have.property('memberUsername', 'alexandre')
        expect(resposta.body).to.have.property('bookId', 2)
        expect(resposta.body).to.have.property('status', 'active')
    })

    it('Deve listar membros com sucesso', async () => {
        const resposta = await request('http://localhost:3000')
            .get('/members')
            .set('Authorization', `Bearer ${token}`)
        expect(resposta.status).to.equal(200)
        expect(resposta.body).to.be.an('array')
    })
})
