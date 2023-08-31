// FILE + TOKEN CHECK

import { json as config } from '../config.js';
import { goToSection } from './section.js';
import { loadVideo } from './video.js';
import { startSocket } from './websocket.js';

const queryStringLoad = window.location.search;
const urlParamsLoad = new URLSearchParams(queryStringLoad);
const id = urlParamsLoad.get('wsID');

function checkVideo( modifier ){
    var httpReq = new XMLHttpRequest();
    console.log( 'CHECKING STATUS => ' + config.video.blob + modifier + id + '.' + config.video.filetype + '?' + config.video.token );
    httpReq.open('HEAD', config.video.blob + modifier + id + '.' + config.video.filetype + '?' + config.video.token );
    httpReq.send();
    console.log( 'VIDEO STATUS => ' + httpReq.status );
    if ( httpReq.status === 200 ) {
        return( true );
    } else {
        return( false );
    }
}

function checkText(){
    var httpReq = new XMLHttpRequest();
    console.log( 'CHECKING STATUS => ' + config.video.blob + id + '.txt' + '?' + config.video.token );
    httpReq.open('HEAD', config.video.blob + id + '.txt' + '?' + config.video.token);
    httpReq.send();
    console.log( 'VIDEO STATUS => ' + httpReq.status );
    if ( httpReq.status === 200 ) {
        return( true );
    } else {
        return( false );
    }
}

export function checkAll(){
    var httpTxt = new XMLHttpRequest();
    var httpVid = new XMLHttpRequest();
    //https://videoboothfiles.blob.core.windows.net/videos/8640110618810.mp4?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D
    httpTxt.open('HEAD', 'https://videoboothfiles.blob.core.windows.net/videos/' + id + '.txt?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D', false);
    httpVid.open('HEAD', 'https://videoboothfiles.blob.core.windows.net/videos/1zu1' + id + '.mp4?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D', false);
    httpTxt.send();
    httpVid.send();
    console.log( 'VIDEO STATUS => ' + httpTxt.status );
    console.log( 'VIDEO STATUS => ' + httpVid.status );

    var statusVideo1zu1 = checkVideo( '1zu1' );
    var statusText = checkText();
    //console.log( 'VIDEO STATUS => ', statusVideo1zu1, statusVideo1zu1 );
    if ( statusVideo1zu1 == true ){
        goToSection( 'video' );
        loadVideo( id );
    } else if ( statusText == true ){
        goToSection( 'text' );
        setTimeout(() => { location.reload(); }, 10000);
    } else {
        if ( id == null ) {
            console.log('ERROR => no token ⁉️');
        } else {
            startSocket( id );;
        }
    }
};