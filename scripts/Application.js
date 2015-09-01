var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Application = function() {
    //this = {}

    var storage = new gg.class.Storage(),
        input = new gg.class.Input(),
        todoCollection = [];

    this.init = function() {
        storage.init();
        input.init($(".todoapp .input_main"));

        input.on("submit", function(text) {
            console.log(text);
        });

        todoCollection = storage.get();
    };

    // return this;
};