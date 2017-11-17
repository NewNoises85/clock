
var time = 0
var workflowState = [1500, 300]
var nextState = 0
var isRunning = false
var audio = new Audio('beeps.mp3');

var convertTime = function (seconds) {
    var minutes = Math.floor(seconds/60);
    seconds = (seconds - (minutes*60)).toString();
    if (seconds.length < 2) {
        seconds = "0" + seconds
    }
    minutes = minutes.toString()
    if (minutes.length < 2) {
        minutes = "0" + minutes
    }
    return minutes + ":" + seconds;
};

var renderTimer = function () {
  $(".timer").html(convertTime(time));
};


var startTimer = function () {
       intervalID = setInterval(function (){
                if (time === 0) {
                    $(".workStatus").css("color", "white");
                    $(".timer").css("color", "lightgrey");
                    stopTimer()
                    timerEnded()
                }
                else {
                    time = time - 1
                    if (time == 3) {
                      audio.play();
                      $(".workStatus").css("color", "red");
                      $(".timer").css("color", "red");
                    }
                    if (time == 2) {
                      $(".workStatus").css("color", "white");
                    }
                    if (time == 1) {
                      $(".workStatus").css("color", "red");
                    }
                }
                renderTimer()
            }, 1000)
            isRunning = true
};

var timerEnded = function () {
    if (nextState === 0) {
    time = workflowState[0]
    nextState = nextState + 1
    startTimer()
    $(".workStatus").html("Work")
  }
    else if (nextState === 1) {
    time = workflowState[nextState]
    nextState = nextState + 1
    startTimer()
    $(".workStatus").html("Break")
  }
    else if (nextState === 2) {
    nextState = 0
    time = workflowState[nextState]
    nextState = nextState + 1
    startTimer()
    $(".workStatus").html("Work")
  }

};

var stopTimer = function() {
    clearInterval(intervalID);
    isRunning = false
};

var setPauseButton = function() {
  $("#control").html("Pause").removeID("start").addID("pause")
};

var setStartButton = function() {
  $("#control").html("Start").removeID("pause").addID("start")
};

// default states
time = workflowState[0]
nextState = nextState + 1
renderTimer()
$(".workStatus").html("Work");


$("#control").on('click', function() {
  if (isRunning) {
    stopTimer()
    setStartButton()
  }
  else {
    startTimer()
    setPauseButton()
  }

});


$("#reset").on('click', function() {
  stopTimer()
  $(".workStatus").html("Work");
  $(".workStatus").css("color", "white");
  $(".timer").css("color", "lightgrey");
  time = workflowState[0]
  renderTimer()
  setStartButton()

});
