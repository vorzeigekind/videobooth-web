// ACTIONS

import { indexify } from './indexer.js';
import { setupLanguages } from './language.js';
import { setupScenes } from './scene.js';
import { goToSection, goBack } from './section.js';

function setupRecord( ws ){
    document.querySelector( '#button-record' ).onclick = function(){
        goToSection( 'recording' );
        console.log( 'WS => sending "record"' );
        ws.send(indexify('record'));
    };
}

function setupBack(){
    document.querySelector( '#button-back-mode' ).onclick = function(){
        goBack();
    };
    document.querySelector( '#button-back-record' ).onclick = function(){
        goBack();
    };
}

export function setupActions( ws ){
    setupScenes( ws );
    setupLanguages( ws );
    setupRecord( ws );
    setupBack();
};