var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Storage = function() {
    //this = {}
    var _key = "gg";
    var _localStorage;

    this.init = function() {
        _localStorage = (function() {
            try {
                return 'localStorage' in window && window['localStorage'];
            } catch (e) {
                return false;
            }
        })();
    };

    this.get = function() {
        if (!_localStorage) {
            return [];
        }
        var args = Array.prototype.slice.call(arguments);

        if (args.length == 0) {
            _localStorage.getItem(_key);
            var arrayString = _localStorage.getItem(_key);
            try {
                return JSON.parse(arrayString) || [];
            } catch (ex){
                return [];
            }
        }
    };

    this.set = function(value) {
        if (!_localStorage) {
            return [];
        }

        var arrayString = _localStorage.getItem(_key);
        var array;
        try {
            array = JSON.parse(arrayString) || [];
        } catch (ex){
            return;
        }
        array.push(value);
        _localStorage.setItem(_key, JSON.stringify(array));
    };

    // return this;
};