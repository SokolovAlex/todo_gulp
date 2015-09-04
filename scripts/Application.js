var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Application = function() {
    //this = {}

    var storage = new gg.class.Storage(),
        input = new gg.class.Input(),
        todoCollection = new gg.class.TodoCollection(),
        footer = new gg.class.Footer(),
        $mainSection,
        $el;

    function checkVisibility() {
        if(todoCollection.count() === 0) {
            $el.addClass('hidden');
        } else {
            $el.removeClass('hidden');
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

        todoCollection.on('sync', storage.sync);

        todoCollection.on('fetch', checkVisibility);
    }

    this.init = function() {
        $el = $('.todoapp');
        storage.init();
        input.init($(".todoapp .input_main"));
        todoCollection.init($(".todoapp .todo-list"));
        footer.init($('.todoapp .footer'));

        bind();

        $mainSection = $('.todoapp .main');
        todoCollection.fetch(storage.get());
    };

    // return this;
};