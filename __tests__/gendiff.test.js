import { expect, jest } from '@jest/globals';
import {
  isEmptyObj, readFile, parseData, compareObjects, genDiff,
} from '../src/gendiff.js';
import { getFixturePath, readTestFile } from './utils.js';

describe('isEmptyObj', () => {
  test('with empty object', () => {
    expect(isEmptyObj({})).toBe(true);
  });
  test('with not empty object', () => {
    expect(isEmptyObj({ proxy: '123.234.', follow: false })).toBe(false);
  });
  test('with variable with non-object value', () => {
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
    expect(() => {
      parseData(fileBuff, '.json');
    }).toThrow('failed to parse data as \'.json\'');
  });
  test.each([
    '.yml',
    '.yaml',
  ])('with %s : valid data', (fileExtension) => {
    const fileBuff = readTestFile('file1.yml');
    expect(parseData(fileBuff, fileExtension)).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });
  test('with yaml : invalid data', () => {
    const fileBuff = readTestFile('bad.yml');
    expect(() => {
      parseData(fileBuff, '.yml');
    }).toThrow('failed to parse data as \'.yml\'');
  });
  test.each([
    '.json',
    '.yml',
  ])('with %s: empty data', (fileExtension) => {
    const fileBuff = readTestFile(`empty${fileExtension}`);
    expect(parseData(fileBuff, fileExtension)).toEqual({});
  });
});
describe('compareObjects', () => {
  test.each([
    {
      obj1: {},
      obj2: { proxy: '123.234.', follow: false },
      expected: [
        {
          diff: '+', name: 'follow', value: false, changedValue: null,
        },
        {
          diff: '+', name: 'proxy', value: '123.234.', changedValue: null,
        },
      ],
    },
    {
      obj1: { proxy: '123.432.', follow: true },
      obj2: {},
      expected: [
        {
          diff: '-', name: 'follow', value: true, changedValue: null,
        },
        {
          diff: '-', name: 'proxy', value: '123.432.', changedValue: null,
        },
      ],
    },
    { obj1: {}, obj2: {}, expected: [] },
  ])('obj1: $obj1 : obj2: $obj2', ({ obj1, obj2, expected }) => {
    expect(compareObjects(obj1, obj2)).toEqual(expected);
  });
  test('objects without differences', () => {
    const obj1 = { proxy: '321.234.', follow: false };
    const obj2 = { proxy: '321.234.', follow: false };
    expect(compareObjects(obj1, obj2))
      .toEqual([
        {
          diff: null, name: 'follow', value: false, changedValue: null,
        },
        {
          diff: null, name: 'proxy', value: '321.234.', changedValue: null,
        },
      ]);
  });
  test('with 1 extra property in first object', () => {
    const obj1 = { newProperty: 'test', proxy: '000.000.', follow: false };
    const obj2 = { proxy: '000.000.', follow: false };
    expect(compareObjects(obj1, obj2))
      .toEqual([
        {
          diff: null, name: 'follow', value: false, changedValue: null,
        },
        {
          diff: '-', name: 'newProperty', value: 'test', changedValue: null,
        },
        {
          diff: null, name: 'proxy', value: '000.000.', changedValue: null,
        },
      ]);
  });
  test('with 1 extra property in second object', () => {
    const obj1 = { proxy: '123.234.', follow: true };
    const obj2 = { proxy: '123.234.', follow: true, newProperty: 'test' };
    expect(compareObjects(obj1, obj2))
      .toEqual([
        {
          diff: null, name: 'follow', value: true, changedValue: null,
        },
        {
          diff: '+', name: 'newProperty', value: 'test', changedValue: null,
        },
        {
          diff: null, name: 'proxy', value: '123.234.', changedValue: null,
        },
      ]);
  });
  test('objects with same key but different value', () => {
    const obj1 = { proxy: '123.234.' };
    const obj2 = { proxy: '000' };
    expect(compareObjects(obj1, obj2))
      .toEqual([
        {
          diff: '-', name: 'proxy', value: '123.234.', changedValue: '000',
        },
      ]);
  });
});

describe('genDiff', () => {
  test.each([
    {
      format: 'stylish',
      expected: '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
    },
    {
      format: 'plain',
      expected: 'Property \'follow\' was removed\nProperty \'proxy\' was removed\nProperty \'timeout\' was updated. From 50 to 20\nProperty \'verbose\' was added with value: true',
    },
    {
      format: 'json',
      expected: JSON.stringify(JSON.parse('{"- follow": false,"  host": "hexlet.io","- proxy": "123.234.53.22","- timeout": 50,"+ timeout": 20,"+ verbose": true}'), null, '\t'),
    },
  ])('json and yaml, $format output', ({ format, expected }) => {
    const pathToFile = getFixturePath('file1.json');
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation();
    genDiff(pathToFile, '__fixtures__/file2.yml', format);
    expect(logSpy).toHaveBeenCalledWith(expected);
    logSpy.mockRestore();
  });
});
