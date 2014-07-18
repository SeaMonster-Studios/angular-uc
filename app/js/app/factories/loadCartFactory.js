"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.factory("LoadCart", function($http, $location, $q, ipCookie) {
        var cart = {};
        cart.load = function() {
            var deferred = $q.defer();
            if(ipCookie("UltraCartShoppingCartID")) {
                return $http({
                    url: cartUrl,
                    method: "GET",
                    params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                    dataType: "json"
                })
                .success(function(cart, status, headers, config) {
                    window.myCart = cart;
                    deferred.resolve(myCart);
                })
                .error(function(cart, status, headers, config) {
                    console.log("There was an error: " + cart);
                    deferred.reject();
                });// end $http.get
                return deferred.promise;
            } else {
                return $http({
                    url: cartUrl,
                    method: "GET",
                    params: {_mid: merchantId},
                    dataType: "json"
                })
                .success(function(cart, status, headers, config) {
                    window.myCart = cart;
                    ipCookie("UltraCartShoppingCartID", cart.cartId, { expires:7, expirationUnit:"days"});
                    deferrd.resolve(myCart);
                })
                .error(function(cart, status, headers, config) {
                    console.log("There was an error: " + cart);
                    deferred.reject();
                });// end $http.get
                return deferred.promise;
            }// end if/else (ipCookie)
        }// end cart.load
        return cart;
        return deferred.promise;
    }); // end app.factory("LoadCart")
};// end module.exports