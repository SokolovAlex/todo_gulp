var Observable = require('./Observable.js');
var $ = require('jquery');

module.exports = function() {
    var $el,
        $amount;

    return Observable({
        init(el) {
            $el = el;
            $amount = $('.amount', $el);
        },
        setAmount(value) {
            $amount.text(value);
        }
    });
};