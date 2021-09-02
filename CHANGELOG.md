# [2.2.0](https://github.com/connium/simple-odf/compare/v2.1.0...v2.2.0) (2021-09-02)


### Features

* **style:** implement text overline ([#545](https://github.com/connium/simple-odf/issues/545)) ([0aced85](https://github.com/connium/simple-odf/commit/0aced85b3784ffc9d24d679c2e07e8b2c0681b15))

# [2.1.0](https://github.com/connium/simple-odf/compare/v2.0.2...v2.1.0) (2021-09-02)


### Features

* **style:** implement text underline ([#544](https://github.com/connium/simple-odf/issues/544)) ([08d27e8](https://github.com/connium/simple-odf/commit/08d27e8755f8e604b43db93acf4de2b17de7741e))

## [2.0.2](https://github.com/connium/simple-odf/compare/v2.0.1...v2.0.2) (2021-05-09)


### Bug Fixes

* **deps:** [security] bump version ([813ecab](https://github.com/connium/simple-odf/commit/813ecab39f77be8ceea0a9418d16319251c86137))

## [2.0.1](https://github.com/connium/simple-odf/compare/v2.0.0...v2.0.1) (2021-03-29)


### Bug Fixes

* **deps:** [security] bump xmldom and y18n ([#442](https://github.com/connium/simple-odf/issues/442)) ([5163a1e](https://github.com/connium/simple-odf/commit/5163a1e8aed0a1f9b7dcae7592a7514ffb06c799))

# [2.0.0](https://github.com/connium/simple-odf/compare/v1.0.0...v2.0.0) (2020-06-29)


### chore

* **deps:** upgrade to typescript 3.9 ([#275](https://github.com/connium/simple-odf/issues/275)) ([f2cc1d7](https://github.com/connium/simple-odf/commit/f2cc1d7b2f4d26714bee001c86a90e0c2f145391))
* **deps:** upgrade to typescript 3.9 ([#275](https://github.com/connium/simple-odf/issues/275)) ([8fa816d](https://github.com/connium/simple-odf/commit/8fa816db515493dd5f755bb368da35bbbe08063c))


### BREAKING CHANGES

* **deps:** The compile target of the library changed from ES2015 to ES2018.
* **deps:** The compile target of the library changed from ES2015 to ES2018.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0](https://github.com/connium/simple-odf/compare/v0.10.1...v1.0.0) (2020-04-22)

### Bug Fixes

- **list:** text content of a list item cannot be styled ([#120](https://github.com/connium/simple-odf/issues/120)) ([453a96b](https://github.com/connium/simple-odf/commit/453a96b57cc232ab2f64fb549c84ceb92b4d4d03)), closes [#67](https://github.com/connium/simple-odf/issues/67)
- **meta:** do not forbid dates older than now ([77790c8](https://github.com/connium/simple-odf/commit/77790c8cb8d3c8786c8d827ab59480924222ec77))

### Features

- **list:** implement bullet list style ([#239](https://github.com/connium/simple-odf/issues/239)) ([c9f6d4d](https://github.com/connium/simple-odf/commit/c9f6d4dd146412eedee7e9edb4554ea9bb8cad6d))
- **list:** implement sublists ([#121](https://github.com/connium/simple-odf/issues/121)) ([ae60c56](https://github.com/connium/simple-odf/commit/ae60c56561451420bc4c8cc606afce065386d77d))

### BREAKING CHANGES

- **list:** The `addListItem` method on a `List` no longer accepts a string and it doesn't automagically create a "hidden" paragraph. Instead an empty `ListItem` is being created. On the `ListItem` instance it is now possible to add headings or paragraphs.

## [0.10.1](https://github.com/connium/simple-odf/compare/v0.10.0...v0.10.1) (2019-07-11)

### Bug Fixes

- **chore:** update dev dependencies

## [0.10.0](https://github.com/connium/simple-odf/compare/v0.9.0...v0.10.0) (2019-06-05)

### Features

- **style:** add tab stop character and leader settings to paragraph style

## [0.9.0](https://github.com/connium/simple-odf/compare/v0.8.0...v0.9.0) (2019-05-30)

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

## [0.8.0](https://github.com/connium/simple-odf/compare/v0.7.0...v0.8.0) (2019-02-26)

### Added

- **font:** extend font declaration

### Fixed

- **document:** Document title is not recognized by LibreOffice, closes [#68](https://github.com/connium/simple-odf/issues/68)

## [0.7.0](https://github.com/connium/simple-odf/compare/v0.6.0...v0.7.0) (2019-02-19)

### Added

- **chore:** Add automatically created API documentation, closes [#16](https://github.com/connium/simple-odf/issues/16)

### Changed

- **meta:** Use `Date` instead of `number` when dealing with dates
- **style:** Always use millimeter as unit, except for font size
- **refactor:** Split API and serialization logic, closes [#60](https://github.com/connium/simple-odf/issues/60)
- **refactor:** Apply JavaScript Standard Style, closes [#61](https://github.com/connium/simple-odf/issues/61)
- **chore:** Update dev dependencies, place test code next to production code, mention contributors in package.json
- **chore:** Add pull request template

## [0.6.0](https://github.com/connium/simple-odf/compare/v0.5.0...v0.6.0) (2018-10-12)

### Added

- **meta:** Set meta data of the document, closes [#44](https://github.com/connium/simple-odf/issues/44)
- **paragraph:** Add keep-together style (by @verheyenkoen)

### Changed

- **document:** Declare all namespaces on creation of the text document, closes [#30](https://github.com/connium/simple-odf/issues/30)
- **chore:** Update dev dependencies

## [0.5.0](https://github.com/connium/simple-odf/compare/v0.4.0...v0.5.0) (2018-06-01)

### Added

- **image:** Set width and height of an image, closes [#36](https://github.com/connium/simple-odf/issues/36)
- **image:** Set anchor type of an image, closes [#11](https://github.com/connium/simple-odf/issues/11)

### Changed

- **image:** Move size configuration of an image to the image style, closes [#41](https://github.com/connium/simple-odf/issues/41)

## [0.4.0](https://github.com/connium/simple-odf/compare/v0.3.1...v0.4.0) (2018-05-19)

### Added

- **chore:** Add code coverage analysis with Codecov (by @oncletom), closes [#17](https://github.com/connium/simple-odf/issues/17)
- **chore:** Add static code analysis with Better Code Hub
- **paragraph:** Set color, font size and typeface to the text of a paragraph, closes [#26](https://github.com/connium/simple-odf/issues/26)
- **paragraph:** Set font family to a paragraph, closes [#27](https://github.com/connium/simple-odf/issues/27)
- **paragraph:** Apply text transformation to a paragraph, closes [#34](https://github.com/connium/simple-odf/issues/34)

### Changed

- **chore:** Run TSLint on production and test code
- **paragraph:** Style now is of type `IParagraphStyle`

## [0.3.1](https://github.com/connium/simple-odf/compare/v0.3.0...v0.3.1) (2018-05-10)

### Fixed

- **paragraph:** Types for `Image`, `TabStop` and `TabStopType` are not exported, closes [#24](https://github.com/connium/simple-odf/issues/24)

## [0.3.0](https://github.com/connium/simple-odf/compare/v0.2.0...v0.3.0) (2018-05-10)

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

## [0.2.0](https://github.com/connium/simple-odf/compare/v0.1.0...v0.2.0) (2018-01-12)

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
