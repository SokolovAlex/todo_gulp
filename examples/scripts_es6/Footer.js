var Observable = require('./Observable.js');
var $ = require('jquery');

module.exports = function() {
    var $el,
        $amount;

    return Observable({
        init: function(el) {
            $el = el;
            $amount = $('.amount', $el);
        },
        setAmount: function(value) {
            $amount.text(value);
        }
    });
};