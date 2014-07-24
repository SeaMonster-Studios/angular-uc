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
        $scope.sameAddress = function(billing) {
            console.log("inside of sameAddress()");
            $scope.billingInfo            = angular.copy(billing);

            $scope.shipping = {
                fname    : $scope.billingInfo.fname,
                lname    : $scope.billingInfo.lname,
                address1 : $scope.billingInfo.address1,
                address2 : $scope.billingInfo.address2,
                city     : $scope.billingInfo.city,
                state    : $scope.billingInfo.state,
                postal   : $scope.billingInfo.postal
            }
        }

        $scope.saveBilling = function(billing, shipping) {
            $scope.billingInfo      = angular.copy(billing);
            $scope.shippingInfo     = angular.copy(shipping);

            myCart.billToFirstName  = $scope.billingInfo.fname;
            myCart.billToLastName   = $scope.billingInfo.lname;
            myCart.billToAddress1   = $scope.billingInfo.address1;
            myCart.billToAddress2   = $scope.billingInfo.address2;
            myCart.billToCity       = $scope.billingInfo.city;
            myCart.billToState      = $scope.billingInfo.state;
            myCart.billToPostalCode = $scope.billingInfo.postal;

            myCart.shipToFirstName  = $scope.shippingInfo.fname;
            myCart.shipToLastName   = $scope.shippingInfo.lname;
            myCart.shipToAddress1   = $scope.shippingInfo.address1;
            myCart.shipToAddress2   = $scope.shippingInfo.address2;
            myCart.shipToCity       = $scope.shippingInfo.city;
            myCart.shipToState      = $scope.shippingInfo.state;
            myCart.shipToPostalCode = $scope.shippingInfo.postal;

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
        }
        return cart;
    });// end app.controller("CheckoutShippingController")
}; // end module.exports