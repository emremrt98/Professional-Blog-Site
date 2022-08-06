const express = require('express');
const app = express();
const port = 3000;
const hostName = '127.0.0.1';
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const main = require('./routes/main');
const posts = require('./routes/posts');
const fileUpload = require('express-fileupload');
const generateDate = require('./helpers/generateDate').generateDate;
const users = require('./routes/users');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

mongoose.connect(`mongodb://${hostName}/nodeblog_db`, {
    useNewURLParser: true,
    useUnifiedTopology: true
});


const mongoStore = connectMongo(expressSession);
app.use(expressSession({
    secret: "testotesto",
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))

// Flash - Message Middleware
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next();
})

app.use(fileUpload());

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine({ helpers: { generateDate } }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Display Link Middleware
app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals = {
            displayLink: true,
        }
    } else {
        res.locals = {
            displayLink: false,
        }
    }
    next();
})


app.use('/', main);
app.use('/posts', posts);
app.use('/users', users);


app.listen(port, hostName, () => {
    console.log(`Server Çalışıyor http://${hostName}:${port}`);
})