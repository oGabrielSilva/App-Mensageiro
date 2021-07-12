const Login = require('../models/Login')

exports.index = (req, res) => {
    return res.render('login')
}

exports.signup = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.signup()

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/signup')
            })
            return
        }

        req.flash('success', 'Sua conta foi criada com sucesso.')
        req.session.save(function() {
            return res.redirect('/signup')
        })
        return
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.signin = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.signin()

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/signup#email-login')
            })
            return
        }

        req.flash('success', 'Login realizado com sucesso.')
        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('/')
        })
        return
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.out = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
