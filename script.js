$(document).ready(function (){
  var workTime = 25;
  var restTime = 5;
  var timer = 0;
  var time, currentTime = time;
  var armed = true;
  var alarmTone = document.getElementById("alarmTone");

// actions to change workTime and restTime

  $('#workInc').click(function () {
    workTime += 1;
    $('#workTime').html(workTime);
    $('#timer').html(printTime(workTime*60));
  });

  $('#workDec').click(function () {
    if ( workTime > 1 ){ workTime -= 1;};
    $('#workTime').html(workTime);
    $('#timer').html(printTime(workTime*60));
  });

  $('#restInc').click(function () {
    restTime += 1;
    $('#restTime').html(restTime);
  });

  $('#restDec').click(function () {
    if ( restTime > 1){ restTime += -1; };
    $('#restTime').html(restTime);
  });
  
// actions for timer start/pause/reset/stop
  
  $('#play').click( function () {
    if (armed) {
      $("#timerParameters, footer").fadeOut("slow");
      twinTimers();
      countDown();
    }
    armed = false;
  });
  
  $('#pause').click( function () {
    $("#timerParameters, footer").fadeIn("fast");
    refreshClock();
    time = 0;
    timer === 0 ?  $('#timerTitle').html("Work") : $('#timerTitle').html("Rest");
  });
  
  $('#reset').click( function() {
    $("#timerParameters, footer").fadeIn("fast");
    resetClock();
    currentTime = time;
  });
  
  $('#stop').click( function () {
    $("#timerParameters, footer").fadeIn("fast");
    refreshClock();  
    timer = 0;
    currentTime = time;
    $('#timer').html(printTime(workTime*60));
  });

// actions for clock behavior and UI

  function twinTimers() {
    
    var seconds = 60;
    
    if ( currentTime != time ) {
      time = currentTime;
    } else {
      timer === 0 ? time = seconds *= workTime : time = seconds *= restTime;
    }

    metro = setInterval( countDown, 1000);

  }

  function countDown() {
          
      if (time >= 1) {
        time -= 1;
        currentTime = time;
        timer === 0 ?  $('#timerTitle').html("Work") : $('#timerTitle').html("Rest");
        printTime(time);
      } else {
        playAudio();        
        timer === 0 ? timer = 1 : timer = 0;
        clearInterval(metro);
        twinTimers();
      }
      
      // add some color
      if (time > 30 ) {
        $('#timer').removeClass('overlayRed');
        $('#timer').addClass('overlayGreen');
      } else if ( timer <= 30 && time >= 10 ) {
        $('#timer').removeClass('overlayGreen');
        $('#timer').addClass('overlayYellow');
      } else {
        $('#timer').removeClass('overlayYellow');
        $('#timer').addClass('overlayRed');
      }
  }
  
  function printTime(num) { 
    var m = Math.floor(num/60);
    var s = num % 60;
    m < 10 ? m = "0"+m : m;
    s < 10 ? s = "0"+s : s;
    displayTime = m + ":" + s;
    $('#timer').html(displayTime);
  }
  
  function refreshClock () {
    
    clearInterval(metro);
    $('#timer').removeClass();
    $('#timer').addClass('digits');
    armed = true;
  }
  
  function resetClock() {

    clearInterval(metro);
    $('#timer').removeClass();
    $('#timer').addClass('digits');
    armed = true;
    timer = 0;
    restTime = 5;
    $('#restTime').html(restTime);
    workTime = 25;
    $('#workTime').html(workTime);
    $('#timer').html(printTime(workTime*60));  
  }
  
  function playAudio () {
    alarmTone.play();
  }
});
