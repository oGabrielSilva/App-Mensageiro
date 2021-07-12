exports.index = (req, res) => {
    return res.render('chat', { room: 'off topic' })
}

exports.chatParams = (req, res) => {
    if(!req.params.id) return res.render('404')
    return res.render('chat', { room: req.params.id })
}