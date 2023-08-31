// INITIATE CHECKS

import { switchLink } from './video.js';
import { checkAll } from './bin/functions/checks.js';

const queryStringLoad = window.location.search;
const urlParamsLoad = new URLSearchParams(queryStringLoad);
const id = urlParamsLoad.get('wsID');

switchLink( id );
setTimeout(() => { checkAll(); }, 1500);