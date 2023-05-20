const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db =  require("./config/mongoose");
const cookieParser =  require('cookie-parser');
const env =  require('./config/environment')

// used for session cookies
const session =  require('express-session');
const passport =  require('passport');
const passportLocal =  require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const mongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');
const flash =  require('connect-flash');
const customMware  =  require('./config/middleware')
const passportGoogle =  require("./config/passport-google-oauth2-strategy");
const cors = require("cors")
const path = require('path');

const chatServer = require('http').Server(app);
const chatSockets =  require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening at port 5000');

app.use(sassMiddleware({
    src : path.join(__dirname , env.asset_path , 'scss'),
    dest : path.join(__dirname , env.asset_path , 'css'),
    debug : true,
    outputStyle:'extended',
    prefix : '/css'

}))

app.use(express.static(env.asset_path));
// make the upload paths available in the browser
app.use('/uploads' , express.static(__dirname + '/uploads'))

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
app.options("*", cors())


//extract layout and scripts to layout page
app.set('layout extractStyles' , true);
app.set('layout extractScripts'  ,true)

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views')


app.use(session({
    name : 'Codeial',
    secret : env.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie :{
        maxAge : (1000 * 60 * 60)
    },
    store :   mongoStore.create({
        mongoUrl : 'mongodb://0.0.0.0/codeial_dev',
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash)

//routes
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`error in running the server${err}`);
    }
    console.log(`Server is running on : ${port}`);
})