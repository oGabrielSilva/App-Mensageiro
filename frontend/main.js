//Stylesheet imports
import './assets/css/master.css'
import './assets/css/main.css'
import './assets/css/chats.css'
import './assets/css/footer.css'
import './assets/css/animations.css'
import './assets/css/sign.css'

//Javascript imports
import { navbar } from './assets/modules/navbar'
import { serverIo } from './assets/modules/io'
import { userLinks } from './assets/modules/links'

const main = document.querySelector('main')
const links = main.querySelector('#links')

if(!main.classList.contains('sign')) serverIo()
if(links) userLinks()

navbar()
