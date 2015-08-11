/**
 * Created by bill on 15/8/11.
 */

var crypto = require('crypto');

function checksum(str, algorithm, encoding)
{
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

module.exports = checksum;