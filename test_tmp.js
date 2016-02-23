var request = require("request")

var url = 'http://supercharge.info/service/supercharge/allSites'

request ({
	url: url,
	json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        var superchargers = body
		console.log(superchargers[0])
        //console.log(body) // Print the json response
    }
})

