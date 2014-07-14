"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.factory("CreateCart", function($scope, $http, $location, ipCookie) {

        var cart = function() {
            console.log("this is BS");
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

                    //$scope.cartDisplay = myCart;
                }
            })
            .error(function(cart, status, headers, config) {
                console.log("There was an error: " + cart);
            });// end $http.get
            return cart;
        }
    }); // end app.service("CreateCart")
}; // end module.exports