let Header = {
    render: async () => {
        let view =  /*html*/`
        <div class="header-logo"></div>
        <div class="header-menu">
          <ul>
            <li id="homeBtn">Home</li>
            <li id="categoriesBtn">Categories</li>
          </ul>
        </div>
        <div class="settings-icon" id="settingsBtn"></div>
        `
        return view
    },
    after_render: async () => { }

}

export default Header;