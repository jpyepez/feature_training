
const createVideo = parent => {

    const video = document.getElementById(parent);
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => video.src = video.srcObject = stream)
        .catch(err => console.error(err));
    }
}

export default createVideo;