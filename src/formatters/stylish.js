const toStylishMap = {
  unchanged({ key, value }) {
    return `    ${key}: ${value}`;
  },
  changed({ key, value1, value2 }) {
    return [
      `  - ${key}: ${value1}`,
      `  + ${key}: ${value2}`,
    ];
  },
  deleted({ key, value }) {
    return `  - ${key}: ${value}`;
  },
  added({ key, value }) {
    return `  + ${key}: ${value}`;
  },
};

const formatToStylish = (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.flatMap((item) => toStylishMap[item.type](item));

  return ['{', ...formattedColl, '}'].join('\n');
};

export default formatToStylish;
