// ACTIONS

import { indexify } from './indexer.js';
import { setupLanguages } from './language.js';
import { setupScenes } from './scene.js';
import { goToSection, goBack, goForward } from './section.js';

function setupRecord( ws ){
    document.querySelector( '#wrap-button-record' ).onclick = function(){
        goToSection( 'recording' );
        console.log( 'WS => sending "record"' );
        ws.send(indexify('record'));
        setTimeout(() => { ws.close(); }, 200);
        setTimeout(() => { location.reload(); }, 60000);
    };
}

function setupCheck( ws ){
    document.querySelector( '#wrap-button-check' ).onclick = function(){
        location.reload();
    };
}

function setupBack(){
    document.querySelector( '#wrap-button-back-mode' ).onclick = function(){
        goBack();
    };
    document.querySelector( '#wrap-button-back-record' ).onclick = function(){
        goBack();
    };
}

function setupForward(){
    document.querySelector( '#wrap-button-forward-language' ).onclick = function(){
        goForward();
    };
}

export function setupActions( ws ){
    setupScenes( ws );
    setupLanguages( ws );
    setupRecord( ws );
    setupBack();
    setupForward();
    setupCheck();
};