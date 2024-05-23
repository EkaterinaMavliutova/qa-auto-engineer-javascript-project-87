import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parseData = (data, dataType) => {
  try {
    if (parsers[dataType] === undefined) {
      throw new Error(`'${dataType}' parsing is not supported`);
    }
    return parsers[dataType](data);
  } catch (err) {
    throw new Error(err);
  }
};

export default parseData;
