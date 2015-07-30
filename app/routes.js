/**
 * Created by bill on 15/7/30.
 */

var path = require('path');

module.exports = function(app, router)
{
    // Fronted Route
    app.route('*')
        .get(function(req, res)
        {
            res.sendFile(path.join(__dirname, '../public/views', 'layout.html'));
        });
};