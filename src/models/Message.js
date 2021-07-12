class Message {
    constructor(body) {
        this.body = body;
    }

    valid() {
        this.cleanUp() 

        if(!this.body.nick) this.body.errors.push('Nome é um campo obrigatório')
        if(!this.body.message) this.body.errors.push('A mensagem é obrigatória')
        if(!this.body.room) this.body.errors.push('Algo deu errado')
    }

    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            nick: this.body.nick,
            message: this.body.message,
            room: this.body.room
        }
    }

    static rooms() {
        return [
            'off topic', 'Games', 'Animes', 'Filmes', 'Séries', 'Programação',
            'Marvel', 'Universo', 'Signos', 'RPG', 'Esportes', 'E-sports'
        ];
    }

    static validRoom(postman) {
        const rooms = this.rooms()
        const aux = []
        for(let room of rooms) {
            if(room === postman) {
                aux.push(room)
            }
        }
        return aux
    }
}

module.exports = Message;
