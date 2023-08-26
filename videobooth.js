/*jshint esversion: 6 */

// WS ERROR types:
// no-token: no token was supplied in the link, can't connect to server
// invalid-token: an invalid token was supplied in the link, old or simply wrong
// no-connection: could not establish a connection (reason see console log)

// language: 0 = english, 1 = german
// scene: 0-6

// makes element visible or hidden
function changeVis(visibility, target) {
    var queryTarget = document.querySelector(target);
    if (target.includes('icon')) {
        if (visibility === 'visible') {
            queryTarget.classList.remove('hidden-icon');
            queryTarget.classList.add('visible-icon');
        } else if (visibility === 'hidden') {
            queryTarget.classList.remove('visible-icon');
            queryTarget.classList.add('hidden-icon');
        }
    } else if (visibility === 'visible') {
        queryTarget.classList.remove('hidden-prev', 'hidden-next');
        queryTarget.classList.add('visible-current');
    } else if (visibility === 'next') {
        queryTarget.classList.remove('hidden-prev', 'visible-current');
        queryTarget.classList.add('hidden-next');
    } else if (visibility === 'prev') {
        queryTarget.classList.remove('hidden-next', 'visible-current');
        queryTarget.classList.add('hidden-prev');
    } /* else {
        console.log('ERROR => cant change ' + target + ' to ' + visibility);
    } */
}

// gets randomised index and appends to attribute
function indexifyJSON(jsonAttribute) {
    var rIndex =  Math.floor(Math.random() * 10000);
    var obj = {};
    obj[jsonAttribute] = rIndex;
    var objJSON = JSON.stringify(obj);
    return(objJSON);
}

// change language
/* function changeLang(language) {
    // TODO
} */

// initialise ws client and connection
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const wsID = urlParams.get('wsID');

if (wsID == null) {
    console.log('ERROR => no token ⁉️');
    changeVis('visible', '#no-token');
} else {
    //let ws = new WebSocket('wss://videobooth-web-socket.azurewebsites.net:8080'); // microsoft azure
    //let ws = new WebSocket('wss://touch-websocket.onrender.com:443'); //niklas render account free
    let ws = new WebSocket('wss://videoboothwebsocket.onrender.com:443'); //  premium render account vorzeigekind
    var verified = false;
    
    // DEV button
    /* document.querySelector('#dev-button').onclick = function(){
            //console.log('INPUT => dev button');
            changeVis('visible', '#language');
            changeVis('next', '#mode');
            changeVis('next', '#singleplayer');
            changeVis('next', '#multiplayer');
            changeVis('next', '#record');
            changeVis('next', '#recording');
            changeVis('hidden', '#icon-english');
            changeVis('hidden', '#icon-german');
            changeVis('hidden', '#icon-singleplayer');
            changeVis('hidden', '#icon-multiplayer');
            ws.send(indexifyJSON('dev'));
    }; */

    // LANGUAGE > english
    document.querySelector('#button-english').onclick = function(){
        //console.log('INPUT => language = english');
        changeVis('visible', '#mode');
        changeVis('prev', '#language');
        changeVis('visible', '#icon-english');
        changeLang('englisch');
        ws.send(JSON.stringify({'language': 0}));
    };

    // LANGUAGE > german
    document.querySelector('#button-german').onclick = function(){
        //console.log('INPUT => language = german');
        changeVis('visible', '#mode');
        changeVis('prev', '#language');
        changeVis('visible', '#icon-german');
        changeLang('german');
        ws.send(JSON.stringify({"language": 1}));
    };

    // MODE > singleplayer
    document.querySelector('#button-singleplayer').onclick = function(){
        changeVis('visible', '#singleplayer');
        changeVis('prev', '#mode');
        changeVis('visible', '#icon-singleplayer');
    };

    // MODE > multiplayer
    document.querySelector('#button-multiplayer').onclick = function(){
        changeVis('visible', '#multiplayer');
        changeVis('prev', '#mode');
        changeVis('visible', '#icon-multiplayer');
    };

    // SCENE > 1
    document.querySelector('#thumb-1').onclick = function(){
        //console.log('INPUT => scene = 1');
        changeVis('visible', '#record');
        changeVis('prev', '#singleplayer');
        document.getElementById('record').style.backgroundImage = 'url(https://vorzeigekind.de/wp-content/uploads/2023/03/01_Strategie0014.png)';
        ws.send(JSON.stringify({'scene': 1}));
    };

    // SCENE > 2
    document.querySelector('#thumb-2').onclick = function(){
        //console.log('INPUT => scene = 2');
        changeVis('visible', '#record');
        changeVis('prev', '#singleplayer');
        document.getElementById('record').style.backgroundImage = 'url(https://vorzeigekind.de/wp-content/uploads/2023/03/01_Strategie0014.png)';
        ws.send(JSON.stringify({'scene': 2}));
    };

    // SCENE > 3
    document.querySelector('#thumb-3').onclick = function(){
        //console.log('INPUT => scene = 3');
        changeVis('visible', '#record');
        changeVis('prev', '#singleplayer');
        document.getElementById('record').style.backgroundImage = 'url(https://vorzeigekind.de/wp-content/uploads/2023/03/01_Strategie0014.png)';
        ws.send(JSON.stringify({'scene': 3}));
    };

    // SCENE > 4
    document.querySelector('#thumb-4').onclick = function(){
        //console.log('INPUT => scene = 4');
        changeVis('visible', '#record');
        changeVis('prev', '#singleplayer');
        document.getElementById('record').style.backgroundImage = 'url(https://vorzeigekind.de/wp-content/uploads/2023/03/01_Strategie0014.png)';
        ws.send(JSON.stringify({'scene': 4}));
    };

    // SCENE > 5
    document.querySelector('#thumb-5').onclick = function(){
        //console.log('INPUT => scene = 5');
        changeVis('visible', '#record');
        changeVis('prev', '#multiplayer');
        document.getElementById('record').style.backgroundImage = 'url(https://vorzeigekind.de/wp-content/uploads/2023/03/01_Strategie0014.png)';
        ws.send(JSON.stringify({'scene': 5}));
    };

    // SCENE > 6
    document.querySelector('#thumb-6').onclick = function(){
        //console.log('INPUT => scene = 6');
        changeVis('visible', '#record');
        changeVis('prev', '#multiplayer');
        document.getElementById('record').style.backgroundImage = 'url(https://vorzeigekind.de/wp-content/uploads/2023/03/01_Strategie0014.png)';
        ws.send(JSON.stringify({'scene': 6}));
    };

    // RECORD button
    document.querySelector('#button-record').onclick = function(){
        //console.log('INPUT => record button');
        changeVis('visible', '#recording');
        changeVis('prev', '#record');
        changeVis('hidden', '#icon-english');
        changeVis('hidden', '#icon-german');
        changeVis('hidden', '#icon-singleplayer');
        changeVis('hidden', '#icon-multiplayer');
        ws.send(indexifyJSON('record'));
    };

    // ICON-ENGLISH > click
    document.querySelector('#icon-english').onclick = function(){
        changeVis('visible', '#language');
        changeVis('next', '#mode');
        changeVis('next', '#singleplayer');
        changeVis('next', '#multiplayer');
        changeVis('next', '#record');
        changeVis('next', '#recording');
        changeVis('hidden', '#icon-english');
        changeVis('hidden', '#icon-singleplayer');
        changeVis('hidden', '#icon-multiplayer');
    };

    // ICON-GERMAN > click
    document.querySelector('#icon-german').onclick = function(){
        changeVis('visible', '#language');
        changeVis('next', '#mode');
        changeVis('next', '#singleplayer');
        changeVis('next', '#multiplayer');
        changeVis('next', '#record');
        changeVis('next', '#recording');
        changeVis('hidden', '#icon-german');
        changeVis('hidden', '#icon-singleplayer');
        changeVis('hidden', '#icon-multiplayer');
    };

    // ICON-SINGLEPLAYER > click
    document.querySelector('#icon-singleplayer').onclick = function(){
        changeVis('visible', '#mode');
        changeVis('next', '#singleplayer');
        changeVis('next', '#multiplayer');
        changeVis('next', '#record');
        changeVis('next', '#recording');
        changeVis('hidden', '#icon-singleplayer');
    };

    // ICON-MULTIPLAYER > click
    document.querySelector('#icon-multiplayer').onclick = function(){
        changeVis('visible', '#mode');
        changeVis('next', '#singleplayer');
        changeVis('next', '#multiplayer');
        changeVis('next', '#record');
        changeVis('next', '#recording');
        changeVis('hidden', '#icon-multiplayer');
    };


    // WS events
    ws.addEventListener('open', (event) => { 
        console.log('WS => starting connection 🚀');
        ws.send('pong');
        ws.send(indexifyJSON('usercon'));
    });

    ws.addEventListener('message', (message) => { 
        if (message && message.data) {
            if (message.data === 'ping') { 
                console.log('WS => received ping 🏓 returning pong ');
                ws.send('pong');
                return;
            }
            let data = JSON.parse(message.data);
            if (data) {
                if (verified === true && 'disconnect' in data) {
                    console.log('ERROR => other client > terminating this instance ❌');
                    ws.close();
                }
                if (verified === false && 'wsIDTD' in data) {
                    const touchID = data['wsIDTD'];
                    console.log('WS => client token = ' + wsID);
                    console.log('WS => received token = ' + touchID);
                    if (wsID === touchID) {
                        console.log('WS => token accepted > connection established 🎉');
                        changeVis('visible', '#language');
                        ws.send(indexifyJSON('verifieduser'));
                        console.log('WS => terminating other clients 🔫');
                        setTimeout(() => { ws.send(indexifyJSON('disconnect')); }, 100);
                        verified = true;
                    } else if (wsID !== touchID) { 
                        console.log('ERROR => token denied 🚧');
                        ws.close();
                    }
                }
            }
        }
    });

    ws.addEventListener('error', (error) => {
        console.log('ERROR => ', error);
        changeVis('visible', '#no-connection');
        changeVis('next', '#language');
        changeVis('next', '#mode');
        changeVis('next', '#singleplayer');
        changeVis('next', '#multiplayer');
        changeVis('next', '#record');
        changeVis('next', '#recording');
        changeVis('hidden', '#icon-english');
        changeVis('hidden', '#icon-german');
        changeVis('hidden', '#icon-singleplayer');
        changeVis('hidden', '#icon-multiplayer');
    }); 

    ws.addEventListener('close', (event) => {
        changeVis('visible', '#invalid-token');
        changeVis('next', '#language');
        changeVis('next', '#mode');
        changeVis('next', '#singleplayer');
        changeVis('next', '#multiplayer');
        changeVis('next', '#record');
        changeVis('next', '#recording');
        changeVis('hidden', '#icon-english');
        changeVis('hidden', '#icon-german');
        changeVis('hidden', '#icon-singleplayer');
        changeVis('hidden', '#icon-multiplayer');
    });
}