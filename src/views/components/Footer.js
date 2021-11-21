
let Footer = {
    render: async () => {
        let view =  /*html*/`
        <div class="footer-container">
            <a class="git" href="https://github.com/stepan-volski">volski</a>
            <div class="year">2021</div>
            <a class="rssLogo" href="https://rs.school/"></a>
        </div>
        `
        return view
    },
    after_render: async () => { }

}

export default Footer;