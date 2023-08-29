// LANGUAGE FUNCTIONS

import { json as customer } from '../customer.js';  // import customer settings > scenes, languages, thumbnails

function setLanguage( languageToSet ){
    const languageEntries = customer.languages[languageToSet];
    //console.log(languageEntries)
    for ( const element in languageEntries ) {
        //console.log( element, languageEntries[element] );
        document.querySelector( '#' + element ).innerHTML = languageEntries[element];  
    }
    // 5) send language selected to ws
    // + next section
}

function setupLanguages(){
    var indexSL = Object.keys( customer.languages ).length;
    while ( indexSL <= 7 ) {
        document.querySelector( '#button-language-' + indexSL ).remove();
        indexSL++;
    }
    var indexBL = 0;
    for ( const button in customer.languages ) {
        //console.log('#button-language-' + indexBL, button );
        document.querySelector( '#button-language-' + indexBL ).onclick = function(){
            setLanguage ( button );
        };
        indexBL++;
    }
    //console.log( 'INITIALISING LANGUAGE' );
    setLanguage( 'english' );
}

export { setLanguage, setupLanguages };