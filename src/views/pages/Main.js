import { addNavigation, generateCategories } from '../../utils/utils.js'
import { router } from '../../index.js'
import StoredCategory from '../../entity/StoredCategory.js'

let Main = {
    render: async () => {

        let quiz_type = window.location.href.split('=')[1];
        let categories = generateCategories(quiz_type);

        let storedCategories = categories.map(category => JSON.parse(localStorage.getItem(`${quiz_type}_category${category.id}`)) || new StoredCategory(category.id));
        
        let cards = categories.map((category, index) => `
            <div class="category-card ${storedCategories[category.id].isFinished ? "finished" : ""}" id="card">
                <div class="category-title">
                <h3 id="title">Category ${category.id}</h3>
                <span class="progress ${quiz_type}Title" id="progress">${storedCategories[category.id].score}/10</span>
                </div>
                <img class="category-image ${quiz_type}Image" id="category-image" src="./assets/img/category-img/${category.thumbnail}.jpg" alt="category image">
                    <div class="card-overlay ${quiz_type}Overlay" data-num=${index}>Score</div>
                </img>
            </div>`).join('');

        let view = `
            <section class="main-screen">
            <h4>You are playing <span class="${quiz_type}Title">${quiz_type}</span> quiz.</h4>
            <div class="main-screen-content-container">
            ${cards}
            </section>
            `
        return view
    }
    , after_render: async () => {

        document.getElementById("header").classList.remove('hidden');
        document.getElementById("footer").classList.remove('hidden');
        document.getElementById("categoriesBtn").classList.add('hidden');

        let settingsBtn = document.getElementById("settingsBtn");
        let homeBtn = document.getElementById("homeBtn");
        let imageCards = Array.from(document.getElementsByClassName("category-image"));

        addNavigation(settingsBtn, "/settings");
        addNavigation(homeBtn, "/");

        let quiz_type = window.location.href.split('=')[1];

        imageCards.forEach((image, index) => addNavigation(image, `/questions?${quiz_type}_category=${index}`));

        let overlays = Array.from(document.getElementsByClassName("card-overlay"))
        overlays.forEach(overlay => overlay.onclick = openScore);

        function openScore(e) {
            let id = e.currentTarget.attributes.getNamedItem("data-num").value;
            window.history.pushState("", "", `/score?${quiz_type}_category=${id}`);
            router();
        }

    }

}

export default Main;