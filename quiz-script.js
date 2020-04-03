var currentQuestion=0;
var score=0;
var totQuestions=questions.length;

var container=document.getElementById('quizContainer');
var questionEl= document.getElementById('question');
var opt1=document.getElementById('opt1');
var opt2=document.getElementById('opt2');
var opt3=document.getElementById('opt3');
var opt4=document.getElementById('opt4');
var nextButton=document.getElementById('nextButton');
var resultCont=document.getElementById('result');

var total_seconds=60*10;
var c_minutes=parseInt(total_seconds/60);
var c_seconds=parseInt(total_seconds%60);
function CheckTime(){
  document.getElementById("quiz-time-left").innerHTML="Time Left: "+c_minutes+ " minutes "+c_seconds+" seconds ";
  if(total_seconds<=0){
    setTimeout("document.quiz.submit()",1);
  }else{
    total_seconds=total_seconds-1;
    c_minutes=parseInt(total_seconds/60);
    c_seconds=parseInt(total_seconds%60);
    setTimeout("CheckTime()",1000);
  }
}
setTimeout("CheckTime()",1000);

function loadQuestion (questionIndex) {
  var q=questions[questionIndex];
  questionEl.textContent=(questionIndex+1)+'. '+q.question;
  opt1.textContent=q.option1;
  opt2.textContent=q.option2;
  opt3.textContent=q.option3;
  opt4.textContent=q.option4;
};
function loadNextQuestion(){
  var selectedOption =document.querySelector('input[type=radio]:checked');
  if(!selectedOption){
    alert('Please select your answer!');
    return;
  }
  var answer=selectedOption.value;
  if(questions[currentQuestion].answer==answer){
    score++;
  }
  selectedOption.checked=false;
  currentQuestion++;
  if(currentQuestion==totQuestions-1){
    nextButton.textContent='Finish';
  }
  if(currentQuestion==totQuestions){
    container.style.display='none';
    resultCont.style.display='';
    resultCont.textContent='Your Score: '+ score;
    var messages=["Great job!","That's a good performance","You really need to do better"];
    var pictures=["win.gif","nice.gif","lose.gif"];
    var range;
    if(score<8){
      range=2;
    }
    if(score>=8&&score<15){
      range=1;
    }
    if(score>=15){
      range=0;
    }
    document.getElementById("after_submit").style.visibility="visible";
    document.getElementById("message").innerHTML=messages[range];
    document.getElementById("picture").src=pictures[range];
    document.getElementById("quiz-time-left").style.visibility="hidden";
    return;
  }
  loadQuestion(currentQuestion);
}
loadQuestion(currentQuestion);
