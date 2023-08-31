// LANGUAGE FUNCTIONS

import { json as customer } from '../customer.js';  // import customer settings > scenes, languages, thumbnails
import { goToSection } from './section.js'; // import section switcher function

function setLanguage( languageToSet, initial, ws ){
    const languageEntries = customer.languages[languageToSet];
    for ( const element in languageEntries ) {
        //console.log( 'LANGUAGE LOAD => for .' + element + ' with text ' + languageEntries[element] );
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
            console.log( 'CHECKING: ' + ws + ' != nows' );
            if ( languageToSet == langKeys[langValue] && ws != 'nows' ) {
                console.log( 'WS => sending "' + languageToSet + '"' );
                ws.send(JSON.stringify({'language': langValue}));
            }
        }
        document.querySelector( '#wrap-button-forward-language' ).classList.add( 'wrap-button-forward-selected' );
        //goToSection( 'mode' ); using button forward right now
    }
}

export function setupLanguages( ws ){
    console.log( 'CHECKING: ' + ws + ' != nows' );
    if ( ws != 'nows') {
        var indexSL = Object.keys( customer.languages ).length;
        while ( indexSL <= 7 ) {
            document.querySelector( '#wrap-button-language-' + indexSL ).remove();
            indexSL++;
        }
        var indexBL = 0;
        for ( const button in customer.languages ) {
            //console.log('#button-language-' + indexBL, button );
            document.querySelector( '#wrap-button-language-' + indexBL ).onclick = function(){
                setLanguage ( button, false, ws );
            };
            indexBL++;
        }
    }
    
    //console.log( 'INITIALISING LANGUAGE' );
    setLanguage( 'english', true, ws );
};