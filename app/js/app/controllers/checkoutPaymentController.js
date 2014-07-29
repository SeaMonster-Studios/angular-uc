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
            month  : [
                        {date: 1, name: "January"},
                        {date: 2, name: "February"},
                        {date: 3, name: "March"},
                        {date: 4, name: "April"},
                        {date: 5, name: "May"},
                        {date: 6, name: "June"},
                        {date: 7, name: "July"},
                        {date: 8, name: "August"},
                        {date: 9, name: "September"},
                        {date: 10, name: "October"},
                        {date: 11, name: "November"},
                        {date: 12, name: "December"}
                    ],
            year   : [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027],
            number : 0,
            csv : 0
        }
        console.log(creditCard);
        $scope.creditCard = creditCard;

        $scope.saveCC = function(cc) {
            $scope.ccInfo = angular.copy(cc);

            myCart.creditCardExpirationMonth = $scope.ccInfo.month.date;
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