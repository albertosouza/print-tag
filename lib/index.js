var PDFDocument = require('pdfkit');
var formats = require('./formats');

/**
 * Print Ticket prototype
 *
 * @param {String} format format, required
 * @param {Object} opts   options ex: { count: 10 }
 */
function PrintTicket(format, opts) {
  if (!opts) opts = {};

  if (!formats[format]) throw new Error('Unavaible or invalid tag page format');

  this.format = formats[format];

  this.doc = new PDFDocument({
    size: this.format.paperSize,
    margins: this.format.paperMargins
  });
}

PrintTicket.prototype.i = 0;
PrintTicket.prototype.col = 0;
PrintTicket.prototype.row = 0;
PrintTicket.prototype.page = 1;
PrintTicket.prototype.currentTag = 0;

/**
 * Make all tickets
 *
 * @param  {Object} opts   { count: 10 }
 * @param  {Function} eachPrint function to run in every tag print
 * @param  {Function} doneAll   function to run after set all tags
 */
PrintTicket.prototype.makeTickets = function makeTickets(opts, eachPrint, doneAll) {
  this.eachPrint = eachPrint;

  this.makeOneTicket((opts.count || this.format.maxTagsInPage), eachPrint, doneAll);
}

PrintTicket.prototype.makeOneTicket = function makeOneTicket(count, eachPrint, done) {
  var self = this;

  eachPrint(this.i, this.format.cols[this.col], this.format.rows[this.row], this.format.tagSize, function doneOne() {

    var notIsLastPage = self.i < (count-1);

    self.nextTag(notIsLastPage);

    if (notIsLastPage) {

      self.i++;

      self.makeOneTicket(count, eachPrint, done);
    } else {
      done();
    }
  });
}

PrintTicket.prototype.nextTag = function nextTag (notIsLastPage) {
  this.col++;
  // set next col
  if (!this.format.cols[this.col]) {
    this.col = 0;
    // set next row if are in last col
    this.row++;
    if (!this.format.rows[this.row]) {
      this.row = 0;
    }
  }
  // calc next page
  this.currentTag++;

  if (notIsLastPage && this.currentTag >= this.format.maxTagsInPage) {
    this.page++;
    this.currentTag = 0;
    this.row = 0;
    this.col = 0;

    this.doc.addPage({
      size: this.format.paperSize,
      margins: this.format.paperMargins
    });
  }
}

module.exports = PrintTicket;