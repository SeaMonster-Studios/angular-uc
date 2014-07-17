"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("ItemController", function($scope, $http, $location, $routeParams) {
        $scope.message = "I am on the ItemController page";

        var id = $routeParams.id;

        $http({
            url:itemUrl + id,
            method: "GET",
            params: {_mid: merchantId},
            dataType: "json",
            cache: false
        })
        .success(function(data, status, headers, config) {
            $scope.itemDisplay = data;
        })
        .error(function(data, status, headers, config) {
            console.log("there was an error: " + data);
        });// end $http.get

    }); // end app.controller("ItemController")
}; // end module.exports