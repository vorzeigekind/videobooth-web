// VIDEO LOADER

import { json as config } from '../config.js';
import { checkVideo } from './checks.js';

export function loadVideo( id ){
    var video1zu1 = document.getElementById( 'player-video-1zu1' ).innerHTML;
    var button1zu1 = document.getElementById( 'button-video-1zu1' ).innerHTML;
    video1zu1 = video1zu1.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + config.video.token, );
    button1zu1 = button1zu1.replace( 'http://videolink1zu1', config.video.blob + '1zu1' + id + '.' + config.video.filetype + config.video.token );
    setTimeout(() => {
        var statusVideo = checkVideo( 'hi' );
        if ( statusVideo === 200 ){
            var video = document.getElementById( 'button-video' ).innerHTML;
            video = video.replace( 'http://videolink', config.video.blob + id + '.' + config.video.filetype + config.video.token );
            video.classList.add( 'video-accessable' );
        }
    }, 60000);
};