"use strict";
var baseUrl = require("../../../../api/db");
var catalogUrl = baseUrl.catalogUrl;

console.log(catalogUrl);

module.exports = function(app) {

    app.controller("CatalogController", function($scope, $http, $location) {
        $http({
            url: catalogUrl,
            method: "GET",
            dataType: "json",
            cache: false
        })
        .success(function(data, status, headers, config) {
            $scope.catalogDisplay = data;
        })
        .error(function(data, status, headers, config) {
            console.log("There was an error: " + data);
        });// end $http.get

    $scope.showDetails = function(id) {
        $location.path("/item/" + id);
    };
    $scope.quantity = 10;

    });// end app.controller
}; // end module.exports