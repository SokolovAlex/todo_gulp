var Observable = require('./Observable.js');
var $ = require('../../bower_components/jquery/dist/jquery.js');

module.exports = function() {
    var self = {};

    var $el,
        $input;

    function bind() {
        $input.on('keyup', function(e) {
            if (e.which == 13) {
                self.emit('submit', $input.val());
            }
        });
    };

    self.init = function(el) {
        Observable(self);
        $el = el;
        $input = $('input', $el);
        bind();
    };

    self.clear = function() {
        $input.val('');
    };

    return self;
};