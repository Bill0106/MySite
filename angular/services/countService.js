/**
 * Created by bill on 15/8/12.
 */

var countService = angular.module('countService', []);

countService.factory('Count', function($resource)
{
    return $resource('/api/count/:model');
});