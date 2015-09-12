(function() {
    'use strict';
    var $ = require('jquery');
    var director = require('director'),
        template = require('./public/helper'),
        cookie = require('./public/cookie');

    var global = require('./public/global'),
        loading = require('./public/loading'),
        modal = require('./public/modal');

    module.exports = function() {
        if (!window.console) {
            console = {};
            console.log = function() {};
        }
        $.ajaxSetup({
            error: function() {
                modal.show({
                    title: '警告',
                    content: '网络请求失败',
                    type: 'info'
                });
            },
            complete: function(xhr) {
                if (xhr.status === '401') {
                    cookie.delCookie('un');
                    location.hash = '#/login';
                }
            }
        });
        var notfound = function() {

        };

        var routes = {
            '/': 'welcome',
            '/page': {
                on: 'page'
            }
        };

        var container = {
            welcome: function() {
                var hash = location.hash;
                if (hash === '#/' || hash === '') {
                    window.location.hash = '#/page';
                    return;
                }
            },
            page: require('./page/page')
        };

        var routerBefore = function() {
                console.log('routerBefore');
            },
            routerOn = function() {
                console.log('routerOn');
            },
            routerAfter = function() {
                console.log('routerAfter');
            };

        var router = director.Router(routes).configure({
            recurse: 'forward',
            strict: true, //当值为"false"时，路径允许以"/"结尾（也可以是其他自定义的分隔符）；默认值是"true"，说明默认不允许路径以"/"结尾
            resource: container,
            notfound: notfound,
            before: routerBefore,
            on: routerOn,
            after: routerAfter
        });
        loading.start();
        router.init('/');
    };
}());
