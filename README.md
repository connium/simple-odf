# simple-odf

simple-odf is a library for creating Open Document Format text files using Typescript/JavaScript and Node.js.

[![Version](https://img.shields.io/npm/v/simple-odf.svg)](https://www.npmjs.com/package/simple-odf)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Continuous Integration](https://github.com/connium/simple-odf/workflows/Continuous%20Integration/badge.svg)
[![codecov](https://codecov.io/gh/connium/simple-odf/branch/master/graph/badge.svg)](https://codecov.io/gh/connium/simple-odf)
[![Dependencies](https://david-dm.org/connium/simple-odf.svg)](https://david-dm.org/connium/simple-odf)
[![Known Vulnerabilities](https://snyk.io/test/github/connium/simple-odf/badge.svg)](https://snyk.io/test/github/connium/simple-odf)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Documentation](#documentation)
- [Contributing](#contributing)
  - [Pull Requests](#pull-requests)
- [Versioning](#versioning)
- [Credits](#credits)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure your development environment includes Node.js and an npm package manager.

### Installing

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
image.setAnchorType(simpleOdf.AnchorType.AsChar);
image.setSize(29.4, 36.5);

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
style1.setPageBreak(simpleOdf.PageBreak.Before);
style1.setKeepTogether();
p1.setStyle(style1);
// font usage
document
  .getFontFaceDeclarations()
  .create('Open Sans', 'Open Sans', simpleOdf.FontPitch.Variable);
const style2 = new simpleOdf.ParagraphStyle();
style2.setFontName('Open Sans');
const p2 = body.addParagraph("It always seems impossible until it's done.");
p2.setStyle(style2);

body.addHeading('Credits', 2);

body.addParagraph('This was quite easy. Do you want to know why?');

const list = body.addList();
list.addItem().addParagraph('one-liner setup');
list
  .addItem()
  .addParagraph('just write like you would do in a full-blown editor');

document.saveFlat('/home/homer/My_first_document.fodf');
```

See the [examples](./examples/README.md) for more details on how to use the library.

## Documentation

Learn more about the [OASIS Open Document Format](http://docs.oasis-open.org/office/v1.2/OpenDocument-v1.2.html).

- [Features](./docs/Features.md)
- [API reference](./docs/API.md)

## Contributing

If you want to contribute to simple-odf, you are very welcome. Send issues and pull requests with your ideas.

<!--
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
-->

### Pull Requests

_Before_ submitting a pull request, please make sure the following is done...

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

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/connium/simple-odf/releases).

## Credits

This project exists thanks to all the [contributors](https://github.com/connium/simple-odf/graphs/contributors) who participate in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
