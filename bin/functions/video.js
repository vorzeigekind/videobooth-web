// VIDEO LOADER

// import modules
import { json as config } from '../config.js';
import { checkVideo } from './checks.js';
import { goToSection } from './section.js';

function addButtons( id ){
    document.querySelector( '#wrap-button-video-1zu1' ).onclick = function(){
        fetch(config.video.blob + '1zu1' + id + '.' + config.video.filetype)
        .then(resp => resp.blob())
        .then(blob => {
            goToSection( 'loading' );
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = id + "-1zu1.mp4";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            //alert("Your download in 1:1 is ready!"); // or you know, something with better UX...
            goToSection( 'video' );
        })
        .catch(() => alert("Error downloading!"));
    };
    document.querySelector( '#wrap-button-video' ).onclick = function(){
        fetch(config.video.blob + id + '.' + config.video.filetype)
        .then(resp => resp.blob())
        .then(blob => {
            goToSection( 'loading' );
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = id + ".mp4";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            //alert("Your download in 16:9 is ready!"); // or you know, something with better UX...
            goToSection( 'video' );
        })
        .catch(() => alert("Error downloading!"));
    };
}

// make video player / download buttons visible
function loadVideo( id ){
    console.log( 'WEB APP => making video player visible 🎥' );
    console.log( 'WEB APP => making video button 1 visible ⬇️' );

    //document.querySelector( '.elementor-video' ).src = config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token;
    document.querySelector( '.elementor-video' ).src = config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token;
    var video1zu1 = document.getElementById( 'player-video-1zu1' );
    var button1zu1 = document.getElementById( 'wrap-button-video-1zu1' );
    video1zu1.classList.add( 'video-accessable' );
    button1zu1.classList.add( 'video-accessable' );
    video1zu1.innerHTML = video1zu1.innerHTML.replace( 'https://videoboothfiles/', config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token );
    var statusVideo = checkVideo();
    if ( statusVideo == true ){
        console.log( 'WEB APP => making video button 2 visible ⬇️' );

        var video = document.getElementById( 'wrap-button-video' );
        video.classList.add( 'video-accessable' );
    }
}

// change video urls
function switchLink( id ){
    console.log( 'WEB APP => changing video urls 🔗' );

    //document.querySelector( '.elementor-video' ).src = config.video.blob + '1zu1' + id + '.' + config.video.filetype + '?' + config.video.token;
    document.querySelector( '.elementor-video' ).src = config.video.blob + id + '.' + config.video.filetype + '?' + config.video.token;

    addButtons( id );
}

// export modules
export { loadVideo, switchLink };