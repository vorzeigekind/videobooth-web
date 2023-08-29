// LANGUAGE FUNCTIONS

function setLanguage( language ){
    // 1) get languages
    // 2) check which was and delete
    // 3) check which should and add
    // 4) change scene
    // 5) send language selected to ws
}

function buttonsLanguage( jsonObj ){
    var index = 0;
    for ( const language in jsonObj.languages ){
        document.querySelector( '#language-' + index ).classList.add( 'display-flex' );
        index++;
    }
}

export { setLanguage, buttonsLanguage };