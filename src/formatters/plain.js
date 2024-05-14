export default (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.reduce((acc, item) => {
    const {
      diff, name, value, changedValue,
    } = item;
    if (diff === '+') {
      acc.push(`Property '${name}' was added with value: ${value}`);
    }
    if (diff === '-' && changedValue === null) {
      acc.push(`Property '${name}' was removed`);
    }
    if (diff === '-' && changedValue !== null) {
      acc.push(`Property '${name}' was updated. From ${value} to ${changedValue}`);
    }
    return acc;
  }, []);
  return formattedColl;
};

/*const example3 = [
  {'- follow': false},
  {'  host': 'hexlet.io'},
  {'- proxy': '123.234.53.22'},
  {'- timeout': 50},
  {'+ timeout': 20},
  {'+ verbose': true},
];

console.log(JSON.stringify({'- follow': false, '  host': 'hexlet.io', '+ verbose': true}, null, '\t'));
console.log(JSON.stringify('"- follow": false'));
console.log(JSON.stringify(example3, null, '\t'));*/
