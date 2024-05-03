import { readFile, parseData, compareObjects, isEmptyObj } from "./index.js";
import _ from 'lodash';

const parseJson = (text) => JSON.parse(text);

const objToCompare = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false
  };

const objToCompareWith = {
    host: 'hexlet.io',
    timeout: 20,
    verbose: true
  };

const compareObjects2 = (objToCompare, objToCompareWith) => {
  if (isEmptyObj(objToCompare) || isEmptyObj(objToCompareWith)) {
    return [];
  }  
  const allKeys = Object.keys(objToCompare).concat(Object.keys(objToCompareWith));
  const uniqueKeys = _.sortBy(allKeys);
  const sortedUniqueKeys = _.sortedUniq(uniqueKeys);

  const differences = sortedUniqueKeys.reduce((acc, item) => {
    const isInObjToCompare = Object.hasOwn(objToCompare, item);
    const isInObjToCompareWith = Object.hasOwn(objToCompareWith, item);
    const isSameValue = objToCompare[item] === objToCompareWith[item];
    // const isEqual = isInObjToCompare && isInObjToCompareWith
    if (isInObjToCompare && isInObjToCompareWith) {
      if (isSameValue) {
        acc.push(`  ${item}: ${objToCompare[item]}`);
      } else {
      acc.push(`- ${item}: ${objToCompare[item]}`);
      acc.push(`+ ${item}: ${objToCompareWith[item]}`);
      }
    } else {
    if (isInObjToCompare) {
      acc.push(`- ${item}: ${objToCompare[item]}`);
    } else {
      acc.push(`+ ${item}: ${objToCompareWith[item]}`)
    }
    }
    return acc;
  }, [])
  return differences;
};

console.log(`{\n${compareObjects2(objToCompare, objToCompareWith).join('\n')}\n}`);

const jsonGenDiff = (pathTofile1, pathToFile2) => {
  const fileBuff1 = readFile(pathTofile1);
  const fileBuff2 = readFile(pathToFile2);
  const obj1 = parseData(fileBuff1, parseJson);
  const obj2 = parseData(fileBuff2, parseJson);
  const differences = compareObjects(obj1, obj2);

  return differences.join('\n');
};
console.log(readFile('file1.json'));
