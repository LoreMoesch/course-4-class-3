const playersData = require('../stubs/data.json');
function getIndex(req, res){
    res.json({
        message: 'This is the root rout',
        name: req.query.name,
    });
}
function getPlayers(req, res){
    res.json(playersData.players);
}
function postPlayers(req, res){
    console.log(req.body);
    const reqBody = req.body;
    res.json(reqBody);
}
module.exports = {getIndex, getPlayers, postPlayers}