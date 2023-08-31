// VIDEO LOADER

import { json as config } from '../config.js';
import { checkVideo } from './checks.js';

export function loadVideo( id ){
    console.log( 'LOADING VIDEO' );
    var video1zu1 = document.getElementById( 'player-video-1zu1' );
    var button1zu1 = document.getElementById( 'wrap-button-video-1zu1' );
    video1zu1.innerHTML = video1zu1.innerHTML.replace( 'http://videolink1zu1/', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    button1zu1.innerHTML = button1zu1.innerHTML.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    var statusVideo = checkVideo();
    console.log( 'CHECK' );
    if ( statusVideo == true ){
        var video = document.getElementById( 'wrap-button-video' );
        video.innerHTML = video.innerHTML.replace( 'http://videolink', config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token );
        video.classList.add( 'video-accessable' );
    }
};