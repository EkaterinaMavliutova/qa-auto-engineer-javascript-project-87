import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import compareObjects from './compare-objects.js';

const readFile = (filePath) => {
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

const parseData = (data, dataType) => {
  const parser = getParser(dataType);
  try {
    const parsedData = parser(data);
    return parsedData;
  } catch (e) {
    throw new Error(`failed to parse data as '${dataType}'`);
  }
};

const formatDifferences = (coll, format) => {
  const formatColl = getFormatter(format);
  try {
    return formatColl(coll);
  } catch (e) {
    throw new Error(`failed to format data to '${format}'`);
  }
};

const extensionToDataTypeMap = {
  '.json': 'json',
  '.yml': 'yaml',
  '.yaml': 'yaml',
};

const getDataType = (extension) => extensionToDataTypeMap[extension] ?? extension.slice(1);

const genDiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const data1Type = getDataType(path.extname(pathToFile1));
  const data2Type = getDataType(path.extname(pathToFile2));
  const obj1 = parseData(data1, data1Type);
  const obj2 = parseData(data2, data2Type);
  const differences = compareObjects(obj1, obj2);
  const formattedDifferences = formatDifferences(differences, outputFormat);

  return formattedDifferences;
};

export default genDiff;
