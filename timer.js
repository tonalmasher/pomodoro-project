var workTime = 3;
var restTime = 2;
var displayTime = "25:00";

var timer = 0;
var time;


function twinTimers( workTime, restTime ) {

  var seconds = function(input){
    return input * 60;
  };

  var metro = setInterval( countDown, 1000);

  timer === 0  ? time = seconds(workTime) : time = seconds(restTime);

  function countDown() {

      if (time >= 1) {
        time -= 1;
        printTime(time);

      } else {
        clearInterval(metro);
        // console.log("switch to timer: " + timer);
        twinTimers(workTime, restTime);
      }
  }

  timer === 0 ? timer = 1 : timer = 0;

}

function printTime(num) {

  var m = Math.floor(num/60);
  var s = num % 60;

  m < 10 ? m = "0"+m : m;
  s < 10 ? s = "0"+s : s;

  displayTime = m + ":" + s;
  console.log(displayTime);

}

// call the function with no way to turn off yet.
// twinTimers(workTime, restTime);

// To-Do


// Done
// find the current amount of time work/rest - pass in time and timer value
// count down the time
// switch the timer - do it again
// Convert remaining seconds into strings
