'use strict';

const app = require('koa')();
const serve = require('koa-static');
const path = require('path');
const onerror = require('koa-onerror');
const render = require('koa-ejs');
const router = require('koa-router')();
const koaBody = require('koa-body')();
const logger = require('koa-logger');

const QAQ = {
    QAQ: [{
        Q: '1.选一种边框颜色',
        a: ['red', 'green', 'blue']
    }, {
        Q: '2.选一种背景颜色',
        a: ['green', 'blue', 'red']
    }, {
        Q: 'xx',
        a: ['x', 'x', 'x']
    }]
};

const otherAccess = [
    {
        qIndex: 0,
        poster: 'img/watch.jpeg'
    },
    {
        qIndex: 1,
        poster: 'img/lion.jpeg'
    },
    {
        qIndex: 2,
        poster: 'img/people.jpeg'
    },
    {
        qIndex: 3,
        poster: 'img/bridge.jpeg'
    },
    {
        qIndex: 4,
        poster: 'img/beach.jpeg'
    }
];

const q_answer = new Map();

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
            QAQ: QAQ.QAQ,
            start: 'start',
            otherAccess: otherAccess[0],
            layout: '__layout'
        });
    })
    .get('/q1', function*(next) {
        yield this.render('index', {
            QAQ: QAQ.QAQ[0],
            otherAccess: otherAccess[1],
            layout: '__layout'
        });
    })
    .get('/q2', function*(next) {
        yield this.render('index', {
            QAQ: QAQ.QAQ[1],
            otherAccess: otherAccess[2],
            layout: '__layout'
        });
    })
    .get('/q3', function*(next) {
        yield this.render('index', {
            QAQ: QAQ.QAQ[2],
            otherAccess: otherAccess[3],
            layout: '__layout'
        });
    })
    .get('/check', function*(next) {
        for(const [key, value] of q_answer) {
            console.log(key, value);
        }
    })
    .get('/result', function*(next) {
        console.log(q_answer);
        yield this.render('result', {
            result: 'DONE!',
            otherAccess: otherAccess[4],
            layout: '__layout'
        });
    })
    .get('/q', function*(next) {
        yield this.render('q', {
            answer: q_answer,
            layout: false
        });
    })
    .post('/save', koaBody, function*(next){
        let params = this.request.body;
        q_answer.set(params.qIndex, params.answer);

        yield this.render('/q', {
            answer: params.answer,
            layout: false
        });
    });

app.use(router.routes());

onerror(app);

app.listen(3123);
console.log('listening on port 3123');
