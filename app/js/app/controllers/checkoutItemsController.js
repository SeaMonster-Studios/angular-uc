"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutItemsController", function($scope, $http, $location, $q, ipCookie, CreateCart) {
        $scope.createCart = function() {
            CreateCart.create();
            console.log("is this even being called?");

            var defer = $q.defer();

            defer.promise
                .then(function(myCart) {
                    $scope.message = myCart;
                });

                defer.resolve(myCart);

        }
        $scope.createCart()





    });
};// end module.exports