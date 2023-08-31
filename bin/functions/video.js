// VIDEO LOADER

import { json as config } from '../config.js';
import { checkVideo } from './checks.js';

function loadVideo( id ){
    console.log( 'LOADING VIDEO' );
    var video1zu1 = document.getElementById( 'player-video-1zu1' );
    var button1zu1 = document.getElementById( 'wrap-button-video-1zu1' );
    video1zu1.classList.add( 'video-accessable' );
    button1zu1.classList.add( 'video-accessable' );
    video1zu1.innerHTML = video1zu1.innerHTML.replace( 'https://videoboothfiles.blob.core.windows.net/videos/1zu18642152121593.mp4?sp=r&st=2023-08-31T10:04:48Z&se=2024-01-17T19:04:48Z&sv=2022-11-02&sr=c&sig=wjQa2PHml%2F1nlezKPO3En2YmR7BkuPTHSEKd%2B4W0c9I%3D', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    button1zu1.innerHTML = button1zu1.innerHTML.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    var statusVideo = checkVideo();
    console.log( 'CHECK' );
    if ( statusVideo == true ){
        var video = document.getElementById( 'wrap-button-video' );
        //video.innerHTML = video.innerHTML.replace( 'http://videolink', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token );
        video.classList.add( 'video-accessable' );
    }
}

function switchLink( id ){
    console.log( 'CHANGING LINKS' );
    var video1zu1 = document.getElementById( 'player-video-1zu1' );
    var button1zu1 = document.getElementById( 'wrap-button-video-1zu1' );
    var video = document.getElementById( 'wrap-button-video' );
    video1zu1.innerHTML = video1zu1.innerHTML.replace( 'https://videoboothfiles.blob.core.windows.net/videos/1zu18642152121593.mp4?sp=r&st=2023-08-31T10:04:48Z&se=2024-01-17T19:04:48Z&sv=2022-11-02&sr=c&sig=wjQa2PHml%2F1nlezKPO3En2YmR7BkuPTHSEKd%2B4W0c9I%3D', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    button1zu1.innerHTML = button1zu1.innerHTML.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    video.innerHTML = video.innerHTML.replace( 'http://videolink', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token );
}

export { loadVideo, switchLink };