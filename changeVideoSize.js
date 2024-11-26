const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log('Supported constraints:', supportedConstraints);

const changeVideoSize = ()=>{
    if(!stream){
        console.log('No video stream available');
        return;
    }
    
    stream.getVideoTracks().forEach(async(track)=>{
        console.log(track.kind , track.getCapabilities());
        const capabilities = track.getCapabilities();
        //change resolutions
        try {
            const vidHeight = document.getElementById('vid-height') 
            const vidWidth = document.getElementById('vid-width')
        
            //check whether its possible
            if(vidHeight.value > capabilities.height.max || vidHeight.value < capabilities.height.min){
                console.log('Not possible to change video size');
                vidWidth.value = 1280;
            }
            if(vidWidth.value > capabilities.width.max || vidWidth.value < capabilities.width.min){
                console.log('Not possible to change video size');
                vidHeight.value = 720;
            }

            const vconstraints = {
                width : {exact : vidWidth.value},
                height : {exact : vidHeight.value}
            }
            
            await track.applyConstraints(vconstraints);

        } catch (error) {
            console.log('Error changing video size:', error);
        }
    })
}

document.querySelector('#change-size').addEventListener('click', changeVideoSize);