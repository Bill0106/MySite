/**
 * Created by Bill on 14-11-24.
 */

function timestamp(date)
{
    date = date.split("-");

    var newDate = date[1] + "/" + date[2] + "/" + date[0];
    var result = new Date(newDate).getTime();

    return result;
}

module.exports = timestamp;