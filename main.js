// SETTINGS
import { json as config } from './bin/config.js';  // import general settings
import { json as customer } from './bin/customer.js';  // import customer settings > scenes, languages, thumbnails

// FUNCTIONS
import { changeVis } from './bin/functions/visibility.js'; // import visibility function
import { indexify } from './bin/functions/indexer.js'; // import JSON indexer function
//import { ws } from './bin/functions/websocket.js'; // import websocket functions
import { setupLanguages } from './bin/functions/language.js'; // import language button creation function
import { setupScenes } from './bin/functions/scene.js'; // import scene creation function

setupScenes(  );
setupLanguages(  );