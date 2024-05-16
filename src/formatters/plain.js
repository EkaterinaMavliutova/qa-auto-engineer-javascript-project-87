export default (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.reduce((acc, item) => {
    const {
      diff, name, value, changedValue,
    } = item;
    if (diff === '+') {
      return [...acc, `Property '${name}' was added with value: ${value}`];
    }
    if (diff === '-' && changedValue === null) {
      return [...acc, `Property '${name}' was removed`];
    }
    if (diff === '-' && changedValue !== null) {
      return [...acc, `Property '${name}' was updated. From ${value} to ${changedValue}`];
    }
    return acc;
  }, []);
  return formattedColl;
};
