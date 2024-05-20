import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compareObjects from './compare-objects.js';

const readFile = (filePath) => {
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
    throw new Error(`failed to read '${filePath}'`);
  }
};

const parseData = (data, dataFormat) => {
  try {
    const parser = getParser(dataFormat);
    const parsedData = parser(data);
    return parsedData;
  } catch (e) {
    throw new Error(`failed to parse data as '${dataFormat}'`);
  }
};

const formatDifferences = (coll, format) => {
  try {
    const formatColl = getFormatter(format);
    return formatColl(coll);
  } catch (e) {
    throw new Error(`failed to format data to '${format}'`);
  }
};

const genDiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const data1Format = path.extname(pathToFile1).slice(1);
  const data2Format = path.extname(pathToFile2).slice(1);
  const obj1 = parseData(data1, data1Format);
  const obj2 = parseData(data2, data2Format);
  const differences = compareObjects(obj1, obj2);
  const formattedDiff = formatDifferences(differences, outputFormat);

  // if (outputFormat === 'json') {
  //   console.log(JSON.stringify(formattedDiff, null, '\t'));
  //   return JSON.stringify(formattedDiff, null, '\t');
  // }
  // console.log(formattedDiff.join('\n'));
  // return formattedDiff.join('\n');
  return formattedDiff;
};

export default genDiff;
