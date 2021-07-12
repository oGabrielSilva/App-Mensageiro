function userLinks() {
    const btnLinks = document.querySelector('#btn-links')
    btnLinks.addEventListener('click', () => {
        btnLinks.parentElement.querySelector('ul').classList.toggle('none')
        btnLinks.parentElement.querySelector('ul').classList.toggle('navbar-animation')
    })
}

export { userLinks }
