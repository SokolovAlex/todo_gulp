var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Application  = (function () {
    var instance;
    return function applicationInstance () {

        if (instance) {
            alert("Am already inited");
            return instance;
        }
        instance = {};

        var storage = new gg.class.Storage(),
            input = new gg.class.Input(),
            todoCollection = new gg.class.TodoCollection(),
            footer = new gg.class.Footer(),
            $mainSection,
            $el;

        function checkVisibility() {
            var amount = todoCollection.count();
            if(amount === 0) {
                $el.addClass('hidden');
            } else {
                $el.removeClass('hidden');
            }
            footer.setAmount(todoCollection.countCompleted());
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
                footer.setAmount(todoCollection.countCompleted());
            });

            todoCollection.on('fetch', checkVisibility);
        }

        instance.init = function() {
            $el = $('.todoapp');
            storage.init();
            input.init($(".todoapp .input_main"));
            todoCollection.init($(".todoapp .todo-list"));
            footer.init($('.todoapp .footer'));

            bind();

            $mainSection = $('.todoapp .main');
            todoCollection.fetch(storage.get());
        };

        return instance;
    };
})();


