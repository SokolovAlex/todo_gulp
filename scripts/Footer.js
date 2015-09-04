var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Footer = function() {
    var self = this;
    var $el,
        $amount;

    function bind() {

    };

    this.init = function(el) {
        gg.class.Observable(self);
        $el = el;
        $amount = $('.amount', $el);
        bind();
    };

    this.setAmount = function(value) {
        $amount.text(value);
    };
};