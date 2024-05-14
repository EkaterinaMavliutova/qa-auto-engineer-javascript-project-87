import formatToPlain from '../../src/formatters/plain.js';

const collToFormat = [
  {
    diff: '-', name: 'follow', value: false, changedValue: null,
  },
  {
    diff: null, name: 'host', value: 'hexlet.io', changedValue: null,
  },
  {
    diff: '-', name: 'proxy', value: '123.234.53.22', changedValue: null,
  },
  {
    diff: '-', name: 'timeout', value: 50, changedValue: 20,
  },
  {
    diff: '+', name: 'verbose', value: true, changedValue: null,
  },
];

test('format to plain successfully', () => {
  expect(formatToPlain(collToFormat)).toEqual([
    'Property \'follow\' was removed',
    'Property \'proxy\' was removed',
    'Property \'timeout\' was updated. From 50 to 20',
    'Property \'verbose\' was added with value: true',
  ]);
});
test('format to plain fail: data is not a collection', () => {
  expect(formatToPlain('vjgfgh')).toBeUndefined();
});
test('format to plain fail: collection that can not be formatted', () => {
  expect(formatToPlain(['fgasfg', 'sdsd', 'fsg'])).toEqual([]);
});
