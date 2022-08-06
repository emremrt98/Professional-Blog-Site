const router = require('express').Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('site/register');
})

router.post('/register', (req, res) => {
    const { userName, email } = req.body;

    const uniqueUser = User.findOne({ userName, email }).then((data) => {
        if (data) {
            req.session.sessionFlash = {
                type: 'alert alert-danger',
                message: 'Kullanıcı zaten kayıtlı'
            }
            res.redirect('/users/register')
        } else {
            User.create(req.body, (error, user) => {
                req.session.sessionFlash = {
                    type: 'alert alert-success',
                    message: 'Kullanıcı başarılı bir şekilde oluşturuldu'
                }
                res.redirect('/users/login')
            })
        }
    })
})

router.get('/login', (req, res) => {
    res.render('site/login');
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (user) {
            if (user.password == password) {
                //USER SESSION
                req.session.userId = user._id;

                res.redirect('/')
            } else {
                res.redirect('/users/login');
            }
        } else {
            res.redirect('/users/register')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    })
    
})

module.exports = router