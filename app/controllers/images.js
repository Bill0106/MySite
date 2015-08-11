/**
 * Created by bill on 15/8/11.
 */

var path = require('path');
var fs = require('fs');
var checksum = require('../libraries/checksum');

exports.post = function(req, res)
{
    var tmpPath = req.files.file.path;
    var type = req.files.file.type;
    var imageType = type.split('/');

    if (imageType[0] != 'image') {
        res.status('400').send('Not Image');
    }

    fs.readFile(tmpPath, function(err, data)
    {
        var imageName = checksum(data) + '.' + imageType[1];
        var targetPath = path.join(__dirname, '../../public/images', imageName);

        fs.rename(tmpPath, targetPath, function(err)
        {
            if (err) {
                res.status('400').send(err);
            } else {
                fs.unlink(tmpPath, function()
                {
                    if (err) {
                        res.status('400').send(err);
                    } else {
                        res.send(imageName);
                    }
                });
            }
        });
    });
};