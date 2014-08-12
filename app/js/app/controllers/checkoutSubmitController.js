"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutSubmitController", function($scope, $http, $location, $q, ipCookie, CreateCart, LoadCart) {

        $scope.submitOrder = function() {
            var checkoutRequest = {
                "cart" : window.myCart,
                errorReturnUrl : "./checkout"
            }

            var jCart = JSON.stringify(checkoutRequest);
            //console.log(jCart);
            $http({
                url      : cartUrl + "/checkout",
                method   : "POST",
                data     : jCart,
                params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                dataType : "json"
            })
            .success(function(data, status, headers, config) {
                console.log("Payment should be sent...I hope");
                console.log(data);
                window.location.assign(data.redirectToUrl);
            })
            .error(function(data, status, headers, config) {
                console.log("these were the erros when submitting payment: " + data);
            });// end $http.get
        }// end $scope.submitOrder()

        $scope.test = function() {
            console.log($scope.message);
        }
    });// end app.controller("CheckoutSubmitController")
};// end module.exports