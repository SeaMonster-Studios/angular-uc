"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;
var checkoutUrl = baseUrl.checkoutUrl;

module.exports = function(app) {
    app.controller("CheckoutShippingController", function($scope, $http, $location, $q, ipCookie, CreateCart, LoadCart) {
        $scope.message = "yo!";

        $scope.billingInfo = {};
        var cart = {};
        $scope.sameAddress = function(billing, email) {
            console.log("inside of sameAddress()");
            $scope.billingInfo = angular.copy(billing);
            $scope.emailInfo = angular.copy(email);

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
            }
        },

        $scope.saveBilling = function(billing, shipping, email) {
            console.log("inside the save()");
            $scope.billingInfo      = angular.copy(billing);
            $scope.shippingInfo     = angular.copy(shipping);
            $scope.emailInfo        = angular.copy(email);

            myCart.billToFirstName  = $scope.billingInfo.fname;
            myCart.billToLastName   = $scope.billingInfo.lname;
            myCart.billToAddress1   = $scope.billingInfo.address1;
            myCart.billToAddress2   = $scope.billingInfo.address2;
            myCart.billToCity       = $scope.billingInfo.city;
            myCart.billToState      = $scope.billingInfo.state;
            myCart.billToPostalCode = $scope.billingInfo.postal;
            myCart.billToPhone      = $scope.billingInfo.phone;

            myCart.shipToFirstName  = $scope.shippingInfo.fname;
            myCart.shipToLastName   = $scope.shippingInfo.lname;
            myCart.shipToAddress1   = $scope.shippingInfo.address1;
            myCart.shipToAddress2   = $scope.shippingInfo.address2;
            myCart.shipToCity       = $scope.shippingInfo.city;
            myCart.shipToState      = $scope.shippingInfo.state;
            myCart.shipToPostalCode = $scope.shippingInfo.postal;
            myCart.shipToPhone      = $scope.shippingInfo.phone;

            myCart.email            = $scope.emailInfo.email;
            //myCart.email            = $scope.emailInfo.confirm;

            myCart.shippingMethod   = "UPS: Ground";
            myCart.paymentMethod    = "Credit Card";

            myCart.shipToCountry    = "United States";
            myCart.billToCountry    = "United States";

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
                console.log("inside success for saving billing info");
                window.myCart = cart;
                return cart;
            })
            .error(function(cart, status, headers, config) {
                console.log("there was an error with saveBilling: " + cart);
            }); // end $http(post)
            return cart;
        }// end $scope.saveBilling()

        return cart;
    });// end app.controller("CheckoutShippingController")
}; // end module.exports