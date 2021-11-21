import { addNavigation } from '../../utils/utils.js'

let Start = {
    render: async () => {
        let view =  /*html*/`
        <section class="start-screen">
        <div class="settings-icon" id="settings"></div>
        <div class="start-screen__logo"></div>
        <div class="start-screen__buttons">
            <button class="button" id="artistQuizBtn">Artist quiz</button>
            <button class="button" id="picturetQuizBtn">Picture quiz</button>
        </div>
        </section> 
        `
        return view
    }
    , after_render: async () => {

        document.getElementById("header").classList.add('hidden');
        document.getElementById("footer").classList.add('hidden');
        
        let settingsBtn = document.getElementById("settings");
        let artistQuizBtn = document.getElementById("artistQuizBtn");
        let picturetQuizBtn = document.getElementById("picturetQuizBtn");

        addNavigation(settingsBtn, "/settings");
        addNavigation(artistQuizBtn, "/main?type=artist");
        addNavigation(picturetQuizBtn, "/main?type=picture");

    }

}

export default Start;