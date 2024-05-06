//import fs from 'node:fs';

export const parseJson = (text) => {
  try {
   return JSON.parse(text);
  }
  catch (err) {
    console.error('Error: failed to parse data as JSON');
    return undefined;
  }
};

export const parseYaml = (text) => text;

//const file = fs.readFileSync('/Users/ekaterinamavlutova/Documents/IT study/JavaScript/Projects/qa-auto-engineer-javascript-project-87/__fixtures__/empty.json');
//console.log(parseJson(file));
