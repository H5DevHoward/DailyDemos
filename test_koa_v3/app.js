'use strict';

const app = require('koa')();
const serve = require('koa-static');
const path = require('path');
const onerror = require('koa-onerror');
const render = require('koa-ejs');
const router = require('koa-router')();
const koaBody = require('koa-body')();
const logger = require('koa-logger');

const QAQ = [
    {
        Q: '1.Try to remember the numbers',
        a: ['a.red', 'b.green', 'c.blue'],
        m: [
            {
                title: 'Only one chance',
                content: '3.14159 26535 89793 23846 26433 83279 50288',
                timeout: 5
            },
            {
                title: 'Only one chance',
                content: '3.14159 26535 89793 23846 26433 83279 50288 41971 69399 37510 58209',
                timeout: 4
            },
            {
                title: 'Only one chance',
                content: '3.14159 26535 89793 23846 26433 83279 50288 41971 69399 37510 58209 74944 59230 78164',
                timeout: 3
            }
        ]
    }, {
        Q: '2.Try to find all the differences in 30s',
        a: ['a.green', 'b.blue', 'c.red'],
        m: ['img/product2_1.jpg', 'img/product2_2.jpg']
    }, {
        Q: '3.Try to find all the differences in 30s',
        a: ['a.green', 'b.blue', 'c.red'],
        m: ['img/product2_1.jpg', 'img/product2_2.jpg']
    }
];

const otherAccess = [
    {
        qIndex: 0,
        poster: 'img/p1.jpeg'
    },
    {
        qIndex: 1,
        poster: 'img/p2.jpeg'
    },
    {
        qIndex: 2,
        poster: 'img/p3.jpeg'
    },
    {
        qIndex: 3,
        poster: 'img/p4.jpeg'
    },
    {
        qIndex: 4,
        poster: 'img/blur.svg'
    }
];

const qAnswer = new Map();

app.use(serve(path.join(__dirname, 'public')));
app.use(logger());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: '__layout',
    viewExt: 'ejs',
    cache: false,
    debug: true
});


router
    .get('/', function*(next) {
        yield this.render('home', {
            QAQ: QAQ,
            otherAccess: otherAccess[0],
            layout: '__layout'
        });
    })
    .post('/q1', koaBody, function*(next) {
        this.body = {
            QAQ: QAQ[0],
            otherAccess: otherAccess[1]
        };
        yield next;
    })
    .post('/q2', koaBody, function*(next) {
        this.body = {
            QAQ: QAQ[1],
            otherAccess: otherAccess[2]
        };
        yield next;
    })
    .post('/q3', koaBody, function*(next) {
        this.body = {
            QAQ: QAQ[2],
            otherAccess: otherAccess[3]
        };
        yield next;
    })
    .get('/check', function*(next) {
        for(const [key, value] of qAnswer) {
            console.log(key, value);
        }
    })
    .post('/result', koaBody, function*(next) {
        console.log(qAnswer);
        this.body = {
            result: 'DONE!',
            otherAccess: otherAccess[4]
        };
        yield next;
    })
    .post('/save', koaBody, function*(next){
        let params = this.request.body;
        qAnswer.set(params.qIndex, params.answer);

        yield this.render('/q', {
            answer: params.answer,
            layout: false
        });
    });

app.use(router.routes());

onerror(app);

app.listen(3123);
console.log('listening on port 3123');
