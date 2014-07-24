"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("CartController", function($scope, $http, $location, $q, ipCookie, CreateCart, AddItem, LoadCart) {
        $scope.createCart = function() {
            if(ipCookie("UltraCartShoppingCartID")) {
                console.log("scope.createCart inside if => LoadCart");
                LoadCart.load().then(function() {
                    $scope.cartDisplay = myCart;
                });
            } else {
                CreateCart.create().then(function() {
                    $scope.cartDisplay = myCart;
                });
            }
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
            }// end if/else (myCart.cartId)
        }// end $scope.loadItem

        $scope.loadItem();

        $scope.addItem = function(id) {
            console.log("id passed was: " + id);
            if(ipCookie("UltraCartShoppingCartID")) {
                AddItem.add(id).then(function() {
                    console.log("add.item LoadCart");
                    LoadCart.load();
                    $scope.cartDisplay = myCart;
                });
            } else {
                AddItem.add(id).then(function() {
                    console.log("add.item $scope.createCart()");
                    $scope.createCart();
                });
            }
        }// end $scope.addItem
    });// end app.controller("CartController")
};// end module.exports













