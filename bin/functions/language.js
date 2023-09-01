// LANGUAGE FUNCTIONS

// import modules
import { json as customer } from '../customer.js';
import { goToSection } from './section.js';

// change language
function setLanguage( languageToSet, initial, ws ){
    console.log( 'WEB APP => setting language to ' + languageToSet );

    const languageEntries = customer.languages[languageToSet];
    for ( const element in languageEntries ) {
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
            console.log( 'CHECKING: ' + ws + ' != nows' );
            if ( languageToSet == langKeys[langValue] && ws != 'nows' ) {
                ws.send(JSON.stringify({'language': langValue}));
            }
        }
        document.querySelector( '#wrap-button-forward-language' ).classList.add( 'wrap-button-forward-selected' );
    }
}

// setup languages and buttons
export function setupLanguages( ws ){
    console.log( 'WEB APP => initialising languages' );
    console.log( 'WEB APP => adding language buttons' );

    if ( ws != 'nows') {
        var indexSL = Object.keys( customer.languages ).length;
        while ( indexSL <= 7 ) {
            document.querySelector( '#wrap-button-language-' + indexSL ).remove();
            indexSL++;
        }
        var indexBL = 0;
        for ( const button in customer.languages ) {
            document.querySelector( '#wrap-button-language-' + indexBL ).onclick = function(){
                setLanguage ( button, false, ws );
            };
            indexBL++;
        }
    }
    setLanguage( 'english', true, ws );
};