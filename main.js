// INITIATE WEB APP

// import modules
import { switchLink } from './bin/functions/video.js';
import { checkAll } from './bin/functions/checks.js';

// get id from query attribute
const queryStringLoad = window.location.search;
const urlParamsLoad = new URLSearchParams(queryStringLoad);
const id = urlParamsLoad.get('wsID');

switchLink( id );                           // change video links to id
setTimeout(() => { checkAll(); }, 1500);    // wait and init checks