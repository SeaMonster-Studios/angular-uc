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
            return $http({

            })
        }
    }); // end app.factory("LoadCart")
};// end module.exports