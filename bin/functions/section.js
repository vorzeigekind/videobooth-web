// SECTION SWITCHER

import { json as config } from '../config.js';  // import general settings

var currSection = null;

function goToSection( sectionToGo ){
    //console.log( 'Selected Section: ' + sectionToGo, config.sections );
    for ( const section in config.sections ) {
        //console.log( 'Selected Section: ' + sectionToGo, section, config.sections, Object.values(config.sections)[section] );
        if ( Object.values(config.sections)[section] == sectionToGo ){
            document.querySelector( '.section-' + Object.values(config.sections)[section] ).classList.add( 'section-select' );
            currSection = parseInt(Object.keys(config.sections)[section]);
            //console.log( currSection );
        } else {
            console.log( 'REMOVING ==> section-select from .section-' + Object.values(config.sections)[section] );
            document.querySelector( '.section-' + Object.values(config.sections)[section] ).classList.remove( 'section-select' );
        }
    }
}

function goBack(){
    if ( currSection > 0 ) {
        var goTo = currSection - 1;
        //console.log( 'back ' + config.sections[goTo] );
        goToSection( config.sections[goTo] );
    }
}

function goForward(){
    if ( currSection < 4 ) {
        var goTo = currSection + 1;
        //console.log( 'forward ' + config.sections[goTo] );
        goToSection( config.sections[goTo] );
    }
}

function setupSwitcher(){
    for ( const section in config.sections ) {
        console.log( 'ADDING ==> section-select from .section-' + Object.values(config.sections)[section] + ' to #section-' + Object.values(config.sections)[section] );
        document.querySelector( '#section-' + Object.values(config.sections)[section] ).classList.add( 'section-' + Object.values(config.sections)[section] );
    }
}

export { goToSection, goBack, goForward, setupSwitcher };