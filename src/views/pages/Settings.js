let Settings = {
    render : async () => {
    
    let appVolume = localStorage.getItem("appVolume") || 50;
    let isSoundEnabled = localStorage.getItem("isSoundEnabled") || false;

        let view =  /*html*/`
        <section class="settings-screen">
        <div class="settings-header">
            <div class="settings-header__title">
                <div class="back" id="settings-back"></div>
                <span>Settings</span>
            </div>
        </div>
        <div class="settings-controls">
            <div class="settings-controls__volume">
                <h2>Volume</h2>
                <input type="range" id="volumeRng" min="0" max="100" value="${appVolume}">
            </div>
            <div class="settings-controls__time-game">
                <h2>Enable Sound</h2>
                <input type="checkbox" id="volumeChkbx" ${isSoundEnabled === "true" ? "checked" : ""}>
            </div>
            <div class="settings-controls__time-to-answer">
                <h2>Time to answer</h2>
                <button class="round-button" onclick="this.nextElementSibling.stepDown()">-</button>
                <input type="number" min="0" max="20" value="1" readonly>
                <button class="round-button" onclick="this.previousElementSibling.stepUp()">+</button>
            </div>
        </div>
        <div class="settings-buttons">
            <button class="button" id="save">Save</button>
        </div>
    </section>
        `
        return view
    }
    , after_render: async () => {

        document.getElementById("header").classList.add('hidden');
        document.getElementById("footer").classList.add('hidden');

        let backBtn = document.getElementById("settings-back");
        backBtn.addEventListener('click', () => {
            history.back();
        });

        document.getElementById("save").onclick = saveSettings;

        function saveSettings(){
            let volumeValue = document.getElementById("volumeRng").value;
            let isSoundEnabled = document.getElementById("volumeChkbx").checked;

            localStorage.setItem("appVolume", volumeValue);
            localStorage.setItem("isSoundEnabled", isSoundEnabled);

            history.back();
        }


    }

}

export default Settings;