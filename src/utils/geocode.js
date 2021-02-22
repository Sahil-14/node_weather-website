const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FoaWxzaGltcGkiLCJhIjoiY2tsN3BobGZuMWtnNjJ1bWd1cmo4ZXg3ZyJ9.To6cppl7kkbcSmlU7nYgtQ&limit=1";
  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location server.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location .Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location:body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
