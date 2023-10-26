describe('Consulta plan tratamientos',()=>{
    beforeEach(()=>{
        cy.fixture('datos_oficina.datos.json').as('datos_oficina')
    });

    it('Consultar plan tratamiento localizador',async ()=>{
        cy.get('@datos_oficina').then((users) => {
            const datos_login = users.datos_login_prueba_colombia_QA
            cy.loginQA(datos_login.user,datos_login.password);
            cy.wait(500);

            let localizador = '202488';
            cy.getInfo(localizador).then((response) => {
                //Se busca el localizador
                cy.get('#ufld\\:BACCION\\.MENUDINAMICO\\.NOMODEL\\:MENUPRINCIPAL\\.2').click();
                cy.wait(500);
                //Codigo vencido 140829 
                cy.get('#ufld\\:BUSQUEDA\\.MENU\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').type(localizador);
                cy.wait(500);
                cy.get('#ufld\\:BBUSCAR\\.MENU\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').click();
                cy.wait(2000);

                /*Cedula*/
                cy.get('#ufld\\:CCEDASEGENC\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((cedula)=>{
                    if(cedula.text() == ''){
                        cy.log('No tiene cedula');
                        return;
                    }
                    cy.expect(cedula.text()).to.equal(response.CCEDASEG)
                });

                /*Nombre Completo*/ 
                cy.get('#ufld\\:XNOMAPEENC\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((xnombre)=>{
                    if(xnombre.text() == ''){
                        cy.log('No tiene nombre completo');
                        return;
                    }
                    cy.expect(xnombre.text()).to.equal(response.XNOMAPE)
                });

                /*Tipo Paciente*/
                cy.get('#ufld\\:XTIPOASEG\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((tipoaseg)=>{
                    if(tipoaseg.text() == ''){
                        cy.log('No tiene tipo de paciente');
                        return;
                    }

                    if(response.ITIPOASEG == 'T'){
                        cy.expect(tipoaseg.text()).to.equal('Titular');
                    }else if(response.ITIPOASEG == 'B'){
                        cy.expect(tipoaseg.text()).to.equal('Beneficiario');
                    }
                });

                cy.get('#ufld\\:XCIASEG\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((xciaseg)=>{
                    if(xciaseg.text() == ''){
                        cy.log('No tiene aseguradora');
                        return;
                    }
                    cy.expect(xciaseg.text()).to.equal(response.XCIASEG);
                });   

                cy.get('#ufld\\:XCLIENTE\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((xcliente)=>{
                    if(xcliente.text() == ''){
                        cy.log('No tiene cliente');
                        return;
                    }
                    cy.expect(xcliente.text()).to.equal(response.XCLIENTE);
                });

                cy.get('#ufld\\:XPLAN\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((xplan)=>{
                    if(xplan.text() == ''){
                        cy.log('No tiene plan');
                        return;
                    }
                    cy.expect(xplan.text()).to.equal(response.XPLAN);
                });

                /*Tipo de Localizador*/
                cy.get('#ufld\\:XTLOCALIZA\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((tipoLocaliza)=>{
                    if(tipoLocaliza.text() == ''){
                        cy.log('No tiene tipo de localizador');
                        return;
                    }
                    cy.expect(tipoLocaliza.text()).to.equal(response.XTLOCALIZA);
                });

                cy.get('#ufld\\:XCEL\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((cel)=>{
                    if(cel.text() == ''){
                        cy.log('No tiene tipo de Celular');
                        return;
                    }
                    cy.wrap(response.XCELULAR).should('contain',cel.text());
                });

                cy.get('#ufld\\:XTLF\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((tlf)=>{
                    if(tlf.text() == ''){
                        cy.log('No tiene tipo de Telefono');
                        return;
                    }
                    cy.expect(tlf.text()).to.equal(response.XTELEFONO);
                });

                cy.get('#ufld\\:XEMAIL\\.LOCALIZADOR\\.NOMODEL\\:PLANTRATAMIENTOS\\.1').then((email)=>{
                    if(email.text() == ''){
                        cy.log('No tiene tipo de email');
                        return;
                    }
                    cy.expect(email.text()).to.equal(response.XEMAIL);
                });

            });
        });
    });

    
});