"use strict";

var merchantId = "SEAM";
var i_am_using_a_proxy = true;
var pathToProxy = "http://uc-rest.seamonsterstudios.io/rest_proxy.php";
var fullPath = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/cart" : "/rest/cart";

module.exports = {
    url : fullPath
}