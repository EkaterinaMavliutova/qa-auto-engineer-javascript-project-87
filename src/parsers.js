export const parseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('parser error: failed to parse data as JSON');
    return undefined;
  }
};

export const parseYaml = (text) => text;
