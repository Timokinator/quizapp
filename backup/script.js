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


function init() {
    document.getElementById("all-questions").innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('endScreen').classList.toggle('d-none');
        document.getElementById('questionBody').classList.toggle('d-none');
        document.getElementById('card-img-top').src = './images/winner1.png';
        document.getElementById('correct-answers').innerHTML += amountCorrectAnswers;
        document.getElementById('all-answers').innerHTML += amountAnsweredAnswers;
        


    } else {
        let question = questions[currentQuestion];

        document.getElementById('actual-question').innerHTML = currentQuestion + 1;
        document.getElementById("question-text").innerHTML = question["question"];
        document.getElementById("answer_1").innerHTML = question["answer_1"];
        document.getElementById("answer_2").innerHTML = question["answer_2"];
        document.getElementById("answer_3").innerHTML = question["answer_3"];
        document.getElementById("answer_4").innerHTML = question["answer_4"];
    };
};


function answer(selection) {
    if (clickable) {
        let correctAnswer = questions[currentQuestion]['right_answer'];
        let selectedQuestionNumner = selection.slice(-1);
        let idOfRightAnswer = `answer_${correctAnswer}`;
        amountAnsweredAnswers++;

        if (correctAnswer == selectedQuestionNumner) {
            document.getElementById(selection).parentNode.classList.add('bg-success');
            amountCorrectAnswers++;
        } else {
            document.getElementById(selection).parentNode.classList.add('bg-danger');
            document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        };
        document.getElementById('next-button').disabled = false;

        clickable = false;
    };
}


function nextQuestion() {
    clickable = true;
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    showQuestion();

    for (let i = 1; i < 5; i++) {
        const element = `answer_${i}`;
        document.getElementById(element).parentElement.classList.remove('bg-success');
        document.getElementById(element).parentNode.classList.remove('bg-danger');
    };
}
