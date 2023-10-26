
describe('Consulta citas',()=>{
    
    beforeEach(()=>{
        cy.visit('https://qa.sdsigma.com/colombia/consultacitas');
        cy.wait(2500);
        cy.get('#ufld\\:BPERMITIR\\.COOKIES\\.NOMODEL\\:INDEX\\.1').click();
        cy.fixture('datos_solictud_citas.datos.json').as('datos_user')
    });

    it('Consultar cita',()=>{
        cy.get('@datos_user').then((users) => {
            // access the users argument
            const datos = users.datos_solictud_ok.datos
            cy.get("#ufld\\:ID\\.MENU\\.NOMODEL\\:CONSULTACITAS\\.1").type(datos.ccedasegurado).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:XCELULAR\\.MENU\\.NOMODEL\\:CONSULTACITAS\\.1").type(datos.xcelular).should('not.have.class', 'is-invalid');
            cy.get("#ufld\\:BBUSCAR\\.MENU\\.NOMODEL\\:CONSULTACITAS\\.1").click();

            cy.get("#ufld\\:XNOMBRE\\.QACITAS\\.QUEJAS_AMONESTA\\:MODAL_CITA\\.1").should('have.text',datos.xnombre)
            cy.get("#ufld\\:XAPELLIDO\\.QACITAS\\.QUEJAS_AMONESTA\\:MODAL_CITA\\.1").should('have.text',datos.xapellido)
            cy.get("#ufld\\:CCEDASEGURADO\\.QACITAS\\.QUEJAS_AMONESTA\\:MODAL_CITA\\.1").should('have.text',datos.ccedasegurado)

            let date_now = new Date();
            let date_now_day = date_now.getDate();
            let date_now_month = date_now.getMonth() + 1;
            let date_now_year = date_now.getFullYear();

            let date_now_hour = date_now.getHours();
            let date_now_minutes = date_now.getMinutes();

            if(date_now_day <= 9) date_now_day =  `0${date_now_day}`
            if(date_now_month <= 9) date_now_month =  `0${date_now_month}`  
            if(date_now_hour <= 9) date_now_hour =  `0${date_now_hour}`
            if(date_now_minutes <= 9) date_now_minutes =  `0${date_now_minutes}`
            
            let date_complet_str =  `${date_now_day}/${date_now_month}/${date_now_year} ${date_now_hour}:${date_now_minutes}`
            let date_complet_str_1 =  `${date_now_day}/${date_now_month}/${date_now_year} ${date_now_hour}:${(parseInt(date_now_minutes,10) - 1)}`
            let date_complet_str_2 =  `${date_now_day}/${date_now_month}/${date_now_year} ${date_now_hour}:${(parseInt(date_now_minutes,10) + 1)}`

            cy.get("#ufld\\:FINGRESO2\\.QACITAS\\.QUEJAS_AMONESTA\\:MODAL_CITA\\.1").invoke('text').should(text =>{
                expect([date_complet_str, date_complet_str_1, date_complet_str_2]).to.include(text);
            })
            
            cy.get("#ufld\\:SERVICIO\\.QACITAS\\.QUEJAS_AMONESTA\\:MODAL_CITA\\.1").should('have.text',datos.servicio)
        });
    });
});