let questions = [
    {
        "question": "Wer ist der pseudonyme Erfinder von Bitcoin?",
        "answer_1": "Meister Eder",
        "answer_2": "Craig Wright",
        "answer_3": "Satoshi Nakamoto",
        "answer_4": "Hal Finney",
        "right_answer": 3,
    },
    {
        "question": "Was ist die maximale Anzahl an Bitcoin, die jemals im Umlauf sein werden?",
        "answer_1": "21 Millionen",
        "answer_2": "100 Millionen",
        "answer_3": "50 Millionen",
        "answer_4": "1 Million",
        "right_answer": 1,
    },
    {
        "question": "Wie wird der Prozess genannt, bei dem neue Bitcoin durch die Lösung komplexer mathematischer Probleme geschaffen werden?",
        "answer_1": "Farming",
        "answer_2": "Mining",
        "answer_3": "Digging",
        "answer_4": "Harvesting",
        "right_answer": 2,
    },
    {
        "question": "Was ist eine Blockchain?",
        "answer_1": "Eine dezentrale Datenbank",
        "answer_2": "Ein Online-Shop für Bitcoin",
        "answer_3": "Eine Hardware-Wallet",
        "answer_4": "Eine Mining-Software",
        "right_answer": 1,
    },
    {
        "question": "Was ist ein 'Halving' in Bezug auf Bitcoin?",
        "answer_1": "Eine neue Kryptowährung",
        "answer_2": " Eine Art von Wallet",
        "answer_3": "Ein spezieller Mining-Algorithmus",
        "answer_4": "Eine Halbierung der Belohnung für das Mining",
        "right_answer": 4,
    },
    {
        "question": "Wie wird der Konsens-Algorithmus genannt, der Bitcoin zugrunde liegt?",
        "answer_1": "Proof of Stake",
        "answer_2": "Proof of Concept",
        "answer_3": "Proof of Work",
        "answer_4": "Proof of Burn",
        "right_answer": 3,
    },
    {
        "question": "Was ist ein Fork in Bezug auf Bitcoin?",
        "answer_1": "Eine Belohnung für das Mining",
        "answer_2": "Eine Abspaltung der Blockchain in zwei separate Versionen",
        "answer_3": "Eine Art von Wallet-Software",
        "answer_4": "Eine Überweisung von Bitcoin-Guthaben",
        "right_answer": 2,
    },
];


let currentQuestion = 0;
let clickable = true;
let amountCorrectAnswers = 0;
let amountAnsweredAnswers = 0;
let audio_success = new Audio('./sounds/success.mp3');
let audio_fail = new Audio('./sounds/fail.mp3');
let audio_result = new Audio('./sounds/result.mp3');
audio_fail.volume = 0.3;
audio_fail.playbackRate = 1.3;


function init() {
    document.getElementById("all-questions").innerHTML = questions.length;
    showQuestion();
};


function showQuestion() {
    if (currentQuestion >= questions.length) {
        showEndscreen();
    } else {
        showNextQuestion();
    };
};


function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('actual-question').innerHTML = currentQuestion + 1;
    document.getElementById("question-text").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
};


function answer(selection) {
    if (clickable) {
        let correctAnswer = questions[currentQuestion]['right_answer'];
        let selectedQuestionNumber = selection.slice(-1);
        let idOfRightAnswer = `answer_${correctAnswer}`;
        amountAnsweredAnswers++;

        if (correctAnswer == selectedQuestionNumber) {
            actionCorrectAnswer(selection);
        } else {
            actionWrongAnswer(selection, idOfRightAnswer);
        };
        document.getElementById('next-button').disabled = false;
        clickable = false;
    };
};


function actionCorrectAnswer(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    amountCorrectAnswers++;
    audio_success.play();
};


function actionWrongAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    audio_fail.play();
};


function nextQuestion() {
    stopAudio();
    clickable = true;
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    showQuestion();
    removeButtonColors();
    updateProgressBar();
};


function removeButtonColors() {
    for (let i = 1; i < 5; i++) {
        const element = `answer_${i}`;
        document.getElementById(element).parentElement.classList.remove('bg-success');
        document.getElementById(element).parentNode.classList.remove('bg-danger');
    };
};


function showEndscreen() {
    MakeEndscreenVisible();
    commentResult();
    audio_result.play();
};


function commentResult() {
    if (amountCorrectAnswers == questions.length) {
        document.getElementById('final-comment').innerHTML = /*html*/`
                Perfektes Ergebnis!
            `;
    } else if (amountCorrectAnswers >= questions.length / 2) {
        document.getElementById('final-comment').innerHTML = /*html*/`
                Solides Ergebnis!
            `;
    } else if (amountCorrectAnswers < questions.length / 2) {
        document.getElementById('final-comment').innerHTML = /*html*/`
                Noch viel lernen du musst mein junger Padawan, viel Glück beim nächsten Mal!
            `;
    };
};


function MakeEndscreenVisible() {
    document.getElementById('endScreen').classList.toggle('d-none');
    document.getElementById('questionBody').classList.toggle('d-none');
    document.getElementById('card-img-top').src = './images/winner1.png';
    document.getElementById('correct-answers').innerHTML = amountCorrectAnswers;
    document.getElementById('all-answers').innerHTML = amountAnsweredAnswers;
};


function updateProgressBar() {
    percent = Math.round(currentQuestion / questions.length * 100);
    document.getElementById('progress-bar').innerHTML = /*html*/`${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
};


function restart() {
    MakeEndscreenInvisible();
    resetVariables();
    updateProgressBar();
    init();
};


function MakeEndscreenInvisible() {
    document.getElementById('endScreen').classList.toggle('d-none');
    document.getElementById('questionBody').classList.toggle('d-none');
    document.getElementById('card-img-top').src = './images/brain.jpg';
};


function resetVariables() {
    currentQuestion = 0;
    clickable = true;
    amountCorrectAnswers = 0;
    amountAnsweredAnswers = 0;
};


function stopAudio() {
    audio_fail.pause();
    audio_fail.currentTime = 0;
    audio_success.pause();
    audio_success.currentTime = 0;
};