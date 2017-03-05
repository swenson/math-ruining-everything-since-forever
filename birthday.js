var birthdays = [];
var daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthDay(x) {
    x++;
    for (var m = 0; m < daysInMonth.length; m++) {
        if (x > daysInMonth[m]) {
            x -= daysInMonth[m];
        } else {
            return months[m] + " " + x;
        }
    }
}

var collision = -1;

function clearBirthday(name, counterName, probName) {
    var elem = document.getElementById(name);
    elem.innerHTML = "";
    console.log(elem);
    birthdays = [];

    var counter  = document.getElementById(counterName);
    counter.innerHTML = "0";

    var probDiv = document.getElementById(probName);
    probDiv.innerHTML = "0%";

    collision = -1;
}

function birthdayNext(name, counterName, probName) {
    if (collision >= 0) {
        return;
    }
    var day = Math.round(Math.random() * 364.0)|0;
    for (var i = 0; i < birthdays.length; i++) {
        if (birthdays[i] == day) {
            collision = i;
            break;
        }
    }
    birthdays.push(day);
    // birthdays.sort(function(a, b) { return a - b; });
    var text = "";
    for (var i = 0; i < birthdays.length; i++) {
        var x = birthdays[i];
        if (i > 0) {
            text += ", ";
        }
        if (collision >= 0 && ((i == collision) || (i == birthdays.length - 1))) {
            text += "<strong>" + monthDay(x) + "</strong>";
        } else {
            text += monthDay(x);
        }
    }
    var elem = document.getElementById(name);
    elem.innerHTML = text;

    var counter  = document.getElementById(counterName);
    counter.innerHTML = "" + birthdays.length;

    var prob = 1.0;
    for (var i = 0; i < birthdays.length - 1; i++) {
        prob *= 1.0 - (i+1) / 365.0;
    }

    var probDiv = document.getElementById(probName);
    probDiv.innerHTML = "" + (100 * (1 - prob)).toFixed(2) + "%";
}
