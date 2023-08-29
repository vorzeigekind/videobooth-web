// SETTINGS
import { json as config } from './config.js';  // import general settings
import { json as customer } from './customer.js';  // import customer settings > scenes, languages, thumbnails

// FUNCTIONS
import { changeVis } from './bin/functions/visibility.js'; // import visibility function
import { indexify } from './bin/functions/indexer.js'; // import JSON indexer function
//import { ws } from './bin/functions/websocket.js'; // import websocket functions
import { buttonsLanguage } from './bin/functions/language.js'; // import language button creation function

buttonsLanguage( customer );


console.log( config.blob );
console.log( customer.languages );