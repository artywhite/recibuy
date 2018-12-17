function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.is('json')) {
    res.status(500).send({ error: err })
  } else {
    next(err)
  }
}

const wrap = fn => (...args) => Promise
  .resolve(fn(...args))
  .catch(args[2]);

module.exports = {
  clientErrorHandler,
  logErrors,
  wrap,
}