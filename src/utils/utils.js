import artistData from '../data/artistData.js'
import pictureData from '../data/pictureData.js';
import images from '../data/images.js';
import Category from '../entity/Category.js';
import Entry from '../entity/Entry.js';
import { router } from '../index.js';


function generateCategories(type) {
    let data;
    type === 'artist' ? data = artistData : data = pictureData;

    let count = 0;
    let categories = [];

    for (let i = 0; i < 12; i++) {
        let entries = [];

        for (let j = 0; j < 10; j++) {
            entries.push(new Entry(j, data[count].author, data[count].name, data[count].year, data[count].imageNum));
            count++;
        }
        categories.push(new Category(i, entries));
    }
    return categories;
};

function generateQuestion(quiz_type, question) {
    if (quiz_type === 'artist') {
        return `<h3>Кто автор этой картины?</h3>
        <img class="question-image" src="../assets/img/category-img/${question.imageNum}.jpg" alt="question image">
        `
    }

    if (quiz_type === 'picture') {
        return `<h3>Какую картину нарисовал ${question.author}?</h3>
      `
    }
}

function generateAnswers(quiz_type, question) {
    let answers = [];

    let randomAnswerIds = [];

    while(randomAnswerIds.length < 4) {
        let id = getRandomNumber(0, 241);
        if(id !== question.id && !randomAnswerIds.includes(id)){
            randomAnswerIds.push(id);
        }
    }

    if (quiz_type === 'artist'){
        let correctAnswer = `<button class="button answer-option" id="correct">${question.author}</button>`;
        answers.push(correctAnswer);
    
        for (let i = 0; i < 3; i++) {
            let author = getEntityById(randomAnswerIds[i]).author;
            let answer = `<button class="button answer-option">${author}</button>`;
            answers.push(answer);
        }
    }

    if (quiz_type === 'picture'){
        let correctAnswer = `<img class="answer-option" id="correct" src="../assets/img/category-img/${question.imageNum}.jpg">`;
        answers.push(correctAnswer);
    
        for (let i = 0; i < 3; i++) {
            let img = getEntityById(randomAnswerIds[i]).imageNum;
            let answer = `<img class="answer-option" src="../assets/img/category-img/${img}.jpg">`;
            answers.push(answer);
        }
    }
    shuffleArray(answers);
    
    return answers;
}

function addNavigation(element, url) {
    element.addEventListener('click', () => {
        window.history.pushState("", "", url);
        router();
    });
}

function getRandomNumber(min, max) {
    let num = Math.random() * (max - min) + min;
    return Math.trunc(num);
}

function getEntityById(id) {
    return images[id];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export { generateCategories, addNavigation, generateAnswers, generateQuestion };