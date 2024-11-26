const displayMediaOptions = {
    video : {
        displaySurface : 'browser',
    },
    audio : {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
        suppressLocalAudioPlayback : false,
    },
    preferCurrentTab: false,
    selfBrowserSurface: "exclude",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
}

let captureStream = null;

const startCapture = async () => {
    
    if(!stream){
        console.log('No video stream available');
        return;
    }

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        console.log('Display media acquired:', captureStream);
        if(captureStream.active === true){
            const sharingvideo = document.querySelector('#other-video');
            sharingvideo.srcObject = captureStream;
            sharingvideo.onloadedmetadata = () => {
                sharingvideo.play();
            }
        }
        console.log("Printing the various tracks : ");
        console.log('Tracks : ', captureStream.getTracks());
    } catch (error) {
        console.log('Error getting display media:', error);
    }
}

document.querySelector('#share-screen').addEventListener('click', async (e) => {
    try {
        await startCapture(e);
    } catch (error) {
        console.log('Error starting capture :', error);
    }
})