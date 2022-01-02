const { default: axios } = require("axios");
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Proxy Listening on port ${port}`));

const metaWeather = async (req, res) => {
  const params = new URLSearchParams();
  Object.keys(req.query).forEach(key =>  {
    if (key !== "endpoint") params.set(key, req.query[key]);
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const url = new URL("https://www.metaweather.com/api/location/" + req.query.endpoint + "?" +  params.toString());
    const {status, data} = await axios.get(url.toString());
    res.status(status);
    res.json({ data });
  } catch (error) {
    res.json({message: error.message});
    res.status(500);
  }
};

const metaWeatherById = async (req, res) => {
  const { params: { id } } = req;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { status, data } = await axios.get(`https://www.metaweather.com/api/location/${id}`);
  res.status(status).send({ data });
};

app.get("/weather", metaWeather);
app.get("/weather/:id", metaWeatherById);