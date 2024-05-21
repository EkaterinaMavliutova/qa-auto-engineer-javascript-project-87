import _ from 'lodash';

const isEmptyObj = (someObject) => {
  if (typeof someObject === 'object') {
    return Object.keys(someObject).length === 0;
  }
  return false;
};

const compareObjects = (obj1, obj2) => {
  if (isEmptyObj(obj1) && isEmptyObj(obj2)) {
    return [];
  }
  const allKeys = Object.keys(obj1).concat(Object.keys(obj2));
  const sortedKeys = _.sortBy(allKeys);
  const sortedUniqueKeys = [...new Set(sortedKeys)];
  const differences = sortedUniqueKeys.reduce((acc, key) => {
    const isInObj1 = Object.hasOwn(obj1, key);
    const isInObj2 = Object.hasOwn(obj2, key);
    const isSameValue = obj1[key] === obj2[key];
    const isEqual = isInObj1 && isInObj2;
    if (isEqual && isSameValue) {
      return [...acc, { key, type: 'unchanged', value: obj1[key] }];
    }
    if (isEqual) {
      return [...acc,
        {
          key,
          type: 'changed',
          value1: obj1[key],
          value2: obj2[key],
        }];
    }
    if (isInObj1) {
      return [...acc, { key, type: 'deleted', value: obj1[key] }];
    }
    if (isInObj2) {
      return [...acc, { key, type: 'added', value: obj2[key] }];
    }
    return acc;
  }, []);
  return differences;
};

export default compareObjects;
