import { jest } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import {
  isEmptyObj, readFile, parseData, compareObjects, genDiff,
} from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readTestFile = (fileName) => fs.readFileSync(getFixturePath(fileName));

describe('isEmptyObj', () => {
  test('with empty object', () => {
    expect(isEmptyObj({})).toBe(true);
  });
  test('with not empty object', () => {
    expect(isEmptyObj({ proxy: '123.234.', follow: false })).toBe(false);
  });
  test('with variable with nonobject value', () => {
    expect(isEmptyObj(undefined)).toBeUndefined();
  });
});

describe('readFile', () => {
  test('with absolute path', () => {
    const pathToFile = getFixturePath('file1.json');
    expect(readFile(pathToFile)).toStrictEqual(readTestFile('file1.json'));
  });
  test('with relative path', () => {
    expect(readFile('__fixtures__/file1.json')).toStrictEqual(readTestFile('file1.json'));
  });
  test('without path', () => {
    expect(readFile()).toBeUndefined();
  });
  test('with nonexistent path', () => {
    expect(() => {
      readFile('someDirectory/file1.json');
    }).toThrow();
  });
});

describe('parseData', () => {
  test('with json : valid data', () => {
    const fileBuff = readTestFile('file1.json');
    expect(parseData(fileBuff, '.json')).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });

  test('with json : invalid data', () => {
    const fileBuff = readTestFile('bad.json');
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation();
    parseData(fileBuff, '.json');
    expect(logSpy).toHaveBeenCalledWith('parser error: failed to parse data as JSON');
    logSpy.mockRestore();
  });
  test('with nonexistent format : valid data', () => {
    const fileBuff = readTestFile('file1.json');
    expect(parseData(fileBuff, '.qwerty')).toBeUndefined();
  });
  test('with nonexistent format : invalid data', () => {
    const fileBuff = readTestFile('bad.json');
    expect(parseData(fileBuff, '.qwerty')).toBeUndefined();
  });
});

describe('compareObjects', () => {
  test.each([
    { obj1: {}, obj2: { proxy: '123.234.', follow: false }, expected: ['+ follow: false', '+ proxy: 123.234.'] },
    { obj1: { proxy: '123.234.', follow: false }, obj2: {}, expected: ['- follow: false', '- proxy: 123.234.'] },
    { obj1: {}, obj2: {}, expected: [] },
    { obj1: undefined, obj2: { proxy: '123.234.', follow: false }, expected: undefined },
    { obj1: { proxy: '123.234.', follow: false }, obj2: undefined, expected: undefined },
  ])('obj1: $obj1 : obj2: $obj2', ({ obj1, obj2, expected }) => {
    expect(compareObjects(obj1, obj2)).toEqual(expected);
  });
  test('objects without differences', () => {
    const obj1 = { proxy: '123.234.', follow: false };
    const obj2 = { proxy: '123.234.', follow: false };
    expect(compareObjects(obj1, obj2))
      .toEqual(['  follow: false', '  proxy: 123.234.']);
  });
  test('with 1 extra property in first object', () => {
    const obj1 = { newProperty: 'test', proxy: '123.234.', follow: false };
    const obj2 = { proxy: '123.234.', follow: false };
    expect(compareObjects(obj1, obj2))
      .toEqual(['  follow: false', '- newProperty: test', '  proxy: 123.234.']);
  });
  test('with 1 extra property in second object', () => {
    const obj1 = { proxy: '123.234.', follow: false };
    const obj2 = { proxy: '123.234.', follow: false, newProperty: 'test' };
    expect(compareObjects(obj1, obj2))
      .toEqual(['  follow: false', '+ newProperty: test', '  proxy: 123.234.']);
  });
  test('objects with same key but different value', () => {
    const obj1 = { proxy: '123.234.' };
    const obj2 = { proxy: '000' };
    expect(compareObjects(obj1, obj2))
      .toEqual(['- proxy: 123.234.', '+ proxy: 000']);
  });
});

describe('genDiff', () => {
  test('2 json : expected result', () => {
    const pathToFile = getFixturePath('file1.json');
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation();
    genDiff(pathToFile, '__fixtures__/file2.json');
    expect(logSpy).toHaveBeenCalledWith(
      '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}',
    );
    logSpy.mockRestore();
  });
  test('2 json : error', () => {
    const pathToFile = getFixturePath('file1.json');
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation();
    genDiff(pathToFile, '__fixtures__/bad.json');
    expect(logSpy).toHaveBeenCalledWith('parser error: failed to parse data as JSON');
    expect(logSpy).toHaveBeenCalledWith('genDiff error: failed to compare files');
    logSpy.mockRestore();
  });
});
