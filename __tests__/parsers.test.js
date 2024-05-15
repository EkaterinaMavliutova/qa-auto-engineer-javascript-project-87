import getParser from '../src/parsers.js';

test.each([
  '.json',
  '.yml',
  '.yaml',
])('get existing %s parser function', (fileExtension) => {
  expect(getParser(fileExtension)).toBeInstanceOf(Function);
});
test('get nonexistent parser function', () => {
  expect(() => {
    getParser('.fakeExtension');
  }).toThrow('\'.fakeExtension\' parsing is not supported');
});
