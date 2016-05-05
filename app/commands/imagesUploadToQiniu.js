/**
 * Created by bill on 16/4/26.
 */

var async    = require('async');
var fs       = require('fs');
var qiniu    = require('qiniu');
var request  = require('request');
var checksum = require('../libraries/checksum');
var key      = require('../config/qiniuKey');

var bucket            = 'website';
qiniu.conf.ACCESS_KEY = key.AK;
qiniu.conf.SECRET_KEY = key.SK;

var totalSaved = 0;
(function handle()
{
    var mongoose = require('mongoose');
    var database = require('../config/database');

    mongoose.connect(database);

    async.parallel([
        // Games Images
        function (callback)
        {
            var Games = require('../models/games');

            Games.find(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    async.each(data, function (item, eachCallback)
                    {
                        dealImage(item, eachCallback);
                    }, function(err) {
                        if (err)
                            throw err;

                        callback(null, data.length);
                    });
                }
            });
        },
        // Gourmets Images
        function (callback)
        {
            var Gourmets  = require('../models/gourmets');

            Gourmets.find(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    async.each(data, function (item, eachCallback)
                    {
                        dealImage(item, eachCallback);
                    }, function(err) {
                        if (err)
                            throw err;

                        callback(null, data.length);
                    });
                }
            });
        },
        // HearthStone Seasons Images
        function (callback)
        {
            var Seasons  = require('../models/hearthStone/seasons');

            Seasons.find(function (error, data)
            {
                if (error) {
                    callback(error);
                } else {
                    async.each(data, function (item, eachCallback)
                    {
                        dealImage(item, eachCallback);
                    }, function(err) {
                        if (err)
                            throw err;

                        callback(null, data.length);
                    });
                }
            });
        }
    ], function (error, results)
    {
        if (error)
            throw error;

        var total = results[0] + results[1] + results[2];
        console.log('All Finished! Saved: ' + totalSaved + ' All: ' + total);

        process.exit();
    });
})();

function dealImage (item, cb)
{
    var image = './public/images/' + item.image;
    var imageType = item.image.split('.');

    async.waterfall([
        function (callback)
        {
            fs.readFile(image, function (error, data)
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

            uploadFile(token, imageName, image, function(error, result)
            {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            })
        },
        function (imageName, callback)
        {
            request(imageName + '?imageAve', function (error, response, body)
            {
                if (error) {
                    callback(error);
                } else {
                    var data  = {
                        url: imageName,
                        color: JSON.parse(body).RGB
                    };

                    callback(null, JSON.stringify(data));
                }
            });
        },
        function (data, callback)
        {
            item.image = data;

            item.save(function (error)
            {
                if (error) {
                    callback(error);
                } else {
                    console.log('Data saved ' + item._id);
                    callback();
                }
            });
        }
    ], function (error)
    {
        if (error)
            throw error;

        totalSaved++;
        cb();
    });
}

function uptoken(bucket, key)
{
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}

function uploadFile(uptoken, key, localFile, callback)
{
    var extra = new qiniu.io.PutExtra();
    var domain = 'http://7xtddu.com1.z0.glb.clouddn.com/';

    qiniu.io.putFile(uptoken, key, localFile, extra, function (error, ret)
    {
        if(!error) {
            callback(null, domain + ret.key);
        } else {
            callback(error);
        }
    });
}