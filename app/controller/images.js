/**
 * Created by Bill on 14-8-8.
 */

var fs = require('fs');
var checksum = require('../../config/checksum');
var imageUpload = require('../../config/imageUpload');

exports.post = function(req, res)
{
    var tmpPath = req.files.file.path;
    var imageType = tmpPath.split('.');

    fs.readFile(tmpPath, function(err, data)
    {
        var imageName = checksum(data);
        var targetPath = './public/images/' + imageName + '.' + imageType[1];

        imageUpload(tmpPath, targetPath);

        if (err)
            res.send(err);

        res.send(imageName + '.' + imageType[1]);
    });
};