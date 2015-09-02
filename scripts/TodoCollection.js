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

    this.init = function(el) {
        gg.class.Observable(self);
        _todos = [];
        $el = el;
    };

    this.add = function(text) {
        var todo = new Todo(text, _todos.length + 1);
        $el.append(todo.render());
        _todos.push(todo);
        self.emit('added', todo);
    };

    this.fetch = function(todoArray) {
        _todos = todoArray;
        self.render();
        self.emit('fetch');
    };

    this.render = function() {
        var resultHtml = '';
        _.each(_todos, function(item) {
            var todo = new Todo(item.name, item._id);
            _todos.push(todo);
            resultHtml += todo.render();
        });
        $el.append(resultHtml);
    };

    this.count = function() {
        return _todos.length;
    };
};