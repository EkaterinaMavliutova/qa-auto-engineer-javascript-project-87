export default (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }
  const formattedColl = coll.reduce((acc, item) => {
    const {
      diff, name, value, changedValue,
    } = item;
    if (diff === null) {
      acc.push(`    ${name}: ${value}`);
    }
    if (diff !== null) {
      acc.push(`  ${diff} ${name}: ${value}`);
    }
    if (changedValue !== null) {
      acc.push(`  + ${name}: ${changedValue}`);
    }
    return acc;
  }, []);
  return ['{', ...formattedColl, '}'];
};
