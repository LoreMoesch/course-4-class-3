const apod = require('../../../config/Schema/apod.schema');

async function saveApod(data){
    const newApod = new apod(data);
    try{
        await newApod.save((err, newApod) => {
            console.log('new element added to the DB', newApod);
        });
    } catch(err){
        throw {staus: 'error', details: 'error while saving the element in the DB'};
    }

    return data;
};

async function getApodCache(date){
    await apod.findOne({date: date})
        .then(data => {
            if(data !== null){
                console.log(data);
                const {date, explanation, hdurl, media_type, service_version, tittle, url} = data
                return ({date, explanation, hdurl, media_type, service_version, tittle, url});
            } else return undefined
        });
    ;
}

module.exports = {saveApod, getApodCache};
