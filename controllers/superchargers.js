var request = require("request")
var xml = require("xml")
var tokml = require("tokml")

/**
 * GET /api/superchargers/geo
 * Get the geo details of a supercharger 
 */
exports.getGeo = function (req, res) {

    var url = 'http://supercharge.info/service/supercharge/allSites'

    // Containers for GeoJSON data
    var features = [];
    var featureCollection = {
        type: "FeatureCollection",
        features: features
    };

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var superchargers = body;

            for (var sc in superchargers) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [superchargers[sc].gps.longitude, superchargers[sc].gps.latitude]
                    },
                    properties: {
                        id: superchargers[sc].id,
                        //locationId: JSON.stringify(superchargers[sc].locationId), TODO: Why does this break tokml?
                        address: JSON.stringify(superchargers[sc].address),
                        name: superchargers[sc].name,
                        stalls: superchargers[sc].stallCount
                    }
                });
            }

            res.set("Content-Type", "text/xml");
            res.send(tokml(featureCollection));
        } else {
            console.log('Something went wrong :(')
        }
    })
};
