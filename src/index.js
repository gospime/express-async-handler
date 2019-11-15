/**
 * Added temporary while express@5.0.0 will not be published to npm
 */

const Boom = require('@hapi/boom');

// Error handling in Express with async-await
// https://nemethgergely.com/error-handling-express-async-await
const getErrorHandling = next => error => {
  if (error instanceof Error && !error.isBoom) {
    error = Boom.badImplementation(error.message, error);
  }

  next(error);
};

module.exports = handler => (request, response, next) =>
  Promise.resolve(
    handler(request, response, next)
  ).catch(
    getErrorHandling(next)
  );
