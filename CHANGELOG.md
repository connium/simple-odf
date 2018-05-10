# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased] (2018-??-??)

## [0.3.0] (2018-05-10)
### Added
- **chore:** Add continuous integration with Travis CI by @oncletom, partly fixes [#17](https://github.com/connium/simple-odf/issues/17)
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

## [0.2.0] (2018-01-12)
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

[Unreleased]: https://github.com/connium/simple-odf/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/connium/simple-odf/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/connium/simple-odf/compare/v0.1.0...v0.2.0