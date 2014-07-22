"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.factory("CreateCart", function($http, $location, ipCookie) {
        var cart = {};
        cart.create = function() {
            if(ipCookie("UltraCartShoppingCartID")) {
                return $http({
                    url: cartUrl,
                    method: "GET",
                    params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                    dataType: "json"
                })
                .success(function(cart, status, headers, config) {
                    console.log("inside cart.create if success");
                    window.myCart = cart;
                    return cart;
                })
                .error(function(cart, status, headers, config) {
                    console.log("There was an error: " + cart);
                });// end $http.get
            } else {
                return $http({
                    url: cartUrl,
                    method: "GET",
                    params: {_mid: merchantId},
                    dataType: "json"
                })
                .success(function(cart, status, headers, config) {
                    console.log("inside cart.create else success");
                        window.myCart = cart;
                        ipCookie("UltraCartShoppingCartID", cart.cartId, { expires:7, expirationUnit:"days"});
                        return cart;
                })
                .error(function(cart, status, headers, config) {
                    console.log("There was an error: " + cart);
                });// end $http.get
            }// end if/else (ipCookie)
        }// end cart.create
        return cart;
    }); // end app.facotry("CreateCart")
}; // end module.exports
