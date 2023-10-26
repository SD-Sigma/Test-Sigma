describe('Cawcnuevo',()=>{
    beforeEach(()=>{
        cy.fixture('datos_oficina.datos.json').as('datos_oficina')
    });
    it('Consultar tratamientos',()=>{
        cy.get('@datos_oficina').then((users) => {
            const datos_login = users.datos_login_prueba_colombia
            cy.loginPROD(datos_login.user,datos_login.password);
            cy.wait(500);
            cy.get('#ufld\\:CAWCTRATAMIENTOS2\\.MENU\\.WEB\\:MENUPRINCIPAL\\.1').click({force: true});

            cy.get('#ufld\\:FILTROANIO\\.MENU\\.WEB\\:CAWCNUEVO\\.1').invoke('children').then((opcionesAno)=>{
                cy.get('#ufld\\:FILTROMES\\.MENU\\.WEB\\:CAWCNUEVO\\.1').invoke('children').then((opcionesMes)=>{
                    const anoArray = Array.from(opcionesAno).map((option) => option.text);
                    const mesArray = Array.from(opcionesMes).map((option) => option.text);
                    anoArray.forEach((ano)=>{
                        cy.get('#ufld\\:FILTROANIO\\.MENU\\.WEB\\:CAWCNUEVO\\.1').select(ano);
                        cy.wait(100);
                        mesArray.forEach((mes)=>{
                            cy.get('#ufld\\:FILTROMES\\.MENU\\.WEB\\:CAWCNUEVO\\.1').select(mes);
                            cy.wait(100);
                            cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.1').then((ncantidad_str) => {
                                const ncantidad = parseInt(ncantidad_str.text(),10);
                                if(isNaN(ncantidad)) return;
                                expect(ncantidad).to.be.greaterThan(0);
                            });
                            
                            cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.2').then((ncantidad_str) => {
                                const ncantidad = parseInt(ncantidad_str.text(),10);
                                if(isNaN(ncantidad)) return;
                                expect(ncantidad).to.be.greaterThan(0);
                            });

                            cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.3').then((ncantidad_str) => {
                                const ncantidad = parseInt(ncantidad_str.text(),10);
                                if(isNaN(ncantidad)) return;
                                expect(ncantidad).to.be.greaterThan(0);
                            });

                            cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.4').then((ncantidad_str) => {
                                const ncantidad = parseInt(ncantidad_str.text(),10);
                                if(isNaN(ncantidad)) return;
                                expect(ncantidad).to.be.greaterThan(0);
                            });
                        });
                    });
                });
            })
        });
    });
});
