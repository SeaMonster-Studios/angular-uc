require("angular/angular");
require("angular-route");
require("angular-resource");
require("angular-cookies");
require("angular-cookie");

var ucApp = angular.module("ucApp", ["ngRoute", "ngCookies", "ipCookie"]);

require("./controllers/catalogController.js")(ucApp);
require("./controllers/itemController.js")(ucApp);
require("./controllers/homeController.js")(ucApp);
require("./controllers/cartController")(ucApp);
require("./factories/createCart")(ucApp);


ucApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeController"
        })
        .when("/catalog", {
            templateUrl: "views/catalog.html",
            controller: "CatalogController"
        })
        .when("/item/:id", {
            templateUrl: "views/item.html",
            controller: "ItemController"
        })
        .when("/cart", {
            templateUrl: "views/cart.html",
            controller: "CartController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]); // end ucApp.config