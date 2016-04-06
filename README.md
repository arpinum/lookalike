# lookalike [![Build Status](https://travis-ci.org/arpinum/lookalike.svg?branch=master)](https://travis-ci.org/arpinum/lookalike)

**lookalike** is a simple object to object mapper.

## Installation

    npm install lookalike --save-dev

## Usage

```javascript
// require the whole module...
let lookalike = require('lookalike');

// or specific parts
let pick = require('lookalike').pick;
```

## pick(sourceObject, [keys])

Creates an object based on `sourceObject` picking only `keys`.

`keys` can be:
* an array of key names as strings
* an array of single key objects to represent nested objects
* a mix of both

### Examples

```javascript
let source = {
  firstName: 'John',
  lastName: 'Doe'
};

let picked = pick(source, ['firstName']);

picked.should.deep.equal({firstName: 'John'});
```

```javascript
let source = {
  address: {
    postalCode: '33000',
    city: 'Bordeaux'
  }
};

let picked = pick(source, [{address: ['city']}]);

picked.should.deep.equal({address: {city: 'Bordeaux'}});
```

## License

[MIT](LICENSE)
