const yelpController = require('../controllers/yelp');

exports.routes = function (app) {
  
  app.route('/auth/google')
    .get((req, res, next) => {
      res.json({message: '/auth/google route'})
    });

  app.route('/auth/google.callback')
    .get((req, res, next) => {
        res.json({message: '/auth/google.callback route'})
      });

  app.route('/auth/facebook')
    .get((req, res, next) => {
        res.json({message: '/auth/facebook route'})
      });

  app.route('/auth/google/callback')
    .get((req, res, next) => {
        res.json({message: '/auth/google/callback route'})
      });

  app.route('/auth/github')
    .get((req, res, next) => {
        res.json({message: '/auth/github route'})
      });

  app.route('/auth/github/callback')
    .get((req, res, next) => {
        res.json({message: '/auth/github/callback route'})
      });

  app.route('/auth/local/login')
    .get((req, res, next) => {
        res.json({message: '/auth/local/login route'})
      });

  app.route('/auth/local/register')
    .get((req, res, next) => {
        res.json({message: '/auth/local/register route'})
      });

  app.route('/api/yelp/search')
    .post((req, res, next) => {
        yelpController.searchYelp(req.body)
          .then(json => res.json(json))
          .catch(err => next(err));
    });

  app.route('/api/yelp/search/business')
    .post((req, res, next) => {
      yelpController.getYelpBusiness(req.body.id)
        .then(json => res.json(json))
        .catch(err => next(err))
    })

}