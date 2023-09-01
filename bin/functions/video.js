// VIDEO LOADER

// import modules
import { json as config } from '../config.js';
import { checkVideo } from './checks.js';

// make video player / download buttons visible
function loadVideo( id ){
    console.log( 'WEB APP => making video player visible 🎥' );
    console.log( 'WEB APP => making video button 1 visible ⬇️' );

    document.querySelector( '.elementor-video' ).src = config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token;
    var video1zu1 = document.getElementById( 'player-video-1zu1' );
    var button1zu1 = document.getElementById( 'wrap-button-video-1zu1' );
    video1zu1.classList.add( 'video-accessable' );
    button1zu1.classList.add( 'video-accessable' );
    //video1zu1.innerHTML = video1zu1.innerHTML.replace( 'https://videoboothfiles/', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    button1zu1.innerHTML = button1zu1.innerHTML.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    var statusVideo = checkVideo();
    if ( statusVideo == true ){
        console.log( 'WEB APP => making video button 2 visible ⬇️' );

        var video = document.getElementById( 'wrap-button-video' );
        //video.innerHTML = video.innerHTML.replace( 'http://videolink', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token );
        video.classList.add( 'video-accessable' );
    }
}

// change video urls
function switchLink( id ){
    console.log( 'WEB APP => changing video urls 🔗' );

    document.querySelector( '.elementor-video' ).src = config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token;
    //var video1zu1 = document.getElementById( 'player-video-1zu1' );
    var button1zu1 = document.getElementById( 'wrap-button-video-1zu1' );
    var video = document.getElementById( 'wrap-button-video' );
    //video1zu1.innerHTML = video1zu1.innerHTML.replace( 'https://videoboothfiles/', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    button1zu1.innerHTML = button1zu1.innerHTML.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    video.innerHTML = video.innerHTML.replace( 'http://videolink', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token );
}

// export modules
export { loadVideo, switchLink };