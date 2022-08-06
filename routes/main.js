const router = require('express').Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    res.render('site/index');
})

router.get('/about', (req, res) => {
    res.render('site/about');
})

router.get('/blog', (req, res) => {
    Post.find({}).lean().then(posts => {
        res.render('site/blog', {posts : posts.reverse()});
    })
})

router.get('/contact', (req, res) => {
    res.render('site/contact');
})







module.exports = router;