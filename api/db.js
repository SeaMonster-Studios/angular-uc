"use strict";

var merchantId = "SEAM";
var i_am_using_a_proxy = true;
var pathToProxy = "http://localhost:8888/rest_proxy.php";
var pathToCatalogUrl = "https://secure.ultracart.com/catalog/SEAM/"

var fullPathCart = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/cart/" : "/rest/cart/";
var fullPathItem = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/site/items/" : "/rest/site/items/";

var catalogPath = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/site/items" : "/rest/site/items";
var fullPathCatalog = catalogPath + "&_mid=" + merchantId + "&url=" + pathToCatalogUrl;

module.exports = {
    cartUrl : fullPathCart,
    itemUrl : fullPathItem,
    catalogUrl : fullPathCatalog,
    merchantId : merchantId
};