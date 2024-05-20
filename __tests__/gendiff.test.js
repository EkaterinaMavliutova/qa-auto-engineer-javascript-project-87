// import { expect, jest } from '@jest/globals';
import genDiff from '../src/gendiff.js';
import { getFixturePath } from './utils.js';

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
      expected: '[{"key":"follow","type":"deleted","value":false},{"key":"host","type":"unchanged","value":"hexlet.io"},{"key":"proxy","type":"deleted","value":"123.234.53.22"},{"key":"timeout","type":"changed","value1":50,"value2":20},{"key":"verbose","type":"added","value":true}]',
    },
  ])('json and yaml, $format output', ({ format, expected }) => {
    const pathToFile = getFixturePath('file1.json');
    expect(genDiff(pathToFile, '__fixtures__/file2.yml', format)).toBe(expected);
  });
});
