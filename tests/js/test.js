'use strict';
//var superagent = require('superagent');
var chai = require('chai');
var expect = chai.expect;

var app = require('../../server.js').app;
var port = process.env.PORT || 3000;
var resourceUrl = 'http://localhost:' + port;
var DB = require("../../api/dbAlt.js");

describe('UltraCart api', function() {
  var id;

  //testing the POST function of the JSON API
    // it('can successfully create a new note', function(done) {
    //     superagent.post(resourceUrl)
    //         .send({noteBody: 'a new note!'})
    //         .end(function(err, res) {
    //             expect(err).to.eql(null);
    //             expect(res.body._id).to.not.be.eql(null);
    //             expect(res.body.noteBody).to.be.eql('a new note!');
    //             id = res.body._id;

    //             done();
    //     });
    // });
    var db;

    beforeEach(function() {
        db = DB.ID;
    });

    it('can successfully connect to UltraCart', function() {
        expect(db).to.equal("SEAM");
    });


});