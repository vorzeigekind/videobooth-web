// ACTIONS

// import modules
import { indexify } from './indexer.js';
import { setupLanguages } from './language.js';
import { setupScenes } from './scene.js';
import { goToSection, goBack, goForward } from './section.js';

// setup record button
function setupRecord( ws ){
    console.log( 'WEB APP => setup record button' );

    document.querySelector( '#wrap-button-record' ).onclick = function(){
        goToSection( 'recording' );
        console.log( 'WS => sending "record"' );
        ws.send(indexify('record'));
        setTimeout(() => { ws.close(); }, 200);
        setTimeout(() => { location.reload(); }, 60000);
    };
}

// setup video button
function setupCheck( ws ){
    console.log( 'WEB APP => setup video button' );

    document.querySelector( '#wrap-button-check' ).onclick = function(){
        location.reload();
    };
}

// setup back buttons
function setupBack(){
    console.log( 'WEB APP => setup back buttons' );

    document.querySelector( '#wrap-button-back-mode' ).onclick = function(){
        goBack();
    };
    document.querySelector( '#wrap-button-back-record' ).onclick = function(){
        goBack();
    };
}

// setup forward buttons
function setupForward(){
    console.log( 'WEB APP => setup forward button' );

    document.querySelector( '#wrap-button-forward-language' ).onclick = function(){
        goForward();
    };
}

// load all buttons setups
export function setupActions( ws ){
    console.log( 'WEB APP => initialising buttons 👆' );

    setupScenes( ws );
    setupLanguages( ws );
    setupRecord( ws );
    setupBack();
    setupForward();
    setupCheck();
};