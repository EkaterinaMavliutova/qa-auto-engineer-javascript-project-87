import { readFile, parseData, compareObjects, isEmptyObj } from "./index.js";
import _ from 'lodash';

const parseJson = (text) => JSON.parse(text);

export const jsonGenDiff = (pathTofile1, pathToFile2) => {
  const fileBuff1 = readFile(pathTofile1);
  const fileBuff2 = readFile(pathToFile2);
  const obj1 = parseData(fileBuff1, parseJson);
  const obj2 = parseData(fileBuff2, parseJson);
  const differences = compareObjects(obj1, obj2);

  return `{\n${differences.join('\n')}\n}`;
};
console.log(jsonGenDiff('/Users/ekaterinamavlutova/Desktop/file1.json', 'file2.json'));
