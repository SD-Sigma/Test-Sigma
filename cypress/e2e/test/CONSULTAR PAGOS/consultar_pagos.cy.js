describe('Cobrar tratamiento',()=>{
    beforeEach(()=>{
        cy.fixture('datos_oficina.datos.json').as('datos_oficina')
    });

    it('Agregar tratamiento al localizador',()=>{
        cy.get('@datos_oficina').then((users) => {
            const datos_login = users.datos_login_prueba_colombia_QA
            cy.loginQA(datos_login.user,datos_login.password);
            cy.wait(500);

            cy.getToken().then((token)=>{
                cy.get('#ufld\\:CAWCPAGOSDOC2\\.MENU\\.WEB\\:MENUPRINCIPAL\\.1').click({force: true});
                cy.wait(1000);
                cy.get('#ufld\\:NRELACION_PARAM\\.MENU\\.WEB\\:CONSULTARPAGOS\\.1').type('8120');
                cy.wait(1000);
                cy.get('#ufld\\:BBUSCAR\\.MENU\\.WEB\\:CONSULTARPAGOS\\.1').click();
                cy.wait(1000);
                
                var raw = JSON.stringify({
                    "cpais":"2",
                    "nrelacion":"8120",
                });
    
                cy.getOrdenPago(raw,token).then((response)=>{
      
                    cy.get('#ufld\\:NRELACION\\.ORDENES\\.NOMODEL\\:CONSULTARPAGOS\\.1').then((nrelacion)=>{
                        if(nrelacion.text() == ''){
                            cy.log('No tiene tipo relacion');
                            return;
                        }
                        cy.expect(nrelacion.text()).to.equal(response.NRELACION);
                    });
    
                    cy.get('#ufld\\:XCLINICA\\.ORDENES\\.NOMODEL\\:CONSULTARPAGOS\\.1').then((xclinica)=>{
                        if(xclinica.text() == ''){
                            cy.log('No tiene tipo de clinica');
                            return;
                        }
                        cy.expect(xclinica.text()).to.equal(response.xclinica);
                    });
    
                    /*cy.get('#ufld\\:FDESDE\\.ORDENES\\.NOMODEL\\:CONSULTARPAGOS\\.1').then((fdesde)=>{
                        if(fdesde.text() == ''){
                            cy.log('No tiene tipo de fecha desde');
                            return;
                        }
                        cy.expect(fdesde.text()).to.equal(response.fdesde);
                    });
    
                    cy.get('#ufld\\:FHASTA\\.ORDENES\\.NOMODEL\\:CONSULTARPAGOS\\.1').then((fhasta)=>{
                        if(fhasta.text() == ''){
                            cy.log('No tiene tipo de fecha hasta');
                            return;
                        }
                        cy.expect(fhasta.text()).to.equal(response.fhasta);
                    });*/
    
                });
            });
        });
    });
});