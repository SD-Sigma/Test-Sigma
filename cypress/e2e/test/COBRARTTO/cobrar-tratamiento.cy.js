describe('Cobrar tratamiento',()=>{
    beforeEach(()=>{
        cy.fixture('datos_oficina.datos.json').as('datos_oficina')
    });

    it('Agregar tratamiento al localizador',async ()=>{
        cy.get('@datos_oficina').then((users) => {
            const datos_login = users.datos_login_prueba_colombia_QA
            cy.loginQA(datos_login.user,datos_login.password);
            cy.wait(500);

            let localizador = '202488';
            cy.getInfo(localizador).then((response) => {

                cy.get('#ufld\\:BACCION\\.MENUDINAMICO\\.NOMODEL\\:MENUPRINCIPAL\\.3').click();
                cy.wait(500);

                cy.get('#ufld\\:BUSQUEDA\\.MENU\\.NOMODEL\\:COBRARTTO\\.1').type(localizador);
                cy.wait(500);
                cy.get('#ufld\\:BBUSCAR\\.MENU\\.NOMODEL\\:COBRARTTO\\.1').click();
                cy.wait(2000);
                
                cy.get('#ufld\\:BCOBRAR\\.LOCALIZADOR\\.NOMODEL\\:COBRARTTO\\.1').click();
                cy.wait(1000);

                cy.get('#ufld\\:FTRATA\\.HISTORIA\\.NOMODEL\\:MODAL_COBRAR\\.1').click();
                cy.wait(1000);

                cy.get('.dd-selected').click();
                cy.wait(1000);

                cy.get('body').click('topRight'); 
                cy.wait(1000);

                cy.get('#ufld\\:BGUARDAR\\.MENU\\.NOMODEL\\:MODAL_COBRAR\\.1').click(); 
            });
        });
    });
});