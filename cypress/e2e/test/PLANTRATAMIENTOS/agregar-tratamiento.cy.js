describe('Agregar tratamientos según el plan',()=>{
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
                //Se busca el localizador
                cy.get('#ufld\\:BACCION\\.MENUDINAMICO\\.NOMODEL\\:MENUPRINCIPAL\\.2').click();
                cy.wait(500);
                //Codigo vencido 
                cy.get('#ufld\\:BUSQUEDA\\.MENU\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').type(localizador);
                cy.wait(500);
                cy.get('#ufld\\:BBUSCAR\\.MENU\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').click();
                cy.wait(2000);

                cy.get('#ufld\\:BAGREGA_TRA\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').click();
                cy.wait(1000);

                var raw = JSON.stringify({
                    "cpais":"2",
                    "fdesde1": response.FDESDE_POL,
                    "nlocaliza": localizador,
                    "cciaseg": response.CCIASEG,
                    "ccliente": response.CCLIENTE,
                    "cproducto": response.CPRODUCTO,
                    "cplan": response.CPLAN,
                });

                cy.getTratamientos(raw).then((tratamientos)=>{
                    tratamientos = tratamientos.sort()
                    cy.get('.tabla-tratamientos').contains("td",tratamientos[0].XNOMBRE)
                    .parent('tr')
                    .then((tr) => {
                      const idParts = tr.attr('id').split('.');
                      const occ = idParts[idParts.length - 1];
                      cy.log(`Occurrence: ${occ}`)
                      if(tratamientos[0].ITIPOT == 'E'){
                        cy.get(`#ufld\\:ISEL\\.TRATAMIENTOS\\.NOMODEL\\:MODAL_AGREGARTTO\\.${occ}`).click({force: true});
                      }else{
                        cy.get(`#ufld\\:BSELDIENTE\\.TRATAMIENTOS\\.NOMODEL\\:MODAL_AGREGARTTO\\.${occ}`).click({force: true});
                      }
                      cy.wait(1000);
                      cy.get('#ufld\\:BGUARDAR\\.MENU\\.NOMODEL\\:MODAL_AGREGARTTO\\.1').click({force: true});
                      cy.wait(2000);
                      cy.get('.sweetbtnconfirm').click();
                      cy.wait(1000);
                      cy.get('#ufld\\:BENVIAR\\.MENU\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').click({force: true});
                      cy.wait(2000);
                    });
                });
            });
        });
    });
});