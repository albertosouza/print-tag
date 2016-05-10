var PDFDocument = require('pdfkit');
var formats = require('./formats');
/**
 * Print Ticket prototype
 */

var PrintTicket = function PrintTicketPrototype(type, opts) {
  if (!opts) opts = {};

  this.doc = new PDFDocument(opts.pdf);

  this.i = 0;
  this.x = 0;
  this.y = 0;

  this.format = formats[type];
};

PrintTicket.prototype.makeTickets = function makeTickets(opts, eachPrint, doneAll) {
  this.eachPrint = eachPrint;

  this.makeOneTicket(opts.count, eachPrint, doneAll);
}

PrintTicket.prototype.makeOneTicket = function makeOneTicket(count, eachPrint, done) {
  var self = this;

  // console.log('MT>>', self.i, count);

  eachPrint(this.i, this.x, this.y, function doneOne(){
    if (self.i < (count-1) ) {
      self.i++;
      self.makeOneTicket(count, eachPrint, done);
    } else {
      done();
    }
  });
}

// PrintTicket.prototype.doneAll = function doneAll() {
//   console.log('>>', this)
//   console.log('cabou!');
//   this.doc.end();
// }

module.exports = PrintTicket;