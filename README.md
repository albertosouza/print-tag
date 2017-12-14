# Print tags

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/github/albertosouza/print-tag/badge.svg?branch=master)](https://coveralls.io/github/albertosouza/print-tag?branch=master)

Node.js module to generate PDFs in commercial tags formats and ready to print

## Installation

```js
npm install --save print-tag
```

## Usage

```js
// See all avaible formats in: https://github.com/albertosouza/print-tag/blob/master/lib/formats.js 
var pt = new PrintTicket('pimaco_6187');
// write in test/results/output.pdf , see PDFkit documentation
pt.doc.pipe( fs.createWriteStream('test/results/output.pdf') );
pt.doc.fontSize(6);

pt.makeTickets({
  count: data.length
}, function onSetOneTag(i, marginLeft, marginTop, size, next) {
  // write something in tag area
  pt.doc.text(data[i].name, marginLeft,  marginTop, size);
  // ticket box
  pt.doc.lineWidth(0.1);
  pt.doc.rect(marginLeft, marginTop, size.width, size.height).stroke();
  // run next function
  next();
}, function afterSetAllTags(){
  // end, required for end / finish the PDF file
  pt.doc.end();
});

pt.doc.on('end', function(){
  done();
});
```


## Formats

Please help with more formats in: https://github.com/albertosouza/print-tag/blob/master/lib/formats.js

#### Avaible:

- pimaco_6187
- pimaco_6180

## Example:

![Page printed with tags in pimaco 6187 format ](https://wejs.org/api/v1/image/original/1463608565924_52206d50-1d43-11e6-8e29-4921a2f6138e.jpg)

## Authors

- Alberto Souza: http://albertosouza.net
- Thiago Anselmo: https://github.com/thiagoanselmo

## License

MIT © [Alberto Souza](http://albertosouza.net)

[npm-image]: https://badge.fury.io/js/print-tag.svg
[npm-url]: https://npmjs.org/package/print-tag
[travis-image]: https://travis-ci.org/albertosouza/print-tag.svg?branch=master
[travis-url]: https://travis-ci.org/albertosouza/print-tag
[daviddm-image]: https://david-dm.org/albertosouza/print-tag.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/albertosouza/print-tag

