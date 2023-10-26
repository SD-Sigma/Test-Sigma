// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginQA', (email, password) => {
    cy.visit('https://oficinaqa.sdsigma.com');
    cy.wait(2000);
    cy.get('#ufld\\:BCLINICA\\.MENU\\.NOMODEL\\:PRELOGIN\\.1').click();

    cy.get('#ufld\\:CUSUARIO\\.LOGIN\\.WEB\\:SEWCLOGIN\\.1').type(email).should('not.have.class', 'is-invalid');
    cy.get('#password').type(password).should('not.have.class', 'is-invalid');

    cy.wait(1000);
    cy.get('#ufld\\:BLOGIN\\.LOGIN\\.WEB\\:SEWCLOGIN\\.1').click({force: true});
});

Cypress.Commands.add('loginPROD', (email, password) => {
    cy.visit('https://oficina.sdsigma.com');
    cy.wait(2000);

    cy.get('#ufld\\:CUSUARIO\\.LOGIN\\.WEB\\:SEWCLOGIN\\.1').type(email).should('not.have.class', 'is-invalid');
    cy.get('#password').type(password).should('not.have.class', 'is-invalid');

    cy.wait(1000);
    cy.get('#ufld\\:BLOGIN\\.LOGIN\\.WEB\\:SEWCLOGIN\\.1').click({force: true});
});

Cypress.Commands.add('getInfo', async (localizador) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic RkE2OTVEOTMtOEQ1Qi00RkUyLTk3MjYtNTcxMzNCQkY3RUNGOkQ2MzY2MDMx");

    var raw = "";
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    let respuesta = await fetch("https://apiqa.sdsigma.com/sd/services/oauthapi.get_authentication_token", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();
    //console.log(respuesta);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${respuesta.access_token}`);
    //myHeaders.append("Cookie", "JSESSIONID=1BBCFF1CB1CB58612625E4CBAC78077F");
    
    var raw = JSON.stringify({
        "cpais":"2",
        "cusuario":"1075310701",
        "ccategoria":"12",
        "nlocaliza": localizador
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    respuesta = await fetch("https://apiqa.sdsigma.com/wslocalizador/getLocalizador", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();

    return respuesta;
});

Cypress.Commands.add('getInfo', async (localizador) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic RkE2OTVEOTMtOEQ1Qi00RkUyLTk3MjYtNTcxMzNCQkY3RUNGOkQ2MzY2MDMx");

    var raw = "";
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    let respuesta = await fetch("https://apiqa.sdsigma.com/sd/services/oauthapi.get_authentication_token", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();
    //console.log(respuesta);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${respuesta.access_token}`);
    //myHeaders.append("Cookie", "JSESSIONID=1BBCFF1CB1CB58612625E4CBAC78077F");
    
    var raw = JSON.stringify({
        "cpais":"2",
        "cusuario":"1075310701",
        "ccategoria":"12",
        "nlocaliza": localizador
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    respuesta = await fetch("https://apiqa.sdsigma.com/wslocalizador/getLocalizador", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();

    return respuesta;
});


Cypress.Commands.add('getTratamientos', async (json_in) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic RkE2OTVEOTMtOEQ1Qi00RkUyLTk3MjYtNTcxMzNCQkY3RUNGOkQ2MzY2MDMx");

    var raw = "";
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    let respuesta = await fetch("https://apiqa.sdsigma.com/sd/services/oauthapi.get_authentication_token", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();
    //console.log(respuesta);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${respuesta.access_token}`);
    //myHeaders.append("Cookie", "JSESSIONID=1BBCFF1CB1CB58612625E4CBAC78077F");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: json_in,
    redirect: 'follow'
    };

    respuesta = await fetch("https://apiqa.sdsigma.com/wstratamientos/getTratamientosPorPlan", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();

    return respuesta;
});

Cypress.Commands.add('getToken', async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic RkE2OTVEOTMtOEQ1Qi00RkUyLTk3MjYtNTcxMzNCQkY3RUNGOkQ2MzY2MDMx");

    var raw = "";
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    const get_authentication_token = await fetch("https://apiqa.sdsigma.com/sd/services/oauthapi.get_authentication_token", requestOptions);
    const { access_token } = await get_authentication_token.json();

    return access_token;
});

Cypress.Commands.add('getOrdenPago', async (json_in,token) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    //myHeaders.append("Cookie", "JSESSIONID=1BBCFF1CB1CB58612625E4CBAC78077F");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: json_in,
    redirect: 'follow'
    };

    let respuesta = await fetch("https://apiqa.sdsigma.com/wsordenpago/get", requestOptions);
    //cy.log(respuesta)
    respuesta = await respuesta.json();

    return respuesta[0];
});