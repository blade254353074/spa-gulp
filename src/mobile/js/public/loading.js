var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global');

module.exports = {
    $loading: $(template('./public/loading', {})),
    started: false,
    clock: null,
    start: function() {
        var self = this;
        if (!this.started) {
            this.started = !this.started;
            this.clock = setTimeout(function() {
                global.$body.append(self.$loading);
            }, 300);
        }
    },
    stop: function() {
        if (this.started) {
            try {
                clearTimeout(this.clock);
            } catch (e) { }
            this.started = !this.started;
            this.$loading.remove();
        }
    }
};
