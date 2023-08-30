// WEB SOCKET

import { json as config } from '../config.js';  // import general settings
import { indexify } from './indexer.js'; // import JSON indexer function
import { setupActions } from './actions.js'; // import actions function
import { setupSwitcher, goToSection } from './section.js'; // import section switcher function

const server = 'wss://' + config.websocket.server + ':' + config.websocket.port; // make server url from settings

export function startSocket( webId ){
    let ws = new WebSocket( server );
    var verified = false;

    setupActions( ws );
    setupSwitcher();

    ws.addEventListener('open', (event) => { 
        console.log('WS => starting connection 🚀');
        ws.send('pong');
        ws.send(indexify('usercon'));
    });

    ws.addEventListener('message', (message) => { 
        if (message && message.data) {
            if (message.data == 'ping') { 
                console.log('WS => received ping 🏓 returning pong ');
                ws.send('pong');
                return;
            }
            let data = JSON.parse(message.data);
            if (data) {
                if (verified == true && 'disconnect' in data) {
                    console.log('ERROR => other client > terminating this instance ❌');
                    ws.close();
                }
                if (verified == false && 'wsIDTD' in data) {
                    const touchId = data['wsIDTD'];
                    console.log('WS => client token = ' + webId);
                    console.log('WS => received token = ' + touchId);
                    if (webId == touchId) {
                        console.log('WS => token accepted > connection established 🎉');
                        goToSection( 'language' );
                        ws.send(indexify('verifieduser'));
                        console.log('WS => terminating other clients 🔫');
                        setTimeout(() => { ws.send(indexify('disconnect')); }, 100);
                        verified = true;
                    } else if (webId != touchId) { 
                        console.log('ERROR => token denied 🚧');
                        goToSection( 'error-id' );
                        ws.close();
                    }
                }
            }
        }
    });

    ws.addEventListener('error', (error) => {
        goToSection( 'error-connection' );
        console.log('ERROR => ', error);
    });

    ws.addEventListener('close', (event) => {
        console.log('WS => closing connection');
    });
};