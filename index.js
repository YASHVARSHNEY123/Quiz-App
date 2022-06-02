const start_button = document.querySelector(".start_button button");
const Info = document.querySelector(".Info");
const exit = Info.querySelector(".buttons .Exit");
const cont = Info.querySelector(".buttons .Continue");
const quizBox = document.querySelector(".quiz_box")
const Stimer = quizBox.querySelector(".timer .timer_sec");
const timeLine = quizBox.querySelector(".quiz_box header .timeline");
const next_button = quizBox.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const result_score = result_box.querySelector(".Rscore_text");
const restartQuiz = result_box.querySelector(".Rbuttons .restart");
const quitQuiz = result_box.querySelector(".Rbuttons .quit");



// Start Button clicked
start_button.onclick = () => {
    Info.classList.add("active");
}

// Exit Button clicked
exit.onclick = () => {
    Info.classList.remove("active");
}


// Continue Button clicked

cont.onclick = () => {
    Info.classList.remove("active");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(15);
    next_button.style.display = "none";
}

let correctAns =0;
let ind = 0;
let counter;
let timeDur = 15;


next_button.onclick = () => {
    ind++;
    if (ind > questions.length - 1) {
          ShowResult();
    }
    else {
        showQuestions(ind);
        clearInterval(counter);
        startTimer(timeDur);
        next_button.style.display = "none";
    }
}

function showQuestions(index) {
    if (index == questions.length - 1) {
        next_button.innerHTML = "Submit";
    }
    const que_text = document.querySelector(".que_text");
    const options = document.querySelector(".option_list");
    const botnum = document.querySelector(".total_que");
    let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    let botTag = ' <span><p>' + (index + 1) + '</p><p>of</p><p>5</p><p>Questions</p></span>';
    que_text.innerHTML = que_tag;
    options.innerHTML = option_tag;
    botnum.innerHTML = botTag;

    const option = options.querySelectorAll(".option");
    option.forEach(e => {
        e.setAttribute("onclick", "OptionSelected(this)");
    });
}

function OptionSelected(ans) {
    clearInterval(counter);
    const options = document.querySelector(".option_list");
    const option = options.querySelectorAll(".option");
    let a = ans.textContent;
    let b = questions[ind].answer;

    if (a == b) {
        correctAns++;
        ans.classList.add("correct");
    }

    else {
        ans.classList.add("incorrect");
        option.forEach(e => {
            if (e.textContent == b)
                e.setAttribute("class", "option correct")
        })

    }
    option.forEach(e => {
        e.classList.add("disabled");
    });
    next_button.style.display = "block";
}


function startTimer(time) {
    counter = setInterval(tier, 1000);
    function tier() {
        let x;
        if (time <= 9) {
            x = "0" + time;
        }
        else x = time;
        Stimer.textContent = x;
        let c = ((15-time)*100)/15;
        timeLine.style.width = `${c}%`;
        time--;

        if (time < 0) {
            clearInterval(counter);
            Stimer.textContent = "00";
            const options = document.querySelector(".option_list");
            const option = options.querySelectorAll(".option");
            let b = questions[ind].answer;
            option.forEach(e => {
                if (e.textContent == b)
                    e.setAttribute("class", "option correct")
            });
            option.forEach(e => {
                e.classList.add("disabled");
            });
            next_button.style.display = "block";
        }
    }
}

function ShowResult(){
    Info.classList.remove("active");
    quizBox.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    let s;
    if(correctAns >= 3) s = "Well Done"
    else s ="Sorry";
    let scoretag =  `<span>and ${s}, You got only <p>${correctAns}</p> out of <p>5</p> </span>`;
    result_score.innerHTML = scoretag;

   
    // result_score.innerHTML = '<span>and sorry, You got only <p>'+correctAns+'</p> out of <p>5</p> </span>';
}

restartQuiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    correctAns =0;
     ind = 0;
     timeDur = 15;
    showQuestions(0);
    startTimer(15);
    next_button.style.display = "none";
    
}

quitQuiz.onclick = ()=>{
    window.location.reload();
}

