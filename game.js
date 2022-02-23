


let userClickedPattern = []

let gamePattern = [] ;

let buttonColors = ["red","blue","green","yellow"];

let level = 0 ;

let started = false ;


$("body").keypress(function(){
    if(!started){
        $("h1").text("Level 0");
        nextSequence();
        started = true;
        
    }
});
        
    

    

$(".btn").click(function(event){
    var userChosenColor =event.target.id ;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length -1)
    playSounds(userChosenColor);
    animatePress(userChosenColor)
})

function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    playSounds(randomChosenColour);
    $("h1").text("Level " +level);
    level+=1;
    
}


function playSounds(name){
    $("#" + name).fadeOut(100).fadeIn(100);
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 150);
}





function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
               nextSequence();
            }, 1000);
            userClickedPattern = [] ;
        }
        
    }
    else{
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
         }, 200);
         $('h1').text("Game Over, Press Any Key to Restart")
         var wrong_audio = new Audio("sounds/wrong.mp3");
         wrong_audio.play();
         startOver()
    }
}

function startOver(){
    level = 0 ;
    gamePattern = []
    userClickedPattern = []
    started = false ;
}