var Observable = require('./Observable.js');
var $ = require('../../bower_components/jquery/dist/jquery.js');
var _ = require('../../bower_components/lodash/lodash.js');

module.exports = function(opt, collection) {
    var self = {};

    self.name = opt.name;
    self._id = opt.id;
    self.completed = opt.completed;

    self.$el;
    var templateFn;

    Observable(module);

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
        self.$el.toggleClass('completed');
        collection.emit('complete');
    };

    return self;
};