
function plot(data, name, fftname) {
    var canvas = document.getElementById(name);
    var screen = canvas.getContext('2d');
    var width = 1024;
    var height = 200;
    screen.clearRect(0, 0, width, height);
    screen.strokeStyle = '#0000ff';
    screen.strokeWidth = 1;

    for (var i = 0; i < Math.min(1024, data.length); i++) {
        screen.strokeRect(i, 100, 1, data[i] * 400);
    }
    var fftdata = new Array(1024);
    for (var i = 0; i < 1024; i++) {
        fftdata[i] = data[Math.round(hz / 1024 * i)];
    }
    var freq = fft(fftdata);
    canvas = document.getElementById(fftname);
    screen = canvas.getContext('2d');
    screen.clearRect(0, 0, width, height);
    screen.strokeStyle = '#ff0000';
    screen.strokeWidth = 1;
    for (var i = 0; i < Math.min(1024, freq.length/2); i++) {
        screen.strokeRect(i, 100, 1, -math.abs(freq[i]) * 7);
    }
}

function fft(x) {
    if (x.length == 1) {
        return x;
    } else {
        var y = new Array(x.length / 2);
        var z = new Array(x.length / 2);
        for (var i = 0; i < y.length; i++) {
            y[i] = x[i * 2];
            z[i] = x[i * 2 + 1];
        }
        y = fft(y);
        z = fft(z);
        x = y.concat(z);
        for (var k = 0; k < x.length/2; k++) {
            var t = x[k];
            var arg = math.multiply(math.exp(math.multiply(-2, math.pi, math.i, k, 1.0/x.length)), x[k + x.length/2]);
            x[k] =  math.add(t, arg);
            x[k + x.length/2] = math.subtract(t, arg);
        }
    }
    return x;
}

function fftdemo_drawbox(fro, to, boxwidth, boxheight, leftmargin, elem) {
    elem.beginPath();
    elem.moveTo(leftmargin, fro * boxheight);
    elem.lineTo(leftmargin + boxwidth * 2, to * boxheight);
    elem.stroke();
}

function fftdemo_draw(x, boxwidth, boxheight, leftmargin, elem) {
    if (x.length == 1) {
        // fftdemo_drawbox(x[0], x[0], boxwidth, boxheight, leftmargin, elem);
    } else {
        var y = new Array(x.length / 2);
        var z = new Array(x.length / 2);
        for (var i = 0; i < y.length; i++) {
            y[i] = x[i * 2];
            z[i] = x[i * 2 + 1];
        }
        fftdemo_draw(y, boxwidth, boxheight, leftmargin + 2 * boxwidth, elem);
        fftdemo_draw(z, boxwidth, boxheight, leftmargin + 2 * boxwidth, elem);
        for (var k = 0; k < x.length/2; k++) {
            fftdemo_drawbox(y[k], x[k], boxwidth, boxheight, leftmargin, elem);
            fftdemo_drawbox(z[k], x[k], boxwidth, boxheight, leftmargin, elem);
            fftdemo_drawbox(y[k], x[k+x.length/2], boxwidth, boxheight, leftmargin, elem);
            fftdemo_drawbox(z[k], x[k+x.length/2], boxwidth, boxheight, leftmargin, elem);
        }
    }
}

function fftdemo(name) {
    var n = 16;
    var canvas = document.getElementById(name);
    var screen = canvas.getContext('2d');
    screen.strokeStyle ='#ffffff';
    var width = 1024;
    var height = 400;
    screen.clearRect(0, 0, width, height);

    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i] = i;
    }
    fftdemo_draw(arr, width/10, height/16, 0, screen);
}

function fftone(name) {
    var n = 16;
    var canvas = document.getElementById(name);
    var screen = canvas.getContext('2d');
    screen.strokeStyle ='#ffffff';
    var width = 1024;
    var height = 400;
    screen.clearRect(0, 0, width, height);

    var x = new Array(n);
    for (var i = 0; i < n; i++) {
        x[i] = i;
    }
    var k = 0;
    var leftmargin = 0;
    var boxwidth = width/10;
    var boxheight = height/16;
    var elem = screen;
    fftdemo_drawbox(x[k], x[k], boxwidth, boxheight, leftmargin, elem);
    fftdemo_drawbox(x[k], x[k + x.length/2], boxwidth, boxheight, leftmargin, elem);
    fftdemo_drawbox(x[k+x.length/2], x[k], boxwidth, boxheight, leftmargin, elem);
    fftdemo_drawbox(x[k+x.length/2], x[k + x.length/2], boxwidth, boxheight, leftmargin, elem);
}
