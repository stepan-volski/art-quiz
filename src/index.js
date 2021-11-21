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



//listeners
//window.addEventListener('hashchange', router);
//window.addEventListener('load', router);
window.addEventListener('popstate', router);

export { router };