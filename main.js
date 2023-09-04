// INITIATE WEB APP

//import { React } from "./bin/react/react.production.min.js";
//import { ReactDOM } from "./bin/react/react-dom.production.min.js";

// https://videoboothfiles.blob.core.windows.net/videos/1zu18647161806378.mp4

document.querySelector( '#button-downloader' ).onclick = function(){
    fetch("https://videoboothfiles.blob.core.windows.net/videos/1zu18647161806378.mp4")
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = "video.mp4";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert("your file has downloaded!"); // or you know, something with better UX...
    })
    .catch(() => alert("oh no!"));
};

  


// import modules
//import { switchLink } from './bin/functions/video.js';
//import { checkAll } from './bin/functions/checks.js';

// get id from query attribute
//const queryStringLoad = window.location.search;
//const urlParamsLoad = new URLSearchParams(queryStringLoad);
//const id = urlParamsLoad.get('wsID');

//switchLink( id );                           // change video links to id
//setTimeout(() => { checkAll(); }, 1500);    // wait and init checks