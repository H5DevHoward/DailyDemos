'use strict';

var app = require('koa')();
var serve = require('koa-static');
var path = require('path');
var onerror = require('koa-onerror');
var render = require('koa-ejs');
var router = require('koa-router')();
var logger = require('koa-logger');

app.use(serve(path.join(__dirname, 'public')));
app.use(logger());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: '__layout',
    viewExt: 'html',
    cache: false,
    debug: true
});

// app.use(function*() {
//     yield this.render('index', {
//         layout: false
//     });
// });

var user = {
    name: {
        first: 'Tobi',
        last: 'Holowaychuk'
    },
    species: 'ferret',
    age: 3
};

var QAQ = {
    QAQ: [{
        Q: '选一种边框颜色',
        a: 'red',
        b: 'green',
        c: 'blue'
    }, {
        Q: '选一种背景颜色',
        a: 'green',
        b: 'blue',
        c: 'red'
    }, {
        Q: 'xx',
        a: 'x',
        b: 'x',
        c: 'x'
    }]
};

router.get('/', function*(next) {
    yield this.render('index', {
        // user: user,
        QAQ: QAQ,
        layout: false
    });
});

app.use(router.routes());

onerror(app);

app.listen(3123);
console.log('listening on port 3123');
