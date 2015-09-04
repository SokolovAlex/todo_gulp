/**
 * Created by sokolov on 02.09.2015.
 */
var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Todo = function(opt, collection) {
    var self = this;
    this.name = opt.name;
    this._id = opt.id;
    this.completed = opt.completed;

    this.$el;
    var templateFn;

    gg.class.Observable(this);

    function bind() {
        $('.destroy', self.$el).on('click', self.remove);
        $('.toggle', self.$el).on('click', self.complete);
    }

    this.render = function() {
        templateFn = _.template($("#item-template").html());
        this.$el = $(templateFn({title: this.name, completed: this.completed}));
        bind();
        return this.$el;
    };

    this.remove = function() {
        self.$el.remove();
        collection.emit('remove', self);
    };

    this.complete = function() {
        self.completed = !self.completed;
        self.$el.toggleClass('completed');
        collection.emit('complete');
    };
};