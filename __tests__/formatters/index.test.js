import getFormatter from '../../src/formatters/index.js';

test.each([
  'plain',
  'json',
  'stylish',
])('get existing %s formatter function', (format) => {
  expect(getFormatter(format)).toBeInstanceOf(Function);
});
test('get nonexistent formatter function', () => {
  expect(getFormatter('fakeFormat')).toBeUndefined();
});
