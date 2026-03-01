// This function wraps async controllers
// It catches any rejected promise automatically
// const asyncErrorHandler = (fn) => {
//   // If fn throws an error,
//   // .catch(next) sends it to Express error middleware
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// module.exports = asyncErrorHandler;

const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncErrorHandler;
