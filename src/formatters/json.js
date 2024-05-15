export default (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.reduce((acc, item) => {
    const {
      diff, name, value, changedValue,
    } = item;
    if (diff === null) {
      return { ...acc, [`  ${name}`]: value };
    }
    if (diff !== null && changedValue !== null) {
      return { ...acc, [`${diff} ${name}`]: value, [`+ ${name}`]: changedValue };
    }
    if (diff !== null && changedValue === null) {
      return { ...acc, [`${diff} ${name}`]: value };
    }
    return acc;
  }, {});
  return formattedColl;
};
