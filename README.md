# Vector manipulation in JavaScript

## Overview

VectorAlgebra is a JavaScript library containing functions useful in vector manipulation.
Can be used on front end (manipulating objects on HTML5 Canvas or SVG),
as well as on back end to make computation on vector spaces.

It's extremely fast and has no limit for number of dimensions.

Basic operations
* add / subtract / multiply / divide vectors or vectors and scalars
* norm (length)
* distance (euclidean, cosine, manhattan, chebyshev)
* dot product
* cross product (for 3 dimensional vectors only)
* triple products (scalar and vector triple product)

Angle
* angleBetween - angle between two vectors
* angle - angle between vector and beginning of coordinate system (faster than angleBetween)

Transformations
* rotation
* shearing
* translation

## Examples

### Basic operations
```js
var vector = require('vector-algebra');

// add two vectors
vector.add([1, 2], [1, 4]); // [2, 6]

// multiply vector by scalar
vector.multiply([1, 2], 2); // [2, 4]

// norm and unit vector
vector.norm([1, 1]); // sqrt(2)
vector.unit([1, 1]); // [1/sqrt(2), 1/sqrt(2)]
```

### Distance
```
vector.euclidean([1, 1], [3, 1]); // 2
vector.manhattan([0, 0], [1, 1]); // 2
vector.chebyshev([0, 0], [1, 1]); // 1
vector.cosine([1, 1], [3, 1]); // ~0.89
```

### Angle

```
var vector = require('vector-algebra');

vector.angle([0, 1], ); // Math.PI/2

// Shearing along x axis
vector.angleBetween([1, 0], [0, 1]); // Math.PI/2
```

### Linear transformations

```
var vector = require('vector-algebra');

// Rotation (clockwise)
vector.rotate([1, 1], Math.PI/2); // ~[-1, 1] (result depend on accuracy)

// Shearing along x axis
vector.shear([1, 1], 2, true); // [3, 1]

// Custom transformation
var M = [
    [1, 3],
    [5, 2]
];
vector.transform([1, 1], M);
```

## Testing

Open folder and run:
```
mocha -R spec
```

## License

Software is licensed under MIT license.
For more information check LICENSE file.