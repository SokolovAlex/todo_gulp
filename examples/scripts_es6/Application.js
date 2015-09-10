var $ = require('jquery');

var storage = require('./Storage.js')(),
    input = require('./Input.js')(),
    todoCollection = require('./TodoCollection.js')(),
    footer = require('./Footer.js')(),
    $mainSection,
    $el;

function checkVisibility() {
    var amount = todoCollection.count();
    if(amount === 0) {
        $el.addClass('hidden');
    } else {
        $el.removeClass('hidden');
    }
    footer.setAmount(todoCollection.countLeft());
}

function bind() {
    input.on("submit", function(text) {
        todoCollection.add(text);
        input.clear();
    });

    todoCollection.on('added', function(todo) {
        storage.set(todo);
        checkVisibility();
    });

    todoCollection.on('sync', function(todos) {
        storage.sync(todos);
        footer.setAmount(todoCollection.countLeft());
    });
    todoCollection.on('fetch', checkVisibility);
}

class Application {
    constructor() {
        $el = $('.todoapp');
        storage.init();
        input.init($(".todoapp .input_main"));
        todoCollection.init($(".todoapp .todo-list"));
        footer.init($('.todoapp .footer'));

        bind();

        $mainSection = $('.todoapp .main');
        todoCollection.fetch(storage.get());
    }
}

module.exports = Application;