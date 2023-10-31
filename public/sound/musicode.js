//michael_abia_v2 2023
//javascript music instrument

var soundevice = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
var amplitude = 0.5;
var duration = 600;

var playnote = (pitch, callback) => {
    //4th ocatave only
    switch (pitch) {
        case "C":
            var frequency = 261.63;
            break;
        case "D":
            var frequency = 293.66;
            break;
        case "E":
            var frequency = 329.63;
            break;
        case "F":
            var frequency = 349.23;
            break;
        case "G":
            var frequency = 392.00;
            break;
        case "A":
            var frequency = 440.00;
            break;
        case "B":
            var frequency = 493.88;
            break;
    
        default:
            var frequency = 0;
            break;
    }

    var oscillator = soundevice.createOscillator();
    var gainNode = soundevice.createGain();

    gainNode.connect(soundevice.destination);
    gainNode.gain.value = amplitude;    
    oscillator.connect(gainNode);
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    if (callback){
        oscillator.onended = callback;
    }
    
    oscillator.start(soundevice.currentTime);
    oscillator.stop(soundevice.currentTime + ((duration || 500) / 1000));
};

//example: call playnote("C");