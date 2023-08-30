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
    httpReq.open('HEAD', config.video.blob + modifier + id + '.' + config.video.filetype + config.video.token);
    httpReq.send();
    return( httpReq.status );
}

function checkText(){
    var httpReq = new XMLHttpRequest();
    httpReq.open('HEAD', config.video.blob + id + '.txt' + config.video.token);
    httpReq.send();
    return( httpReq.status );
}

function checkId(){
    if ( id == null ) {
        console.log('ERROR => no token ⁉️');
    } else {
        startSocket( id );
    }
}

export function checkAll(){
    var statusVideo1zu1 = checkVideo( '1zu1' );
    var statusText = checkText();
    console.log( statusVideo1zu1, statusVideo1zu1 );
    if ( statusVideo1zu1 === 200 ){
        goToSection( 'video' );
        loadVideo( id );
    } else if ( statusText === 200 ){
        goToSection( 'text' );
        setTimeout(() => {
            location.reload();
        }, 10000);
    } else {
        checkId();
    }
};