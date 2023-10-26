describe('Cawcnuevo',()=>{
    beforeEach(()=>{
        cy.fixture('datos_oficina.datos.json').as('datos_oficina')
    });
    
    it('Consultar tratamientos Pendiente',()=>{
        cy.get('@datos_oficina').then((users) => {
            const datos_login = users.datos_login_prueba_mexico
            cy.loginPROD(datos_login.user,datos_login.password);
            cy.wait(500);
            cy.get('#ufld\\:CAWCTRATAMIENTOS2\\.MENU\\.WEB\\:MENUPRINCIPAL\\.1').click({force: true});

            const datos_consulta_tratamientos_pendiente = users.datos_consulta_tratamiento_pendiente_182

            cy.get('#ufld\\:FILTROANIO\\.MENU\\.WEB\\:CAWCNUEVO\\.1').select(datos_consulta_tratamientos_pendiente.filtro_ano);
            cy.wait(300);
            cy.get('#ufld\\:FILTROMES\\.MENU\\.WEB\\:CAWCNUEVO\\.1').select(datos_consulta_tratamientos_pendiente.filtro_mes);
            cy.wait(300);

            cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.1').then((ncantidad_str) => {
                const ncantidad = parseInt(ncantidad_str.text(),10);
                if(isNaN(ncantidad)) return;
                expect(ncantidad).to.be.greaterThan(0);
                cy.get('#ufld\\:NCANTIDAD\\.DETALLE\\.WEB\\:CAWCNUEVO\\.1').click();
                cy.wait(5000);
                cy.get('[contenido=CONTENIDO7]').click();
            });    
        });
    });
});
