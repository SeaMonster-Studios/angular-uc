"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutSubmitController", function($scope, $http, $location, $q, ipCookie, CreateCart, LoadCart) {
        // CheckoutItemsController.js

        LoadCart.load().then(function(myCart) {
            console.log("LoadCart.load()");
            $scope.loadCart = myCart.data;
        });

        $scope.keepShopping = function() {
            $location.path("/catalog/");
        }

        $scope.removeItem = function(pos) {
            var cartItems = $scope.loadCart;
            var newCart = cartItems.items;
            newCart.splice(newCart.indexOf(pos), 1);
            myCart.items.concat(newCart);

            var jCart = JSON.stringify(myCart);
            $http({
                url: cartUrl,
                method: "POST",
                data: jCart,
                dataType: "json",
                cache: false
            })
            .success(function(data, status, headers, config) {
                $scope.loadCart = data;
                window.myCart = data;
                return myCart;
            })
            .error(function(data, status, headers, config) {
                console.log("there was an error with updateCart: " + data);
            });
        }// end $scope.removeItem

        // CheckoutShippingController.js

        $scope.billingInfo = {};
        var cart = {};
        $scope.sameAddress = function(billing, email) {
            console.log("inside of sameAddress()");
            $scope.billingInfo = angular.copy(billing);
            $scope.emailInfo = angular.copy(email);
            console.log($scope.billingInfo);
            $scope.shipping = {
                fname          : $scope.billingInfo.fname,
                lname          : $scope.billingInfo.lname,
                address1       : $scope.billingInfo.address1,
                address2       : $scope.billingInfo.address2,
                city           : $scope.billingInfo.city,
                state          : $scope.billingInfo.state,
                postal         : $scope.billingInfo.postal,
                phone          : $scope.billingInfo.phone,
                shippingMethod : $scope.billingInfo.shippingMethod,
                paymentMethod  : $scope.billingInfo.paymentMethod
            };
            myCart.billToFirstName              = $scope.billingInfo.fname;
            myCart.billToLastName               = $scope.billingInfo.lname;
            myCart.billToAddress1               = $scope.billingInfo.address1;
            myCart.billToAddress2               = $scope.billingInfo.address2;
            myCart.billToCity                   = $scope.billingInfo.city;
            myCart.billToState                  = $scope.billingInfo.state;
            myCart.billToPostalCode             = $scope.billingInfo.postal;
            myCart.billToPhone                  = $scope.billingInfo.phone;
        }

        // CheckoutPaymentController.js

        $scope.ccInfo = {};
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
        console.log("this is the creditCard");
        console.log(creditCard);
        $scope.creditCard = creditCard;

        // CheckoutSubmitController.js and CheckoutShippingContoller.js hybrid
        $scope.submitOrder = function(billing, shipping, email, cc) {
            $scope.shippingInfo                 = angular.copy(shipping);
            $scope.billingInfo                  = angular.copy(billing);

            $scope.emailInfo                    = angular.copy(email);
            $scope.ccInfo                       = angular.copy(cc);

            myCart.billToFirstName              = $scope.billingInfo.fname;
            myCart.billToLastName               = $scope.billingInfo.lname;
            myCart.billToAddress1               = $scope.billingInfo.address1;
            myCart.billToAddress2               = $scope.billingInfo.address2;
            myCart.billToCity                   = $scope.billingInfo.city;
            myCart.billToState                  = $scope.billingInfo.state;
            myCart.billToPostalCode             = $scope.billingInfo.postal;
            myCart.billToPhone                  = $scope.billingInfo.phone;

            myCart.shipToFirstName              = $scope.shippingInfo.fname;
            myCart.shipToLastName               = $scope.shippingInfo.lname;
            myCart.shipToAddress1               = $scope.shippingInfo.address1;
            myCart.shipToAddress2               = $scope.shippingInfo.address2;
            myCart.shipToCity                   = $scope.shippingInfo.city;
            myCart.shipToState                  = $scope.shippingInfo.state;
            myCart.shipToPostalCode             = $scope.shippingInfo.postal;
            myCart.shipToPhone                  = $scope.shippingInfo.phone;

            myCart.email                        = $scope.emailInfo.email;

            myCart.shippingMethod               = "UPS: Ground";
            myCart.paymentMethod                = "Credit Card";

            myCart.shipToCountry                = "United States";
            myCart.billToCountry                = "United States";

            myCart.creditCardExpirationMonth    = $scope.ccInfo.month.date;
            myCart.creditCardExpirationYear     = $scope.ccInfo.year;
            myCart.creditCardType               = $scope.ccInfo.type;
            myCart.creditCardVerificationNumber = $scope.ccInfo.csv;
            myCart.creditCardNumber             = $scope.ccInfo.number;

            var checkoutRequest = {
                "cart" : myCart,
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


    });// end app.controller("CheckoutSubmitController")
};// end module.exports