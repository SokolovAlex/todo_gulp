/**
 * Created by sokolov on 02.09.2015.
 */
var gg = window.gg || {};
gg.class = gg.class || {};

gg.class.Todo = function(name, id) {
    this.name = name;
    this._id = id;

    var templateFn;

    this.render = function() {
        templateFn = _.template($("#item-template").html());
        return templateFn({title: this.name, completed: false});
    };
};