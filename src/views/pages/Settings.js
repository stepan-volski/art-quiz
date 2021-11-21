let Settings = {
    render : async () => {
        let view =  /*html*/`
        <section class="settings-screen">
        <div class="settings-header">
            <div class="settings-header__title">
                <div class="back" id="settings-back"></div>
                <span>Settings</span>
            </div>
            <div class="settings-close close-icon" id="settings-close"></div>
        </div>
        <div class="settings-controls">
            <div class="settings-controls__volume">
                <h2>Volume</h2>
                <input type="range" id="vol" name="vol" min="0" max="100">
            </div>
            <div class="settings-controls__time-game">
                <h2>Time game</h2>
                <input type="checkbox" id="time-game">
            </div>
            <div class="settings-controls__time-to-answer">
                <h2>Time to answer</h2>
                <button class="round-button" onclick="this.nextElementSibling.stepDown()">-</button>
                <input type="number" min="0" max="20" value="1" readonly>
                <button class="round-button" onclick="this.previousElementSibling.stepUp()">+</button>
            </div>
        </div>
        <div class="settings-buttons">
            <button class="button">Default</button>
            <button class="button">Save</button>
        </div>
    </section>
        `
        return view
    }
    , after_render: async () => {

        document.getElementById("header").classList.add('hidden');
        document.getElementById("footer").classList.add('hidden');

        let backBtn = document.getElementById("settings-back");
        let closeBtn = document.getElementById("settings-close");

        backBtn.addEventListener('click', () => {
            history.back();
        });

        closeBtn.addEventListener('click', () => {
            history.back();
        });


    }

}

export default Settings;