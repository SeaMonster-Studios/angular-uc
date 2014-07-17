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
            if(ipCookie("UltraCartShoppingCartID")) {
                return $http({
                        url: cartUrl,
                        method: "GET",
                        params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                        dataType: "json"
                    })
                    .success(function(cart, status, headers, config) {
                        console.log("inside of .success IF ipCookie exists loadCart");
                        window.myCart = cart;
                        console.log("cart was created with loadCart cookie: " + cart.cartId);
                        $scope.message = myCart;
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
                        console.log("inside of .success ELSE");
                            window.myCart = cart;
                            ipCookie("UltraCartShoppingCartID", cart.cartId, { expires:7, expirationUnit:"days"});
                            console.log("cart was created: " + cart);
                            $scope.message = myCart;
                            return cart;
                    })
                    .error(function(cart, status, headers, config) {
                        console.log("There was an error: " + cart);
                    });// end $http.get
            }
        }
        return cart;
    }); // end app.factory("LoadCart")
};// end module.exports