var recorder, audioContext;

function setup(){
    audioContext = new AudioContext();
    audioContext.sampleRate = 44100;

    navigator.mediaDevices.getUserMedia({'audio': true}).then(function(stream){
        var input = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(input);
    }).catch(function(err){ console.log(err) });
}

function startRecording(button){
    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
}

function stopRecording(button){
    recorder && recorder.stop();
    button.disabled = true;
    button.previousElementSibling.disabled = false;

    sendWAVToServer();
    recorder.clear();
}

function sendWAVToServer(){
    recorder && recorder.exportWAV(function(blob){
        var reader = new FileReader();
        reader.addEventListener('loadend', function(){
            // Acquire data
            var username = $('#username').val();
            var wav = reader.result;
            var data = {username: username, wav: wav};

            // Send data to server 
            $.ajax({
                type: "POST",
                url: "/",
                data: data,
                success: function(resp){ 
                    alert('Success!'); 
                    console.log(resp);
                },
            });
        });
        reader.readAsArrayBuffer(blob);
    });
}

window.onload = setup;
