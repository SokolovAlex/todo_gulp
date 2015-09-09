module.exports = function(obj) {
    var events = {};

    obj.on = function(name, cb) {
        events[name] = cb;
    };

    obj.emit = function(name) {
        if (events[name]) {
            var args = Array.prototype.slice.call(arguments).splice(1, arguments.length);
            events[name].apply(obj, args);
        }
    };

    return obj;
};