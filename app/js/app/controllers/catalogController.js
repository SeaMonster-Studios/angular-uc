"use strict";
var baseUrl = require("../../../../api/db");
var cartUrl = baseUrl.cartUrl;
var itemUrl = baseUrl.itemUrl;
var catalogUrl = baseUrl.catalogUrl;


console.log(catalogUrl);

module.exports = function(app) {

    app.controller("CatalogController", function($scope, $http) {
        $http({
            url: catalogUrl,
            method: "GET",
            dataType: "json"
        })
        .success(function(data, status, headers, config) {
            $scope.catalogDisplay = data;
        })
        .error(function(data, status, headers, config) {
            console.log("There was an error: " + data);
        });
    });
}; // end module.exports