import yaml from 'js-yaml';

// const parseJson = (text) => JSON.parse(text);
// const parseYaml = (text) => yaml.load(text);

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (fileExtension) => {
  try {
    if (parsers[fileExtension] === undefined) {
      throw new Error(`'${fileExtension}' parsing is not supported`);
    }
    return parsers[fileExtension];
  } catch (err) {
    throw new Error(err);
  }
};
