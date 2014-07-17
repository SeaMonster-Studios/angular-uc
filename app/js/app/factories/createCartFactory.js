"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

// module.exports = function(app) {
//     app.factory("CreateCart", function($http, $location, $cookieStore) {
//         $cookieStore.put("harberg", "This is driving me bonkers");
//         var cart = {};
//         var productList = [];
//         console.log("inside of factory");
//         cart.create = function() {
//                 console.log("inside of cart.create");
//                 return $http({
//                         url: cartUrl + "&_mid=" + merchantId,
//                         method: "GET",
//                         dataType: "json"
//                     })
//                     .success(function(cart, status, headers, config) {
//                         console.log("this is the cartId: " + cart.cartId);
//                         if(cart && cart.cartId) {
//                             console.log("inside of success if");
//                             window.myCart = cart;
//                             $cookieStore.put("UltraCartShoppingCartID", cart.cartId);
//                             console.dir(cart.items);
//                             console.log($cookieStore.get("UltraCartShoppingCartID"));
//                             return cart;
//                         } else {
//                             cart.cartId = $cookieStore.get("UltraCartShoppingCartID");
//                             window.myCart = cart;
//                             return cart;
//                             console.log("this is the Cookie: " + cart.cartId);
//                             console.log("this cart was already around: " + myCart);
//                         }
//                     })
//                     .error(function(cart, status, headers, config) {
//                         console.log("There was an error: " + cart);
//                     });// end $http.get

//         }
//         cart.addProducts = function(newProduct) {
//             productList.push(newProduct);
//         }
//         cart.getProducts = function() {
//             console.dir(productList);
//             window.fullCart = productList;
//             return fullCart;
//         }
//         return cart;
//     }); // end app.facotry("CreateCart")
// }; // end module.exports

module.exports = function(app) {
    app.factory("CreateCart", function($http, $location, ipCookie) {
        var cart = {};
        var productList = [];
        cart.create = function() {

                return $http({
                        url: cartUrl,
                        method: "GET",
                        params: {_mid: merchantId},
                        dataType: "json"
                    })
                    .success(function(cart, status, headers, config) {
                        console.log("inside of .success");
                        console.log(cart.cartId);
                        console.log("this is the ipCookie: " + ipCookie("UltraCartShoppingCartID"));
                        if(cart && cart.cartId && !ipCookie) {
                            window.myCart = cart;
                            ipCookie("UltraCartShoppingCartID", cart.cartId, { expires:7, expirationUnit:"days"});
                            return cart;
                            console.log("cart was created: " + cart);
                        } else {
                            cart.cartId = ipCookie("UltraCartShoppingCartID");
                            window.myCart = cart;
                            return cart;
                            console.log("this is the ipCookie: " + ipCookie);
                            console.log("this cart was already around: " + myCart.cartId);
                        }
                    })
                    .error(function(cart, status, headers, config) {
                        console.log("There was an error: " + cart);
                    });// end $http.get

        }
        cart.addProducts = function(newProduct) {
            productList.push(newProduct);
        }
        cart.getProducts = function() {
            console.dir(productList);
            window.fullCart = productList;
            return fullCart;
        }
        return cart;
    }); // end app.facotry("CreateCart")
}; // end module.exports
