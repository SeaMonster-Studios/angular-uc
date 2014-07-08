"use strict";
var baseUrl = require("../../../../api/db");
var baseUrl = baseUrl.url;
console.log(baseUrl);

module.exports = function(app) {

    var merchantId = "SEAM";
    console.log("this is the merchant ID: " + merchantId);

    app.controller("CatalogController", function($scope, $http) {

        //$http.Provider.defaults.headers.common = {"cache-control": "no-cache", "X-UC-Merchant-Id": merchantId};
        $http({
            method: "GET",
            url: baseUrl,
            headers: {"cache-control": "no-cache", "X-UC-Merchant-Id": merchantId},
            requestType: "json"
        })
        .success(function(cart, status, headers, config) {
            if(cart && cart.cartId) {
                window.myCart = cart;
                $scope.cartDisplay = cart;
            }
        })
        .error(function(cart, status, headers, config) {
            console.log(cart);
        });

    }); // end app.controller("ItemController")
}; // end module.exports