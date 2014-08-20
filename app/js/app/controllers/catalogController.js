"use strict";
var baseUrl = require("../../../../api/db");
var catalogUrl = baseUrl.catalogUrl;

console.log(catalogUrl);
var merchantId = 'SEAM';
module.exports = function(app) {

    app.controller("CatalogController", function($scope, $http, $location) {
        $http({
            url: catalogUrl + '&_mid=SEAM',
            method: "GET",
            dataType: "json",
            cache: false,
            //params: {_mid: merchantId}
        })
        .success(function(data, status, headers, config) {
            $scope.catalogDisplay = data;
        })
        .error(function(data, status, headers, config) {
            console.log("There was an error: " + data);
            console.log("There was an error: " + status);
            console.log("There was an error: " + headers);
            console.log("There was an error: " + config);
        });// end $http.get

    $scope.showDetails = function(id) {
        $location.path("/item/" + id);
    };
    $scope.quantity = 10;

    });// end app.controller
}; // end module.exports