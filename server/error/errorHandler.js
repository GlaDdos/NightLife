module.exports.errorHandler = function(err, req, res, next) {
  res.status('422').json({message: err.message});
}