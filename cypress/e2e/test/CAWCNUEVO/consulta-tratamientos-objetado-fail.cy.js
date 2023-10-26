describe('Cawcnuevo',()=>{
    beforeEach(()=>{
        cy.fixture('datos_oficina.datos.json').as('datos_oficina')
    });
    it('Consultar tratamientos Objetado test Fallido',()=>{
        cy.get('@datos_oficina').then((users) => {
            const datos_login = users.datos_login_prueba_colombia
            cy.loginPROD(datos_login.user,datos_login.password);
            cy.wait(500);
            cy.get('#ufld\\:CAWCTRATAMIENTOS2\\.MENU\\.WEB\\:MENUPRINCIPAL\\.1').click({force: true});

            const datos_consulta_tratamientos_objetado = users.datos_consulta_tratamiento_objetado_228_2

            cy.get('#ufld\\:FILTROANIO\\.MENU\\.WEB\\:CAWCNUEVO\\.1').select(datos_consulta_tratamientos_objetado.filtro_ano);
            cy.wait(2000);
            cy.get('#ufld\\:FILTROMES\\.MENU\\.WEB\\:CAWCNUEVO\\.1').select(datos_consulta_tratamientos_objetado.filtro_mes);
            cy.wait(2000);

            cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.4').then((ncantidad_str) => {
                const ncantidad = parseInt(ncantidad_str.text(),10);
                if(isNaN(ncantidad)) return;
                expect(ncantidad).to.be.greaterThan(0);
                cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.4').click();
                cy.wait(2000);

                cy.get('.table1')
                .find('tr')
                .eq(datos_consulta_tratamientos_objetado.pos)  // Selecciona todas las filas de la tabla
                .find('td')
                .each((td, index) => {
                    if(index == 0) cy.wrap(td).should('have.text', datos_consulta_tratamientos_objetado.localizador); 
                    if(index == 1) cy.wrap(td).should('have.text', datos_consulta_tratamientos_objetado.xnombre);
                    if(index == 2) cy.wrap(td).should('have.text', datos_consulta_tratamientos_objetado.xtrata);
                    if(index == 3) cy.wrap(td).should('have.text', datos_consulta_tratamientos_objetado.ndiente);
                    if(index == 4) cy.wrap(td).click();
                });

                cy.wait(2000);
                
                cy.contains("No podrá agregar información a los tratamientos debido a que el código de atención se encuentra bloqueado.")
            });    
        });
    });
});
