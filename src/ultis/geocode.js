const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1Ijoia2lldHRlaWsiLCJhIjoiY2tqaDUweHlhNGk2czJ5c2J4ZjFyYXUwZiJ9.FIvSDsnOvq7l5o03KrVEtw`;
    request({ url: url }, (err, res) => {
        const data = JSON.parse(res.body);
        if (err) {
            return callback("Unable to connect the geocode server", undefined);
        } else if (data.features.length === 0) {
            return callback("Location not found", undefined);
        } else {
            return callback(undefined, {
                long: data.features[0].center[0],
                lat: data.features[0].center[1],
                name: data.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
