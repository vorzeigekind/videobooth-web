// SECTION SWITCHER

// import modules
import { json as config } from '../config.js';

// adding vars to use in functions
var currSection = null;

// change section
function goToSection( sectionToGo ){
    console.log( 'WEB APP => change section to section ' + sectionToGo );

    for ( const section in config.sections ) {
        if ( Object.values(config.sections)[section] == sectionToGo ){
            document.querySelector( '.section-' + Object.values(config.sections)[section] ).classList.add( 'section-select' );
            currSection = parseInt(Object.keys(config.sections)[section]);
        } else {
            console.log( 'REMOVING ==> section-select from .section-' + Object.values(config.sections)[section] );
            document.querySelector( '.section-' + Object.values(config.sections)[section] ).classList.remove( 'section-select' );
        }
    }
}

function goToLanding(){
    window.open(config.landing, "_self");
}

// go back 1 section
function goBack(){
    if ( currSection > 0 ) {
        console.log( 'WEB APP => back 1 section' );

        var goTo = currSection - 1;
        goToSection( config.sections[goTo] );
    }
}

// go forward 1 section
function goForward(){
    if ( currSection < 4 ) {
        console.log( 'WEB APP => forward 1 section' );

        var goTo = currSection + 1;
        goToSection( config.sections[goTo] );
    }
}

// 
function setupSwitcher(){
    console.log( 'WEB APP => initialising sections' );

    for ( const section in config.sections ) {
        document.querySelector( '#section-' + Object.values(config.sections)[section] ).classList.add( 'section-' + Object.values(config.sections)[section] );
    }
}

// export modules
export { goToSection, goToLanding, goBack, goForward, setupSwitcher };