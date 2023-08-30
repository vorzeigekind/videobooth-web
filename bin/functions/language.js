// LANGUAGE FUNCTIONS

import { json as customer } from '../customer.js';  // import customer settings > scenes, languages, thumbnails
import { goToSection } from './section.js'; // import section switcher function

function setLanguage( languageToSet, initial, ws ){
    const languageEntries = customer.languages[languageToSet];
    for ( const element in languageEntries ) {
        //console.log( element, languageEntries[element] );
        if ( element.includes('scene') ) {
            document.querySelector( '.' + element ).innerHTML = languageEntries[element];
        } else {
            document.querySelector( '#' + element ).innerHTML = languageEntries[element];
        }
    }
    if ( initial != true ){
        const langKeys = Object.keys(customer.languages);
        const langValues = Object.values(customer.languages);
        for ( const langValue in langValues ) {
            //console.log( languageToSet, langKeys[langValue] );
            if ( languageToSet == langKeys[langValue] ) {
                console.log( 'WS => sending "' + languageToSet + '"' );
                ws.send(JSON.stringify({'language': langValue}));
            }
        }
        goToSection( 'mode' );
    }
}

export function setupLanguages( ws ){
    var indexSL = Object.keys( customer.languages ).length;
    while ( indexSL <= 7 ) {
        document.querySelector( '#button-language-' + indexSL ).remove();
        indexSL++;
    }
    var indexBL = 0;
    for ( const button in customer.languages ) {
        //console.log('#button-language-' + indexBL, button );
        document.querySelector( '#button-language-' + indexBL ).onclick = function(){
            setLanguage ( button, false, ws );
        };
        indexBL++;
    }
    //console.log( 'INITIALISING LANGUAGE' );
    setLanguage( 'english', true, ws );
};