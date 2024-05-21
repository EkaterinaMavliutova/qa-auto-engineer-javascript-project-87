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

export default formatToPlain;
