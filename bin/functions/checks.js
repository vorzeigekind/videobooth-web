// FILE + TOKEN CHECK

import { json as config } from '../config.js';
import { setupSwitcher, goToSection } from './section.js';
import { loadVideo } from './video.js';
import { startSocket } from './websocket.js';

const queryStringLoad = window.location.search;
const urlParamsLoad = new URLSearchParams(queryStringLoad);
const id = urlParamsLoad.get('wsID');

function checkVideo( modifier ){
    var httpReq = new XMLHttpRequest();
    if ( modifier == null ) {
        console.log( 'CHECKING STATUS => ' + config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token );
        httpReq.open('HEAD', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token, false );
    } else {
        console.log( 'CHECKING STATUS => ' + config.video.blob + modifier + id + '.' + config.video.filetype + '?' + config.video.token );
        httpReq.open('HEAD', config.video.blob + modifier + id + '.' + config.video.filetype + '?' + config.video.token, false );
    }
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
    httpReq.open('HEAD', config.video.blob + id + '.txt' + '?' + config.video.token, false);
    httpReq.send();
    console.log( 'VIDEO STATUS => ' + httpReq.status );
    if ( httpReq.status === 200 ) {
        return( true );
    } else {
        return( false );
    }
}

function checkAll(){
    setupSwitcher();

    var statusVideo1zu1 = checkVideo( '1zu1' );
    var statusText = checkText();
    //console.log( 'VIDEO STATUS => ', statusVideo1zu1, statusVideo1zu1 );
    if ( statusVideo1zu1 == true ){
        goToSection( 'video' );
        loadVideo( id );
        setupLanguages( 'nows' );
    } else if ( statusText == true ){
        goToSection( 'text' );
        setupLanguages( 'nows' );
        setTimeout(() => { location.reload(); }, 10000);
    } else {
        if ( id == null ) {
            console.log('ERROR => no token ⁉️');
            goToSection( 'error-no-id' );
            setupLanguages( 'nows' );
        } else {
            startSocket( id );;
        }
    }
}

export { checkVideo, checkAll };