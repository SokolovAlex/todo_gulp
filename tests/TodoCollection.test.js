/**
 * Created by sokolov on 08.09.2015.
 */
var collection = require('../examples/scripts/TodoCollection.js')();
var _ = require('lodash');
var assert = require('assert');

beforeEach(function() {
    collection.init(null);
});

describe('test collection: ', function () {
    it('check size after adding', function () {
        var oldSize = collection.count();
        collection.add("test item");
        assert.equal(collection.count(), oldSize + 1, "wrong collection size after adding");
    });

    it('check count function', function () {
        collection.clear();
        collection.add("test item 1");
        collection.add("test item 2");
        collection.add("test item 3");
        assert.equal(collection.count(), 3, "wrong collection size after adding");
    });

    it('check todo item after adding', function () {
        collection.clear();
        var todo = collection.add("test item 1");
        assert.ok(_.isNumber(todo._id), "wrong filed type of todo");
        assert.ok(_.isString(todo.name), "wrong filed type of todo");
        assert.ok(_.isBoolean(todo.completed), "wrong filed type of todo");
        assert.ok(!todo.completed, "wrong completed field of todo by default");
    });

    it('check left count', function () {
        collection.clear();
        var todo = collection.add("test item 1");
        collection.add("test item 2");

        assert.ok(!todo.completed, "wrong completed field of todo by default");
        assert.equal(collection.countLeft(), 2, "wrong left todos number");

        todo.complete();

        assert.ok(todo.completed, "wrong completed field of todo after complete");
        assert.equal(collection.countLeft(), 1, "wrong left todos number after complete");
    });

    it.skip('skipped test', function () {
        assert.ok(false,"wrong test");
    });
});