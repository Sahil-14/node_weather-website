const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c1378767e9b0fb36a961d972b5a358fb&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, {body}) => {
    //es6 object destucturing as response is an object we getting and we want body property from it.
    if (error) {
      callback("Unable to connect .Please check your connection.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const result = body.current;
      const data = {
        weather_descriptions: result.weather_descriptions[0],
        temperature: result.temperature,
      };
      callback(undefined,data);
    }
  });
};

module.exports = forcast;
