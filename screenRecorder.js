
let recordedChunks = [];
let mediaRecorder;
const options = {mimeType: 'video/mp4'};

let recordedVideo;

const screenRecording = async ()=>{

    try {
        if(!stream){
            console.log('No video stream available');
            return;
        }

        if(!captureStream) {
            console.log('No video stream available');
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            if(captureStream.active === true){
                console.log("Video stream now available!");
            }
        }
        
        mediaRecorder = new MediaRecorder(captureStream, options);
        console.log('Media Recorder instantiated : ', mediaRecorder)

        mediaRecorder.ondataavailable = handleDataAvailable;

        mediaRecorder.onstop = handleStop;
        
    } catch (error) {
        console.log('Error in recording :', error);
    }

}

const handleDataAvailable = async (event) => {
    console.log("data-available");
    console.log(event.data);
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log(recordedChunks);
    } else {
        console.log("No data available");
    }
}

const handleStop = async () => {

    console.log("data available after MediaRecorder.stop() called.");

    const clipName = prompt("Enter a name for your video clip");

    const clipContainer = document.createElement("article");
    const clipLabel = document.createElement("p");
    recordedVideo = document.createElement("video");
    const deleteButton = document.createElement("button");
    const mainContainer = document.querySelector("body");

    console.dir(recordedVideo);

    deleteButton.textContent = "Delete";
    clipLabel.innerHTML = `<strong>${clipName}</strong> recorded on ${new Date().toLocaleString()}`;

    clipContainer.appendChild(recordedVideo);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(deleteButton);
    mainContainer.appendChild(clipContainer);

    recordedVideo.controls = true;

    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    recordedChunks = [];
    mediaRecorder = null;

    const videoURL = URL.createObjectURL(blob);
    recordedVideo.src = videoURL;

    console.log("recorder stopped");

    deleteButton.onclick = (e) => {
        const evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    };

}

const playRecording = (e) => {
    if(!recordedVideo){
        console.log('No video to play! Video not recorded yet!');
        return;
    }
    document.querySelector('#start-record').style.backgroundColor ='';
    recordedVideo.play();
}

document.querySelector('#start-record').addEventListener('click', async () => {
    if(mediaRecorder){
        console.log('Already recording');
        return;
    }
    await screenRecording();
    if(mediaRecorder){
        mediaRecorder.start(1000);
        console.log('Recording started : ', mediaRecorder);
        document.querySelector('#start-record').style.backgroundColor = 'green';
    }
})

document.querySelector('#stop-record').addEventListener('click', async () => {
    if(mediaRecorder){
        mediaRecorder.stop();
        console.log('Recording stopped : ', mediaRecorder);
        document.querySelector('#start-record').style.backgroundColor ='';
    }
})

document.querySelector('#pause-record').addEventListener('click', async () => {
    if(mediaRecorder){
        mediaRecorder.pause();
        console.log('Recording paused : ', mediaRecorder);
        document.querySelector('#pause-record').style.backgroundColor ='green';
    }
})

document.querySelector('#resume-record').addEventListener('click', async () => {
    if(mediaRecorder){
        mediaRecorder.resume();
        console.log('Recording resumed : ', mediaRecorder);
        document.querySelector('#pause-record').style.backgroundColor ='';
    }
})

document.querySelector('#play-record').addEventListener('click', async (e) => {
    playRecording(e);
})
