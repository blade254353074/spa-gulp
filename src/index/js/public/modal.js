var $ = require('jquery');

module.exports = (function() {
    var func = function() {};
    var defaultOpt = {
        version: '0.0.1',
        $body: $('body'),
        fadeIn: {
            opacity: 0.5
        },
        shown: false,
        exiting: false,
        title: '提示',
        size: 'sm',
        content: '',
        type: '',
        before: func,
        after: func,
        cancel: func,
        confirm: func,
        hide: func
    };

    /* title, content, type('', 'info, 'confirm', 'warning')*/
    function create(title, content, type, size) {
        var footerHtml = '';
        if (typeof type !== 'undefined') {
            switch (type) {
                case 'info':
                    footerHtml = '<button class="btn btn-info" data-confirm="true">确定</button>';
                    break;
                case 'confirm':
                    footerHtml = '<button class="btn btn-default" data-cancel="true">取消</button>\n' +
                        '<button class="btn btn-primary" data-confirm="true">确定</button>';
                    break;
                case 'warning':
                    footerHtml = '<button class="btn btn-default" data-cancel="true">取消</button>\n' +
                        '<button class="btn btn-danger" data-confirm="true">确定</button>';
                    break;
                default:
                    break;
            }
        }
        var modalSize = '';
        if (typeof size !== 'undefined') {
            switch (size) {
                case 'lg':
                    modalSize = 'modal-lg';
                    break;
                case '':
                case 'sm':
                    modalSize = 'modal-sm';
                    break;
                //case 'md':
                default:
                    break;
            }
        }
        var modalHtml = '<div class="modal" tabindex="-1">\n' +
            '<div class="modal-dialog ' + modalSize + '">\n' +
            '<div class="modal-content">\n' +
            '<div class="modal-header">' + title + '</div>\n' +
            '<div class="modal-body">' + content + '</div>\n';
        if (footerHtml !== '') {
            modalHtml += '<div class="modal-footer">' + footerHtml + '</div>\n';
        }
        modalHtml += '</div>\n' + '</div>\n' + '</div>';
        return $(modalHtml);
    }

    // 隐藏函数
    function modalHide($modal, cfg) {
        // 如果正在退出，则 return
        if (cfg.exiting) {
            return;
        }
        cfg.exiting = true;
        // $modal fadeOut
        $modal.removeClass('fadeIn');
        setTimeout(function() {
            // $mask fadeOut
            cfg.$mask.css({
                opacity: 0
            });
            $modal.hide().remove();
            setTimeout(function() {
                cfg.$mask.remove();
                cfg.$body.removeClass('modal-open');
                // 重置exiting
                cfg.exiting = false;
                // 模态框消失后，调用hide回调
                if (typeof cfg.hide === 'function') {
                    try {
                        cfg.hide();
                    } catch (e) {
                        console.error(e);
                    }
                }
            }, 300);
        }, 150);
    }

    function init(arg) {
        var config = $.extend({}, defaultOpt, arg);
        config.$mask = $('<div></div>').css({
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: '#000',
            zIndex: 999,
            opacity: 0,
            transition: 'opacity .3s linear'
        });
        return config;
    }
    var modal = {
        config: {},
        show: function() {
            if (arguments.length === 1 && typeof arguments[0] === 'object') {

            }
            // object
            this.config = init(arguments[0]);
            var _cfg = this.config;
            var $modal = create(_cfg.title, _cfg.content, _cfg.type, _cfg.size);
            if (typeof _cfg.before === 'function') {
                try {
                    _cfg.before();
                } catch (e) {
                    console.error(e);
                }
            }
            // 向body添加 $mask 和 $modal
            // 并且添加 modal-open 来隐藏body滚动条
            _cfg.$body.append(_cfg.$mask).append($modal).addClass('modal-open');

            // $mask fadeIn
            setTimeout(function() {
                _cfg.$mask.css(_cfg.fadeIn);
            }, 0);
            // 150毫秒后
            setTimeout(function() {
                if (typeof _cfg.after === 'function') {
                    try {
                        _cfg.after();
                    } catch (e) {
                        console.error(e);
                    }
                }
                // 解绑 click
                $modal.off('click');
                // 阻止 .modal-dialog 冒泡
                $modal.on('click', '.modal-dialog', function(event) {
                    event.stopPropagation();
                });
                // 退出模态框 按钮触发
                $modal.on('click', 'button[data-cancel="true"]', function(event) {
                    event.preventDefault();
                    if (typeof _cfg.cancel === 'function') {
                        try {
                            _cfg.cancel();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    modalHide($modal, _cfg);
                });
                // 确认按钮触发
                $modal.on('click', 'button[data-confirm="true"]', function(event) {
                    event.preventDefault();
                    if (typeof _cfg.confirm === 'function') {
                        try {
                            _cfg.confirm();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    modalHide($modal, _cfg);
                });
                // $modal fadeIn
                // 给$modal 绑定点击事件，点击以后退出
                $modal.show().addClass('fadeIn').on('click', function(event) {
                    event.preventDefault();
                    modalHide($modal, _cfg);
                });
            }, 150);
        },
        hide: function() {
            if (typeof this.config.hide === 'function') {
                try {
                    this.config.hide();
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };

    /*    modal.show({
            title: 't',
            content: 'c',
            type: '"" or info warning confirm',
            size: '"" or lg sm'
            before: function() { },
            after: function() { },
            cancel: function() {},
            confirm: function() { },
            hide: function() { }
        });
    */
    return modal;
}());
