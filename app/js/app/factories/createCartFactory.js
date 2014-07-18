"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.factory("CreateCart", function($http, $location, ipCookie) {
        var cart = {};
        var productList = [];
        cart.create = function() {
            if(ipCookie("UltraCartShoppingCartID")) {
                return $http({
                    url: cartUrl,
                    method: "GET",
                    params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                    dataType: "json"
                })
                .success(function(cart, status, headers, config) {
                    console.log("inside of .success IF ipCookie exists");
                    window.myCart = cart;
                    console.log(ipCookie("UltraCartShoppingCartID"));
                    console.log("cart was created with cookie: " + cart.cartId);
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
                        return cart;
                })
                .error(function(cart, status, headers, config) {
                    console.log("There was an error: " + cart);
                });// end $http.get
            }// end if/else (ipCookie)
        }// end cart.create
        cart.addProducts = function(newProduct) {
            productList.push(newProduct);
        }
        cart.getProducts = function() {
            console.dir(productList);
            window.fullCart = productList;
            return fullCart;
        }
        return cart;
    }); // end app.facotry("CreateCart")
}; // end module.exports
