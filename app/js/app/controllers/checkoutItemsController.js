"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutItemsController", function($scope, $http, $location, $q, ipCookie, CreateCart, LoadCart) {
        LoadCart.load().then(function(myCart) {
            $scope.loadCart = myCart.data;
        });

        $scope.keepShopping = function() {
            $location.path("/catalog/");
        }

        $scope.removeItem = function(pos) {
            var cartItems = $scope.loadCart;
            var newCart = cartItems.items;
            newCart.splice(newCart.indexOf(pos), 1);
            myCart.items.concat(newCart);

            var jCart = JSON.stringify(myCart);
            $http({
                url: cartUrl,
                method: "POST",
                data: jCart,
                dataType: "json",
                cache: false
            })
            .success(function(data, status, headers, config) {
                $scope.loadCart = data;
                window.myCart = data;
                return myCart;
            })
            .error(function(data, status, headers, config) {
                console.log("there was an error with updateCart: " + data);
            });
        }// end $scope.removeItem
    });
};// end module.exports