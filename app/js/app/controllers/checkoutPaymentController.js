"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutPaymentController", function($scope, $http, $location, $q, ipCookie, CreateCart, LoadCart) {
        $scope.message = "I am in the CheckoutPaymentController";
        $scope.ccInfo = {};
        var cart = {};
        var creditCard = {
            type   : ['AMEX', 'MasterCard', 'Visa'],
            month  : ["January","February","March","April","May","June","July","August","September","October","November","December"],
            year   : [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027],
            number : 0,
            csv : 0
        }
        $scope.creditCard = creditCard;

        $scope.saveCC = function(cc) {
            $scope.ccInfo = angular.copy(cc);
            console.log($scope.ccInfo);

            myCart.creditCardExpirationMonth = $scope.ccInfo.month;
            myCart.creditCardExpirationYear = $scope.ccInfo.year;
            myCart.creditCardType = $scope.ccInfo.type;
            myCart.creditCardVerificationNumber = $scope.ccInfo.csv;
            myCart.creditCardNumber = $scope.ccInfo.number;

            var jCart = JSON.stringify(myCart);
            return $http({
                url: cartUrl,
                method: "POST",
                data: jCart,
                params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                dataType: "json",
                cache: false
            })
            .success(function(cart, status, headers, config) {
                console.log("inside success for saving CC info");
                window.myCart = cart;
                return cart;
            })
            .error(function(cart, status, headers, config) {
                console.log("there was an error with CC: " + cart);
            }); // end $http(post)
            return cart;
        }
        return cart;
    });// end app.controller("CheckoutPaymentController")
}; // end modulel.exports