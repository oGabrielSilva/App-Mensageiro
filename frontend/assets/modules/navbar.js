import '../css/navbar.css'

function navbar() {
    const navbarBtn = document.querySelector('.btn-menu')
    navbarBtn.addEventListener('click', () => {
        const options = document.querySelector('.options')
        options.classList.toggle('navbar-animation')
        options.classList.toggle('none')
    })
}

export { navbar }