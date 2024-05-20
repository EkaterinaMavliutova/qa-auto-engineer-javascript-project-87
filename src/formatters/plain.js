const toPlainMap = {
  unchanged() {
    return [];
  },
  changed({ key, value1, value2 }) {
    return `Property '${key}' was updated. From ${JSON.stringify(value1)} to ${JSON.stringify(value2)}`;
  },
  deleted({ key }) {
    return `Property '${key}' was removed`;
  },
  added({ key, value }) {
    return `Property '${key}' was added with value: ${JSON.stringify(value)}`;
  },
};

const formatToPlain = (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.flatMap((item) => toPlainMap[item.type](item));
  return formattedColl.join('\n');
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

// console.log(formatToPlain(example1));

export default formatToPlain;
