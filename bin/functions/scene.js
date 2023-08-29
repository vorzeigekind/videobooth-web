// SCENE FUNCTIONS

import { json as customer } from '../customer.js';  // import customer settings > scenes, languages, thumbnails

function setScene( sceneToSet ){
    // copy from setLanguage?
    // + next section
}

function setupScenes(){
    var indexRename = 0;
    for ( const scene in customer.scenes ){
        if ( customer.scenes[scene].mode == 'singleplayer' ) {
            //console.log( 'RENAMING: ' + indexRename + '-singleplayer' ); //
            document.querySelector( '#scene-' + indexRename + '-singleplayer' ).id = 'scene-' + indexRename;
            document.querySelector( '#thumbnail-' + indexRename + '-singleplayer' ).id = 'thumbnail-' + indexRename;
            document.querySelector( '#title-' + indexRename + '-singleplayer' ).id = 'title-' + indexRename;
            //console.log( 'REMOVING: ' + indexRename + '-partymode' ); //
            document.querySelector( '#scene-' + indexRename + '-partymode' ).remove();
        } else if ( customer.scenes[scene].mode == 'partymode' ) {
            //console.log( 'RENAMING: ' + indexRename + '-partymode' ); //
            document.querySelector( '#scene-' + indexRename + '-partymode' ).id = 'scene-' + indexRename;
            document.querySelector( '#thumbnail-' + indexRename + '-partymode' ).id = 'thumbnail-' + indexRename;
            document.querySelector( '#title-' + indexRename + '-partymode' ).id = 'title-' + indexRename;
            //console.log( 'REMOVING: ' + indexRename + '-singleplayer' ); //
            document.querySelector( '#scene-' + indexRename + '-singleplayer' ).remove();
        }
        document.querySelector( '#thumbnail-' + indexRename ).src = './thumbnails/' + customer.scenes[scene].thumbnail;
        indexRename++;
    }
    var indexRemove = Object.keys( customer.scenes ).length;
    while ( indexRemove <= 7 ) {
        //console.log( 'REMOVING: ' + indexRemove + '-singleplayer & -partymode');
        document.querySelector( '#scene-' + indexRemove + '-singleplayer' ).remove();
        document.querySelector( '#scene-' + indexRemove + '-partymode' ).remove();
        indexRemove++;
    }
}

export { setupScenes };