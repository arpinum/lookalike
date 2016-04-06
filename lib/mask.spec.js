'use strict';

let mask = require('./mask');

describe('The mask', () => {

  it('should only keep relevant keys of source object', () => {
    let source = {
      firstName: 'John',
      lastName: 'Doe'
    };

    let masked = mask(source, ['firstName']);

    masked.should.deep.equal({firstName: 'John'});
  });

  it('should even keep deep keys', () => {
    let source = {
      firstName: 'John',
      lastName: 'Doe',
      address: {
        postalCode: '33000',
        city: 'Bordeaux'
      }
    };

    let masked = mask(source, ['firstName', {address: ['city']}]);

    masked.should.deep.equal({firstName: 'John', address: {city: 'Bordeaux'}});
  });

  it('should not add not existing key in source object', () => {
    let source = {
      firstName: 'John',
      address: {
        postalCode: '33000',
        city: 'Bordeaux'
      }
    };

    let masked = mask(source, ['firstName', {address: ['not existing']}, {not: ['existing']}]);

    masked.should.deep.equal({firstName: 'John', address: {}});
  });

  it('should even keep very deep keys', () => {
    let source = {
      a: {
        b: {
          c: {
            d: 'please dont call me again',
            e: 'keep me please'
          }
        }
      }
    };

    let masked = mask(source, [{a: [{b: [{c: ['e']}]}]}]);

    masked.should.deep.equal({a: {b: {c: {e: 'keep me please'}}}});
  });

  it('wont crash like a drunk otter if source object does not have a relevant key', () => {
    let source = {
      firstName: 'John',
      lastName: 'Doe'
    };

    let masked = mask(source, ['firstName', 'birthDate']);

    masked.should.deep.equal({firstName: 'John'});
  });

  it('should lament if keys are not an array', () => {
    let source = {
      address: {
        postalCode: '33000',
        city: 'Bordeaux'
      }
    };

    let invalidMask = () => {
      mask(source, [{address: {city: {code: 'BOR'}}}]);
    };

    invalidMask.should.throw(Error, 'The descriptions should be an array');
  });

  it('should cry if key description as object is invalid', () => {
    let source = {
      address: {
        postalCode: '33000',
        city: 'Bordeaux'
      }
    };

    let invalidMask = () => {
      mask(source, [{address: ['city'], whatAmIDoing: ['here']}]);
    };

    invalidMask.should.throw(Error, 'The description should contain exactly one key');
  });

  it('should die in pain if key description is a primitive like a number', () => {
    let source = {
      firstName: 'John'
    };

    let invalidMask = () => {
      mask(source, [3]);
    };

    invalidMask.should.throw(Error, 'The description should be a string of an object');
  });
});
