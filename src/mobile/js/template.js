/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:1*/
    template("common/module-control", '<div class="module-control"> <span class="module-move"> <i class="icon icon-move"></i> </span> <span class="module-delete"> <i class="icon icon-remove"></i> </span> </div> '), 
    /*v:1*/
    template("common/module-placeholder", '<div class="module-placeholder">放到这里</div> '), 
    /*v:2*/
    template("page/index", '<header class="header"> 头部 </header> <div id="dropArea" class="content"> 请投掷 </div> <footer class="footer"> 尾部 </footer> '), 
    /*v:1*/
    template("public/loading", '<div class="loading"> <div class="loading-pacman"> <div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> '), 
    /*v:1*/
    template("public/modal", function($data) {
        "use strict";
        var $utils = this, $string = ($utils.$helpers, $utils.$string), title = $data.title, content = $data.content, $out = "";
        return $out += '<div class="modal" tabindex="-1"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header">', 
        $out += $string(title), $out += '</div> <div class="modal-body">', $out += $string(content), 
        $out += "</div> </div> </div> </div> ", new String($out);
    }), /*v:1*/
    template("public/navigation", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), menu = $data.menu, $string = ($data.$value, 
        $data.$index, $utils.$string), $out = ($data.item, "");
        return $out += '<ul id="navigation" class="nav"> ', $each(menu, function($value) {
            $out += ' <li class="nav-item"> <a> <span class="icon ', $out += $string($value.icon), 
            $out += '"></span> <span>', $out += $string($value.title), $out += '</span> <span class="symbol"></span> </a> ', 
            0 !== $value.list.length && ($out += ' <ul class="sub-nav"> ', $each($value.list, function(item) {
                $out += ' <li class=\'sub-list\'> <a class="sub-item" href="', $out += $string(item.hash), 
                $out += '" data-root="', $out += $string(item.root), $out += '"> <span>', $out += $string(item.title), 
                $out += "</span> </a> </li> ";
            }), $out += " </ul> "), $out += " </li> ";
        }), $out += " </ul> ", new String($out);
    }), /*v:3*/
    template("components/article-list/theme1", function($data) {
        "use strict";
        var $utils = this, list = ($utils.$helpers, $data.list), $each = $utils.$each, $string = ($data.$value, 
        $data.$index, $utils.$string), id = $data.id, $out = "";
        return $out += '<div class="article-list t1"> <ul> ', list ? ($out += " ", $each(list, function($value) {
            $out += ' <li> <a href="/article/', $out += $string(id), $out += '"></a> <img src="', 
            $out += $string($value.cover), $out += '" class="cover"> <div class="content"> <h4 class="title">', 
            $out += $string($value.title), $out += '</h4> <div class="summary">', $out += $string($value.summary), 
            $out += "</div> </div> </li> ";
        }), $out += " ") : $out += ' <li class="ph"> 文章列表为空，请添加文章 </li> ', $out += " </ul> </div> ", 
        new String($out);
    }), /*v:1*/
    template("components/article-list/theme2", ""), /*v:1*/
    template("components/article-list/theme3", ""), /*v:3*/
    template("components/common/footer", '<footer class="footer"> Footer © SebastianBlade 2015 </footer> '), 
    /*v:3*/
    template("components/common/header", '<header class="header"> <div class="logo">Logo</div> <div class="pull-right"> <a class="btn btn-default">Menu</a> </div> </header> '), 
    /*v:1*/
    template("components/photo-group/theme1", ""), /*v:1*/
    template("components/photo-group/theme2", ""), /*v:1*/
    template("components/photo-group/theme3", "");
}();