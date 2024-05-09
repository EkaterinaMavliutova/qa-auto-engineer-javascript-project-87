import yaml from 'js-yaml';

export const parseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('parser error: failed to parse data as JSON');
    return undefined;
  }
};

export const parseYaml = (text) => {
  try {
    return yaml.load(text);
  } catch (err) {
    console.error('parser error: failed to parse data as YAML');
    return undefined;
  }
};
