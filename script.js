let currentQuestion = {};
let currentQuiz = '';
let questionNumber = 0;
let correctAnswers = 0;

function startQuiz(quizType) {
    currentQuiz = quizType;
    showNextQuestion();
    document.getElementById('quiz').style.display = 'block';
}

function showNextQuestion() {
    questionNumber++;
    if (currentQuiz in quizzes) {
        quizzes[currentQuiz](); // 問題を生成
        let operatorText = '';
        switch (currentQuiz) {
            case 'addition_10':
            case 'addition_20_carry':
            case 'addition_over_20':
            case 'addition_2digit_1digit':
            case 'addition_3digit_2digit':
                operatorText = '+';
                break;
            case 'subtraction_10':
            case 'subtraction_20_borrow':
                operatorText = '-';
                break;
            default:
                operatorText = '+';
                break;
        }
        document.getElementById('question').textContent = `${currentQuestion.num1} ${operatorText} ${currentQuestion.num2} = ?`;
        document.getElementById('user_answer').value = '';
        document.getElementById('result').textContent = ''; // 1問目の正解表示を削除
    } else {
        console.error(`無効な問題タイプ: ${currentQuiz}`);
    }
}

const userAnswerInput = document.getElementById('user_answer');
if (userAnswerInput) {
    userAnswerInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
} else {
    console.error('user_answer 要素が見つかりませんでした。');
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('user_answer').value);
    if (userAnswer === currentQuestion.answer) {
        document.getElementById('result').textContent = '正解!';
        correctAnswers++;
        document.getElementById('score').textContent = `正解数: ${correctAnswers}`;
    } else {
        document.getElementById('result').textContent = '不正解...';
    }

    if (questionNumber === 3) {
        // 3問終了したら終了処理
        endQuiz();
    } else {
        setTimeout(showNextQuestion, 1000);
    }
}


function endQuiz() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';

    const restartButton = document.getElementById('restart-quiz');
    restartButton.addEventListener('click', () => {
        questionNumber = 0;
        correctAnswers = 0;
        document.getElementById('score').textContent = '正解数: 0';
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('quiz-result').style.display = 'none';
        document.querySelector('.congrats-message').textContent = '';
    });

    // 「がんばったね!」の表示
    const congratsMessage = document.querySelector('.congrats-message');
    congratsMessage.textContent = 'がんばったね!';
}

const quizzes = {
    //10までの足し算
    addition_10() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * (10 - num1)) + 1;
        const answer = num1 + num2;
        currentQuestion = { num1, num2, answer };
    },
　　//繰り上がりあり足し算
    addition_20_carry() {
    let num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 9) + 1;
    let answer = num1 + num2;

    // 必ず繰り上がりが発生するように調整
    while (answer < 11) {
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
        answer = num1 + num2;
    }
    currentQuestion = { num1, num2, answer };
    },
    //20以上の足し算
　　addition_over_20() {
        const num1 = Math.floor(Math.random() * 50) + 21;
        const num2 = Math.floor(Math.random() * 50) + 21;
        const answer = num1 + num2;
        currentQuestion = { num1, num2, answer };
    },
    //2桁+1桁
　　addition_2digit_1digit() {
        const num1 = Math.floor(Math.random() * 90) + 10;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const answer = num1 + num2;
        currentQuestion = { num1, num2, answer };
    },
    //3桁+2桁
　　addition_3digit_2digit() {
        const num1 = Math.floor(Math.random() * 900) + 100;
        const num2 = Math.floor(Math.random() * 90) + 10;
        const answer = num1 + num2;
        currentQuestion = { num1, num2, answer };
    },
    //10までの引き算
　　subtraction_10() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * num1);

    // num2 が 0 の場合は再度生成する
    while (num2 === 0) {
        num2 = Math.floor(Math.random() * num1);
    }

    const answer = num1 - num2;
    currentQuestion = { num1, num2, answer };
    },
    //繰り下がりのある引き算
　　subtraction_20_borrow() {
    let num1, num2, answer;

    // 必ず繰り下がりが必要な問題を生成
    num1 = Math.floor(Math.random() * 8) + 11; // 11 ~ 18
    let ones = num1 % 10; // num1の1の位
    num2 = Math.floor(Math.random() * (10 - ones)) + ones + 1; // num1の1の位より大きな数字

    // num2 が num1 より大きくなるまで再生成する
    while (num2 >= num1) {
        num2 = Math.floor(Math.random() * (10 - ones)) + ones + 1;
    }

    answer = num1 - num2;
    currentQuestion = { num1, num2, answer };
    },
　　//3桁-2桁
    subtraction_3digit_2digit() {
    let num1, num2, answer;

    // 3桁の数値を生成
    num1 = Math.floor(Math.random() * 900) + 100; // 100 ~ 999

    // 2桁の数値を生成
    num2 = Math.floor(Math.random() * 90) + 10; // 10 ~ 99

    // num2 が num1 より大きくなるまで再生成する
    while (num2 >= num1) {
        num2 = Math.floor(Math.random() * 90) + 10;
    }

    // 答えを計算
    answer = num1 - num2;

    currentQuestion = { num1, num2, answer };
    },
    // かけ算九九
    multiplication_table() {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        let answer = num1 * num2;
        currentQuestion = { num1, num2, answer };
    },

};



// HTML 側のボタンクリックイベントハンドラ
document.getElementById('addition_10').addEventListener('click', () => {
    startQuiz('addition_10');
});

document.getElementById('addition_20_carry').addEventListener('click', () => {
    startQuiz('addition_20_carry');
});

document.getElementById('addition_over_20').addEventListener('click', () => {
    startQuiz('addition_over_20');
});

document.getElementById('addition_2digit_1digit').addEventListener('click', () => {
    startQuiz('addition_2digit_1digit');
});

document.getElementById('addition_3digit_2digit').addEventListener('click', () => {
    startQuiz('addition_3digit_2digit');
});

document.getElementById('subtraction_10').addEventListener('click', () => {
    startQuiz('subtraction_10');
});

document.getElementById('subtraction_20_borrow').addEventListener('click', () => {
    startQuiz('subtraction_20_borrow');
});

document.getElementById('subtraction_2digit_1digit').addEventListener('click', () => {
    startQuiz('subtraction_2digit_1digit');
});

document.getElementById('check_answer').addEventListener('click', () => {
    checkAnswer();
});



