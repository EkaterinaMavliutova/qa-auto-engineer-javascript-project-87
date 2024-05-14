import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import _ from 'lodash';
import { parseJson, parseYaml } from './parsers.js';
import getFormatter from './formatters/index.js';

export const isEmptyObj = (someObject) => {
  if (typeof someObject === 'object') {
    return Object.keys(someObject).length === 0;
  }
  return undefined;
};

export const readFile = (filePath) => {
  if (!filePath) {
    return undefined;
  }
  try {
    if (path.isAbsolute(filePath)) {
      return fs.readFileSync(filePath);
    }
    const currentDir = process.cwd();
    const absolutePath = path.resolve(currentDir, filePath);
    return fs.readFileSync(absolutePath);
  } catch (error) {
    throw new Error(`failed to read ${filePath}`);
  }
};
// console.log(readFile('__fixtures__/empty copy.json'));
export const parseData = (data, dataFormat) => {
  const yamlFormats = ['.yaml', '.yml'];
  if (dataFormat === '.json') {
    return parseJson(data);
  }
  if (yamlFormats.includes(dataFormat)) {
    return parseYaml(data);
  }
  return undefined;
};

export const compareObjects = (objToCompare, objToCompareWith) => {
  if (objToCompare === undefined || objToCompareWith === undefined) {
    return undefined;
  }
  if (isEmptyObj(objToCompare) && isEmptyObj(objToCompareWith)) {
    return [];
  }
  const allKeys = Object.keys(objToCompare).concat(Object.keys(objToCompareWith));
  const uniqueKeys = _.sortBy(allKeys);
  const sortedUniqueKeys = _.sortedUniq(uniqueKeys);
  const differences = sortedUniqueKeys.reduce((acc, item) => {
    const isInObjToCompare = Object.hasOwn(objToCompare, item);
    const isInObjToCompareWith = Object.hasOwn(objToCompareWith, item);
    const isSameValue = objToCompare[item] === objToCompareWith[item];
    const isEqual = isInObjToCompare && isInObjToCompareWith && isSameValue;
    if (isEqual) {
      return [...acc, {
        diff: null, name: item, value: objToCompare[item], changedValue: null,
      }];
    }
    if (isInObjToCompare && isInObjToCompareWith) {
      return [...acc, {
        diff: '-', name: item, value: objToCompare[item], changedValue: objToCompareWith[item],
      }];
    }
    if (isInObjToCompare) {
      return [...acc, {
        diff: '-', name: item, value: objToCompare[item], changedValue: null,
      }];
    }
    if (isInObjToCompareWith) {
      return [...acc, {
        diff: '+', name: item, value: objToCompareWith[item], changedValue: null,
      }];
    }
    return acc;
  }, []);
  return differences;
};

export const formatDifferences = (coll, format) => {
  try {
    const formatColl = getFormatter(format);
    if (formatColl === undefined) {
      throw new Error(`format ${format} is not supported`);
    }
    return formatColl(coll);
  } catch (e) {
    throw new Error(e);
  }
};

export const genDiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const fileBuff1 = readFile(pathToFile1);
  const fileBuff2 = readFile(pathToFile2);
  const file1Format = path.extname(pathToFile1);
  const file2Format = path.extname(pathToFile2);
  const obj1 = parseData(fileBuff1, file1Format);
  const obj2 = parseData(fileBuff2, file2Format);
  if (obj1 === undefined || obj2 === undefined) {
    console.error('genDiff error: failed to compare files');
    return undefined;
  }
  const differences = compareObjects(obj1, obj2);
  // console.log(differences); // удалить
  const formattedDiff = formatDifferences(differences, outputFormat);

  if (outputFormat === 'json') {
    console.log(JSON.stringify(formattedDiff, null, '\t'));
    return JSON.stringify(formattedDiff, null, '\t');
  }
  console.log(formattedDiff.join('\n'));
  return formattedDiff.join('\n');
};
