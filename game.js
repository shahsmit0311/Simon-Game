var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red", "blue", "green","yellow"];
var level=0;

var started=false;

$(document).keydown(function(){
    if(!started)
    {
    nextSequence();
    $("h1").text("Level "+level);
    started=true;
    }
});


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length-1));
});

function nextSequence(){    
    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(currentLevel === (gamePattern.length - 1))
        {
            setTimeout(nextSequence(),100);
            userClickedPattern=[];
        }
    }
    
    else
    {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}