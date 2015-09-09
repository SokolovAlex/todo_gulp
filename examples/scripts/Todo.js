var Observable = require('./Observable.js');
var $ = require('jquery');
var _ = require('lodash');

module.exports = function(opt, collection) {
    var self = {};
    var templateFn;

    self.name = opt.name;
    self._id = opt._id;
    self.completed = opt.completed || false;
    self.$el;

    Observable(self);

    function bind() {
        $('.destroy', self.$el).on('click', self.remove);
        $('.toggle', self.$el).on('click', self.complete);
    }

    self.render = function() {
        templateFn = _.template($("#item-template").html());
        self.$el = $(templateFn({title: self.name, completed: self.completed}));
        bind();
        return self.$el;
    };

    self.remove = function() {
        self.$el.remove();
        collection.emit('remove', self);
    };

    self.complete = function() {
        self.completed = !self.completed;
        if (self.$el) {
            self.$el.toggleClass('completed');
        }
        collection.emit('complete');
    };

    return self;
};