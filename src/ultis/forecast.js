const request = require("request");

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c965c4be0aef4c90598cdaae94875b23&query=${lat},${long}`;
    request({ url }, (err, res) => {
        const data = JSON.parse(res.body);
        if (err) {
            return callback("Unable to connect the weather server", undefined);
        } else if (data.error) {
            return callback("Geocode not found", undefined);
        } else {
            return callback(undefined, {
                location: data.location.name,
                des: data.current.weather_descriptions[0],
                temp: data.current.temperature,
            });
        }
    });
};

module.exports = forecast;
