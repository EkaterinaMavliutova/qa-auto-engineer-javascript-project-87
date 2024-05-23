import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import parseData from './parsers.js';
import formatData from './formatters/index.js';
import compareObjects from './compare-objects.js';

const buildFullPath = (somePath) => path.resolve(process.cwd(), somePath);

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filePath) => parseData(fs.readFileSync(filePath, 'utf-8'), extractFormat(filePath));

const genDiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const obj1 = getData(buildFullPath(pathToFile1));
  const obj2 = getData(buildFullPath(pathToFile2));
  const differences = compareObjects(obj1, obj2);

  return formatData(differences, outputFormat);
};

export default genDiff;
