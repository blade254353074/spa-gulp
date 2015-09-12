var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global'),
    option = require('./option'),
    loading = require('../public/loading');

module.exports = function() {
    global.$app.html(template('./page/index', {}));
    // 初始化DropArea
    var $dropArea = $('#dropArea'),
        $pl = $(template('./common/module-placeholder', {}));
    $dropArea.on({
        dragover: function(event) {
            event.preventDefault();
            //  针对拖放的目标元素，必须在dragend或dragover事件内调用 event.preventDefault() 方法。因为默认情况下，拖放的目标元素是不允许接受元素的，为了把元素拖放到其中，必须把默认处理关闭。
        },
        dragleave: function(event) {
            var clientX = event.originalEvent.clientX,
                $module;
            if (clientX < 0 || clientX > $dropArea.width()) {
                $module = $(event.target);
                var $dropModule = $module.closest('.drop-module');
                if ($dropModule.length) {
                    $dropModule.removeData('add');
                } else if ($module.hasClass('module-placeholder')) {
                    var add = $module.data('add');
                    if (add === 'before') {
                        $module.next('.drop-module').removeData('add');
                    } else if (add === 'after') {
                        $module.prev('.drop-module').removeData('add');
                    }
                }
                $pl.remove();
            }
        },
        drop: function(event) {
            event.preventDefault();
            var data = event.originalEvent.dataTransfer.getData('text/plain');
            var $dropModule = moduleMake(data);
            $dropArea.append($dropModule);
            $dropModule.siblings('.active').removeClass('active');
        }
    });

    $dropArea.on('dragover', '.drop-module', function(event) {
        event.preventDefault();
        var $this = $(this),
            top = $this.offset().top,
            height = $this.outerHeight(true),
            add = $pl.data('add');
        //console.log(event.originalEvent.clientY - top + ' ' + height / 2);
        if (add === 'before' && event.originalEvent.clientY - top >= height / 2) {
            $this.data('add', 'after');
            $pl.data('add', 'after').insertAfter(this);
            return;
        }
        if (add === 'after' && event.originalEvent.clientY - top < height / 2) {
            $this.data('add', 'before');
            $pl.data('add', 'before').insertBefore(this);
        }
    });

    $dropArea.on('dragenter', '.drop-module', function(event) {
        var $this = $(this),
            top = $this.offset().top,
            height = $this.outerHeight(true),
            add = $pl.data('add');
        if ($.hasData(this)) {
            return;
        }
        if (event.originalEvent.clientY - top < height / 2) {
            $this.data('add', 'before');
            $pl.prev('.drop-module').removeData('add');
            $pl.data('add', 'before').insertBefore($this);
        } else {
            $this.data('add', 'after');
            $pl.next('.drop-module').removeData('add');
            $pl.data('add', 'after').insertAfter($this);
        }
    });

    function moduleMake(data) {
        var $dropModule = $(template(data, option['article-list']));
        $dropModule.addClass('drop-module active');
        $dropModule.append(template('./common/module-control', {}));
        return $dropModule;
    }

    function drop(event) {
        event.stopPropagation();
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData('text/plain'),
            add = $pl.data('add');
        if (add === 'before') {
            $pl.next('.drop-module').removeData('add');
        } else if (add === 'after') {
            $pl.prev('.drop-module').removeData('add');
        }
        var $dropModule = moduleMake(data);
        $pl.replaceWith($dropModule);
        $dropModule.siblings('.active').removeClass('active');
    }

    $dropArea.on('drop', '.drop-module', function(event) {
        drop(event);
    });

    $dropArea.on('drop', '.module-placeholder', function(event) {
        drop(event);
    });
    /* 模块点击，开始配置 */
    $dropArea.on('click', '.drop-module', function(event) {
        var $this = $(this);
        if ($this.hasClass('active')) {
            return;
        }
        $this.addClass('active').siblings('.active').removeClass('active');
        // TODO: Module Config
    });

    /* 模块移动 */
    var $moveElem;
    var $doc = $(document);
    $dropArea.on('mousedown', '.module-move', function(event) {
        event.preventDefault();
        var $this = $(this);
        $moveElem = $this.closest('.drop-module').addClass('moving');
        $doc.data('moving', true);
        mouseBind();
    });

    function mouseBind() {
        $dropArea.on('mousemove', '.drop-module', function(event) {
            if (!$doc.data('moving')) {
                return;
            }
            var $this = $(this),
                top = $this.offset().top,
                height = $this.outerHeight(true);
            // if ($.hasData(this)) {
            //     return;
            // }
            if (event.originalEvent.clientY - top < height / 2) {
                $this.data('add', 'before');
                $pl.prev('.drop-module').removeData('add');
                $pl.data('add', 'before').insertBefore($this);
            } else {
                $this.data('add', 'after');
                $pl.next('.drop-module').removeData('add');
                $pl.data('add', 'after').insertAfter($this);
            }
        });

        $doc.on('mousemove', function(event) {
            //event.preventDefault();
            var $this = $(this);
            if (!$doc.data('droppable')) {
                $doc.data('droppable', true);
                $pl.data('add', 'before').insertBefore($moveElem);
            }
            if ($this.data('moving')) {
                var width = $moveElem.outerWidth();
                $moveElem.css({
                    position: 'absolute',
                    width: width,
                    zIndex: '100'
                });
                $moveElem.offset(function(index, currentCoordinates) {
                    var pos = {
                        top: event.originalEvent.pageY - 12.5,
                        left: 0
                    };
                    return pos;
                });
            }
        });
        $doc.on('mouseup', function(event) {
            event.preventDefault();
            if ($doc.data('droppable')) {
                $moveElem.removeClass('moving').attr('style', '');
                var add = $pl.data('add');
                if (add === 'before') {
                    $pl.next('.drop-module').removeData('add');
                } else if (add === 'after') {
                    $pl.prev('.drop-module').removeData('add');
                }
                $pl.replaceWith($moveElem);
            }
            $moveElem.removeClass('moving');
            $moveElem = undefined;
            $doc.data({
                'moving': false,
                'droppable': false
            }).off('mouseup').off('mousemove');
            $dropArea.off('mousemove');
        });
    }

    loading.stop();
};
