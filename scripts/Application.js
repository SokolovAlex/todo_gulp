var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Application = function() {
    //this = {}

    var storage = new gg.class.Storage(),
        input = new gg.class.Input(),
        todoCollection = new gg.class.TodoCollection(),
        $mainSection;

    function checkVisibility() {
        debugger;
        if(todoCollection.count() === 0) {
            $mainSection.addClass('hidden');
        } else {
            $mainSection.removeClass('hidden');
        }
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

        todoCollection.on('fetch', checkVisibility);
    }

    this.init = function() {
        storage.init();
        input.init($(".todoapp .input_main"));
        todoCollection.init($(".todoapp .todo-list"));

        bind();

        $mainSection = $('.todoapp .main');
        todoCollection.fetch(storage.get());
    };

    // return this;
};