const axios = require('axios').default;
const querystring = require('querystring');
const apiKey = process.env.API_KEY;

async function getIndex(req, res){
    res.json({message: 'This is the Nasa root route'});
}

async function getPictureOfTheDay(req, res){
    const query = {
        date: req.query.date,
        start_date: req.query.start_date,
        end_date: req.query.end_date
    };
    const axiosParams = querystring.stringify({api_key: apiKey, ...query})
    console.log(axiosParams);
    axios.get(`https://api.nasa.gov/planetary/apod?${axiosParams}`)
        .then((response) => {
            res.json(response.data);
        })
        .catch(err => {
            res.status(500).json(err);
        });
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

module.exports = {getIndex, getPictureOfTheDay, getMarsPicture};