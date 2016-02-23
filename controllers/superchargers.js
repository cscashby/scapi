var request = require("request")




/**
 * GET /api/superchargers/geo
 * Get the geo details of a supercharger 
 */
exports.getGeo = function(req, res) {

  var url = 'http://supercharge.info/service/supercharge/allSites'

  request ({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var superchargers = body
      // insert logic to do whatever you want with the supercharger data 
      res.json(superchargers[0]);
    } else {
      console.log('Something went wrong :(')
    }
  })
};