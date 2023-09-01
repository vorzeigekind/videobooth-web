// WEB SOCKET

// import modules
import { json as config } from '../config.js';
import { indexify } from './indexer.js';
import { setupActions } from './actions.js';
import { goToSection } from './section.js';

// setting vars for functions
const server = 'wss://' + config.websocket.server + ':' + config.websocket.port;

// start websocket
export function startSocket( webId ){
    console.log( 'WEB APP => initialising connection ✨' );

    let ws = new WebSocket( server );
    var verified = false;

    setupActions( ws );

    ws.addEventListener('open', (event) => { 
        console.log('WEB APP => starting connection 🚀');
        ws.send('pong');
        ws.send(indexify('usercon'));
    });

    ws.addEventListener('message', (message) => { 
        if (message && message.data) {
            if (message.data == 'ping') { 
                console.log('WEB APP => received ping 🏓 returning pong ');
                ws.send('pong');
                return;
            }
            let data = JSON.parse(message.data);
            if (data) {
                if (verified == true && 'disconnect' in data) {
                    console.log('WEB APP => ERROR => other client > terminating this instance ❌');
                    goToSection( 'error-disconnected' );
                    ws.close();
                }
                if (verified == false && 'wsIDTD' in data) {
                    const touchId = data['wsIDTD'];
                    console.log('WEB APP => client token = ' + webId);
                    console.log('WEB APP => received token = ' + touchId);
                    if (webId == touchId) {
                        console.log('WEB APP => token accepted > connection established 🎉');
                        goToSection( 'language' );
                        ws.send(indexify('verifieduser'));
                        console.log('WEB APP => terminating other clients 🔫');
                        setTimeout(() => { ws.send(indexify('disconnect')); }, 100);
                        verified = true;
                    } else if (webId != touchId) { 
                        console.log('WEB APP => ERROR => token denied 🚧');
                        goToSection( 'error-id' );
                        ws.close();
                    }
                }
            }
        }
    });

    ws.addEventListener('error', (error) => {
        goToSection( 'error-connection' );
        console.log('WEB APP => ERROR => ', error);
    });

    ws.addEventListener('close', (event) => {
        console.log('WEB APP => closing connection 🫡');
    });
};