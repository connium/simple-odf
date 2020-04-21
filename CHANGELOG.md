# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](2020-??-??)

### Added

- **list:** allow styling of bullet lists
- **list:** implement sublists

### Changed

- **list:** text content of a list item cannot be styled, closes [#67](https://github.com/connium/simple-odf/issues/67)
- **chore(lint):** replace tslint with eslint
- **chore(travis):** add Node.js 12 to travis configuration
- **chore:** drop support for Node.js 8
- **chore(lint):** replace standard with prettier

### Fixed

- **meta:** do not forbid dates older than now

## [0.10.1](2019-07-11)

### Changed

- **chore:** update dev dependencies

## [0.10.0](2019-06-05)

### Added

- **style:** add tab stop character and leader settings to paragraph style

## [0.9.0](2019-05-30)

### Added

- **style:** add common styles
- **style:** allow page break to be before or after a paragraph, closes [#31](https://github.com/connium/simple-odf/issues/31)
- **style:** add keep-with-next flag to paragraph style
- **style:** add orphan & widow control, paragraph background, line height to paragraph style
- **style:** add margin settings to paragraph style
- **style:** add horizontal alignment of last line and line spacing to paragraph style
- **style:** add padding settings to paragraph style
- **style:** add font variant to paragraph style
- **style:** add border settings to paragraph style
- **docs:** add a realistic example

### Changed

- **chore:** improve repository structure
- **chore(ci):** update distribution of Travis CI configuration

### Fixed

- **style:** tab stop is added as child of style:style element

## [0.8.0](2019-02-26)

### Added

- **font:** extend font declaration

### Fixed

- **document:** Document title is not recognized by LibreOffice, closes [#68](https://github.com/connium/simple-odf/issues/68)

## [0.7.0](2019-02-19)

### Added

- **chore:** Add automatically created API documentation, closes [#16](https://github.com/connium/simple-odf/issues/16)

### Changed

- **meta:** Use `Date` instead of `number` when dealing with dates
- **style:** Always use millimeter as unit, except for font size
- **refactor:** Split API and serialization logic, closes [#60](https://github.com/connium/simple-odf/issues/60)
- **refactor:** Apply JavaScript Standard Style, closes [#61](https://github.com/connium/simple-odf/issues/61)
- **chore:** Update dev dependencies, place test code next to production code, mention contributors in package.json
- **chore:** Add pull request template

## [0.6.0](2018-10-12)

### Added

- **meta:** Set meta data of the document, closes [#44](https://github.com/connium/simple-odf/issues/44)
- **paragraph:** Add keep-together style (by @verheyenkoen)

### Changed

- **document:** Declare all namespaces on creation of the text document, closes [#30](https://github.com/connium/simple-odf/issues/30)
- **chore:** Update dev dependencies

## [0.5.0](2018-06-01)

### Added

- **image:** Set width and height of an image, closes [#36](https://github.com/connium/simple-odf/issues/36)
- **image:** Set anchor type of an image, closes [#11](https://github.com/connium/simple-odf/issues/11)

### Changed

- **image:** Move size configuration of an image to the image style, closes [#41](https://github.com/connium/simple-odf/issues/41)

## [0.4.0](2018-05-19)

### Added

- **chore:** Add code coverage analysis with Codecov (by @oncletom), closes [#17](https://github.com/connium/simple-odf/issues/17)
- **chore:** Add static code analysis with Better Code Hub
- **paragraph:** Set color, font size and typeface to the text of a paragraph, closes [#26](https://github.com/connium/simple-odf/issues/26)
- **paragraph:** Set font family to a paragraph, closes [#27](https://github.com/connium/simple-odf/issues/27)
- **paragraph:** Apply text transformation to a paragraph, closes [#34](https://github.com/connium/simple-odf/issues/34)

### Changed

- **chore:** Run TSLint on production and test code
- **paragraph:** Style now is of type `IParagraphStyle`

## [0.3.1](2018-05-10)

### Fixed

- **paragraph:** Types for `Image`, `TabStop` and `TabStopType` are not exported, closes [#24](https://github.com/connium/simple-odf/issues/24)

## [0.3.0](2018-05-10)

### Added

- **chore:** Add continuous integration with Travis CI (by @oncletom), partly fixes [#17](https://github.com/connium/simple-odf/issues/17)
- **paragraph:** Add hyperlinks to a paragraph, closes [#5](https://github.com/connium/simple-odf/issues/5)
- **paragraph:** Add images to a paragraph, closes [#7](https://github.com/connium/simple-odf/issues/7)
- **paragraph:** Replace tab character with tab element, closes [#10](https://github.com/connium/simple-odf/issues/10)
- **paragraph:** Replace sequence of space characters with space element, closes [#10](https://github.com/connium/simple-odf/issues/10)
- **paragraph:** Define tab stops on a paragraph, closes [#14](https://github.com/connium/simple-odf/issues/14)

### Changed

- **chore:** Update dependencies and fix jest configuration
- **general:** Full rewrite of the public API to use the terminology of the Open Document Format

### Fixed

- **paragraph:** Text breaks if `\r\n` is entered as text of a paragraph, closes [#15](https://github.com/connium/simple-odf/issues/15)

## [0.2.0](2018-01-12)

### Added

- **docs:** Add CHANGELOG
- **docs:** Improve and extend README
- **docs:** Add badges (dependencies, known vulnerabilities, version) to README
- **list:** Add basic list support (add/insert/get/set/remove item)
- **paragraph:** Overwrite text content
- **style:** Get horizontal alignment
- **test:** Add integration test

### Changed

- **general:** Export public API from / (no namespaces)
- **paragraph:** Rename text related functions in paragraph
- **heading:** Rename headline to heading

## 0.1.0 (2018-01-08)

### Added

- **heading:** Add headings to a document and modify their outline level
- **paragraph:** Add paragraphs to a document and modify their text content
- **paragraph:** Set page break before paragraph
- **paragraph:** Set horizontal alignment
- **text-document:** Create text documents and save them as flat XML ODF document

[unreleased]: https://github.com/connium/simple-odf/compare/v0.10.1...HEAD
[0.10.1]: https://github.com/connium/simple-odf/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/connium/simple-odf/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/connium/simple-odf/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/connium/simple-odf/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/connium/simple-odf/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/connium/simple-odf/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/connium/simple-odf/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/connium/simple-odf/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/connium/simple-odf/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/connium/simple-odf/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/connium/simple-odf/compare/v0.1.0...v0.2.0
