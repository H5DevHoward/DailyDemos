'use strict';

import 'babel-polyfill';
import fetchJsonp from 'fetch-jsonp';
import $ from "jquery";

// var jsonData = {
//     id: 42,
//     status: "OK",
//     data: [867, 5309]
// };
//
// let {
//     id,
//     status,
//     data
// } = jsonData;
// console.log(id, status, data);


// var map = new Map();
// map.set('first', 'hello');
// map.set('second', 'world');
//
// for (const [key, value] of map) {
//     console.log(key + ' is ' + value);
// }

// var s = 'Hello world!';
// console.log(s.startsWith('world', 5), s.endsWith('Hello', 6), s.includes('Hello', 6));

// const tmpl = addrs => `
//   <table>
//   ${addrs.map(addr => `
//     <tr><td>${addr.first}</td></tr>
//     <tr><td>${addr.last}</td></tr>
//   `).join('')}
//   </table>
// `;
// const data = [
//     { first: '<Jane>', last: 'Bond' },
//     { first: 'Lars', last: '<Croft>' },
// ];
// console.log(tmpl(data));

// function example() {
//     return {
//         foo: 1,
//         bar: 2
//     };
// }
// var {
//     foo,
//     bar
// } = example();

// const toArray = (() =>
//     Array.from ? Array.from : obj => [].slice.call(obj)
// )();
// console.log(toArray({
//     '0': 'a',
//     '1': 'b',
//     '2': 'c',
//     length: 3
// }));

// console.log(Array.from([1, 0, 2, , 3], (n) => n || 9));

// const countSymbols = string => Array.from(string).length;
// console.log(countSymbols('howard'));

// console.log([].copyWithin.call({
//     length: 5,
//     3: 1
// }, 0, 3));

// console.log([1, 2].findIndex(y => Object.is(NaN, y)));

// console.log(Array(3), new Array(3), Array.from({
//     length: 3
// }));

// const contains = (() =>
//     Array.prototype.includes ?
//     (arr, value) => arr.includes(value) :
//     (arr, value) => arr.some(el => el === value)
// )();
// console.log(contains(["foo", "bar"], "baz"));

// console.log([, 'a', 'b', , ].copyWithin(2, 0));

// function log(x, y = 'World') {
//     console.log(x, y);
// }
// log('Hello');

// function Point(x = 0, y = 0) {
//     this.x = x;
//     this.y = y;
// }
//
// var p = new Point(1, 2);
// console.log(p);

// function push(array, ...items) {
//     // items.forEach(function(item) {
//     //     array.push(item);
//     //     console.log(item);
//     // });
//     array.push(...items);
// }
//
// var a = [];
// push(a, 2, 2, 3);
// console.log(a);

// function f(v, w, x, y, z) {
//     console.log(v + w + x + y + z);
// }
// var args = [0, 1];
// f(-1, ...args, -2, ...[3]);

// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// Array.prototype.push.apply(arr1, arr2);
// console.log(arr1);

// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// arr1.push(...arr2);
// console.log(arr1);

// var nodeList = document.querySelectorAll('.dv');
// var array = [...nodeList];
// for (var item of array) {
//     console.log(item);
// }

// let arrayLike = {
//     '0': 'a',
//     '1': 'b',
//     '2': 'c',
//     length: 3
// };
//
// let arr = [...arrayLike];
// arr.forEach(function(item) {
//     console.log(item);
// });

// function Timer() {
//     this.s1 = 0;
//     this.s2 = 1;
//     // 箭头函数
//     setInterval(() => ++this.s1, 1000);
//     // 普通函数
//     setInterval(function() {
//         this.s2++;
//     }, 1000);
// }
//
// var timer = new Timer();
//
// setTimeout(() => console.log('s1: ', timer.s1), 3100);
// setTimeout(() => console.log('s2: ', timer.s2), 3100);

// var func = new Function();
// console.log(func.name);

// var target = {
//     a: 1
// };
//
// var source1 = {
//     b: 2
// };
// var source2 = {
//     c: 3
// };
//
// Object.assign(target, source1, source2);
// console.log(target);

// var v2 = true;
// var v3 = 10;
//
// var obj = Object.assign(v2, v3);
// console.log(obj);

// var proxy = new Proxy({}, {
//     get: function(target, property) {
//         return 35;
//     }
// });
//
// let obj = Object.create(proxy);
// console.log(obj.time);

// function createArray(...elements) {
//     let handler = {
//         get(target, propKey, receiver) {
//             let index = Number(propKey);
//             if (index < 0) {
//                 propKey = String(target.length + index);
//             }
//             return Reflect.get(target, propKey, receiver);
//         }
//     };
//
//     let target = [];
//     target.push(...elements);
//     return new Proxy(target, handler);
// }
//
// let arr = createArray('a', 'b', 'c');
// console.log(arr[4]);

// const dom = new Proxy({}, {
//     get(target, property) {
//         return function(attrs = {}, ...children) {
//             const el = document.createElement(property);
//             for (let prop of Object.keys(attrs)) {
//                 el.setAttribute(prop, attrs[prop]);
//             }
//             for (let child of children) {
//                 if (typeof child === 'string') {
//                     child = document.createTextNode(child);
//                 }
//                 el.appendChild(child);
//             }
//             return el;
//         }
//     }
// });
//
// const el = dom.div({},
//     'Hello, my name is ',
//     dom.a({
//         href: '//example.com'
//     }, 'Mark'),
//     '. I like:',
//     dom.ul({},
//         dom.li({}, 'The web'),
//         dom.li({}, 'Food'),
//         dom.li({}, '…actually that\'s it')
//     )
// );
//
// document.body.appendChild(el);

// var set = new Set([1, 2, 3, 4, 4]);
// console.log([...set]);

// let set = new Set([1, 2, 3]);
// set = new Set([...set].map(x => x * 2));
// console.log(set);

// let set = new Set([1, 2, 3, 4, 5]);
// set = new Set([...set].filter(x => !(x % 2)));
// console.log(set);

// let jane = {
//     first: 'Jane',
//     last: 'Doe'
// };
// console.log(jane.last);
// for (let key in jane) {
//     console.log(key + ': ' + jane[key]);
// }

// var p1 = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000);
// });
//
// var p2 = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(p1), 1000);
// });
//
// p2
//     .then(result => console.log(result))
//     .catch(error => console.log(error));

// var getJSON = function(url) {
//     var promise = new Promise(function(resolve, reject) {
//         var client = new XMLHttpRequest();
//         client.open("GET", url);
//         client.onreadystatechange = handler;
//         client.responseType = "jsonp";
//         client.setRequestHeader("Accept", "application/jsonp");
//         client.send();
//
//         function handler() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         }
//     });
//
//     return promise;
// };
// getJSON('http://www.refinery29.com/api/2/feeds/music?limit=5&offset=0&callback=feedSuccess2').then(
//     post => console.log(post)
// ).then(
//     comments => console.log("Resolved: ", comments),
//     err => console.log("Rejected: ", err)
// );

// Promise.prototype.done = function(onFulfilled, onRejected) {
//     this.then(onFulfilled, onRejected)
//         .catch(function(reason) {
//             // 抛出一个全局错误
//             setTimeout(() => {
//                 throw reason;
//             }, 0);
//         });
// };
//
// let thenable = {
//     then(resolve, reject) {
//         resolve(42);
//     }
// };
//
// let p1 = Promise.resolve(thenable);
// p1
//     .then(value => console.log(value))
//     .done(() => console.log('done'));

// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }
//
// Point.prototype.toString = function() {
//     return `(this.x, this.y)`;
// };
//
// console.log(new Point(1, 2));

// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     toString() {
//         return `(this.x, this.y)`;
//     }
// }
// console.log(new Point(1, 2));

// class Logger {
//     constructor() {
//         this.printName = (name = 'there') => {
//             this.print(`Hello ${name}`);
//         };
//     }
//
//     print(text) {
//         console.log(text);
//     }
// }
//
// const logger = new Logger();
// const {
//     printName
// } = logger;
// printName('world');

// class Foo {
//     static classMethod() {
//         return 'hello';
//     }
// }
//
// class Bar extends Foo {
//     static classMethod() {
//         return super.classMethod() + ', too';
//     }
// }
//
// console.log(Bar.classMethod());

const arrJsonp = [
    'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=0&callback=feedSuccess2',
    'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=10&callback=feedSuccess2',
    'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=15&callback=feedSuccess2',
    'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=20&callback=feedSuccess2',
    'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=25&callback=feedSuccess2',
    'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=30&callback=feedSuccess2'
];
// fetchJsonp('http://www.refinery29.com/api/2/feeds/music?limit=5&offset=0&callback=feedSuccess2')
//     .then(function(response) {
//         return response.json()
//     }).then(function(json) {
//         console.log('resolved');
//     }).catch(function(ex) {
//         console.log('rejected');
//     });

let promises = arrJsonp.map((x) => {
    return new Promise((resolve, reject) => {
        fetchJsonp(x)
            .then(response => {
                return response.json();
            })
            .then(json => {
                resolve(json);
            });
    });
});

Promise.all(promises)
    .then(posts => {
        console.log('Resolved', posts);
    })
    .catch(reason => {
        console.log('Rejected')
    });


// $.ajax({
//     url: 'http://www.refinery29.com/api/2/feeds/music?limit=5&offset=0&callback=feedSuccess2',
//     dataType: 'jsonp',
//     jsonpCallback: 'func',
//     success: function(result) {
//         console.log('sucess');
//     }
// });

// $.getJSON('http://www.refinery29.com/api/2/feeds/music?limit=5&offset=0&callback=feedSuccess2', {
//         format: "jsonp"
//     })
//     .done(function(data) {
//         console.log('lol');
//     });

// window.addEventListener('load', init, false);
