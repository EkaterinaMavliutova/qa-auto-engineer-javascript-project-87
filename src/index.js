import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import _ from 'lodash';

export const isEmptyObj = (someObject) => Object.keys(someObject).length === 0 ? true : false;

export const readFile = (filePath) => {
  let absolutePath;

  if (path.isAbsolute(filePath)) {
    absolutePath = filePath;
  } else {
    const currentDir = process.cwd();
    absolutePath = path.resolve(currentDir, filePath);
  }
  return fs.readFileSync(absolutePath);
};

export const parseData = (data, parserFunction) => {
  const parsedData = parserFunction(data);
  return parsedData;
};

export const compareObjects = (objTocompare, objToCompareWith) => {

  return differencesArray;
};

export const formatStrings = (someStrings, formatterFunction) => {

  return formattedStrings;
};

const formatToPlainText = (text) => {
  
  return formattedText;
};

const formatToStylish = (text) => {
  
  return formattedText;
};

const formatToJson = (text) => {
  
  return formattedText;
};

const gendiff = (pathTofile1, pathToFile2, outputFormat = json) => {
const file1 = readFile(pathTofile1);
const file2 = readFile(pathToFile2);
const obj1 = parseData(file1);
const obj2 = parseData(file2);
const differences = compareObjects(obj1, obj2);
const formattedStringWithFilesDifferences = formatStrings(differences, );
  return formattedStringWithFilesDifferences;
};

/*const data = fs.readFileSync(file1Path);
  console.log(data);
  const jsonObj = JSON.parse(data);
  console.log(jsonObj);
  console.log(jsonObj.proxy);*/
//'/Users/ekaterinamavlutova/Desktop''IT study/JavaScript/Projects/qa-auto-engineer-javascript-project-87'
