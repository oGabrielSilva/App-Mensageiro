import { io } from "socket.io-client";
const geralChat = document.querySelector('.chat-geral')
const chat = geralChat.querySelector('.chat')
const geralForm = geralChat.querySelector('.msg')
const room = geralChat.querySelector('p').innerHTML.toLowerCase()

function serverIo() {
    const socket = io();
    socket.on('errors', data => onChat(data))
    socket.on('newMsg', data => onChat(data))
    socket.on('create room', data => onChat(data, 0, 1))

    geralForm.addEventListener('submit', e => {
        e.preventDefault()
        const nick = geralChat.querySelector('.nick-input')
        const message = geralChat.querySelector('.msg-input')
        const data = validMsg(nick.value, message.value, room)
        message.value = ''
        if(data.errors.length > 0) return onChat({ nick: 'Warning', message: `Ops, alguns erros: ${data.errors.join(', ')}.` })
        socket.emit('msg', data)
        onChat(data, 1)
    })
}

function onChat(data, val, dev) {
    let msg = `
            <div class="msg-send-chat-me" ${dev ? 'style="background: var(--blue); color: var(--light);"': ''}>
                <h5 class="nick">${val ? 'Você' : data.nick}</h5>
                <span class="send">${data.message}</span>
                ${dev ? '<br><button class="btn-room">Sim</button>': ''}
            </div>
        ` 
    chat.innerHTML = msg + chat.innerHTML
}

function validMsg(nick, message, room) {
    const errors = []
    if (!nick || typeof nick !== 'string' || nick.length > 35) errors.push('nome inválido ou grande demais')
    if (!room || typeof room !== 'string') errors.push('sala inválida')
    if (!message || typeof message !== 'string' || message.length > 200) errors.push('mensagem inválida ou grande demais. Máximo de 200 caracteres')
    return { nick, message, room, errors }
}

export { serverIo }