"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("ItemController", function($scope, $http, $location, $routeParams, AddItem, CreateCart) {
        $scope.message = "I am on the ItemController page";

        var id = $routeParams.id;

        $http({
            url:itemUrl + id,
            method: "GET",
            params: {_mid: merchantId},
            dataType: "json",
            cache: false
        })
        .success(function(data, status, headers, config) {
            $scope.itemDisplay = data;
        })
        .error(function(data, status, headers, config) {
            console.log("there was an error: " + data);
        });// end $http.get

        $scope.addItem = function(id) {
            AddItem.add(id);
        }

        $scope.createCart = function() {
            CreateCart.create();
        }
        $scope.createCart();

        $scope.goToCheckout = function() {
            $location.path("/checkout");
        }// end $scope.goToCheckout
    }); // end app.controller("ItemController")
}; // end module.exports