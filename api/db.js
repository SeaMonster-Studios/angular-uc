"use strict";

// The merchantId is kept in an untracked file called dbAlt.js.
// This a secrutity measure so your actual merchantId is out there for the world to see.
// Make sure to create this file if you are going to use a public repo and want your UC merchant ID kept secret

// The file should follow the format of

// var merchantId = "<YOUR MERCHANT ID GOES HERE";

// module.exports = {
//     ID : merchantId
// }

// Then just require the file into this one as seen in the
// var merchant = require("./dbAlt.js");

var merchant = require("./dbAlt.js");
var merchantId = merchant.ID;
var i_am_using_a_proxy = true;
var pathToProxy = "http://localhost:8888/restUCTest/rest_proxy.php"; // Or what ever the path to your installation of the rest_proxy.php is.
var pathToCatalogUrl = "https://secure.ultracart.com/catalog/"+ merchantId + "/"

var fullPathCart = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/cart/" : "/rest/cart/";
var fullPathItem = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/site/items/" : "/rest/site/items/";

var catalogPath = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/site/items" : "/rest/site/items";
var fullPathCatalog = catalogPath + "&_mid=" + merchantId + "&url=" + pathToCatalogUrl;

var checkoutPath = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/cart/" : "/rest/cart/";
var fullPathCheckout = checkoutPath + "&_mid=" + merchantId + "/checkout";

module.exports = {
    cartUrl : fullPathCart,
    itemUrl : fullPathItem,
    catalogUrl : fullPathCatalog,
    merchantId : merchantId,
    checkoutUrl : fullPathCheckout
};