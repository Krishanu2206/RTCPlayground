
let audioInput = document.getElementById('audio-input');
let audioOutput = document.getElementById('audio-output');
let videoInput = document.getElementById('video-input');

console.dir(audioInput);

const settleVideoAfterChanges = async () => {
    const myVideo = document.querySelector('#my-video');
    myVideo.srcObject = stream;
    myVideo.onloadedmetadata = () => {
        myVideo.play();
    }
}

async function displayMediaDevices() {

    try{

        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log('Devices:', devices);
        console.log(devices.find(device => device.kind === 'videoinput'));
        console.log(devices.find(device => device.kind === 'audioinput'));
        console.log(devices.find(device => device.kind === 'audiooutput'));

        const audioInputDevices = devices.filter((device) => device.kind === 'audioinput');
        const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput');
        const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');

        audioInputDevices.forEach((audioInputDevice) => {
            const option = document.createElement('option');
            option.value = audioInputDevice.deviceId;
            option.textContent = audioInputDevice.label;
            audioInput.appendChild(option);
        });

        audioOutputDevices.forEach((audioOutputDevice) => {
            const option = document.createElement('option');
            option.value = audioOutputDevice.deviceId;
            option.textContent = audioOutputDevice.label;
            audioOutput.appendChild(option);
        });

        videoInputDevices.forEach((videoInputDevice) => {
            const option = document.createElement('option');
            option.value = videoInputDevice.deviceId;
            option.textContent = videoInputDevice.label;
            videoInput.appendChild(option);
        });

    }catch(error){
        console.log('Failed to display media devices', error);
    }
    
}

const handleAudioInputChange = async (event) => {
    if(!stream){
        console.log('No stream available');
        return;
    }
    const constraint = {
        audio: {
            deviceId: {exact : event.target.value},
            'echoCancellation' : true,
            'noiseReduction' : true
        },
        video: {
            facingMode: 'user'
        }
    }
    try {
        if(stream.getAudioTracks()[0].enabled === false){
            alert('Please enable audio before changing audio input');
            return;
        }
        stream = await navigator.mediaDevices.getUserMedia(constraint);
        if(stream.active === true){
            console.log('After audio input change stream :', stream);
            settleVideoAfterChanges();
        }
        console.log('Printing the audio tracks after audio input changes : ', stream.getTracks());
    } catch (error) {
        console.log('Failed to apply audio constraints', error);
    }
    
}

const handleAudioOutputChange = async (event) => {
    if(!stream){
        console.log('No stream available');
        return;
    }
    try {
        if(stream.getAudioTracks()[0].enabled === false){
            alert('Please enable audio before changing audio input');
            return;
        }
        await document.querySelector('#my-video').setSinkId(event.target.value); //sets the output audio device
    } catch (error) {
        console.log('Failed to apply audio constraints', error);
    }
    
}

const handleVideoInputChange = async (event) => {
    if(!stream){
        console.log('No stream available');
        return;
    }
    const constraint = {
        audio : {
            'echoCancellation' : true,
            'noiseReduction' : true
        },
        video: {
            deviceId: {exact : event.target.value},
            facingMode: 'user'
        }
    }
    try {
        if(stream.getVideoTracks()[0].enabled === false){
            alert('Please enable video before changing video input');
            return;
        }
        stream = await navigator.mediaDevices.getUserMedia(constraint);
        if(stream.active === true){
            settleVideoAfterChanges();
        }
    } catch (error) {
        console.log('Failed to apply video constraints', error);
    }
    
}

displayMediaDevices();

audioInput.onchange = async (event) => handleAudioInputChange(event);
audioOutput.onchange = async (event) => handleAudioOutputChange(event);
videoInput.onchange = async (event) => handleVideoInputChange(event);


