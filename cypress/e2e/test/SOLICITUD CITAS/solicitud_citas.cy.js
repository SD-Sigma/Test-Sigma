

describe('Solicitud Citas',()=>{

    beforeEach(()=>{
        cy.visit('https://qa.sdsigma.com/colombia/solicitudcitas');
        cy.wait(2500);
        cy.get('#ufld\\:BPERMITIR\\.COOKIES\\.NOMODEL\\:INDEX\\.1').click();
        cy.fixture('datos_solictud_citas.datos.json').as('datos_user')
    });

    it('Saber si esta en el pais Colombia',()=>{
        cy.getAllSessionStorage().then((result)=>{
            expect(result["https://qa.sdsigma.com"]).to.have.property('DSPHEADER','MENUCOLOMBIA');
        });
    });

    it('Solictar una cita normal',()=>{
        cy.get('@datos_user').then((users) => {
            // access the users argument
            const datos = users.datos_solictud_ok.datos
            
            /*Seccion numero 1*/
            //Primero se selecciona tipo de documento
            cy.get("#ufld\\:CTIPODOC\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").select(datos.ctipodoc).should('not.have.class', 'is-invalid');
            //Segundo ingresa la cedula
            cy.get("#ufld\\:CCEDASEGURADO\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.ccedasegurado).should('not.have.class', 'is-invalid');

            //Click continuar seccion 1
            cy.get("#ufld\\:CONTENIDO58\\.CONTENIDOS\\.NOMODEL\\:CITAS\\.1").click();

            cy.wait(500);

            cy.get("#swal2-content").then(()=>{
                if(cy.get("#swal2-content").should('have.css', 'display', 'block')){
                    cy.get("#swal2-content").contains("Tenemos una solicitud pendiente por gestionar del día");
                    cy.get(".swal2-confirm.swal2-styled").click();
                }
            });

            cy.get("#ufld\\:XNOMBRE\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.xnombre).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:XAPELLIDO\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.xapellido).should('not.have.class', 'is-invalid');

            cy.get("#FDP").select(datos.fecha_nacimiento.dia).should('not.have.class', 'is-invalid');
            cy.get("#FMP").select(datos.fecha_nacimiento.mes).should('not.have.class', 'is-invalid');
            cy.get("#FAP").select(datos.fecha_nacimiento.anio).should('not.have.class', 'is-invalid');

            cy.get("#ufld\\:ISEXO\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").select(datos.isexo).should('not.have.class', 'is-invalid');

            cy.get("#ufld\\:XTELEFONOCEL\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.xcelular).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:XTELEFONOHAB\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.xtelefono).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:XEMAIL\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.xemail).should('not.have.class', 'is-invalid');

            cy.get("#ufld\\:ITIPOASEG\\.DATOSPACIENTE\\.NOMODEL\\:CITAS\\.1").select(datos.itipoasegurado).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:CONTENIDO60\\.CONTENIDOS\\.NOMODEL\\:CITAS\\.1").click();

            cy.get("#ufld\\:XDESCRIPCION\\.MOTIVOCITA\\.NOMODEL\\:CITAS\\.1").type(datos.xdescripcion).should('not.have.class', 'is-invalid');

            cy.get("#ufld\\:CONTENIDO62\\.CONTENIDOS\\.NOMODEL\\:CITAS\\.1").click();

            cy.get("#ufld\\:XEMPRESA\\.EMPRESACLIENTE\\.NOMODEL\\:CITAS\\.1").type(datos.xempresa).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:NPOLIZA\\.DATACITA\\.NOMODEL\\:CITAS\\.1").type(datos.npoliza).should('not.have.class', 'is-invalid');
            cy.get("#terminos").click({force: true});
            
            cy.get("#ufld\\:BGUARDAR\\.MENU\\.NOMODEL\\:CITAS\\.1").click();

            cy.wait(5000);

            cy.get("#swal2-content")
            .should('be.visible')
            .should('have.css', 'display', 'block');

            cy.get("#swal2-content")
            .invoke('html')
            .should('eq', 'La solicitud de cita ha sido recibida correctamente.');
        })
    });
});
