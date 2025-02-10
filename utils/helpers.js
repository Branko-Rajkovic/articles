//function that takes an object and an array of keys,
// then returns a new object containing only the key-value pairs
// where the keys are present in the array
exports.filterObjectByKeys = (sourceObj, keysArray) => {
  const filteredObj = {};

  keysArray.forEach((key) => {
    if (key in sourceObj) {
      filteredObj[key] = sourceObj[key];
    }
  });

  return filteredObj;
};

/////////////////////////////////////
/////////////////////////////////////
//transforms query parameters from a request to format
// for use with a database query in MongoDB.
//add a $ prefix to any occurrences of gte, gt, lte, or lt
exports.filterForMongoQuery = (requestQuery) => {
  const strSerchQuery = JSON.stringify(requestQuery);
  const searchQuery = strSerchQuery.replace(
    /\bgte|gt|lte|lt\b/g,
    (match) => `$${match}`
  );
  return JSON.parse(searchQuery);
};

// exports.getUpdatedFields = (req, ...fields) => {
//   if (!fields || !req.file) return req.body;
//   const updates = {};
//   Object.keys(req.body).forEach((element) => {
//     if (fields.includes(element)) updates[element] = req.body[element];
//   });
//   if (req.file) updates.photo = req.file.filename;
//   console.log(req.file);
//   return updates;
// };
