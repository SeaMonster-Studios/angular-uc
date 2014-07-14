"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("CartController", function($scope, $http, $location, ipCookie) {
        $http({
            url: cartUrl + "&_mid=" + merchantId,
            method: "GET",
            dataType: "json"
        })
        .success(function(cart, status, headers, config) {
            if(cart && cart.cartId) {
                window.myCart = cart;
                console.dir(myCart.cartId);
                ipCookie("UltraCartShoppingCartID", myCart.cartId, { expires:7, expirationUnit:"days", path:'/'});
                console.log(ipCookie("UltraCartShoppingCartID"));

                $scope.cartDisplay = myCart;
            }
        })
        .error(function(cart, status, headers, config) {
            console.log("There was an error: " + cart);
        });// end $http.get

        $scope.addItem = function() {
            var cartId = myCart.cartId;
            var id = "SEAM-ITEM-001";
            console.log("the cartId is: " + cartId);

            var data = JSON.stringify({merchantId:merchantId, cartId: cartId});
            if(cartId) {
                $http({
                    url: itemUrl + encodeURIComponent(id) + "&_mid=" + merchantId,
                    method: "POST",
                    data: data,
                    dataType: "json"
                })
                .success(function(data, status, headers, config) {
                    window.myItem = data;
                    console.dir(myItem);
                    $scope.displayItem = myItem;
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error: " + data);
                }); // end $http.post
            }
        }
    });// end app.controller("CartController")
};// end module.exports













