var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Input = function() {
    var self = this;

    var $el,
        $input;

    function bind() {
        $input.on('keyup', function(e) {
            if (e.which == 13) {
                self.emit('submit', $input.val());
            }
        });
    };

    this.init = function(el) {
        gg.class.Observable(self);
        $el = el;
        $input = $('input', $el);
        bind();
    };

    this.clear = function() {
        $input.val('');
    };
};