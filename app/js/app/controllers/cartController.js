"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("CartController", function($scope, $http, $location, ipCookie, CreateCart) {
        //$scope.createCart = function() {
            // $http({
            //     url: cartUrl + "&_mid=" + merchantId,
            //     method: "GET",
            //     dataType: "json"
            // })
            // .success(function(cart, status, headers, config) {
            //     if(cart && cart.cartId) {
            //         window.myCart = cart;
            //         console.dir(myCart.cartId);
            //         ipCookie("UltraCartShoppingCartID", myCart.cartId, { expires:7, expirationUnit:"days", path:'/'});
            //         console.log(ipCookie("UltraCartShoppingCartID"));
            //         console.dir(myCart);
            //     }
            // })
            // .error(function(cart, status, headers, config) {
            //     console.log("There was an error: " + cart);
            // });// end $http.get

        //}// end $scope.createCart()
        $scope.createCart = function() {
            console.log("createCart called");
            CreateCart.create();
        };

        $scope.loadItem = function() {
            var cartId = myCart.cartId;
            var id = "SEAM-ITEM-001";
            console.log("the cartId is: " + cartId);

            var data = JSON.stringify({merchantId:merchantId, cartId: cartId});
            console.log("the data is: " + data);

            if(cartId) {
                $http({
                    url: itemUrl + encodeURIComponent(id) + "&_mid=" + merchantId,
                    method: "POST",
                    data: data,
                    dataType: "json"
                })
                .success(function(data, status, headers, config) {
                    window.myItem = data;
                    //console.dir(myItem);
                    //$scope.cartDisplay = myCart;
                    $scope.displayItem = myItem;
                    return myItem;
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error: " + data);
                }); // end $http.post
            }
        }// end $scope.loadItem

        $scope.addItem = function() {
            console.log("inside of addItem()");

            //var id = "SEAM-ITEM-001";
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
                    dataType: "json"
                })
                .success(function(data, status, headers, config) {
                    $scope.cartDisplay = data;
                    console.log("addItem success");
                })
                .error(function(data, status, headers, config) {
                    console.log("there was an error with addItem(): " + data);
                }); // end $http.post
            }

        }
    });// end app.controller("CartController")
};// end module.exports













