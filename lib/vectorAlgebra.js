/**
 * Vector object
 * Providing basic operations related to vector algebra and transformations
 *
 * @author Lukasz Krawczyk <lukasz@abeja.asia>
 * @license MIT
 */
VectorAlgebra = {

    /**
     * Operation on vectors and scalars
     *
     * @param {array|integer|float} a
     * @param {array|integer|float} b
     * @param {callable} callback
     * @return {array}
     * @access private
     */
    __operation: function(a, b, callback) {
        var n = []
            , aVector = (a instanceof Array)
            , bVector = (b instanceof Array);

        if (aVector && bVector) {
            // vector and vectors
            for (var i = 0; i < Math.min(a.length, b.length); i++)
                n[i] = callback(a[i], b[i]);
        } else if (aVector) {
            // vector and scalar
            for (var i = 0; i < a.length; i++)
                n[i] = callback(a[i], b);
        } else if (bVector) {
            // scalar and vector
            for (var i = 0; i < b.length; i++)
                n[i] = callback(a, b[i]);
        } else {
            // scalar and scalar
            return callback(a, b);
        }

        return n;
    },
    
    // BASIC OPERATIONS

    /**
     * Add two vectors / scalars
     * 
     * @param {array|integer|float} a
     * @param {array|integer|float} b
     * @returns {array|integer|float}
     * @access public
     */
    add: function(a, b) {
        return this.__operation(a, b, function(an, bn) { return an + bn; });
    },

    /**
     * Subtract two vectors / scalars
     *
     * @param {array|integer|float} a
     * @param {array|integer|float} b
     * @returns {array|integer|float}
     * @access public
     */
    subtract: function(a, b) {
        return this.__operation(a, b, function(an, bn) { return an - bn; });
    },
    
    /**
     * Multiply two vectors / scalars
     *
     * @param {array|integer|float} a
     * @param {array|integer|float} b
     * @returns {array|integer|float}
     * @access public
     */
    multiply: function(a, b) {
        return this.__operation(a, b, function(an, bn) { return an * bn; });
    },

    /**
     * Divide two vectors / scalars
     *
     * @param {array|integer|float} a
     * @param {array|integer|float} b
     * @returns {array|integer|float}
     * @access public
     */
    divide: function(a, b) {
        return this.__operation(a, b, function(an, bn) { return an / bn; });
    },

    /**
     * Calculating norm - length of a given vector
     *
     * @param {array} a
     * @return {int|float}
     * @access public
     */
    norm: function(a) {
        return Math.sqrt(this.dot(a, a));
    },

    /**
     * Alias for norm
     *
     * @param {array}
     * @return {integer}
     * @access public
     */
    length: function(a) {
        return this.norm(a);
    },

    /**
     * Euclidean distance between two vectors
     *
     * @param {array} a
     * @param {array} b
     * @return {integer|float}
     * @access public
     */
    distance: function(a, b) {
        var n = 0, lim = Math.min(a.length, b.length);
        for (var i = 0; i < lim; i++) n += Math.pow(a[i] - b[i], 2);
        return Math.sqrt(n);
    },

    /**
     * Return unit vector
     *
     * @param {array} v
     * @returns {array}
     * @access public
     */
    unit: function(v) {
        return this.divide(v, this.norm(v));
    },

    // DOT & CROSS PRODUCT

    /**
     * Calculating dot product of two vectors
     * Dot product of orthogonal vectors is 0
     *
     * @param {array} a
     * @param {array} b
     * @return {int|float}
     * @access public
     */
    dot: function(a, b) {
        var n = 0, lim = Math.min(a.length, b.length);
	     for (var i = 0; i < lim; i++) n += a[i] * b[i];
        return n;
    },
    
    /**
     * Calculating cross product of two vectors
     * Cross product is perpendicular to both a and b
     *
     * @param {array} a
     * @param {array} b
     * @return {int|float}
     * @access public
     */
    cross: function(a, b) {
        var n = [];
        if (a === b) return 0;
        
        for (var i = 0; i < 3; i++){
            var id1 = (i + 1) % 3, id2 = (i + 2) % 3;
            n[i] = (a[id1] * b[id2]) - (a[id2] * b[id1]);
        }
        
        return n;
    },

    /**
     * Calculate scalar triple product
     * a . (b x c)
     *
     * @param {array} a
     * @param {array} b
     * @param {array} c
     * @returns {float|int}
     * @access public
     */
    scalarTripleProduct: function(a, b, c) {
        return this.dot(a, this.cross(b, c));
    },

    /**
     * Calculate vector triple product
     * a x (b x c)
     *
     * @param {array} a
     * @param {array} b
     * @param {array} c
     * @returns {array}
     * @access public
     */
    vectorTripleProduct: function(a, b, c) {
        return this.cross(a, this.cross(b, c));
    },

    // ANGLE

    /**
     * Return the angle between two vectors on a 2D plane
     * The angle is from vector 1 to vector 2, positive counterclockwise
     * The result is between {-PI, PI}
     *
     * @todo extend to multiple dimensions
     * @param {array} p1 - [x, y]
     * @param {array} p2 - [x, y]
     * @returns {integer}
     * @access public
     */
    angleBetween : function(p1, p2) {
        var dtheta, theta1, theta2
            , twoPi = 2 * Math.PI;

        theta1 = Math.atan2(p1[1], p1[0]);
        theta2 = Math.atan2(p2[1], p2[0]);
        dtheta = theta2 - theta1;

        // normalization to {-PI, PI}
        while (dtheta > Math.PI) dtheta -= twoPi;
        while (dtheta < - Math.PI) dtheta += twoPi;

        return dtheta;
    },

    /**
     * Angle between beginning of coordinate system and vector
     * The result is between {0, PI}
     *
     * @param {array} a
     * @returns {Number}
     * @access public
     */
    angle: function(a) {
        return Math.acos(a[0] / this.norm(a));
    },

    // MATRIX TRANSFORMATIONS

    /**
     * Linear transformation of vector x by matrix A
     * 
     * @param {array} x - vector
     * @param {array} M - transformation matrix
     * @return {array}
     * @access public
     */
    transform: function(x, M) {
        var y = [];
        for (var i = 0; i < M.length; i++) {
            y[i] = 0;
            for (var j = 0; j < M[i].length; j++)
                y[i] += M[i][j] * x[j];
        }
        
        return y;
    },
    
    /**
     * Vector rotation
     *
     * @param {array} x - vector
     * @param {integer} degree - [-PI, PI]
     * @returns {integer}
     * @access public
     */
    rotate: function(x, degree) {
        var M = [
            [ Math.cos(degree), -Math.sin(degree) ],
            [ Math.sin(degree), Math.cos(degree) ]
        ];

        return this.transform(x, M);
    },

    /**
     * Vector shearing
     *
     * @param {array} x - vector
     * @param {integer} k - shear factor
     * @param {boolean} parallelToX - shearing parallel to x (true) or y (false)
     * @returns {integer}
     * @access public
     */
    shear: function(x, k, parallelToX) {
        var M = [
            [ 1, (parallelToX) ? k : 0 ],
            [ (parallelToX) ? 0 : k, 1 ]
        ];

        return this.transform(x, M);
    }
};

exports = module.exports = VectorAlgebra;