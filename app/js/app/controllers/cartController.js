"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("CartController", function($scope, $http, $location, ipCookie) {
        $http({
            url: cartUrl + "&_mid=" + merchantId,
            method: "GET",
            dataType: "json"
        })
        .success(function(cart, status, headers, config) {
            if(cart && cart.cartId) {
                window.myCart = cart;
                console.dir(myCart.cartId);
                ipCookie("UltraCartShoppingCartID", myCart.cartId, { expires:7, expirationUnit:"days", path:'/'});
                console.log(ipCookie("UltraCartShoppingCartID"));

                $scope.cartDisplay = myCart;
            }
        })
        .error(function(cart, status, headers, config) {
            console.log("There was an error: " + cart);
        });// end $http.get

        // $scope.addItem = function() {
        //     var item = "SEAM-ITEM-001";
        //     var items = [];

        //     var info = {
        //         "merchantId": merchantId,
        //         "cartId": "",
        //         "items": items
        //     };

        //     $http({
        //         url: cartUrl + "&_mid=" + merchantId,
        //         method: "PUT",
        //         data: info,
        //         dataType: "json"
        //     })
        //     .success(function(data, status, headers, config){
        //         var updatedCart = items.pop();
        //         $http({
        //             url: cartUrl + "&_mid=" + merchantId,
        //             method: "PUT",
        //             data: JSON.stringify(updatedCart),
        //             dataType: "json",
        //         })
        //         .success(function(data, status, headers, config) {
        //             $scope.newCart = data;
        //         })
        //         .error(function(data, status, headers, config){
        //             console.log("there was an error in the updateCart http.put: " + status);
        //         }); // end updateCart $http.put
        //     })
        //     .error(function(data, status, headers, config) {
        //         console.log("there was an error in the main http.put: " + data);
        //     });// end $scope.addItem
        // }

        $scope.addItem = function() {
            var cartId = myCart.cartId;
            var id = "SEAM-ITEM-001";
            console.log("the cartId is: " + cartId);
            var data = JSON.stringify({merchantId:merchantId, cartId: cartId});
            if(cartId) {
                $http({
                    url: itemUrl + encodeURIComponent(id) + "&_mid=" + merchantId,
                    method: "POST",
                    //data: data,
                    dataType: "json"
                })
                .success(function(data, status, headers, config) {
                    window.myItem = data;
                    console.log("myItem is: " + data);
                    $scope.displayItem = data;
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error: " + data);
                }); // end $http.post
            }
        }

    });// end app.controller("CartController")
};// end module.exports













