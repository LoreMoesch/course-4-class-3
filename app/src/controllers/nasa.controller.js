const axios = require('axios').default;
const querystring = require('querystring');
const apiKey = process.env.API_KEY;
const apodMongoService = require('../services/database/apod.mongo.service');
async function getIndex(req, res){
    res.json({message: 'This is the Nasa root route'});
}

async function getPictureOfTheDay(req, res){
    let result; 

    const query = {
        date: req.query.date,
        start_date: req.query.start_date,
        end_date: req.query.end_date
    };
    const axiosParams = querystring.stringify({api_key: apiKey, ...query})
    console.log(axiosParams);
    await axios.get(`https://api.nasa.gov/planetary/apod?${axiosParams}`)
        .then(async (response) => {
            await apodMongoService.saveApod(response.data);
            result = response.data;
        })
        .catch(err => {
            response = {status: 'error', detailed_message: 'error while calling NASA API', ...err.response.data};
            res.status(err.response.status);
        });
    res.json(result);
}

async function getMarsPicture(req, res){
    const query = {
        earth_date: req.query.earth_date
    };
    const axiosParams = querystring.stringify({api_key: apiKey, ...query});
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?${axiosParams}`)
        .then((response) => {
            res.json(response.data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

async function savePictureOfTheDay(req, res){
    const response = await apodMongoService.saveApod();
    res.json(response);
}

module.exports = {getIndex, getPictureOfTheDay, getMarsPicture, savePictureOfTheDay};