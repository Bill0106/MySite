/**
 * Created by bill on 15/8/7.
 */

function timestamp(date)
{
    if (date.indexOf('-') > 0) {
        date = date.split("-");
    }

    if (!date[2]) {
        date[2] = '1';
    }

    var newDate = date[1] + "/" + date[2] + "/" + date[0];
    var result = new Date(newDate).getTime();

    return result;
}

module.exports = timestamp;