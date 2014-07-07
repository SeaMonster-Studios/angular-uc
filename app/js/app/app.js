require("angular/angular");
require("angular-route");
require("angular-resource");
require("angular-cookies");

var ucApp = angular.module("ucApp", ["ngRoute", "ngCookies"]);

require("./controllers/catalogController.js")(ucApp);
//require("./controllers/itemController.js")(ucApp);
require("./controllers/homeController.js")(ucApp);

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
        .otherwise({
            redirectTo: "/"
        });
}]); // end ucApp.config