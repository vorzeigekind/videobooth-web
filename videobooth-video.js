const queryStringLoad = window.location.search;
const urlParamsLoad = new URLSearchParams(queryStringLoad);
const wsIDLoad = urlParamsLoad.get('wsID');

var stringErrorQ = document.getElementById("error-q");
var stringErrorT = document.getElementById("error-t");

var stringVid = document.getElementById("video-player");
var stringBut = document.getElementById("button-download");
var stringBut11 = document.getElementById("button-download-1zu1");

var httpVid = new XMLHttpRequest();
httpVid.open('HEAD', 'https://videoboothfiles.blob.core.windows.net/videos/1zu1' + wsIDLoad + '.mp4?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D', false);
httpVid.send();
if (httpVid.status === 200) {
    console.log('VIDEO EXITS!');
    stringVid.innerHTML = stringVid.innerHTML.replace('http://videoboothfiles.blob', 'https://videoboothfiles.blob.core.windows.net/videos/1zu1' + wsIDLoad + '.mp4?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D');
    stringBut.innerHTML = stringBut.innerHTML.replace('http://videoboothfiles.blob', 'https://videoboothfiles.blob.core.windows.net/videos/' + wsIDLoad + '.mp4?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D');
    stringBut11.innerHTML = stringBut11.innerHTML.replace('http://videoboothfiles.blob', 'https://videoboothfiles.blob.core.windows.net/videos/1zu1' + wsIDLoad + '.mp4?sp=r&st=2023-08-28T11:54:11Z&se=2023-09-29T19:54:11Z&spr=https&sv=2022-11-02&sr=c&sig=FTXGDQ08lHFWLn1gFG1D2wJILqHmQ3V7YnCcf32ABac%3D');
    stringVid.style.opacity = "1";
    stringBut.style.opacity = "1";
    stringBut11.style.opacity = "1";
} else {
    console.log('VIDEO DOESNT EXITS!');
    stringErrorQ.style.opacity = "1";
    stringErrorT.style.opacity = "1";
    setTimeout(() => {
        location.reload();
    }, 5000);
}