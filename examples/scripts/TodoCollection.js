/**
 * Created by sokolov on 02.09.2015.
 */
var Observable = require('./Observable.js');
var $ = require('../../bower_components/jquery/dist/jquery.js');
var _ = require('../../bower_components/lodash/lodash.js');

module.exports = function() {
    var self = {};

    var $el,
        _todos;

    var Todo = require('./Todo.js');

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

    self.init = function(el) {
        Observable(self);
        _todos = [];
        $el = el;
        bind();
    };

    self.add = function(text) {
        var todo = new Todo({ name: text, _id: _todos.length + 1 }, self);

        if ($el) {
            $el.append(todo.render());
        }

        _todos.push(todo);
        self.emit('added', todo);
    };

    self.fetch = function(todoArray) {
        self.render(todoArray);
        self.emit('fetch');
    };

    self.render = function(array) {
        var result = [];
        _.each(array, function(item) {
            var todo = new Todo(item, self);
            _todos.push(todo);
            result.push(todo.render());
        });
        $el.append(result);
    };

    self.countCompleted = function() {
        return _todos.filter(function(item) {
            return !item.completed;
        }).length;
    };

    self.count = function() {
        return _todos.length;
    };

    return self;
};