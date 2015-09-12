var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global'),
    loading = require('../public/loading');

module.exports = function() {
    global.$app.html(template('./page/index', {}));

    // 拖拽组件初始化
    var dragModuleData = {
        list: [{
            id: './components/article-list/theme1',
            icon: 'nothing',
            name: '模块1'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块2'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块3'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块4'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块5'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块6'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块7'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块8'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块9'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块0'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块11'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块12'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块13'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块14'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块15'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块16'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块17'
        }, {
            id: 'list/list-info',
            icon: 'nothing',
            name: '模块18'
        }]
    };
    var $dragBox = $('#dragBox')
    $dragBox.on('dragstart', '.drag-item', function(event) {
        var $this = $(this),
            id = $this.data('id');
        var dt = event.originalEvent.dataTransfer;
        dt.effectAllowed = 'all';
        dt.setDragImage($('<img>').attr('src', '/assets/index/imgs/icon.png')[0], 60, 55);
        dt.setData('text/plain', id);
    });
    $('iframe').on('mousewheel', function(event) {
        event.preventDefault();
    });

    $dragBox.html(template('./components/module', dragModuleData));

    loading.stop();
};
