const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bb74258b3217aa067bb832f9f943c448&query=query=" +
    address;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

module.exports = forecast;
