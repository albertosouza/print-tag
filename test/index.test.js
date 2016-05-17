var assert = require('assert');
var PrintTicket = require('../lib');

var fs = require('fs');

var data = require('./names.json');

describe('makeTickets', function () {
  it('it should make 85 tickets', function(done) {
    var pt = new PrintTicket('pimaco_6187');

    pt.doc.pipe( fs.createWriteStream('test/results/output.pdf') );
    pt.doc.fontSize(6);

    pt.makeTickets({
      count: data.length
    }, function (i, marginLeft, marginTop, size, next) {

      pt.doc.text(data[i].name, marginLeft,  marginTop, size)
      // ticket box
      pt.doc.lineWidth(0.3);

      pt.doc.rect(marginLeft, marginTop, size.width, size.height).stroke();

      next();
    }, function(){
      pt.doc.end();
    });

    pt.doc.on('end', function(){
      done();
    })
  });

  it('it should throw error if not find the format', function(done) {
    var p;
    try {
      p = new PrintTicket();
    } catch(e) {
      assert(!p);
      assert(e);
      assert.equal(e.message, 'Unavaible or invalid tag page format');
      done();
    }
  });
});