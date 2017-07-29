require('dotenv').config();
const https = require('https');

module.exports = {
  getToken: function(yelpTokenUrl) {
    //idk if this is really required sice token lives 6 months
  },

  searchYelp: function(searchObject) {
/*    searchObject = {
      location: string, required if lat and long not specified/ do not support polish 
      latitude: dec, required if no location
      longitude: dec, required if no location
      term: bars etc, def is all
      limit: max 50 returned, def is 20
      offset: offset, def no offset
      sortby: what, def best_match
    }*/

    //FIXME: possible error contain request with non english characters, i. ex. polisz letters ł, ó, ż, ź etc.
    
    return new Promise((resolve, reject) => {
      if(searchObject.location == undefined && (searchObject.latitude == undefined && searchObject.longitude == undefined)){
        reject(new Error('there is no location provided'));
      }

      if(searchObject.limit > 50 || searchObject.limit < 0){
        reject(new Error('You can get 1-50 result at one time, use offset if needed more.'));
      }

      const enumFields = ['location', 'latitude', 'longitude', 'term', 'limit', 'offset', 'sortBy'];
      let queryString = '';

      enumFields.forEach((element) => {
        if(element in searchObject) {queryString += `&${element}=${searchObject[element].replace(' ', '+')}`};
      });

      const options = {
        hostname: 'api.yelp.com',
        path: '/v3/businesses/search?' + queryString,
        headers: {
          'Authorization': 'Bearer ' + process.env.YELP_TOKEN
        }
      }
       
      https.get(options, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
          error = new Error('Request failed.\n' + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' + `Expected application/json but recived ${contentType}`);
        }

        if (error) {
          res.resume();
          reject(error);
        }

        let data = '';
        
        res.on('data', (chunk) => { data += chunk; });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);

          } catch (e) {
            reject(e);
          }
        });
      })
    }) 
  },

  getYelpBusiness: function(businessId) {
    return new Promise((resolve, reject) => {

      const options = {
        hostname: 'api.yelp.com',
        path: '/v3/businesses/' + businessId,
        headers: {
          'Authorization': 'Bearer ' + process.env.YELP_TOKEN
        }
      };

      https.get(options, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
          error = new Error('Request failed.\n' + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' + `Expected application/json but recived ${contentType}`);
        }

        if (error) {
          res.resume();
          reject(error);
        }

        let data = '';
        
        res.on('data', (chunk) => { data += chunk; });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);

          } catch (e) {
            reject(e);
          }
        });
      })
    })
  }

}