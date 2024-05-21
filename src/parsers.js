import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
};

const getParser = (dataType) => {
  try {
    if (parsers[dataType] === undefined) {
      throw new Error(`'${dataType}' parsing is not supported`);
    }
    return parsers[dataType];
  } catch (err) {
    throw new Error(err);
  }
};

export default getParser;
