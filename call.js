// PEER CONNECTIONS (HANDLING OPPONENTS)

//creating the signaling channel

const myVideo = document.querySelector('#my-video');
const othervideo = document.querySelector('#other-video');

let localStream;
let remoteStream;
let peerConnection;

const configuration = {'iceServers': [{'urls' : ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']}]}

// const signalingChannel = new SignalingChannel(stream.id);

// signalingChannel.addEventListener('message', async (message) => {
//     console.log('Received message from peer:', message);
// })

// signalingChannel.send("Hello")

//when a client makes a call
const makeCall = async()=>{
    localStream = stream;

    //peerConnection is all set with our STUN servers sent over 
    await createPeerConnection();
    
    //create offer
    try {
        console.log("creating offer!..");
        const offer = await peerConnection.createOffer();
        console.log("Offer in makeCall function : ", offer);    
    } catch (error) {
        console.log(error);
    }
    // signalingChannel.addEventListener('message', async message => {
    //     if (message.answer) {
    //         const remoteDesc = new RTCSessionDescription(message.answer);
    //         console.log("Remote Ddescription in makeCall function : ", remoteDesc);
    //         await peerConnection.setRemoteDescription(remoteDesc);
    //     }
    // });
    // const offer = await peerConnection.createOffer();
    // console.log("Offer in makeCall function : ", offer);
    // await peerConnection.setLocalDescription(offer);
    // signalingChannel.send({'offer': offer});
}

const createPeerConnection = ()=>{
    return new Promise((resolve, reject) => {
        //RTCPeerConnection is the thing that creates the connection between two peers
        peerConnection = new RTCPeerConnection(configuration);

        if(localStream){
            localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
        }

        console.log("Peer connection created : ", peerConnection);
        peerConnection.addEventListener('icecandidate', (event) => {
            console.log('Local ICE candidate found!:', event.candidate);
        })
        resolve();
    })   
};


// let myPeerConnection = new RTCPeerConnection(configuration);
// console.log("Peer connection created second : ", myPeerConnection);
// signalingChannel.addEventListener('message', async(message) => {
//     if (message.offer) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
//         const answer = await peerConnection.createAnswer();
//         console.log("Answer in peerConnection : ", answer);
//         await peerConnection.setLocalDescription(answer);
//         signalingChannel.send({'answer': answer});
//     }
// });

// // Listen for local ICE candidates on the local RTCPeerConnection
// myPeerConnection.addEventListener('icecandidate', (event) => {
//     console.log('Local ICE candidate:', event.candidate);
//     if (event.candidate) {
//         signalingChannel.send({'new-ice-candidate': event.candidate});
//     }
// });

// // Listen for remote ICE candidates and add them to the local RTCPeerConnection
// signalingChannel.addEventListener('message', async(message) => {
//     console.log('Received ICE candidate from peer:', message);
//     if (message.iceCandidate) {
//         try {
//             await peerConnection.addIceCandidate(message.iceCandidate);
//         } catch (e) {
//             console.error('Error adding received ice candidate', e);
//         }
//     }
// });

// //remote streaming

// if(stream){
//     stream.getTracks().forEach((track) => {
//         myPeerConnection.addTrack(track, stream);
//     })
// }

// const otherPersonVideo = document.querySelector('#other-video');

// myPeerConnection.addEventListener('track', async (event) => {
//     console.log('Received remote track:', event);
//     const [remoteStream] = event.streams;
//     remoteVideo.srcObject = remoteStream;
// });

document.querySelector('#call').addEventListener('click', makeCall);
