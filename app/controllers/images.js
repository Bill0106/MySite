/**
 * Created by bill on 15/8/11.
 */

var async       = require('async');
var fs          = require('fs');
var qiniu       = require('qiniu');
var request     = require('request');
var checksum    = require('../libraries/checksum');
var qiniuConfig = require('../config/qiNiu');

var bucket            = 'website';
qiniu.conf.ACCESS_KEY = qiniuConfig.AK;
qiniu.conf.SECRET_KEY = qiniuConfig.SK;

exports.post = function(req, res)
{
    var tmpPath = req.files.file.path;
    var type = req.files.file.type;
    var imageType = type.split('/');

    if (imageType[0] != 'image') {
        res.status('400').send('Not Image');
    }

    async.waterfall([
        function (callback)
        {
            fs.readFile(tmpPath, function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    var imageName = checksum(data) + '.' + imageType[1];
                    callback(null, imageName);
                }
            });
        },
        function (imageName, callback)
        {
            var token = uptoken(bucket, imageName);

            uploadFile(token, imageName, tmpPath, function(error, result)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            })
        },
        function (result, callback)
        {
            async.parallel([
                function (parallelCallback)
                {
                    request(result + '?imageAve', function (error, response, body)
                    {
                        if (error) {
                            parallelCallback(error);
                        } else {
                            var data  = {
                                url: result,
                                color: JSON.parse(body).RGB
                            };

                            parallelCallback(null, data);
                        }
                    });
                },
                function (parallelCallback)
                {
                    fs.unlink(tmpPath, function(error)
                    {
                        if (error) {
                            parallelCallback(error);
                        } else {
                            parallelCallback();
                        }
                    });
                }
            ], function (error, results)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, results[0]);
                }
            });
        }
    ], function (error, data)
    {
        if (error) {
            res.status('400').send(error);
        } else {
            res.send(data);
        }
    });
};

function uptoken(bucket, key)
{
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}

function uploadFile(uptoken, key, localFile, callback)
{
    var extra = new qiniu.io.PutExtra();
    var domain = qiniuConfig.domain;

    qiniu.io.putFile(uptoken, key, localFile, extra, function (error, ret)
    {
        if(error) {
            callback(error);
        } else {
            callback(null, domain + ret.key);
        }
    });
}