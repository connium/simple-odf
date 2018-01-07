# node-odf

## What is node-odf?

node-odf is an easy-to-use, high-level Node.js based API for creating documents in Open Document Format (ODF).

It is written in TypeScript and compiled to pure JavaScript.

Till now, we support APIs to create text document, paragraph and headline. 

## Cookbook

### Text Document
The following codes generates an empty text document:

```javascript
const document = new TextDocument();

document.save('/home/homer/My_first_document.fodf');
```

### Paragraph
The following code adds a new and empty paragraph to the end of the document.

```javascript
document.addParagraph();
```

To add a paragraph with the corresponding text, the following code can be used:

```javascript
document.addParagraph("The quick, brown fox jumps over a lazy dog.");
```

### Headline
The following code adds a new and empty headline with headling level 1 to the end of the document.

```javascript
document.addHeadline();
```

To add a headline with the corresponding text and headling level 2, the following code can be used:

```javascript
document.addHeadline("Second order headline", 2);
```

The following code gets the current heading level and changes it to level 3.

```javascript
const headingLevel = heading.getHeadingLevel();
console.log("The headling level of heading is " + headingLevel + ".");

heading.setHeadingLevel(3);
```
