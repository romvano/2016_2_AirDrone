let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/chat', express.static('public', {maxAge: 1}));
app.use('/login', express.static('public', {maxAge: 1}));
app.use('/registration', express.static('public', {maxAge: 1}));
app.use('/scoreboard', express.static('public', {maxAge: 1}));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.get('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});

app.post('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});


app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
});

app.post('/user', (req, res) => {
         res.send(String('Пользователь зарегистрирован'));
         });

app.post('/session', (req, res) => {
         res.send(String('Добро пожаловать, пользователь!'));
         });

app.get('/rating', (req, res) => {
    res.send(JSON.stringify([{username: 'abc1', email: 'q@q.qqqqqqq', score: 43, games: 3 }, {username: 'abs2', email: 'w@wwwwwwwww.www', score: 23, games: 553}]));
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
