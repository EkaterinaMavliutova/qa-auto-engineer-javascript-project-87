import formatToPlain from './plain.js';
import formatToJson from './json.js';
import formatToStylish from './stylish.js';

const formatters = {
  plain: formatToPlain,
  json: formatToJson,
  stylish: formatToStylish,
};

const formatData = (data, format) => {
  try {
    if (formatters[format] === undefined) {
      throw new Error(`output to '${format}' is not supported`);
    }
    return formatters[format](data);
  } catch (e) {
    throw new Error(e);
  }
};

export default formatData;
