import {jest} from '@jest/globals';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { parseJson } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test('parse valid json', () => {
  const fileBuff = readFile('file1.json');
  expect(parseJson(fileBuff)).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
test('parse invalid json', () => {
  const fileBuff = readFile('bad.json');
  const logSpy = jest.spyOn(global.console, 'error').mockImplementation();
    parseJson(fileBuff);
    expect(logSpy).toHaveBeenCalledWith('parser error: failed to parse data as JSON');
    logSpy.mockRestore();
});
test('parse empty json', () => {
  const fileBuff = readFile('empty.json');
  expect(parseJson(fileBuff)).toEqual({});
});
