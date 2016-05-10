var assert = require('assert');
var sinon = require('sinon');
var PrintTicket = require('../lib');

var fs = require('fs');
var path = require('path');

var data = [
  {
    name: 'Batman 0'
  },
  {
    name: 'Batman 1'
  },
  {
    name: 'Super Man 2'
  },
  {
    name: 'Batman 3'
  },
  {
    name: 'Super Man 4'
  }  ,
  {
    name: 'Batman 5'
  },
  {
    name: 'Super Man 6'
  },
  {
    name: 'Batman 8'
  },
  {
    name: 'Super Man 9'
  },
  {
    name: 'Dead Poll 10'
  }
];

describe('makeTickets', function () {
  it('it should make 10 tickets', function(done) {
    var pt = new PrintTicket();

    pt.doc.pipe( fs.createWriteStream('test/results/output.pdf') );

    pt.doc.fontSize(15);

    // console.log('>>', path.resolve('test/results/1_test.pdf'))

    pt.makeTickets({
      count: data.length
    }, function (i, x, y, next) {
      // console.log('>>',data[i], data, i, data.length);

      pt.doc.text(data[i].name, x+2, x+30, { width: 410 });
      // ticket box
      pt.doc.rect(20, 20, 570, 150)

      next();
    }, function(){

      pt.doc.end();

      // done();
    });

    pt.doc.on('end', function(){
      done();
    })
  });
});