const toStylishMap = {
  unchanged({ key, value }) {
    return `   ${key}: ${value}`;
  },
  changed({ key, value1, value2 }) {
    return [
      `-  ${key}: ${value1}`,
      `+  ${key}: ${value2}`,
    ];
  },
  deleted({ key, value }) {
    return `-  ${key}: ${value}`;
  },
  added({ key, value }) {
    return `+  ${key}: ${value}`;
  },
};

const formatToStylish = (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.flatMap((item) => toStylishMap[item.type](item));
  // const formattedColl = coll.reduce((acc, item) => {
  //   const {
  //     diff, name, value, changedValue,
  //   } = item;
  //   if (diff === null) {
  //     return [...acc, `    ${name}: ${value}`];
  //   }
  //   if (diff !== null && changedValue !== null) {
  //     return [...acc, `  ${diff} ${name}: ${value}`, `  + ${name}: ${changedValue}`];
  //   }
  //   if (diff !== null && changedValue === null) {
  //     return [...acc, `  ${diff} ${name}: ${value}`];
  //   }
  //   return acc;
  // }, []);
  // console.log(formattedColl);
  return ['{', ...formattedColl, '}'].join('\n');
};

// const example1 = [
//   { key: 'follow', type: 'deleted', value: false },
//   { key: 'host', type: 'unchanged', value: 'hexlet.io' },
//   { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
//   {
//     key: 'timeout', type: 'changed', value1: 50, value2: 20,
//   },
//   { key: 'verbose', type: 'added', value: true },
// ];

// console.log(formatToStylish(example1));

export default formatToStylish;
