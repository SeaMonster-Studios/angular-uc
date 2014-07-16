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
        }
        $scope.createCart();

        $scope.message = function() {
            console.log("This is the CheckoutItemsController");
            //console.log(cartObj);
            CreateCart.getProducts();
        }
        $scope.message();
    });
};// end module.exports