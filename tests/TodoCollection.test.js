/**
 * Created by sokolov on 08.09.2015.
 */
var collection;

var assert = require('assert');

beforeEach(function() {
    collection = require('../examples/scripts/TodoCollection.js')();
    collection.init(null);
});

describe('test collection: ', function () {
    it('check size after adding', function () {
        var oldSize = collection.count();
        collection.add("test");
        assert.equal(oldSize + 1, collection.count(), "wrong collection size after adding")
    });

    it('check size after adding2', function () {
        var oldSize = collection.count();
        collection.add("test");
        assert.equal(oldSize + 1, collection.count(), "wrong collection size after adding")
    });

    it.skip('check size after adding', function () {
        var oldSize = collection.count();
        collection.add("test");
        assert.equal(oldSize + 1, collection.count(), "wrong collection size after adding")
    });
});