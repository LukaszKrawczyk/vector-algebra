var assert = require('assert');
var vector = require('../lib/index');

describe('VectorAlgebra', function() {

    // BASIC OPERATIONS

    describe('#add()', function() {
        it('should add two vectors', function() {
            var result = vector.add([0, 0], [1, 1]);
            assert.deepEqual(result, [1, 1]);
        });

        it('should add vectors and scalar', function() {
            var result = vector.add([0, 0], 1);
            assert.deepEqual(result, [1, 1]);
        });
    });

    describe('#subtract()', function() {
        it('should subtract two vectors', function() {
            var result = vector.subtract([0, 0], [1, 1]);
            assert.deepEqual(result, [-1, -1]);
        });

        it('should subtract vectors and scalar', function() {
            var result = vector.subtract([0, 0], 1);
            assert.deepEqual(result, [-1, -1]);
        });
    });

    describe('#multiply()', function() {
        it('should multiply two vectors', function() {
            var result = vector.multiply([2, 2], [2, 2]);
            assert.deepEqual(result, [4, 4]);
        });

        it('should multiply vectors and scalar', function() {
            var result = vector.multiply([2, 2], 2);
            assert.deepEqual(result, [4, 4]);
        });
    });

    describe('#divide()', function() {
        it('should divide two vectors', function() {
            var result = vector.divide([4, 4], [2, 2]);
            assert.deepEqual(result, [2, 2]);
        });

        it('should divide vectors and scalar', function() {
            var result = vector.divide([4, 4], 2);
            assert.deepEqual(result, [2, 2]);
        });
    });

    // LENGTH & DISTANCE & UNIT VECTOR

    describe('#norm()', function() {
        it('should calculate norm (length) of a vector', function() {
            var result = vector.norm([1, 1]);
            assert.equal(result, Math.sqrt(2));
        });
    });

    describe('#distance()', function() {
        it('should calculate distance between two vectors', function() {
            var result = vector.distance([1, 1], [3, 1]);
            assert.equal(result, 2);
        });
    });

    describe('#unit()', function() {
        it('should calculate unit vector', function() {
            var result = vector.unit([1, 1]);
            assert.notStrictEqual(result, [1/Math.sqrt(2), 1/Math.sqrt(2)]);
        });
    });

    // DOT & CROSS PRODUCT

    describe('#dot()', function() {
        it('should calculate dot product of two vectors', function() {
            var result = vector.dot([3, 4, 5], [4, 3, 5]);
            assert.equal(result, 49);
        });
    });

    describe('#cross()', function() {
        it('should calculate cross product of two vectors', function() {
            var result = vector.cross([1, 0, 0], [0, 1, 0]);
            assert.deepEqual(result, [0, 0, 1]);
        });

        it('should calculate cross product of two vectors', function() {
            var result = vector.cross([3, 4, 5], [4, 3, 5]);
            assert.deepEqual(result, [5, 5, -7]);
        });
    });

    // TRIPLE PRODUCTS

    describe('#scalarTripleProduct()', function() {
        it('should calculate scalar triple product', function() {
            var result = vector.scalarTripleProduct([3, 4, 5], [4, 3, 5], [-5, -12, -13]);
            assert.equal(result, 6);
        });
    });

    describe('#vectorTripleProduct()', function() {
        it('should calculate vector triple product', function() {
            var result = vector.vectorTripleProduct([3, 4, 5], [4, 3, 5], [-5, -12, -13]);
            assert.deepEqual(result, [-267, 204, -3]);
        });
    });

    // MATRIX TRANSFORMATIONS

    describe('#rotate()', function() {
        it('should rotate vector', function() {
            var result = vector.rotate([1, 1], Math.PI / 2);
            var expected = [-1, 1];
            assert.equal(Math.round(result[0]), expected[0]);
            assert.equal(Math.round(result[1]), expected[1]);
        });
    });

    describe('#shear()', function() {
        it('should shear vector along x axis', function() {
            var result = vector.shear([1, 1], 2, true);
            assert.deepEqual(result, [3,1]);
        });

        it('should shear vector along y axis', function() {
            var result = vector.shear([1, 1], 2, false);
            assert.deepEqual(result, [1,3]);
        });
    });

    // ANGLE

    describe('#angleBetween()', function() {
        it('should calculate angle between two vectors', function() {
            var result = vector.angleBetween([1, 0], [0, 1]);
            assert.equal(result, Math.PI/2);
        });
    });

    describe('#angle()', function() {
        it('should calculate angle between vector and beginning of coordinate system', function() {
            var result = vector.angle([0, 1]);
            assert.equal(result, Math.PI/2);
        });
    });
});