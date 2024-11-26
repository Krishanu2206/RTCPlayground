let stream = null;
const constraints = {
    // audio : false,
    'audio' : {'echoCancellation' : true, 'noiseReduction' : true},
    'video' : {
        facingMode: 'user'
    }
}

const getMicAndCamera = async (e) => {
    try {

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if(stream.active === true){
            const myVideo = document.querySelector('#my-video');
            myVideo.srcObject = stream;
            myVideo.onloadedmetadata = () => {
                myVideo.play();
            }
        }
        console.log('User media acquired:', stream);
        console.log("Printing the various tracks : ");
        console.log('Tracks : ', stream.getTracks());
        console.log("Printing the audio tracks : ", stream.getAudioTracks());
        console.log("Printing the video tracks : ", stream.getVideoTracks());

    } catch (error) {
        console.log('Error getting user media:', error);
    }
}

document.querySelector('#share').addEventListener('click', async (e) => {
    try {
        await getMicAndCamera(e);
    } catch (error) {
        console.log('Error getting media :', error);
    } 
})

const leaveMeeting = async () => {
    try {
        let allMediaStreamTracks = stream.getTracks();
        allMediaStreamTracks.forEach((track) => {track.stop()});
    } catch (error) {
        console.log('Error leaving meeting :', error);
    }
}

const stopVideo = async () => {
    try {
        let videoMediaStreamTrack = stream.getVideoTracks();
        videoMediaStreamTrack.forEach((track) => {track.enabled = false});
    } catch (error) {
        console.log('Error stopping video :', error);
    }
}

const showVideo = async () => {
    try {
        let videoMediaStreamTrack = stream.getVideoTracks();
        videoMediaStreamTrack.forEach((track) => {track.enabled = true});
    } catch (error) {
        console.log('Error showing video :', error);
    }
}

const muteAudio = async () => {
    try {
        let audioMediaStreamTrack = stream.getAudioTracks()
        audioMediaStreamTrack.forEach((track) => {track.enabled = false}); 
    } catch (error) {
        console.log('Error muting audio :', error);
    }
}

const unmuteAudio = async () => {
    try {
        let audioMediaStreamTrack = stream.getAudioTracks();
        audioMediaStreamTrack.forEach((track)=> {track.enabled = true});
    } catch (error) {
        console.log('Error unmuting audio :', error);
    }
}

document.querySelector('#leave-meeting').addEventListener('click', async (e) => {
    try {
        await leaveMeeting(e);
    } catch (error) {
        console.log('Error muting audio :', error);
    }
})

document.querySelector('#stop-video').addEventListener('click', async (e) => {
    try {
        await stopVideo(e);
    } catch (error) {
        console.log('Error stopping video :', error);
    }
})

document.querySelector('#show-video').addEventListener('click', async (e) => {
    try {
        await showVideo(e);
    } catch (error) {
        console.log('Error stopping video :', error);
    }
})

document.querySelector('#mute-audio').addEventListener('click', async (e) => {
    try {
        await muteAudio(e);
    } catch (error) {
        console.log('Error muting audio :', error);
    }
})

document.querySelector('#unmute-audio').addEventListener('click', async (e) => {
    try {
        await unmuteAudio(e);
    } catch (error) {
        console.log('Error unmuting audio :', error);
    }
})

if (stream){
    stream.getVideoTracks()[0].onmute = (event) => {
    console.log('Video muted due to a issue : ', event.track.kind);
    }

    stream.getVideoTracks()[0].onunmute = (event) => {
        console.log('Video unmuted as the issue was resolved : ', event.track.kind);
    }
}




