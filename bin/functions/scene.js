// SCENE FUNCTIONS

import { json as customer } from '../customer.js';  // import customer settings > scenes, languages, thumbnail
import { goToSection } from './section.js'; // import section switcher function

function setScene( sceneToSet, initial, ws ){
    console.log( 'Selected Scene: ' + sceneToSet );
    for ( const scene in customer.scenes ) {
        if ( scene == sceneToSet ){
            document.querySelector( '.wrap-' + scene ).classList.add( 'wrap-select' );
        } else {
            document.querySelector( '.wrap-' + scene ).classList.remove( 'wrap-select' );
        }
    }
    if ( initial != true && ws != 'nows' ){
        console.log( 'WS => sending "Scene ' + sceneToSet + '"' );
        ws.send(JSON.stringify({'scene': sceneToSet}));
        goToSection( 'record' );
    }
}

export function setupScenes( ws ){
    var indexRename = 0;
    for ( const scene in customer.scenes ){
        if ( customer.scenes[scene].mode == 'singleplayer' ) {
            //console.log( 'RENAMING: ' + indexRename + '-singleplayer' ); // 
            document.querySelector( '#thumbnail-' + indexRename + '-singleplayer' ).classList.add( 'thumbnail-' + indexRename );
            document.querySelector( '#scene-' + indexRename + '-singleplayer' ).classList.add( 'scene-' + indexRename );
            document.querySelector( '#wrap-' + indexRename + '-singleplayer' ).classList.add( 'wrap-' + indexRename );
            //console.log( 'REMOVING: ' + indexRename + '-partymode' ); //
            document.querySelector( '#wrap-' + indexRename + '-partymode' ).remove();
        } else if ( customer.scenes[scene].mode == 'partymode' ) {
            //console.log( 'RENAMING: ' + indexRename + '-partymode' ); //
            document.querySelector( '#thumbnail-' + indexRename + '-partymode' ).classList.add( 'thumbnail-' + indexRename );
            document.querySelector( '#scene-' + indexRename + '-partymode' ).classList.add( 'scene-' + indexRename );
            document.querySelector( '#wrap-' + indexRename + '-partymode' ).classList.add( 'wrap-' + indexRename );
            //console.log( 'REMOVING: ' + indexRename + '-singleplayer' ); //
            document.querySelector( '#wrap-' + indexRename + '-singleplayer' ).remove();
        }
        document.querySelector( '.thumbnail-' + indexRename ).src = 'https://vorzeigeassets.de/videobooth/bin/thumbnails/' + customer.scenes[scene].thumbnail;
        //console.log( 'scene-' + scene, indexRename );
        if ( ws != 'nows' ) {
            document.querySelector( '.wrap-' + scene ).onclick = function(){
                setScene ( scene, false, ws );
            };
        }
        
        indexRename++;
    }
    var indexRemove = Object.keys( customer.scenes ).length;
    while ( indexRemove <= 7 ) {
        //console.log( 'REMOVING: ' + indexRemove + '-singleplayer & -partymode');
        document.querySelector( '#wrap-' + indexRemove + '-singleplayer' ).remove();
        document.querySelector( '#wrap-' + indexRemove + '-partymode' ).remove();
        indexRemove++;
    }
};