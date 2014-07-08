// modules ================================================
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();

// configuration ==========================================
var restUrl = require("./api/db.js");
var url = restUrl.url;

console.log(url);
app.set("port", process.env.PORT || 8000);
app.set("apiBase", url);


app.use(bodyParser.json());
app.use(morgan());
app.use(cookieParser());
app.use(express.static(__dirname + "/app/dist/"));

require("./api/routes/cartRoutes")(app);
require("./api/routes/itemRoutes")(app);

var server = http.createServer(app);
server.listen(app.get("port"), function() {
    console.log("Server is running on " + app.get("port"));
});