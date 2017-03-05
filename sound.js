var hz = 48000;
var bits = 16;

var header = "WAVE";
header += "fmt ";
header += int32(16); // length of format chunk
header += int16(1); // PCM format
header += int16(1); // 1 channel
header += int32(hz); // samples per second
header += int32(hz * bits / 8); // bytes per second
header += int16(2); // block align
header += int16(bits); // bits per sample

function int8(x) {
  return String.fromCharCode(x);
}

function int16(x) {
  return int8(x & 0xff) + int8(x >> 8);
}

function int32(x) {
  return int16(x & 0xffff) + int16(x >> 16);
}


function makeAudioFile(samples) {
  var pcm = new Array(samples.length * 2);
  var max = (1 << (bits - 1)) - 1;
  for (var i = 0; i < samples.length * 2; i += 2) {
    var s = Math.floor(samples[i / 2] * max);
    pcm[i] = String.fromCharCode(s & 0xff);
    pcm[i + 1] = String.fromCharCode((s >> 8) & 0xff);
  }
  var data = header + "data" + int32(pcm.length) + pcm.join('');
  var file = "RIFF" + int32(data.length) + data;
  return "data:audio/wav;base64," + btoa(file);
}

function wave(duration, frequency, height) {
  var pcm = [];

  for (var i = 0; i < duration * hz; i++) {
    var t = i / hz;
    pcm[i] = height * Math.sin(2 * Math.PI * t * frequency);
  }
  return pcm;
}

function triangleWave(duration, frequency, height) {
  var pcm = [];

  for (var i = 0; i < duration * hz; i++) {
    var t = i / hz;
    pcm[i] = height * (t * frequency % 2.0 - 1.0);
  }
  return pcm;
}

function squareWave(duration, frequency, height) {
  var pcm = [];

  for (var i = 0; i < duration * hz; i++) {
    var t = i / hz;
    t = t * frequency % 2.0 - 1.0;
    var s = 1.0;
    if (t < 0) {
      s = -1.0;
    }
    pcm[i] = height * s;
  }
  return pcm;
}

function playSeq(seq) {
  for (let i = 0; i < seq.length; i++) {
    let wait = seq[i][0] * 1000.0;
    let data = seq[i][1];
    let snd = new Audio(makeAudioFile(data));
    setTimeout(function() {
      snd.play();
    }, wait);
  }
}

var beepSeq = [
  [0, triangleWave(0.1, 2400, 0.05)],
  [0.1, squareWave(0.1, 1700, 0.05)],
  [0.2, triangleWave(0.1, 3500, 0.05)],
  [0.3, squareWave(0.125, 1200, 0.05)]
];

var beep = function() {
    playSeq(beepSeq);
};

var pewSeq = [
  [0, squareWave(0.1, 3100, 0.05)],
];

var pew = function() {
    playSeq(pewSeq);
};

var startSeq = [
  [0, triangleWave(0.1, 1600, 0.1)],
  [0.2, triangleWave(0.1, 2400, 0.1)],
  [0.4, triangleWave(0.1, 3200, 0.1)],
  [0.6, triangleWave(0.1, 4000, 0.1)],
  [0.8, triangleWave(0.1, 3600, 0.1)],
  [1.0, triangleWave(0.1, 3600, 0.1)]
];

var startSound = function() {
  playSeq(startSeq);
};

var loseSeq = [
  [0.45, squareWave(0.3, 400, 0.1)],
  [0.9, squareWave(0.3, 300, 0.1)],
  [1.35, squareWave(0.3, 200, 0.1)],
  [1.8, squareWave(0.6, 150, 0.1)]
];

var loseSound = function() {
  playSeq(loseSeq);
};
