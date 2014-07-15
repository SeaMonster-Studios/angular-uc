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
 * Install it on your web server.
 * Make sure that the rest_proxy.php file is on the same domain as the app (see issues for further explanation).
 * Add the following to the .htaccess file
`````````
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [QSA,L]

Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Headers "*"
Header set Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
``````````````
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

Current Goals/Tasks
=================================
 1. ~~Build catalog page~~
 2. ~~Build item detail page~~
 3. ~~Create cart~~
 4. ~~Update cart~~
 5. Build checkout
 6. Submit payment
 7. Email receipt


Issues and Bugs
======================================
Current development issues and problems that I am trying to solve will be tracked as issues in the repo. For a list of what the current sticking points are, just check the open issues.
