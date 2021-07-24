const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ac613d82e858a98b4d57e7faa30c09cb&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]} : it is currently ${response.body.current.temperature} degrees out but it feels like ${response.body.current.feelslike}`
      );
    }
  });
};

module.exports = {
  forecast: forecast,
};
