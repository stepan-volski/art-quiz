import { addNavigation } from '../../utils/utils.js'
import { generateAnswers, generateCategories } from '../../utils/utils.js'
import { router } from '../../index.js'
import StoredCategory from '../../entity/StoredCategory.js'

let Score = {
    
    render: async () => {

        let quiz_type = window.location.href.match(/\?(.*?)\_/)[1];
        let categories = generateCategories(quiz_type);

        let categoryId = window.location.href.split('=')[1];
        let category = categories[categoryId];
        let storedCategory = JSON.parse(localStorage.getItem(`${quiz_type}_category${categoryId}`));
        let questions = category.entries;

        let correctlyAnswered = storedCategory.correctAnswers;

        let cards = questions.map((q, index) => `
            <div class="question-card" id="card" data-num=${index}>
            <img class="category-image ${correctlyAnswered.includes(index) ? "" : "grayscale"}" id="category-image" src="./assets/img/category-img/${q.imageNum}.jpg" alt="question image">
            <div class="card-overlay"></div>
            </div>`).join('');

        let view = `
            <section class="main-screen">
                <h3>Your score for this category is ${storedCategory.score}</h3>
                <div class="main-screen-content-container">${cards}</div>
            </section>

            <div class="modal-container modal-score" id="modal">
                <div class="answer">
                    <img class="modal-image" src="" id="qImg"></img>
                    <span class="painting-title" id="qTitle"></span>
                    <span class="painting-author" id="qAuthor"></span>
                    <span id="qYear"></span>
                    <button class="button answer-button" id="close">Close</button>
                </div>
            </div>

            `
        return view
    }
    , after_render: async () => {

        document.getElementById("header").classList.remove('hidden');
        document.getElementById("footer").classList.remove('hidden');
        
        let cards = Array.from(document.getElementsByClassName("question-card"));
        cards.forEach(card => card.onclick = openInfo);
        
        document.getElementById("close").onclick = closeInfo;
        
        let categoryId = window.location.href.split('=')[1];
        let quiz_type = window.location.href.match(/\?(.*?)\_/)[1];
        let categories = generateCategories(quiz_type);
        let category = categories[categoryId];

        function openInfo(e) {
            let id = e.currentTarget.attributes.getNamedItem("data-num").value;
            document.getElementById("qImg").src = `../assets/img/category-img/${category.entries[id].imageNum}.jpg`;
            document.getElementById("qAuthor").textContent = category.entries[id].author;
            document.getElementById("qTitle").textContent = category.entries[id].name;
            document.getElementById("qYear").textContent = category.entries[id].year;

            let modal = document.getElementById("modal");
            modal.style.display = "flex";
        }

        function closeInfo() {
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

export default Score;