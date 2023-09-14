// SCENE FUNCTIONS

// import modules
import { json as customer } from '../customer.js';
import { goToSection } from './section.js';

// change scene
function setScene( sceneToSet, initial, ws ){
    console.log( 'WEB APP => setting scene to scene ' + sceneToSet );

    for ( const scene in customer.scenes ) {
        if ( scene == sceneToSet ){
            document.querySelector( '.wrap-' + scene ).classList.add( 'wrap-select' );
        } else {
            document.querySelector( '.wrap-' + scene ).classList.remove( 'wrap-select' );
        }
    }
    if ( initial != true && ws != 'nows' ){
        ws.send(JSON.stringify({'scene': sceneToSet}));
        goToSection( 'record' );
    }
}

// setup scenes
export function setupScenes( ws ){
    console.log( 'WEB APP => initialising scenes' );

    var indexRename = 0;
    for ( const scene in customer.scenes ){
        if ( customer.scenes[scene].mode == 'singleplayer' ) {
            document.querySelector( '#thumbnail-' + indexRename + '-singleplayer' ).classList.add( 'thumbnail-' + indexRename );
            document.querySelector( '#scene-' + indexRename + '-singleplayer' ).classList.add( 'scene-' + indexRename );
            document.querySelector( '#wrap-' + indexRename + '-singleplayer' ).classList.add( 'wrap-' + indexRename );
            document.querySelector( '#wrap-' + indexRename + '-partymode' ).remove();
        } else if ( customer.scenes[scene].mode == 'partymode' ) {
            document.querySelector( '#thumbnail-' + indexRename + '-partymode' ).classList.add( 'thumbnail-' + indexRename );
            document.querySelector( '#scene-' + indexRename + '-partymode' ).classList.add( 'scene-' + indexRename );
            document.querySelector( '#wrap-' + indexRename + '-partymode' ).classList.add( 'wrap-' + indexRename );
            document.querySelector( '#wrap-' + indexRename + '-singleplayer' ).remove();
        }
        //document.querySelector( '.thumbnail-' + indexRename ).src = 'https://vorzeigeassets.de/videobooth/bin/thumbnails/' + customer.scenes[scene].thumbnail;
        document.querySelector( '.thumbnail-' + indexRename ).src = '../lib/' + customer.path + '/' + customer.scenes[scene].thumbnail;

        if ( ws != 'nows' ) {
            document.querySelector( '.wrap-' + scene ).onclick = function(){
                setScene ( scene, false, ws );
            };
        }
        indexRename++;
    }
    var indexRemove = Object.keys( customer.scenes ).length;
    while ( indexRemove <= 7 ) {
        document.querySelector( '#wrap-' + indexRemove + '-singleplayer' ).remove();
        document.querySelector( '#wrap-' + indexRemove + '-partymode' ).remove();
        indexRemove++;
    }
};