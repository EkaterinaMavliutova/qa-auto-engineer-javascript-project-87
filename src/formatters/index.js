import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  json,
  stylish,
};

export default (format) => {
  try {
    if (formatters[format] === undefined) {
      throw new Error(`output to '${format}' is not supported`);
    }
    return formatters[format];
  } catch (e) {
    throw new Error(e);
  }
};
