$(document).ready(function() {

    // DEFINING VARIABLES
    var questions = [
        "What is the name of the OSU student section?",
        "What is the state tree of Ohio?",
        "What is the OSU mascot's name?",
        "Who was the OSU football coach who punched a Clemson player in the Gator Bowl in 1978?",
        "Who was the only two-time Heisman Trophy winner from Ohio State?",
        "What does TBDBITL stand for in regards to the OSU Marching Band?",
        "What famous comedian from Cleveland, Ohio dotted the 'I'?",
        "How do you respond to an OSU fan who yells 'O-H!'?",
        "What 1960s song by the McCoys became an Ohio State staple?"
    ];
    
    var answers = [
        "Block-O",
        "Buckeye",
        "Brutus Buckeye",
        "Woody Hayes",
        "Archie Griffin",
        "The Best Damn Band in the Land",
        "Bob Hope",
        "I-O!",
        "Hang on Sloopy"
    ]
    
    var choices = {
        q0 : ["Buckeye City", "Block-O", "The Brutus House", "The Angry Tree Nuts"],
        q1 : ["Buckeye", "Boxelder Maple", "Alder", "Blackhaw"],
        q2 : ["Betty Buckeye", "Bruce Buckeye", "Bill Buckeye", "Brutus Buckeye"],
        q3 : ["Urban Meyer","Woody Hayes","Jim Tressel", "Earle Bruce"],
        q4 : ["Archie Griffin", "Eddie George", "Troy Smith", "Braxton Miller"],
        q5 : ["The Baddest Damn Band in the Land","The Best Darn Bassists in the Land", "The Ballin-est Drummers Band in this Land","The Best Damn Band in the Land"],
        q6 : ["Dave Chappelle","Bob Hope", "Josh Radnor","Drew Carey"],
        q7 : ["Shut up!", "Go Bucks!", "I-O!", "Ohio! Ohio! The land that I love"],
        q8 : ["Hang on Sloopy", "Come on Let's Go", "Beat the Clock", "I Got to Go Back"]
    }
    
    var correctAnswerMessages=["That is correct!", "Woo! You got it!", "Nice guess ;)", "Woah, look out, we have a real buckeye on our hands!","Hey, are you googling these?","Yep! Nailed it.","Yaaaas, you got it!","How's it feel to be so smart?", "Good job! You got it right!"];
    var correctAnswerMessage;
    var incorrectAnswerMessages=["Nope :(", "Yikes, so close", "It's okay, you'll get the next one!", "Are you from M!ch!g@n...?", "What, do you hate football or something?","C'mon! That one was easy.","Almost! but not quite...", "You need some coffe? water? Focus kid!", "Hey don't sweat it, this was a tough one!"];
    var incorrectAnswerMessage;
    
    var question= " ";
    var answer=" ";
    var questionsAsked = [];
    var indexChosen;
    var timeRemaining = 15;
    var correct;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 9;
    var timeInt;
    
    // DEFINING FUNCTIONS
    // Funtion resets the game
    function reset (){
        $(".results").fadeOut(0);
        $("#startBtn").fadeIn();
        $("#resetBtn").css("display", "none");
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 9;
        questionsAsked =[];
    };
    
    // Function starts the game
    function start (){
        $("#startBtn").fadeOut();
        $(".choices").fadeIn();
        $(".time").fadeIn();
        // Every second, run the time function
        timeInt = setInterval(time, 1000);
    };
    
    // Function reduces time remaining and prints the seconds remaining to HTML
    function time(){
        if(questionsAsked.length< questions.length){
            if(timeRemaining>0){
                timeRemaining--;
            } else {
                answerShow();
            }
            $(".time").html("<b>"+timeRemaining + " seconds remaining! </b>"); 
        }
    };
    
    // Function shows the question and related choices
    function show (){
       if(questionsAsked.length < questions.length){
        // Set time remaining to 15 and push to time div
        timeRemaining = 15;
        // added a time fade in to bring back the time div on show. 
        $(".time").fadeIn();
        $(".time").html("<b>"+timeRemaining + " seconds remaining! </b>"); 
        $(".gameplay").fadeIn();
        $(".results").fadeOut(0);
            // Generate a random number between 0 and 8; Pull the question at the random number position and related choice array. Push to html
            indexChosen = Math.floor(Math.random()*questions.length);
            question = questions[indexChosen];
            answer = answers[indexChosen];
            choiceIndex = ("q"+ indexChosen);
            // If the question has not already been asked, then put it into the asked array and push to HTML
            if(questionsAsked.indexOf(question) == -1){
                questionsAsked.push(question);
                $(".question").html("<b>"+question+"</b>");
                $("#option0").html(choices[choiceIndex][0]);
                $("#option1").html(choices[choiceIndex][1]);
                $("#option2").html(choices[choiceIndex][2]);
                $("#option3").html(choices[choiceIndex][3]);
    
            } else {
                show();
            }
        } else {
            showResults ();
        }
    };
    
    
    function answerShow (){
        // hide the gameplay section, show the results section
        $(".gameplay").fadeOut(0);
        $(".results").fadeIn();
        // hide the time section and have the results show for 4 seconds before moving on. 
        $(".time").fadeOut(0);
        timeRemaining = 15;
        setTimeout(show, 4000);
        correctAnswerMessage = correctAnswerMessages[Math.floor(Math.random()*correctAnswerMessages.length)];
        incorrectAnswerMessage = incorrectAnswerMessages[Math.floor(Math.random()*incorrectAnswerMessages.length)];
        if(correct == true && timeRemaining > 0){
            $(".results").html(correctAnswerMessage + "<br> The answer was " + answer);   
        } else if (timeRemaining>0) {
            $(".results").html(incorrectAnswerMessage + "<br> The answer was " + answer);
        } else {
            $(".results").html("Time's up! The correct answer was " + answer);
        };
        // $("#nextBtn").fadeIn()
    };
    
    function showResults(){
        // Push results text to the HTML
        $(".results").html("Congrats! You're all done. <br> Here are your stats... <br> Correct answers: " + correctAnswers 
        + "<br> Incorrect Answers: "+ incorrectAnswers + "<br> Unanswered Questions: " + unanswered + "<br> Not too shabby!");
        // Fade out the gameplay and time divs, as well as the next button
        $(".gameplay").fadeOut(0);
        $(".time").fadeOut();
        // $("#nextBtn").fadeOut(0);
        // Fade in the results to show result text as well as reset button
        $(".results").fadeIn();
        $("#resetBtn").fadeIn();
        $("#gameover").fadeIn();
        $(".time").html(" ");
        clearInterval(timeInt);
    };
    
    // ON-PAGE ACTIONS
    // reset the page to start
    
    // When the start button is clicked...
    $("#startBtn").on("click", function(){
        start();
        show();
    });
    
    // Adding hover colors to pick an answer
    $(".choices").hover(function(){
        $(this).css("background-color", "#666666");
        },function(){
        $(this).css("background-color", "#F5F5F5");
        }
    );
    
    // When the choices are clicked...
    $(".allChoices").on("click", ".choices", function(x){
            if(x.target.innerHTML === answer){
                correctAnswers++;
                unanswered--;
                correct = true;
                answerShow();
            } else {
                incorrectAnswers++;
                unanswered--;
                correct = false;
                answerShow();
            };
            
    });
    
    // // When the "next question" button is clicked
    // $("#nextBtn").on("click", function(){
    //     if(questionsAsked.length < questions.length) {
    //         show();
    //     } else {
    //         showResults();
    //     };
    //     $("#nextBtn").fadeOut();
    // });
    
    // When the reset button is clicked...
    $("#resetBtn").on("click", function(){
        reset();
    });
    
    
    });