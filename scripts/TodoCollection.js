/**
 * Created by sokolov on 02.09.2015.
 */
var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.TodoCollection = function() {
    var self = this;

    var $el,
        _todos;

    var Todo = gg.class.Todo;

    function bind() {
        self.on("remove", function(todo) {
            _todos = _.reject(_todos, function(item) {
                return todo._id === item._id;
            });
            self.emit('sync', _todos);
        });

        self.on("complete", function() {
            self.emit('sync', _todos);
        });
    }

    this.init = function(el) {
        gg.class.Observable(self);
        bind();
        _todos = [];
        $el = el;
    };

    this.add = function(text) {
        var todo = new Todo({ name: text, _id: _todos.length + 1 }, self);
        $el.append(todo.render());

        _todos.push(todo);
        self.emit('added', todo);
    };

    this.fetch = function(todoArray) {
        self.render(todoArray);
        self.emit('fetch');
    };

    this.render = function(array) {
        var result = [];
        _.each(array, function(item) {
            var todo = new Todo(item, self);
            _todos.push(todo);
            result.push(todo.render());
        });
        $el.append(result);
    };

    this.countCompleted = function() {
        return _todos.filter(function(item) {
            return !item.completed;
        }).length;
    };

    this.count = function() {
        return _todos.length;
    };
};