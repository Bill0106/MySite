/**
 * Created by Bill on 14-8-8.
 */

var fs = require('fs');

function imageUpload(tmp_path, target_path)
{
    fs.rename(tmp_path, target_path, function(err)
    {
        if (err)
            throw err;

        fs.unlink(tmp_path, function()
        {
            if (err)
                throw err;
        });
    });
};

module.exports = imageUpload;