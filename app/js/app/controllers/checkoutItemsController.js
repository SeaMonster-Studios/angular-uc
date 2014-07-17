"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutItemsController", function($scope, $http, $location, $q, ipCookie, CreateCart, LoadCart) {
        $scope.loadCart = function() {
            LoadCart.load();
        }
        $scope.loadCart()





    });
};// end module.exports