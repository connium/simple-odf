# simple-odf

simple-odf is a library for creating Open Document Format text files using Typescript/JavaScript and Node.js.

[![Version](https://img.shields.io/npm/v/simple-odf.svg)](https://www.npmjs.com/package/simple-odf)
![Continuous Integration](https://github.com/connium/simple-odf/workflows/Continuous%20Integration/badge.svg)
[![codecov](https://codecov.io/gh/connium/simple-odf/branch/master/graph/badge.svg)](https://codecov.io/gh/connium/simple-odf)
[![Dependencies](https://david-dm.org/connium/simple-odf.svg)](https://david-dm.org/connium/simple-odf)
[![Known Vulnerabilities](https://snyk.io/test/github/connium/simple-odf/badge.svg)](https://snyk.io/test/github/connium/simple-odf)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Credits](#credits)
- [License](#license)
- [Documentation](#documentation)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See [usage](#usage) for notes on how to integrate the project in your software.

### Prerequisites

To get started locally, follow these instructions:

1. Make sure that you have Node 10.x or later installed.
   See instructions [here](https://nodejs.org/en/download/).

1. Make sure that you have yarn installed; see instructions here.

1. simple-odf uses [npm](https://www.npmjs.com) for running development scripts.
   If you haven't already done so, please [install npm](https://docs.npmjs.com/).

### Installing

1. [Make a fork of this repo](https://help.github.com/articles/fork-a-repo/).

1. Clone the forked repo to your local computer using git.

   Open terminal and type:

   ```sh
   git clone https://github.com/<your_username>/simple-odf
   ```

1. Run `npm install` from the root of your clone of this project to install dependencies.

   ```sh
   # navigate into the cloned repo
   cd simple-odf
   # install the dependencies
   npm install
   ```

### Building the Module

To make a local build run:

```sh
npm build
npm pack
```

This generates a number of javascript files in the `dist/` directory and a `simple-odf-<version-number>.tgz` file in the project root.

To actually use the locally built lib, switch to another repository reproducing the specific issue you want to fix (or just generate a local repo). Then install the locally built package:

```sh
cd <path-to-your-other-repo>
npm install <path-to-the-simple-odf-repo>/*.tgz
```

### Testing

There are two different kind of tests which can be run locally:

#### Unit Tests

Each class of project should be tested isolated which is done by the unit tests. To run them, just execute `npm test`.

### Integration Tests

There are also some tests which verify that the resulting document is correct. These cannot be run yet.

When debugging a specific test, change `describe()` or `it()` to `fdescribe()` and `fit()` to focus execution to just that one test. This will keep the output clean and speed up execution by not running irrelevant tests.

## Usage

If you want to use this package in your software, add it to your project dependencies via npm or yarn.

```sh
# npm
npm i simple-odf
# yarn
yarn add simple-odf
```

Now you can create your first document.

```javascript
const simpleOdf = require('simple-odf');

const document = new simpleOdf.TextDocument();
const body = document.getBody();

body.addHeading('Welcome to simple-odf');
body.addParagraph('The quick, brown fox jumps over a lazy dog.');

document.saveFlat('/home/homer/Welcome.fodf');
```

See the [examples](./examples/README.md) for more details on how to use the library.

## Built With

- [@xmldom/xmldom](https://github.com/xmldom/xmldom) - Used to serialize the XML

## Contributing

If you want to contribute to simple-odf, you are very welcome. Send issues and pull requests with your ideas.

<!--
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
-->

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/connium/simple-odf/releases).

## Credits

This project exists thanks to all the [contributors](https://github.com/connium/simple-odf/graphs/contributors) who participate in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Documentation

Learn more about the [OASIS Open Document Format](http://docs.oasis-open.org/office/v1.2/OpenDocument-v1.2.html).

- [Features](./docs/Features.md)
- [API reference](./docs/API.md)
