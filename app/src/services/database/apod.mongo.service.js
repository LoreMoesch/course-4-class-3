const apod = require('../../../config/Schema/apod.schema');

async function saveApodCache(data){
    console.log(data, 'here');
    const apodToday = new apod(data);
    console.log(apodToday);
    try{
        await apodToday.save((err, apodToday) => {
            console.log('new element added to the DB', apodToday);
        });
    } catch(err){
        throw err;
    }

    return {};
};

module.exports = {saveApodCache};
