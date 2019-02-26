# simple-odf 

Open Document Format made easy using pure JavaScript and Node.js

[![Build Status](https://travis-ci.com/connium/simple-odf.svg?branch=master)](https://travis-ci.com/connium/simple-odf)
[![Version](https://img.shields.io/npm/v/simple-odf.svg)](https://www.npmjs.com/package/simple-odf)
[![codecov](https://codecov.io/gh/connium/simple-odf/branch/master/graph/badge.svg)](https://codecov.io/gh/connium/simple-odf)
[![Dependencies](https://david-dm.org/connium/simple-odf.svg)](https://david-dm.org/connium/simple-odf)
[![Known Vulnerabilities](https://snyk.io/test/github/connium/simple-odf/badge.svg)](https://snyk.io/test/github/connium/simple-odf)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Getting Started

Install simple-odf using [`npm`](https://www.npmjs.com/):

```
npm install --save simple-odf
```

Create your first document.

```javascript
const simpleOdf = require('simple-odf');

const document = new simpleOdf.TextDocument();
const body = document.getBody();

const image = body.addParagraph().addImage('/home/homer/myself.png');
image.getStyle().setAnchorType(simpleOdf.AnchorType.AsChar);
image.getStyle().setSize(29.4, 36.5);

body.addHeading('Welcome to simple-odf');

const p1 = body.addParagraph('The quick, brown fox jumps over a lazy dog.');
p1.addText('\nThe five boxing wizards jump quickly.\n\n');
p1.addHyperlink('Visit me', 'http://example.org/');
const style1 = new simpleOdf.ParagraphStyle();
// text formatting
style1.setColor(simpleOdf.Color.fromRgb(255, 0, 0));
style1.setFontSize(20);
style1.setTextTransformation(simpleOdf.TextTransformation.Uppercase);
style1.setTypeface(simpleOdf.Typeface.Bold);
// paragraph formatting
style1.setHorizontalAlignment(simpleOdf.HorizontalAlignment.Center);
style1.setPageBreakBefore();
style1.setKeepTogether();
p1.setStyle(style1);
// font usage
document.getFontFaceDeclarations().create('Open Sans', 'Open Sans', simpleOdf.FontPitch.Variable);
const style2 = new simpleOdf.ParagraphStyle();
style2.setFontName('Open Sans');
const p2 = body.addParagraph('It always seems impossible until it\'s done.');
p2.setStyle(style2);

body.addHeading('Credits', 2);

body.addParagraph('This was quite easy. Do you want to know why?');

const list = body.addList();
list.addItem('one-liner setup');
list.addItem('just write like you would do in a full-blown editor');

document.saveFlat('/home/homer/My_first_document.fodf');
```

## Documentation

Learn more about the [OASIS Open Document Format](http://docs.oasis-open.org/office/v1.2/OpenDocument-v1.2.html).

- [API reference](./docs/API.md)

## Contributing

If you want to contribute to simple-odf, you are very welcome. Send issues and pull requests with your ideas.

### Pull Requests

*Before* submitting a pull request, please make sure the following is done...

1. Fork the repo and create your branch from `master`. A guide on how to fork a
   repository: https://help.github.com/articles/fork-a-repo/

   Open terminal and type:

   ```sh
   git clone https://github.com/<your_username>/simple-odf
   cd simple-odf
   git checkout -b my_branch
   ```

2. simple-odf uses [npm](https://www.npmjs.com) for
   running development scripts. If you haven't already done so, please
   [install npm](https://docs.npmjs.com/).

3. Run `npm install`.

   ```sh
   npm install
   ```

4. If you've added code, add tests. You can use watch mode that continuously observes changed files to make your life easier.

   ```sh
   npm test -- --watch
   ```

### License

By contributing to simple-odf, you agree that your contributions will be licensed under its [MIT license](./LICENSE).
