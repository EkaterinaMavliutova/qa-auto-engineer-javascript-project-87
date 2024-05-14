import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  json,
  stylish,
};

export default (format) => formatters[format];
