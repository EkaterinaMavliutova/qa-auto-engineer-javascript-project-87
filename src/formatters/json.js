const formatToJson = (coll) => {
  if (!Array.isArray(coll)) {
    return undefined;
  }

  return JSON.stringify(coll);
};

export default formatToJson;
