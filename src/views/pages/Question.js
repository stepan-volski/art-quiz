import { addNavigation, generateAnswers, generateCategories, generateQuestion } from '../../utils/utils.js'
import { router } from '../../index.js'
import StoredCategory from '../../entity/StoredCategory.js'

let Question = {
    render: async () => {

        let quiz_type = window.location.href.match(/\?(.*?)\_/)[1];
        let categories = generateCategories(quiz_type);

        let categoryId = window.location.href.split('=')[1];
        let category = categories[categoryId];

        let storedCategory = JSON.parse(localStorage.getItem(`${quiz_type}_category${categoryId}`)) || new StoredCategory(categoryId);

        if(storedCategory.isFinished){
            localStorage.setItem(`${quiz_type}_category${categoryId}`, JSON.stringify(new StoredCategory(categoryId)));
        }

        let currentQuestionNumber = storedCategory.currentQuestion;
        let question = category.entries[currentQuestionNumber];

        let view =  /*html*/`
    <section class="question-page">
        <div class="question-container">
            ${generateQuestion(quiz_type, question)}
        </div>

        <div class="answer-container">
            ${generateAnswers(quiz_type, question).join('')}
        </div>
    </section>

        <div class="modal-container" id="modal">
            <div class="answer">
                <img id="answer-icon" src=""></img>
                <img class="modal-image" src="../assets/img/category-img/${question.imageNum}.jpg"></img>
                <span class="painting-title">${question.name}</span>
                <span class="painting-author">${question.author}</span>
                <button class="button answer-button" id="next">Next</button>
            </div>
        </div>

        <div class="modal-container" id="congrats">
        <div class="answer congratulations">
            <img id="winner-icon" src="../assets/svg/prize.svg"></img>
            <span class="final-score" id="final-score"></span>
            <button class="button answer-button" id="home">Home</button>
            <button class="button answer-button" id="results">Results</button>
        </div>
    </div>

        `
        return view
    }
    , after_render: async () => {

        let answers = Array.from(document.getElementsByClassName("answer-option"));
        answers.forEach(answer => answer.onclick = checkAnswer);

        let isLastQuestion = false;
        let quiz_type = window.location.href.match(/\?(.*?)\_/)[1];
        let categories = generateCategories(quiz_type);
        let categoryId = window.location.href.split('=')[1];
        let storedCategory = JSON.parse(localStorage.getItem(`${quiz_type}_category${categoryId}`)) || new StoredCategory(categoryId)

        function checkAnswer(event) {
            let category = categories[categoryId];
            let currentQuestionNumber = storedCategory.currentQuestion;
            let score = storedCategory.score;
            let question = category.entries[currentQuestionNumber];
            let iconType;

            if (event.target.id === "correct") {
                storedCategory.correctAnswers.push(question.id);
                storedCategory.score = score + 1;
                iconType = "correct";
            } else {
                storedCategory.wrongAnswers.push(question.id);
                iconType = "wrong";
            }

            if (question.id === 9) {
                storedCategory.isFinished = true;
                isLastQuestion = true;
                storedCategory.currentQuestion = 0;
            } else {
                storedCategory.currentQuestion = currentQuestionNumber + 1;
            }

            document.getElementById("answer-icon").src = `../assets/svg/icon-${iconType}.svg`;

            localStorage.setItem(`${quiz_type}_category${categoryId}`, JSON.stringify(storedCategory));

            displayAnswerWindow();
        }

        document.getElementById("next").onclick = nextQuestion;

        function nextQuestion() { 
            if (isLastQuestion) {
                hideAnswerWindow();
                document.getElementById("congrats").style.display = "flex";
                document.getElementById("final-score").innerText = `Your score is ${storedCategory.score}/10`;
            } else {
                hideAnswerWindow();
                router();
            }
        }
        
        document.getElementById("results").onclick = function(){
            window.history.pushState("", "", `/score?${quiz_type}_category=${categoryId}`);
            router();
        };

        document.getElementById("home").onclick = function(){
            window.history.pushState("", "", `/main?type=${quiz_type}`);
            router();
        };


        function displayAnswerWindow() {
            let modal = document.getElementById("modal");
            modal.style.display = "flex";
        }

        function hideAnswerWindow() {
            let modal = document.getElementById("modal");
            modal.style.display = "none";
        }

        let settingsBtn = document.getElementById("settingsBtn");
        let homeBtn = document.getElementById("homeBtn");
        let categoriesBtn = document.getElementById("categoriesBtn");
        addNavigation(settingsBtn, "/settings");
        addNavigation(homeBtn, "/");
        addNavigation(categoriesBtn, `/main?type=${quiz_type}`);

    }

}

export default Question;