"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("CartController", function($scope, $http, $location, $q, ipCookie, CreateCart) {
        $scope.createCart = function() {
            CreateCart.create();
            console.log("called CreateCart.create()");
        }
        $scope.createCart();

        $scope.loadItem = function() {
            var myCart = {};
            var id = "SEAM-ITEM-001";

            if(myCart.cartId) {
                var data = JSON.stringify({merchantId:merchantId, cartId: myCart.cartId});

                $http({
                    url: itemUrl + encodeURIComponent(id),
                    method: "POST",
                    params: {_mid: merchantId},
                    data: data,
                    dataType: "json",
                    cache: false
                })
                .success(function(data, status, headers, config) {
                    window.myItem = data;
                    $scope.displayItem = myItem;
                    return myItem;
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error: " + data);
                }); // end $http.post
            } else {
                $http({
                    url: itemUrl + encodeURIComponent(id),
                    method: "GET",
                    params: {_mid: merchantId},
                    dataType: "json"
                })
                .success(function(data, status, headers, config) {
                    window.myItem = data;
                    $scope.displayItem = myItem;
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error: " + data);
                });
            }
        }// end $scope.loadItem

        $scope.loadItem();

        $scope.addItem = function() {
            var itemId = window.myItem.itemId;
            console.dir(itemId);
            if(itemId) {
                if(!myCart.items) {
                    myCart['items'] = [];
                }
                myCart.items.push({itemId: itemId, quantity: 1});
                var jCart = JSON.stringify(myCart);
                $http({
                    url: cartUrl,
                    method: "POST",
                    data: jCart,
                    dataType: "json",
                    cache: false
                })
                .success(function(data, status, headers, config) {
                    $scope.cartDisplay = data;
                    CreateCart.addProducts(data);
                    CreateCart.getProducts();
                    //console.log("did I update the cart service? " + cart);
                    console.log("I have added an item to the cart");
                    window.cartObj = data;
                    return cartObj;
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error with addItem(): " + data);
                }); // end $http.post
            }
        }// end $scope.addItem
    });// end app.controller("CartController")
};// end module.exports













