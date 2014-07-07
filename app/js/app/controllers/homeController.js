"use strict";

module.exports = function(app) {
    app.controller("HomeController", function($scope) {
        $scope.message = "Thanks for coming to the Home Page buddy";
    }); // end app.controller("HomeController")
}; // end module.exports