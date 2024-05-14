export default (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.reduce((acc, item) => {
    const {
      diff, name, value, changedValue,
    } = item;
    if (diff === null) {
      return { ...acc, [` ${name}`]: value };// acc[` ${name}`] = value;
    }
    if (diff !== null) {
      return { ...acc, [`${diff} ${name}`]: value };// acc[`${diff} ${name}`] = value;
    }
    if (changedValue !== null) {
      return { ...acc, [`+ ${name}`]: changedValue };// acc[`+ ${name}`] = changedValue;
    }
    return acc;
  }, {});
  return formattedColl;
};
