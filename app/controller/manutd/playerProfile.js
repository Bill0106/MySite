/**
 * Created by Bill on 14-11-21.
 */

var PlayerProfile = require('../../model/manutd/playerProfile');

exports.list = function(req, res)
{
    PlayerProfile.find(function(err, data)
    {
        if (err)
            res.send(err);
        
        res.json(data);
    });
};

exports.post = function(req, res)
{
    console.log(req.body);
    var timestamp = function(date)
    {
        date = date.split("-");
        var newDate = date[1] + "/" + date[2] + "/" + date[0];
        var timestamp = new Date(newDate).getTime();
        return timestamp;
    };

    PlayerProfile.create({
        name         : req.body.name,
        full_name    : req.body.full_name,
        birthday     : timestamp(req.body.birthday),
        nationality  : req.body.nationality,
        height       : req.body.height,
        position     : req.body.position.name,
        number       : req.body.number,
        value        : req.body.value,
        joined       : timestamp(req.body.joined),
        introduction : req.body.description,
        stats_url    : req.body.stats_url,
        image        : req.body.image
    }, function(err)
    {
        if (err)
            res.send(err);

        res.send(req.body.name);
    });
};