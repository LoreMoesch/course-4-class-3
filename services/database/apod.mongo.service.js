const apod = require('../../config/Schema/apod.schema');

async function saveApod(){
    const apodToday = new apod({title: 'my apod'});
    try{
        await apodToday.save((err, element) => {
            console.log('new element added to the DB', element);
        });
    } catch(err){
        throw err;
    }

    return {status: 'ok prueba task'};
};

module.exports = {saveApod};
