"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.factory("CreateCart", function($http, $location, ipCookie) {
        var cart = {};
        console.log("does this work");
        cart.create = function() {
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
                    console.dir(cart);
                    return cart;
                }
            })
            .error(function(cart, status, headers, config) {
                console.log("There was an error: " + cart);
            });// end $http.get
        }
        return cart;
    }); // end app.facotry("CreateCart")
}; // end module.exports