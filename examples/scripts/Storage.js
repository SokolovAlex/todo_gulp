module.exports = function() {
    var self = {}
    var _key = "gg";
    var _localStorage;

    self.init = function() {
        _localStorage = (function() {
            try {
                return 'localStorage' in window && window['localStorage'];
            } catch (e) {
                return false;
            }
        })();
    };

    self.get = function() {
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

    self.sync = function(array) {
        if (!_localStorage) {
            return;
        }
        _localStorage.setItem(_key, JSON.stringify(array));
    };

    self.set = function(value) {
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

     return self;
};