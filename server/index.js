const db = require('./database')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload')

const filePath = __dirname + '/files/'

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({credentials: true, origin: ['http://10.2.10.51:3000', 'http://localhost:3000']}))
app.use(cookieParser())
app.use(expressSession({
    key: 'session',
    secret: 'muyBien',
    resave: false,
    saveUninitialized: false,
}))
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
})

// Debug
app.get('/getSession', (req, res) => {
    req.session.message = 'hello'
    res.send()
})

app.get('/logSession', (req, res) => {
    console.log(req.session)
    res.sendStatus(200)
})

// Routes
app.get('/movies', (req, res) => {
    console.log('GET request for /movies recieved')

    const sqlSelect = 'SELECT * FROM movies'
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/movies/post', (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = 'INSERT INTO movies (movieName, movieReview) values (?,?)'
    db.query(sqlInsert, [movieName, movieReview])
})

app.post('/sign-up', async (req, res) => {

    if (req.body.firstName && req.body.lastName && req.body.username && req.body.email && req.body.password) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const QUERY = 'insert into accounts(firstName, lastName, username, email, password) values (?, ?, ?, ?, ?)'
            db.query(QUERY, [req.body.firstName, req.body.lastName, req.body.username, req.body.email, hashedPassword],
                (err, result) => {
                    if (err) {
                        res.status(409).send('Email already exists')
                    } else res.status(200).send('Account successfully created')
                })
        } catch (e) {
            res.status(500).send('Server error')
        }
    } else res.status(400).send('Please fill all the fields')

})

app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        const email = req.body.email
        const password = req.body.password
    
        const QUERY = `SELECT * from accounts where email='${email}'`
        db.query(QUERY, (err, result) => {
            if (err) res.sendStatus(500)
            else {
                if (result.length) {
                    result.forEach((result) => {
                        bcrypt.compare(password, result.password)
                            .then((value) => {
                                if (value) {
                                    req.session.isAuth = true
                                    req.session.user = {firstName: result.firstName, lastName: result.lastName, username: result.username, email: result.email}
                                    res.status(200).send({firstName: result.firstName, lastName: result.lastName, username: result.username, email: result.email})
                                } else res.status(401).send('Incorrect password')
                            })
                    })
                } else res.status(401).send('Incorrect email')
            }
        })
    } else res.status(400).send('Please fill all the fields')
})
 
app.get('/getSessionInfo', (req, res) => {
    if (req.session.user) {
        res.send({firstName: req.session.user.firstName, 
            lastName: req.session.user.lastName, 
            username: req.session.user.username, 
            email: req.session.user.email})

    } else {
        res.sendStatus(204)
    }
})

app.post('/addFile', fileUpload() , (req, res) => {
    const file = req.files.file
    
    file.mv(filePath + file.name)
})

app.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) res.sendStatus(500)
        else res.sendStatus(200)
    })
})

app.listen(3001, '0.0.0.0',() => { console.log('Server listening') })