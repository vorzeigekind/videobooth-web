// LANGUAGE FUNCTIONS

// import modules
import { json as customer } from '../customer.js';
import { goToSection } from './section.js';

// set language cookie
function setLangCookie ( cLangSet ) {
    var cLife = 1000 * 60 * 60 * 24 * 30; // milli seconds, seconds, minutes, hours, days
    var cDecay = new Date( new Date().getTime() + cLife );
    var cSet = 'boothLanguage=' + cLangSet + '; expires=' + cDecay.toGMTString() + ';';
    console.log( 'SETTING COOKIE => ' + cSet );
    document.cookie = cSet;
}

// get language cookie
function getLangCookie () {
    var cLangGet = 'none';
    var cCheck = document.cookie.indexOf('boothLanguage=');
    if ( cCheck != -1 ) {
        var strStart = document.cookie.indexOf( '=' ) + 1;
        var strEnd = document.cookie.indexOf( ';' );
        if ( strEnd == -1 ) {
            strEnd = document.cookie.length;
        }
        cLangGet = document.cookie.substring( strStart, strEnd );
    }
    console.log( 'GETTING COOKIE => boothLanguage=' + cLangGet );
    return cLangGet;
}

// change language
function setLanguage( languageToSet, initial, ws ){
    console.log( 'WEB APP => setting language to ' + languageToSet + ', ' + initial + ', ' + ws );
    const languageEntries = customer.languages[ languageToSet ];
    for ( const element in languageEntries ) {
        if ( element.includes('scene') ) {
            document.querySelector( '.' + element ).innerHTML = languageEntries[ element ];
        } else {
            document.querySelector( '#' + element ).innerHTML = languageEntries[ element ];
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
    setLangCookie( languageToSet );
}

// setup languages and buttons
function setupLanguages( currLang, ws ){
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
                setLanguage( button, false, ws );
            };
            indexBL++;
        }
    }
    setLanguage( currLang, false, ws )
};

export { setupLanguages, setLangCookie, getLangCookie };