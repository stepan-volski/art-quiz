"use strict";

import Start from './views/pages/Start.js'
import Main from './views/pages/Main.js'
import Settings from './views/pages/Settings.js'
import Question from './views/pages/Question.js'
import Score from './views/pages/Score.js'

import Header from './views/components/Header.js'
import Footer from './views/components/Footer.js'

const routes = {
    '/'             : Start
    , '/main'       : Main
    , '/settings'   : Settings
    , '/question'   : Question
    , '/score'      : Score
};

const router = async () => {

    // Lazy load view element:
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('app');
    const footer = null || document.getElementById('footer');

    // Render the Header and footer of the page
    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    let page = routes[location.pathname];
    
    if (location.pathname.includes("question")) { page = Question };    //TODO refactor
    if (location.pathname.includes("score")) { page = Score };
    if (location.pathname.includes("type")) { page = Main };

    content.innerHTML = await page.render();

    await page.after_render();

}

router();

window.addEventListener('popstate', router);

let evaluation = 

`
TLDR: 
Выполнено все, кроме этих моментов:
- По верстке нигде нет адавтивности - снимал половину баллов за этот пункт
- В сеттингах нет возможности игры на время
- Нет плавной смены изображений
- Нет анимаций, кроме одной
- Нет дополнительного функционала

Итого: 150/220


1. Стартовая страница и навигация 15/20
- вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения +5 (нет адаптивности)
- реализована навигация по страницам приложения +10

2. Настройки 20/40
- в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда +10
- в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +0
- в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +0
- при перезагрузке страницы приложения выбранные настройки сохраняются +10

3. Страница категорий 25/30
- вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения +5 (нет адаптивности)
- карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10
- на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ +10

4. Страница с вопросами 45/50
- вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения +5 (нет адаптивности)
- варианты ответов на вопросы генерируются случайным образом +10
- правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10
- после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории +10
- после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10

5. Страница с результатами 45/50
- вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения +5 (нет адаптивности)
- страница с результатами содержит превью всех картин категории +10
- картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10
- при клике по картине выводится информация о ней - название, автор, год создания +10
- если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами +10

6. Плавная смена изображений 0/10

7. Реализована анимация отдельных деталей интерфейса 5/20
- Анимация опций ответов в разделе picture quiz

8. Дополнительный функционал на выбор 0/20
`
console.log(evaluation);

export { router };