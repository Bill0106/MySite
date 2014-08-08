/**
 * Created by Bill on 14-8-8.
 */

module.exports = function(app, router)
{
    // Fronted Route
    app.route('*')
        .get(function(req, res)
        {
            res.send('Hello World!');
        });
}
