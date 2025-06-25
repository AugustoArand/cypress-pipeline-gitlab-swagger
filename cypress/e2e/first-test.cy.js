// Defin config não é necessário aqui defineConfig
// Usa a baseUrl configurada no cypress.config.js
const baseUrl = Cypress.config('baseUrl');
// const baseUrl2 = Cypress.env('baseUrl2');

describe('Swagger Petstore API - Backend tests', () => {

    it('Deve retornar 200 ao buscar pets por status', () => {
        cy.request(`${baseUrl}/pet/findByStatus?status=available`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('Deve adicionar um novo pet', () => {
        const newPet = {
            id: Date.now(),
            name: 'Lupe Santoss',
            status: 'available',
            category: { id: 324, name: 'Dogs' },
            photoUrls: []
        };

        // Adiciona novo pet
        cy.request('POST', `${baseUrl}/pet`, newPet).then((postResponse) => {
            expect(postResponse.status).to.eq(200);
            expect(postResponse.body.name).to.eq('Lupe Santoss');
            expect(postResponse.body.id).to.eq(newPet.id);
        });
    });

    it('Deve atualizar informações de um pet existente', () => {
        // Usa um pet já existente na API demo (ID 1 geralmente existe)
        const updatedPet = {
            id: 1,
            name: 'Lupe Santoss Updated',
            status: 'available',
            category: { id: 323, name: 'Dogs' },
            photoUrls: [] // Obrigatório na API
        };

        // Atualiza o pet
        cy.request('PUT', `${baseUrl}/pet`, updatedPet).then((putResponse) => {
            expect(putResponse.status).to.eq(200);
            expect(putResponse.body.name).to.eq('Lupe Santoss Updated');
            expect(putResponse.body.id).to.eq(1);
        });
    });

    it('Deve testar operação de deletar um pet', () => {
        // Primeiro cria um pet para depois deletar
        const tempPet = {
            id: Date.now(), // Criar IDs aleatórios
            name: 'ToBeDeleted',
            status: 'available',
            category: { id: 324, name: 'Dogs' },
            photoUrls: []
        };

        // Cria o pet primeiro
        cy.request('POST', `${baseUrl}/pet`, tempPet).then((postResponse) => {
            expect(postResponse.status).to.eq(200);

            // Depois tenta deletar o pet (mesmo que não persista, testa a operação)
            cy.request({
                method: 'DELETE',
                url: `${baseUrl}/pet/${tempPet.id}`,
                failOnStatusCode: false
            }).then((deleteResponse) => {
                // Aceita tanto 200 quanto 404 (pois a API demo pode não persistir)
                expect([200, 404]).to.include(deleteResponse.status);
            });
        });
    });






});
