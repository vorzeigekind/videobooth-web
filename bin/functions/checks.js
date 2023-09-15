// FILE + TOKEN CHECK

// import modules
import { json as config } from '../config.js';
import { json as customer } from '../customer.js';
import { setupSwitcher, goToSection, goToLanding } from './section.js';
import { loadVideo } from './video.js';
import { setupScenes } from './scene.js';
import { setupLanguages, getLangCookie, setLangCookie } from './language.js';
import { startSocket } from './websocket.js';

// get id from query attribute
const queryStringLoad = window.location.search;
const urlParamsLoad = new URLSearchParams(queryStringLoad);
const id = urlParamsLoad.get('wsID');

// check if video files ready
function checkVideo( modifier ){
    console.log( 'WEB APP => checking video file: ' + modifier + ' 🔍' );

    var httpReq = new XMLHttpRequest();
    if ( modifier == null ) {
        httpReq.open('HEAD', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token, false );
    } else {
        httpReq.open('HEAD', config.video.blob + modifier + id + '.' + config.video.filetype + '?' + config.video.token, false );
    }
    httpReq.send();
    if ( httpReq.status === 200 ) {
        return( true );
    } else {
        return( false );
    }
}

// check if txt file ready
function checkText(){
    console.log( 'WEB APP => checking text file 🔍' );

    var httpReq = new XMLHttpRequest();
    httpReq.open('HEAD', config.video.blob + id + '.txt' + '?' + config.video.token, false);
    httpReq.send();
    if ( httpReq.status === 200 ) {
        return( true );
    } else {
        return( false );
    }
}

// init video + txt check and check for an id
function checkAll(){
    console.log( 'WEB APP => initialising checks' );

    var currLang = getLangCookie();
    if ( currLang == 'none' ) {
        console.log( 'WEB APP => no cookie setting: ' + customer.default_language );
        setLangCookie( customer.default_language );
        currLang = customer.default_language;
    } else if ( currLang != 'none' ) {
        console.log( 'WEB APP => cookie found, setting: ' + currLang );
    }

    setupSwitcher();
    var statusVideo1zu1 = checkVideo( '1zu1' );
    var statusText = checkText();
    if ( statusVideo1zu1 == true ){
        console.log( 'WEB APP => video available 🎊' );

        goToSection( 'video' );
        loadVideo( id );
        setupScenes( 'nows' );
        setupLanguages( currLang, 'nows' );
    } else if ( statusText == true ){
        console.log( 'WEB APP => text available 🎊' );

        goToSection( 'text' );
        setupScenes( 'nows' );
        setupLanguages( currLang, 'nows' );
        setTimeout(() => { 
            console.log( 'WEB APP => reloading page to recheck video 🔄' );
            location.reload();
        }, 10000);
    } else {
        if ( id == null ) {
            console.log( 'WEB APP => ERROR => no token ⁉️' );
            goToSection( 'loading' );
            goToLanding();
        } else {
            startSocket( currLang, id );;
        }
    }
}

// export modules
export { checkVideo, checkAll };