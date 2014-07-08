UltraCart REST api build by SeaMonster Studios

https://github.com/UltraCart/responsive_checkout

Built with
====================================
 * UltraCart Shopping cart
 * AngularJS
 * NodeJS
 * ExpressJS
 * GruntJS
 * Handlebars.js
 * Bower
 * SASS
 * Browserify

rest_proxy.php
====================================
 * Install it in your web server.
 * Test rest_proxy.php.
   Test #1: If you call it directly from the web browser, you should receive back this response: "UltraCart rest proxy script called incorrectly.  _url query parameter is required.
   Test #2:  adjust your url to call this:
```
   rest_proxy.php?_url=/rest/cart
```
   you should receive back this response: "Missing Merchant Id."
   Test #3:  call this:
```
   rest_proxy.php?_url=/rest/cart&_mid=DEMO
```
   you should receive back the json for an empty cart.