# Vector manipulation for JavaScript

## Overview

Basic operations
* add/subtract/multiply/divide vectors or vectors with scalars
* norm (length)
* distance
* dot product
* cross product (for 3 dimensional vectors only)
* triple products (scalar and vector triple product)

Angle
* angleBetween - angle between two vectors
* angle - angle between vector and beginning of coordinate system

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

// add scalar to vector
vector.add([1, 2], 1); // [2, 3]

// norm and distance
vector.norm([1, 1]); // sqrt(2)
vector.distance([1, 1], [3, 1]); // 2
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

// Rotation
vector.rotation([1, 1], Math.PI/2); // ~[-1, 1] (result depend on accuracy)

// Shearing along x axis
vector.shearing([1, 1], 2, true); // [3, 1]

// Custom transformation
var M = [
    [1, 3],
    [5, 2]
];
vector.shearing([1, 1], M);
```

## Testing

Open folder and run:
```
mocha -R spec
```

## License

Software is licensed under MIT license.
For more information check LICENSE file.