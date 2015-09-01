var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Observable = function(obj) {
    var events = {};

    obj.on = function(name, cb) {
        events[name] = cb;
    };

    obj.emit = function(name) {
        var args = Array.prototype.slice.call(arguments).splice(1, arguments.length);
        events[name].apply(self, args);
    };
};