var myMicStream = document.getElementById("myMic"); // make it a global variable

function getMic() {
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getMedia(
      { video: false, audio: true },
  
      function (stream) {
        myMicStream.srcObject = stream;
        myMicStream.play();
      },
  
      function (error) {
        alert("mic not working");
      }
    );
  }