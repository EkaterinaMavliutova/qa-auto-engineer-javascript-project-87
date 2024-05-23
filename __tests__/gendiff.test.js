import { expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';
import { getFixturePath, readTestFile } from './utils.js';

describe('genDiff: different output formats', () => {
  test.each([
    {
      format: 'stylish',
      expected: readTestFile('expectedStylishOutput.txt'),
    },
    {
      format: 'plain',
      expected: readTestFile('expectedPlainOutput.txt'),
    },
    {
      format: 'json',
      expected: readTestFile('expectedJsonOutput.txt'),
    },
  ])('json and yaml, $format output', ({ format, expected }) => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yml', format)).toBe(expected);
  });
});

describe('genDiff: exceptions are thrown, default outputFormat', () => {
  test('whith unsupported data type', () => {
    expect(() => {
      genDiff('__fixtures__/expectedStylishOutput.txt', '__fixtures__/file2.json');
    }).toThrow('\'txt\' parsing is not supported');
  });
  test('whith unsupported output format', () => {
    expect(() => {
      genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'fakeFormat');
    }).toThrow('output to \'fakeFormat\' is not supported');
  });
});

describe('genDiff: different file paths (default output format)', () => {
  test.each([
    {
      pathType: 'relative',
      pathToFile1: '__fixtures__/file1.json',
      pathToFile2: '__fixtures__/file2.json',
    },
    {
      pathType: 'absolute',
      pathToFile1: getFixturePath('file1.json'),
      pathToFile2: getFixturePath('file2.json'),
    },
  ])('whith $pathType path', ({ pathToFile1, pathToFile2 }) => {
    const expected = readTestFile('expectedStylishOutput.txt');
    expect(genDiff(pathToFile1, pathToFile2)).toBe(expected);
  });
});

test('genDiff: whith .yaml and .yml YAML file extenshions', () => {
  const expected = readTestFile('expectedStylishOutput.txt');
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml')).toBe(expected);
});
