'use strict';

let _ = require('lodash');

function pick(source, keys) {
  if (!_.isArray(keys)) {
    throw new Error('The descriptions should be an array');
  }

  return _.reduce(keys, (result, keyDescription) => {
    if (_.isObject(keyDescription)) {
      return reduceObjectDescription(result, keyDescription);
    }
    if (_.isString(keyDescription)) {
      return reduceStringDescription(result, keyDescription);
    }
    throw new Error('The description should be a string of an object');
  }, {});

  function reduceObjectDescription(result, keyDescription) {
    let keys = _.keys(keyDescription);
    if (keys.length !== 1) {
      throw new Error('The description should contain exactly one key');
    }
    let firstKey = _.first(keys);
    if (_.has(source, firstKey)) {
      result[firstKey] = pick(source[firstKey], keyDescription[firstKey]);
    }
    return result;
  }

  function reduceStringDescription(result, keyDescription) {
    if (_.has(source, keyDescription)) {
      result[keyDescription] = source[keyDescription];
    }
    return result;
  }
}

module.exports = pick;
