"use strict";
var baseUrl = require("../../../../api/db");
var cartUrl = baseUrl.cartUrl;
var itemUrl = baseUrl.itemUrl;
var testUrl = baseUrl.testUrl;

console.log(baseUrl);

module.exports = function(app) {

    var merchantId = "SEAM";
    console.log("this is the merchant ID: " + merchantId);

    app.controller("CatalogController", function($scope, $http) {
        var item = "SEAM-ITEM-001";

        $http({
            url: testUrl + "/SEAM-ITEM-001&_mid=SEAM",
            method: "GET",
            //headers: {"cache-control": "no-cache", "X-UC-Merchant-Id": "SEAM"},
            data: {},
            dataType: "json"
        })
        .success(function(data, status, headers, config) {
            $scope.cartDisplay = data;
            //console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    });
}; // end module.exports