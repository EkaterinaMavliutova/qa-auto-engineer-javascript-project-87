import { jest } from '@jest/globals';
import { parseJson, parseYaml } from '../src/parsers.js';
import { readTestFile } from './forTests.js';

describe('parseJson', () => {
  test('parse valid json', () => {
    const fileBuff = readTestFile('file1.json');
    expect(parseJson(fileBuff)).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });
  test('parse invalid json', () => {
    const fileBuff = readTestFile('bad.json');
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation();
    parseJson(fileBuff);
    expect(logSpy).toHaveBeenCalledWith('parser error: failed to parse data as JSON');
    logSpy.mockRestore();
  });
  test('parse empty json', () => {
    const fileBuff = readTestFile('empty.json');
    expect(parseJson(fileBuff)).toEqual({});
  });
});

describe('parseYaml', () => {
  test('parse valid yaml (.yml)', () => {
    const fileBuff = readTestFile('file1.yml');
    expect(parseYaml(fileBuff)).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });
  test('parse invalid yaml', () => {
    const fileBuff = readTestFile('bad.yml');
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation();
    parseYaml(fileBuff);
    expect(logSpy).toHaveBeenCalledWith('parser error: failed to parse data as YAML');
    logSpy.mockRestore();
  });
  test('parse empty yaml', () => {
    const fileBuff = readTestFile('empty.yml');
    expect(parseYaml(fileBuff)).toEqual({});
  });
});
