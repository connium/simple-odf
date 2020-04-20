## Classes

<dl>
<dt><a href="#Image">Image</a></dt>
<dd><p>This class represents an image in a paragraph.</p>
<p>It is used to embed image data in BASE64 encoding.</p>
</dd>
<dt><a href="#Meta">Meta</a></dt>
<dd><p>This class represents the metadata of a document.</p>
<p>It is used to set descriptive information about the document.</p>
</dd>
<dt><a href="#CommonStyles">CommonStyles</a></dt>
<dd><p>This class contains common styles of a document.</p>
<p>It is used to manage the named styles that are used in the document.</p>
</dd>
<dt><a href="#FontFaceDeclarations">FontFaceDeclarations</a></dt>
<dd><p>This class contains all font face declarations of a document.</p>
<p>It is used to manage the fonts that are used in the document.</p>
</dd>
<dt><a href="#TextBody">TextBody</a></dt>
<dd><p>This class represents the content of a text document.</p>
</dd>
<dt><a href="#TextDocument">TextDocument</a></dt>
<dd><p>This class represents a text document in OpenDocument format.</p>
</dd>
<dt><a href="#BulletListLevelStyle">BulletListLevelStyle</a></dt>
<dd><p>This class represents a list style where list items are preceded by bullets.</p>
</dd>
<dt><a href="#FontFace">FontFace</a></dt>
<dd><p>This class represents a font face declaration.</p>
<p>It is used to describe the characteristics of a font which is used in the document.
The unique name of a font can be used inside styles to select a font face declaration.</p>
</dd>
<dt><a href="#ListStyle">ListStyle</a></dt>
<dd><p>This class represents a list style.</p>
<p>List styles are used to specify the formatting of a list and its items.
A list style contains a set of style elements for each list level (@see ListLevelStyle).
If a list style is applied to a list but does not contain a list level specification for a specific level, the list level style of the next lower level is used.</p>
</dd>
<dt><a href="#Style">Style</a></dt>
<dd><p>This class represents a style.</p>
<p>It is used to specify the formatting of a document or a portion of a document.
The unique name of a style can be used to apply a formatting to elements.</p>
</dd>
<dt><a href="#TabStop">TabStop</a></dt>
<dd><p>This class represents a tab stop.</p>
<p>Tab stops are used to align text in a paragraph.
To become effective they must be set to the style of the respective paragraph.</p>
</dd>
<dt><a href="#Heading">Heading</a> ⇐ <code><a href="#Paragraph">Paragraph</a></code></dt>
<dd><p>This class represents a heading in a document.</p>
<p>It is used to structure a document into multiple sections.
A chapter or section begins with a heading and extends to the next heading at the same or higher level.</p>
</dd>
<dt><a href="#Hyperlink">Hyperlink</a></dt>
<dd><p>This class represents a hyperlink in a paragraph.</p>
</dd>
<dt><a href="#List">List</a></dt>
<dd><p>This class represents a list and may contain any number list items.</p>
</dd>
<dt><a href="#ListItem">ListItem</a></dt>
<dd><p>This class represents an item in a list.</p>
</dd>
<dt><a href="#Paragraph">Paragraph</a></dt>
<dd><p>This class represents a paragraph.</p>
</dd>
</dl>

<a name="Image"></a>

## Image
This class represents an image in a paragraph.

It is used to embed image data in BASE64 encoding.

**Since**: 0.3.0  

* [Image](#Image)
    * [`new Image(path)`](#new_Image_new)
    * [`.setAnchorType(anchorType)`](#Image+setAnchorType) ⇒ [<code>Image</code>](#Image)
    * [`.getAnchorType()`](#Image+getAnchorType) ⇒ <code>AnchorType</code>
    * [`.setHeight(height)`](#Image+setHeight) ⇒ [<code>Image</code>](#Image)
    * [`.getHeight()`](#Image+getHeight) ⇒ <code>number</code> \| <code>undefined</code>
    * [`.getPath()`](#Image+getPath) ⇒ <code>string</code>
    * [`.setSize(width, height)`](#Image+setSize) ⇒ [<code>Image</code>](#Image)
    * [`.setWidth(width)`](#Image+setWidth) ⇒ [<code>Image</code>](#Image)
    * [`.getWidth()`](#Image+getWidth) ⇒ <code>number</code> \| <code>undefined</code>


* * *

<a name="new_Image_new"></a>

### `new Image(path)`
Creates an image

#### Parameters
- path <code>string</code>  
Path to the image file that should be embedded

**Example**  
```js
const image = new Image('/home/homer/myself.png');
```

* * *

<a name="Image+setAnchorType"></a>

### `image.setAnchorType(anchorType)` ⇒ [<code>Image</code>](#Image)
The `setAnchorType()` method sets the anchor type setting of this image.

#### Parameters
- anchorType <code>AnchorType</code>  
The anchor type setting

**Return value**  
[<code>Image</code>](#Image) - The `Image` object

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.setAnchorType(AnchorType.AsChar);
```
**Since**: 0.9.0  

* * *

<a name="Image+getAnchorType"></a>

### `image.getAnchorType()` ⇒ <code>AnchorType</code>
The `getAnchorType()` method returns the anchor type setting of this image.

**Return value**  
<code>AnchorType</code> - The anchor type setting

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.getAnchorType();                  // AnchorType.Paragraph
image.setAnchorType(AnchorType.AsChar);
image.getAnchorType();                  // AnchorType.AsChar
```
**Since**: 0.9.0  

* * *

<a name="Image+setHeight"></a>

### `image.setHeight(height)` ⇒ [<code>Image</code>](#Image)
The `setHeight` method sets the target height of the image in millimeter.

If the provided value is too small, the height will be set to the minimal size `1`.

#### Parameters
- height <code>number</code>  
The target height of the image in millimeter

**Return value**  
[<code>Image</code>](#Image) - The `Image` object

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.setHeight(42);  // 42
image.setHeight(-23); // 1
```
**Since**: 0.9.0  

* * *

<a name="Image+getHeight"></a>

### `image.getHeight()` ⇒ <code>number</code> \| <code>undefined</code>
The `getHeight()` method returns the target height of the image or `undefined` if no height was set.

**Return value**  
<code>number</code> \| <code>undefined</code> - The target height of the image in millimeter or `undefined` if no height was set

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.getHeight();   // undefined
image.setHeight(42);
image.getHeight();   // 42
```
**Since**: 0.9.0  

* * *

<a name="Image+getPath"></a>

### `image.getPath()` ⇒ <code>string</code>
The `getPath()` method returns the path to the image file that should be embedded.

**Return value**  
<code>string</code> - The path to the image file

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.getPath(); // '/home/homer/myself.png'
```
**Since**: 0.7.0  

* * *

<a name="Image+setSize"></a>

### `image.setSize(width, height)` ⇒ [<code>Image</code>](#Image)
The `setSize()` method sets the target width and height of the image.

If any provided value is too small, it will be set to the minimal size `1`.

#### Parameters
- width <code>number</code>  
The target width of the image in millimeter
- height <code>number</code>  
The target height of the image in millimeter

**Return value**  
[<code>Image</code>](#Image) - The `Image` object

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.setSize(42, 23);   // w:42, h:32
image.setWidth(42, -23); // w:42, h:1
```
**Since**: 0.9.0  

* * *

<a name="Image+setWidth"></a>

### `image.setWidth(width)` ⇒ [<code>Image</code>](#Image)
The `setWidth` method sets the target width of the image in millimeter.

If the provided value is too small, the width will be set to the minimal size `1`.

#### Parameters
- width <code>number</code>  
The target width of the image in millimeter

**Return value**  
[<code>Image</code>](#Image) - The `Image` object

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.setWidth(42);  // 42
image.setWidth(-23); // 1
```
**Since**: 0.9.0  

* * *

<a name="Image+getWidth"></a>

### `image.getWidth()` ⇒ <code>number</code> \| <code>undefined</code>
The `getWidth()` method returns the target width of the image or `undefined` if no width was set.

**Return value**  
<code>number</code> \| <code>undefined</code> - The target width of the image in millimeter or `undefined` if no width was set

**Example**  
```js
const image = new Image('/home/homer/myself.png');
image.getWidth();   // undefined
image.setWidth(42);
image.getWidth();   // 42
```
**Since**: 0.9.0  

* * *

<a name="Meta"></a>

## Meta
This class represents the metadata of a document.

It is used to set descriptive information about the document.

**Since**: 0.6.0  

* [Meta](#Meta)
    * [`new Meta()`](#new_Meta_new)
    * [`.setCreator(creator)`](#Meta+setCreator) ⇒ [<code>Meta</code>](#Meta)
    * [`.getCreator()`](#Meta+getCreator) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.getCreationDate()`](#Meta+getCreationDate) ⇒ <code>Date</code>
    * [`.setDate(date)`](#Meta+setDate) ⇒ [<code>Meta</code>](#Meta)
    * [`.getDate()`](#Meta+getDate) ⇒ <code>Date</code> \| <code>undefined</code>
    * [`.setDescription(description)`](#Meta+setDescription) ⇒ [<code>Meta</code>](#Meta)
    * [`.getDescription()`](#Meta+getDescription) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.getEditingCycles()`](#Meta+getEditingCycles) ⇒ <code>number</code>
    * [`.getGenerator()`](#Meta+getGenerator) ⇒ <code>string</code>
    * [`.setInitialCreator(initialCreator)`](#Meta+setInitialCreator) ⇒ [<code>Meta</code>](#Meta)
    * [`.getInitialCreator()`](#Meta+getInitialCreator) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.addKeyword(keyword)`](#Meta+addKeyword) ⇒ [<code>Meta</code>](#Meta)
    * [`.getKeywords()`](#Meta+getKeywords) ⇒ <code>Array.&lt;string&gt;</code>
    * [`.removeKeyword(keyword)`](#Meta+removeKeyword) ⇒ [<code>Meta</code>](#Meta)
    * [`.clearKeywords()`](#Meta+clearKeywords) ⇒ [<code>Meta</code>](#Meta)
    * [`.setLanguage(language)`](#Meta+setLanguage) ⇒ [<code>Meta</code>](#Meta)
    * [`.getLanguage()`](#Meta+getLanguage) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setPrintDate(printDate)`](#Meta+setPrintDate) ⇒ [<code>Meta</code>](#Meta)
    * [`.getPrintDate()`](#Meta+getPrintDate) ⇒ <code>Date</code> \| <code>undefined</code>
    * [`.setPrintedBy(printedBy)`](#Meta+setPrintedBy) ⇒ [<code>Meta</code>](#Meta)
    * [`.getPrintedBy()`](#Meta+getPrintedBy) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setSubject(subject)`](#Meta+setSubject) ⇒ [<code>Meta</code>](#Meta)
    * [`.getSubject()`](#Meta+getSubject) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setTitle(title)`](#Meta+setTitle) ⇒ [<code>Meta</code>](#Meta)
    * [`.getTitle()`](#Meta+getTitle) ⇒ <code>string</code> \| <code>undefined</code>


* * *

<a name="new_Meta_new"></a>

### `new Meta()`
Creates a `Meta` instance that represents the metadata of a document.

Initializes the creation date with the current time stamp
and sets the username of the currently effective user as initial creator.

**Example**  
```js
const meta = new Meta();
```

* * *

<a name="Meta+setCreator"></a>

### `meta.setCreator(creator)` ⇒ [<code>Meta</code>](#Meta)
The `setCreator()` method sets the name of the person who last modified the document.

#### Parameters
- creator <code>string</code> | <code>undefined</code>  
The name of the person who last modified a document
                                    or `undefined` to unset the creator

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setCreator('Lisa Simpson'); // 'Lisa Simpson'
meta.setCreator(undefined);      // undefined
```
**Since**: 0.6.0  

* * *

<a name="Meta+getCreator"></a>

### `meta.getCreator()` ⇒ <code>string</code> \| <code>undefined</code>
The `getCreator()` method returns the name of the person who last modified the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the person who last modified the document
                              or `undefined` if the creator is not set

**Example**  
```js
const meta = new Meta();
meta.getCreator();               // undefined
meta.setCreator('Lisa Simpson');
meta.getCreator();               // 'Lisa Simpson'
```
**Since**: 0.6.0  

* * *

<a name="Meta+getCreationDate"></a>

### `meta.getCreationDate()` ⇒ <code>Date</code>
The `getCreationDate()` method returns the UTC timestamp specifying the date and time when a document was created.

The creation date is initialized with the UTC timestamp of the moment the `Meta` instance was created.

**Return value**  
<code>Date</code> - A `Date` instance specifying the date and time when a document was created

**Example**  
```js
const meta = new Meta(); // 2020-04-01 12:00:00
meta.getCreationDate();  // 1585742400000
```
**Since**: 0.6.0  

* * *

<a name="Meta+setDate"></a>

### `meta.setDate(date)` ⇒ [<code>Meta</code>](#Meta)
The `setDate()` method sets the date and time when the document was last modified.

#### Parameters
- date <code>Date</code> | <code>undefined</code>  
A `Date` instance specifying the date and time when the document was last modified
                               or `undefined` to unset the date

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setDate(new Date()); // 2020-07-23 13:37:00
```
**Since**: 0.6.0  

* * *

<a name="Meta+getDate"></a>

### `meta.getDate()` ⇒ <code>Date</code> \| <code>undefined</code>
The `getDate()` method returns the date and time when the document was last modified.

**Return value**  
<code>Date</code> \| <code>undefined</code> - A `Date` instance specifying the date and time when the document was last modified
                            or `undefined` if the date is not set

**Example**  
```js
const meta = new Meta();
meta.getDate();           // undefined
meta.setDate(new Date()); // 2020-07-23 13:37:00
meta.getDate();           // 1595511420000
```
**Since**: 0.6.0  

* * *

<a name="Meta+setDescription"></a>

### `meta.setDescription(description)` ⇒ [<code>Meta</code>](#Meta)
The `setDescription()` method sets the description of the document.

#### Parameters
- description <code>string</code> | <code>undefined</code>  
The description of the document or `undefined` to unset the description

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setDescription('Memoirs of the yellow man wearing blue trousers');
```
**Since**: 0.6.0  

* * *

<a name="Meta+getDescription"></a>

### `meta.getDescription()` ⇒ <code>string</code> \| <code>undefined</code>
The `getDescription()` method returns the description of the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The description of the document or `undefined` if the description is not set

**Example**  
```js
const meta = new Meta();
meta.getDescription(); // undefined
meta.setDescription('Memoirs of the yellow man wearing blue trousers');
meta.getDescription(); // 'Memoirs of the yellow man wearing blue trousers'
```
**Since**: 0.6.0  

* * *

<a name="Meta+getEditingCycles"></a>

### `meta.getEditingCycles()` ⇒ <code>number</code>
The `getEditingCycles()` method returns the number of times the document has been edited.

When the `Meta` instance is being created, the value is set to `1`.

**Return value**  
<code>number</code> - The number of times a document has been edited

**Example**  
```js
const meta = new Meta();
meta.getEditingCycles(); // 1
```
**Since**: 0.6.0  

* * *

<a name="Meta+getGenerator"></a>

### `meta.getGenerator()` ⇒ <code>string</code>
The `getGenerator()` method returns a string that identifies **simple-odf** as the OpenDocument producer
that was used to create the document.
The string matches the definition for user-agents as defined in [RFC2616](http://www.ietf.org/rfc/rfc2616.txt).

**Return value**  
<code>string</code> - A string that identifies **simple-odf** as the OpenDocument producer of this document

**Example**  
```js
const meta = new Meta();
meta.getGenerator(); // simple-odf/0.6.0
```
**Since**: 0.6.0  

* * *

<a name="Meta+setInitialCreator"></a>

### `meta.setInitialCreator(initialCreator)` ⇒ [<code>Meta</code>](#Meta)
The `setInitialCreator()` method sets the name of the initial creator of the document.

The initial creator is initialized with the username of the currently effective user.

#### Parameters
- initialCreator <code>string</code> | <code>undefined</code>  
The name of the initial creator of the document
                                           or `undefined` to unset the initial creator

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();                // 'Homer Simpson'
meta.setInitialCreator('Bart Simpson'); // 'Bart Simpson'
meta.setInitialCreator(undefined);      // undefined
```
**Since**: 0.6.0  

* * *

<a name="Meta+getInitialCreator"></a>

### `meta.getInitialCreator()` ⇒ <code>string</code> \| <code>undefined</code>
The `getInitialCreator()` method returns the name of the initial creator of the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the initial creator of the document
                              or `undefined` if the initial creator is not set

**Example**  
```js
const meta = new Meta();
meta.getInitialCreator();               // 'Homer Simpson'
meta.setInitialCreator('Bart Simpson');
meta.getInitialCreator();               // 'Bart Simpson'
```
**Since**: 0.6.0  

* * *

<a name="Meta+addKeyword"></a>

### `meta.addKeyword(keyword)` ⇒ [<code>Meta</code>](#Meta)
The `addKeyword()` method adds a keyword pertaining to a document to the end of the keyword list.
If the given string includes comma characters, the string will be split and added as multiple key words.

#### Parameters
- keyword <code>string</code>  
The keyword to add to the end of the keyword list

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();                       // []
meta.addKeyword('memoirs');                    // ['memoirs']
meta.addKeyword('Simpson,family,Springfield'); // ['memoirs', 'Simpson', 'family', 'Springfield']
```
**Since**: 0.6.0  

* * *

<a name="Meta+getKeywords"></a>

### `meta.getKeywords()` ⇒ <code>Array.&lt;string&gt;</code>
The `getKeywords()` method returns a new `Array` object that contains the keywords of the document.

**Return value**  
<code>Array.&lt;string&gt;</code> - A new `Array` object that contains the keywords of the document

**Example**  
```js
const meta = new Meta();
meta.getKeywords();                     // []
meta.addKeyword('Simpson,Springfield');
meta.getKeywords();                     // ['Simpson', 'Springfield']
```
**Since**: 0.6.0  

* * *

<a name="Meta+removeKeyword"></a>

### `meta.removeKeyword(keyword)` ⇒ [<code>Meta</code>](#Meta)
The `removeKeyword()` method removes the specified keyword from the keyword list.

#### Parameters
- keyword <code>string</code>  
The keyword to remove from the keyword list

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.addKeyword('Simpson,Springfield'); // ['Simpson', 'Springfield']
meta.removeKeyword('Simpson');          // ['Springfield']
```
**Since**: 0.6.0  

* * *

<a name="Meta+clearKeywords"></a>

### `meta.clearKeywords()` ⇒ [<code>Meta</code>](#Meta)
The `clearKeywords()` method removes all elements from the keyword list.

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.addKeyword('Simpson,Springfield'); // ['Simpson', 'Springfield']
meta.clearKeywords();                   // []
```
**Since**: 0.6.0  

* * *

<a name="Meta+setLanguage"></a>

### `meta.setLanguage(language)` ⇒ [<code>Meta</code>](#Meta)
The `setLanguage()` method sets default language of the document.
A language is a natural language identifier as defined by [RFC5646](http://www.ietf.org/rfc/rfc5646.txt).
If an illegal value is provided, the value will be ignored.

#### Parameters
- language <code>string</code> | <code>undefined</code>  
The default language of the document
                                     or `undefined` to unset the default language

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();     // undefined
meta.setLanguage('en-US');   // 'en-US'
meta.setLanguage('illegal'); // 'en-US'
```
**Since**: 0.6.0  

* * *

<a name="Meta+getLanguage"></a>

### `meta.getLanguage()` ⇒ <code>string</code> \| <code>undefined</code>
The `getLanguage()` method returns the default language of the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The default language of the document
                              or `undefined` if the default language is not set

**Example**  
```js
const meta = new Meta();
meta.getLanguage();        // undefined
meta.setLanguage('en-US');
meta.getLanguage();        // 'en-US'
```
**Since**: 0.6.0  

* * *

<a name="Meta+setPrintDate"></a>

### `meta.setPrintDate(printDate)` ⇒ [<code>Meta</code>](#Meta)
The `setPrintDate()` method sets the date and time when the document was last printed.

#### Parameters
- printDate <code>Date</code> | <code>undefined</code>  
A `Date` instance specifying the date and time when the document was last
                                    printed or `undefined` to unset the print date

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setPrintDate(new Date()); // 2020-07-23 13:37:00
```
**Since**: 0.6.0  

* * *

<a name="Meta+getPrintDate"></a>

### `meta.getPrintDate()` ⇒ <code>Date</code> \| <code>undefined</code>
The `getPrintDate()` method returns the date and time when the document was last printed.

**Return value**  
<code>Date</code> \| <code>undefined</code> - A `Date` instance specifying the date and time when the document was last printed
                            or `undefined` if the print date is not set

**Example**  
```js
const meta = new Meta();
meta.getPrintDate();           // undefined
meta.setPrintDate(new Date()); // 2020-07-23 13:37:00
meta.getPrintDate();           // 1595511420000
```
**Since**: 0.6.0  

* * *

<a name="Meta+setPrintedBy"></a>

### `meta.setPrintedBy(printedBy)` ⇒ [<code>Meta</code>](#Meta)
The `setPrintedBy()` method sets the name of the last person who printed the document.

#### Parameters
- printedBy <code>string</code> | <code>undefined</code>  
The name of the last person who printed the document
                                      or `undefined` to unset the name of the person

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setPrintedBy('Marge Simpson'); // 'Marge Simpson'
meta.setPrintedBy(undefined);       // undefined
```
**Since**: 0.6.0  

* * *

<a name="Meta+getPrintedBy"></a>

### `meta.getPrintedBy()` ⇒ <code>string</code> \| <code>undefined</code>
The `getPrintedBy()` method returns the name of the last person who printed the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the last person who printed the document
                              or `undefined` if the name of the person is not set

**Example**  
```js
const meta = new Meta();
meta.getPrintedBy();                // undefined
meta.setPrintedBy('Marge Simpson');
meta.getPrintedBy();                // 'Marge Simpson'
```
**Since**: 0.6.0  

* * *

<a name="Meta+setSubject"></a>

### `meta.setSubject(subject)` ⇒ [<code>Meta</code>](#Meta)
The `setSubject()` method sets the subject of the document.

#### Parameters
- subject <code>string</code> | <code>undefined</code>  
The subject of the document or `undefined` to unset the subject

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setSubject('Simpsons'); // 'Simpsons'
meta.setSubject(undefined);  // undefined
```
**Since**: 0.6.0  

* * *

<a name="Meta+getSubject"></a>

### `meta.getSubject()` ⇒ <code>string</code> \| <code>undefined</code>
The `getSubject()` method returns the subject of the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The subject of the document or `undefined` if the subject is not set

**Example**  
```js
const meta = new Meta();
meta.getSubject();           // undefined
meta.setSubject('Simpsons');
meta.getSubject();           // 'Simpsons'
```
**Since**: 0.6.0  

* * *

<a name="Meta+setTitle"></a>

### `meta.setTitle(title)` ⇒ [<code>Meta</code>](#Meta)
The `setTitle()` method sets the title of the document.

#### Parameters
- title <code>string</code> | <code>undefined</code>  
The title of the document or `undefined` to unset the title

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
const meta = new Meta();
meta.setTitle('Memoirs of Homer Simpson'); // 'Memoirs of Homer Simpson'
meta.setTitle(undefined);                  // undefined
```
**Since**: 0.6.0  

* * *

<a name="Meta+getTitle"></a>

### `meta.getTitle()` ⇒ <code>string</code> \| <code>undefined</code>
The `getTitle()` method returns the title of the document.

**Return value**  
<code>string</code> \| <code>undefined</code> - The title of the document or `undefined` if the title is not set

**Example**  
```js
const meta = new Meta();
meta.getTitle();                           // undefined
meta.setTitle('Memoirs of Homer Simpson');
meta.getTitle();                           // 'Memoirs of Homer Simpson'
```
**Since**: 0.6.0  

* * *

<a name="CommonStyles"></a>

## CommonStyles
This class contains common styles of a document.

It is used to manage the named styles that are used in the document.

**Since**: 0.9.0  

* [CommonStyles](#CommonStyles)
    * [`new CommonStyles()`](#new_CommonStyles_new)
    * [`.createListStyle(name)`](#CommonStyles+createListStyle) ⇒ [<code>ListStyle</code>](#ListStyle)
    * [`.createParagraphStyle(name)`](#CommonStyles+createParagraphStyle) ⇒ <code>ParagraphStyle</code>
    * [`.getName(displayName)`](#CommonStyles+getName) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.getAll()`](#CommonStyles+getAll)


* * *

<a name="new_CommonStyles_new"></a>

### `new CommonStyles()`
Creates a `CommonStyles` instance that represents the common styles of a document.

**Example**  
```js
const commonStyles = new CommonStyles();
```

* * *

<a name="CommonStyles+createListStyle"></a>

### `commonStyles.createListStyle(name)` ⇒ [<code>ListStyle</code>](#ListStyle)
The `createListStyle()` method creates a new `ListStyle` instance with the given name.
If a style with this name already exists, the existing style will be returned.

#### Parameters
- name <code>string</code>  
The unique name for the style

**Return value**  
[<code>ListStyle</code>](#ListStyle) - A new `ListStyle` instance with the specified name or an existing style, if one with the specified name exists

**Example**  
```js
const commonStyles = new CommonStyles();
commonStyles.createListStyle('Contents');
```
**Since**: 0.11.0  

* * *

<a name="CommonStyles+createParagraphStyle"></a>

### `commonStyles.createParagraphStyle(name)` ⇒ <code>ParagraphStyle</code>
The `createParagraphStyle()` method creates a new `ParagraphStyle` instance with the given name.
If a style with this name already exists, the existing style will be returned.

#### Parameters
- name <code>string</code>  
The unique name for the style

**Return value**  
<code>ParagraphStyle</code> - A new `ParagraphStyle` instance with the specified name
or an existing style, if one with the specified name exists

**Example**  
```js
const commonStyles = new CommonStyles();
commonStyles.createParagraphStyle('Summary');
```
**Since**: 0.9.0  

* * *

<a name="CommonStyles+getName"></a>

### `commonStyles.getName(displayName)` ⇒ <code>string</code> \| <code>undefined</code>
The `getName()` method returns the unique name of the style with the specified display name.

#### Parameters
- displayName <code>string</code>  
The display name of the requested style

**Return value**  
<code>string</code> \| <code>undefined</code> - The unique name of the style with the specified display name
or `undefined` if there is no style with this display name

**Example**  
```js
const commonStyles = new CommonStyles();
commonStyles.createParagraphStyle('Heading 1');
commonStyles.getName('UnknownStyle'); // undefined
commonStyles.getName('Heading 1');    // Heading_20_1
```
**Since**: 0.9.0  

* * *

<a name="CommonStyles+getAll"></a>

### `commonStyles.getAll()`

* * *

<a name="FontFaceDeclarations"></a>

## FontFaceDeclarations
This class contains all font face declarations of a document.

It is used to manage the fonts that are used in the document.

**Since**: 0.8.0  

* [FontFaceDeclarations](#FontFaceDeclarations)
    * [`.create(name, [fontFamily], [fontPitch])`](#FontFaceDeclarations+create) ⇒ [<code>FontFace</code>](#FontFace)
    * [`.get(name)`](#FontFaceDeclarations+get) ⇒ [<code>FontFace</code>](#FontFace) \| <code>undefined</code>
    * [`.getAll()`](#FontFaceDeclarations+getAll) ⇒ [<code>Array.&lt;FontFace&gt;</code>](#FontFace)
    * [`.delete(name)`](#FontFaceDeclarations+delete) ⇒ [<code>Meta</code>](#Meta)


* * *

<a name="FontFaceDeclarations+create"></a>

### `fontFaceDeclarations.create(name, [fontFamily], [fontPitch])` ⇒ [<code>FontFace</code>](#FontFace)
Creates a [FontFace](#FontFace) object with the given name.
If a font with this name already exists, the existing font will be returned.

#### Parameters
- name <code>string</code>  
The unique name for the font
- [fontFamily] <code>string</code>  
The name of the font family
- [fontPitch] <code>FontPitch</code>  
Indicator whether the font has a fixed or variable width

**Return value**  
[<code>FontFace</code>](#FontFace) - A new `FontFace` object with the specified properties
or an existing font face, if one with the specified name exists

**Example**  
```js
const fontFaceDeclarations = new FontFaceDeclarations();
fontFaceDeclarations.create('FreeSans', 'FreeSans', FontPitch.Variable);
```
**Since**: 0.8.0  

* * *

<a name="FontFaceDeclarations+get"></a>

### `fontFaceDeclarations.get(name)` ⇒ [<code>FontFace</code>](#FontFace) \| <code>undefined</code>
The `get()` method returns a specified element from a Map object.

#### Parameters
- name <code>string</code>  
The name of the requested font

**Return value**  
[<code>FontFace</code>](#FontFace) \| <code>undefined</code> - The `FontFace` object associated with the specified name
or `undefined` if there is no font with this name

**Example**  
```js
const fontFaceDeclarations = new FontFaceDeclarations();
fontFaceDeclarations.create('FreeSans');
fontFaceDeclarations.get('UnknownFont'); // undefined
fontFaceDeclarations.get('FreeSans');    // FreeSans font
```
**Since**: 0.8.0  

* * *

<a name="FontFaceDeclarations+getAll"></a>

### `fontFaceDeclarations.getAll()` ⇒ [<code>Array.&lt;FontFace&gt;</code>](#FontFace)
The `getAll()` method returns a new `Array` object that contains the fonts of the document.

**Return value**  
[<code>Array.&lt;FontFace&gt;</code>](#FontFace) - A new `Array` object that contains the fonts of the document

**Example**  
```js
const fontFaceDeclarations = new FontFaceDeclarations();
fontFaceDeclarations.create('FreeSans');
fontFaceDeclarations.create('Symbol');
fontFaceDeclarations.getAll();           // [FreeSans, Symbol]
```
**Since**: 0.8.0  

* * *

<a name="FontFaceDeclarations+delete"></a>

### `fontFaceDeclarations.delete(name)` ⇒ [<code>Meta</code>](#Meta)
The `delete()` method removes the specified font from the font face declarations.

#### Parameters
- name <code>string</code>  
The name of the font to remove from the font face declarations

**Return value**  
[<code>Meta</code>](#Meta) - The `Meta` object

**Example**  
```js
var myMap = new Map();
const fontFaceDeclarations = new FontFaceDeclarations();
fontFaceDeclarations.create('FreeSans');
fontFaceDeclarations.create('Symbol');
fontFaceDeclarations.delete('FreeSans');
fontFaceDeclarations.get('FreeSans');    // undefined
```
**Since**: 0.8.0  

* * *

<a name="TextBody"></a>

## TextBody
This class represents the content of a text document.

**Since**: 0.7.0  

* [TextBody](#TextBody)
    * [`.addHeading([text], [level])`](#TextBody+addHeading) ⇒ [<code>Heading</code>](#Heading)
    * [`.addList()`](#TextBody+addList) ⇒ [<code>List</code>](#List)
    * [`.addParagraph([text])`](#TextBody+addParagraph) ⇒ [<code>Paragraph</code>](#Paragraph)


* * *

<a name="TextBody+addHeading"></a>

### `textBody.addHeading([text], [level])` ⇒ [<code>Heading</code>](#Heading)
Adds a heading at the end of the document.
If a text is given, this will be set as text content of the heading.

#### Parameters
- [text] <code>string</code>  
The text content of the heading
- [level] <code>number</code> <code> = 1</code>  
The heading level; defaults to 1 if omitted

**Return value**  
[<code>Heading</code>](#Heading) - The newly added heading

**Since**: 0.7.0  

* * *

<a name="TextBody+addList"></a>

### `textBody.addList()` ⇒ [<code>List</code>](#List)
Adds an empty list at the end of the document.

**Return value**  
[<code>List</code>](#List) - The newly added list

**Example**  
```js
new TextBody()
  .addList();
```
**Since**: 0.7.0  

* * *

<a name="TextBody+addParagraph"></a>

### `textBody.addParagraph([text])` ⇒ [<code>Paragraph</code>](#Paragraph)
Adds a paragraph at the end of the document.
If a text is given, this will be set as text content of the paragraph.

#### Parameters
- [text] <code>string</code>  
The text content of the paragraph

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The newly added paragraph

**Since**: 0.7.0  

* * *

<a name="TextDocument"></a>

## TextDocument
This class represents a text document in OpenDocument format.

**Since**: 0.1.0  

* [TextDocument](#TextDocument)
    * [`new TextDocument()`](#new_TextDocument_new)
    * [`.getBody()`](#TextDocument+getBody) ⇒ [<code>TextBody</code>](#TextBody)
    * [`.getCommonStyles()`](#TextDocument+getCommonStyles) ⇒ [<code>CommonStyles</code>](#CommonStyles)
    * [`.getFontFaceDeclarations()`](#TextDocument+getFontFaceDeclarations) ⇒ [<code>FontFaceDeclarations</code>](#FontFaceDeclarations)
    * [`.getMeta()`](#TextDocument+getMeta) ⇒ [<code>Meta</code>](#Meta)
    * [`.saveFlat(filePath)`](#TextDocument+saveFlat) ⇒ <code>Promise.&lt;void&gt;</code>
    * [`.toString()`](#TextDocument+toString) ⇒ <code>string</code>


* * *

<a name="new_TextDocument_new"></a>

### `new TextDocument()`
Creates a `TextDocument` instance that represents a OpenDocument text document.

**Example**  
```js
const document = new TextDocument();
```

* * *

<a name="TextDocument+getBody"></a>

### `textDocument.getBody()` ⇒ [<code>TextBody</code>](#TextBody)
The `getBody()` method returns the content of the document.

**Return value**  
[<code>TextBody</code>](#TextBody) - A `TextBody` object that holds the content of the document

**Example**  
```js
new TextDocument()
  .getBody()
  .addHeading('My first document');
```
**Since**: 0.7.0  

* * *

<a name="TextDocument+getCommonStyles"></a>

### `textDocument.getCommonStyles()` ⇒ [<code>CommonStyles</code>](#CommonStyles)
The `getCommonStyles()` method returns the named styles of the document.

**Return value**  
[<code>CommonStyles</code>](#CommonStyles) - A `CommonStyles` object that holds the named styles of the document

**Example**  
```js
new TextDocument()
  .getCommonStyles()
  .createParagraphStyle('Summary');
```
**Since**: 0.9.0  

* * *

<a name="TextDocument+getFontFaceDeclarations"></a>

### `textDocument.getFontFaceDeclarations()` ⇒ [<code>FontFaceDeclarations</code>](#FontFaceDeclarations)
The `getFontFaceDeclarations()` method returns the font face declarations of the document.

**Return value**  
[<code>FontFaceDeclarations</code>](#FontFaceDeclarations) - An object holding the font faces of the document

**Example**  
```js
new TextDocument()
  .getFontFaceDeclarations()
  .create('FreeSans', 'FreeSans', FontPitch.Variable);
```
**Since**: 0.8.0  

* * *

<a name="TextDocument+getMeta"></a>

### `textDocument.getMeta()` ⇒ [<code>Meta</code>](#Meta)
The `getMeta()` method returns the metadata of the document.

**Return value**  
[<code>Meta</code>](#Meta) - An object holding the metadata of the document

**Example**  
```js
new TextDocument()
  .getMeta()
  .setCreator('Homer Simpson');
```
**Since**: 0.6.0  

* * *

<a name="TextDocument+saveFlat"></a>

### `textDocument.saveFlat(filePath)` ⇒ <code>Promise.&lt;void&gt;</code>
The `saveFlat()` method converts the document into an XML string and stores it in flat open document xml format.

#### Parameters
- filePath <code>string</code>  
The file path to write to

**Example**  
```js
new TextDocument()
  .saveFlat('/home/homer/document.fodt');
```
**Since**: 0.1.0  

* * *

<a name="TextDocument+toString"></a>

### `textDocument.toString()` ⇒ <code>string</code>
Returns the string representation of this document in flat open document xml format.

**Return value**  
<code>string</code> - The string representation of this document

**Since**: 0.1.0  

* * *

<a name="BulletListLevelStyle"></a>

## BulletListLevelStyle
This class represents a list style where list items are preceded by bullets.

**Since**: 0.11.0  

* [BulletListLevelStyle](#BulletListLevelStyle)
    * [`new BulletListLevelStyle(level)`](#new_BulletListLevelStyle_new)
    * [`.getBulletChar()`](#BulletListLevelStyle+getBulletChar) ⇒ <code>string</code>
    * [`.setBulletChar(bulletChar)`](#BulletListLevelStyle+setBulletChar) ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
    * [`.getLevel()`](#BulletListLevelStyle+getLevel) ⇒ <code>number</code>
    * [`.getNumberPrefix()`](#BulletListLevelStyle+getNumberPrefix) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setNumberPrefix(prefix)`](#BulletListLevelStyle+setNumberPrefix) ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
    * [`.getNumberSuffix()`](#BulletListLevelStyle+getNumberSuffix) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setNumberSuffix(suffix)`](#BulletListLevelStyle+setNumberSuffix) ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
    * [`.getRelativeBulletSize()`](#BulletListLevelStyle+getRelativeBulletSize) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setRelativeBulletSize(relativeSize)`](#BulletListLevelStyle+setRelativeBulletSize) ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)


* * *

<a name="new_BulletListLevelStyle_new"></a>

### `new BulletListLevelStyle(level)`
Creates a `BulletListLevelStyle` instance that represents a list style where list items are preceded by bullets.

#### Parameters
- level <code>number</code>  
The level of the list style, starting with `1`

**Example**  
```js
const style = new BulletListLevelStyle(3);
```

* * *

<a name="BulletListLevelStyle+getBulletChar"></a>

### `bulletListLevelStyle.getBulletChar()` ⇒ <code>string</code>
The `getBulletChar()` method returns the character to use as the bullet.

**Return value**  
<code>string</code> - The character to use as the bullet

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.getBulletChar();    // '\u2022'
style.setBulletChar('~');
style.getBulletChar();    // '~'
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+setBulletChar"></a>

### `bulletListLevelStyle.setBulletChar(bulletChar)` ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
The `setBulletChar()` method sets the character to use as the bullet.

If an illegal value is provided, the value will be ignored.

#### Parameters
- bulletChar <code>string</code>  
The character to use as the bullet

**Return value**  
[<code>BulletListLevelStyle</code>](#BulletListLevelStyle) - The `BulletListLevelStyle` object

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.setBulletChar('~'); // '~'
style.setBulletChar('');  // '~'
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+getLevel"></a>

### `bulletListLevelStyle.getLevel()` ⇒ <code>number</code>
The `getLevel()` method returns the level of the list style.

**Return value**  
<code>number</code> - The level of the list style, starting with `1`

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.getLevel(); // 3
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+getNumberPrefix"></a>

### `bulletListLevelStyle.getNumberPrefix()` ⇒ <code>string</code> \| <code>undefined</code>
The `getNumberPrefix()` method returns the character to display before a bullet.

**Return value**  
<code>string</code> \| <code>undefined</code> - The character to display before a bullet or `undefined` if no prefix is set

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.getNumberPrefix();    // undefined
style.setNumberPrefix('~');
style.getNumberPrefix();    // '~'
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+setNumberPrefix"></a>

### `bulletListLevelStyle.setNumberPrefix(prefix)` ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
The `setNumberPrefix()` method sets the character to display before a bullet.

#### Parameters
- prefix <code>string</code> | <code>undefined</code>  
The character to display before a bullet or `undefined` to unset the prefix

**Return value**  
[<code>BulletListLevelStyle</code>](#BulletListLevelStyle) - The `BulletListLevelStyle` object

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.setNumberPrefix('~');       // '~'
style.setNumberPrefix(undefined); // undefined
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+getNumberSuffix"></a>

### `bulletListLevelStyle.getNumberSuffix()` ⇒ <code>string</code> \| <code>undefined</code>
The `getNumberSuffix()` method returns the character to display after a bullet.

**Return value**  
<code>string</code> \| <code>undefined</code> - The character to display after a bullet or `undefined` if no suffix is set

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.getNumberSuffix();    // undefined
style.setNumberSuffix('~');
style.getNumberSuffix();    // '~'
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+setNumberSuffix"></a>

### `bulletListLevelStyle.setNumberSuffix(suffix)` ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
The `setNumberSuffix()` method sets the character to display after a bullet.

#### Parameters
- suffix <code>string</code> | <code>undefined</code>  
The character to display after a bullet or `undefined` to unset the suffix

**Return value**  
[<code>BulletListLevelStyle</code>](#BulletListLevelStyle) - The `BulletListLevelStyle` object

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.setNumberSuffix('~');       // '~'
style.setNumberSuffix(undefined); // undefined
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+getRelativeBulletSize"></a>

### `bulletListLevelStyle.getRelativeBulletSize()` ⇒ <code>string</code> \| <code>undefined</code>
The `getRelativeBulletSize()` method returns the percentage value for the bullet size relative to the font size of the paragraphs in the bullet list.

**Return value**  
<code>string</code> \| <code>undefined</code> - The percentage value for the bullet size or `undefined` if no relative bullet size is set

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.getRelativeBulletSize();      // undefined
style.setRelativeBulletSize('23%');
style.getRelativeBulletSize();      // '23%'
```
**Since**: 0.11.0  

* * *

<a name="BulletListLevelStyle+setRelativeBulletSize"></a>

### `bulletListLevelStyle.setRelativeBulletSize(relativeSize)` ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
The `setNumberSuffix()` method sets the percentage value for the bullet size relative to the font size of the paragraphs in the bullet list.

If an illegal value is provided, the value will be ignored.

#### Parameters
- relativeSize <code>string</code> | <code>undefined</code>  
The percentage value for the bullet size or `undefined` to unset the bullet size

**Return value**  
[<code>BulletListLevelStyle</code>](#BulletListLevelStyle) - The `BulletListLevelStyle` object

**Example**  
```js
const style = new BulletListLevelStyle(3);
style.setRelativeBulletSize('23%');     // '23%'
style.setRelativeBulletSize('42px');    // '23%'
style.setRelativeBulletSize(undefined); // undefined
```
**Since**: 0.11.0  

* * *

<a name="FontFace"></a>

## FontFace
This class represents a font face declaration.

It is used to describe the characteristics of a font which is used in the document.
The unique name of a font can be used inside styles to select a font face declaration.

**Since**: 0.8.0  

* [FontFace](#FontFace)
    * [`new FontFace(name, [fontFamily], [fontPitch])`](#new_FontFace_new)
    * [`.setCharset(fontCharset)`](#FontFace+setCharset) ⇒ [<code>FontFace</code>](#FontFace)
    * [`.getCharset()`](#FontFace+getCharset) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setFontFamily(fontFamily)`](#FontFace+setFontFamily) ⇒ [<code>FontFace</code>](#FontFace)
    * [`.getFontFamily()`](#FontFace+getFontFamily) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setFontFamilyGeneric(fontFamilyGeneric)`](#FontFace+setFontFamilyGeneric) ⇒ [<code>FontFace</code>](#FontFace)
    * [`.getFontFamilyGeneric()`](#FontFace+getFontFamilyGeneric) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setFontPitch(fontPitch)`](#FontFace+setFontPitch) ⇒ [<code>FontFace</code>](#FontFace)
    * [`.getFontPitch()`](#FontFace+getFontPitch) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.getName()`](#FontFace+getName) ⇒ <code>string</code>


* * *

<a name="new_FontFace_new"></a>

### `new FontFace(name, [fontFamily], [fontPitch])`
Creates a `FontFace` instance that represents the characteristics of a font.

#### Parameters
- name <code>string</code>  
The unique name for the font
- [fontFamily] <code>string</code>  
The name of the font family
- [fontPitch] <code>FontPitch</code>  
Indicator whether the font has a fixed or variable width

**Example**  
```js
const font = new FontFace('FreeSans', 'FreeSans', FontPitch.Variable);
const font = new FontFace('FreeSans', 'FreeSans');
const font = new FontFace('FreeSans');
```

* * *

<a name="FontFace+setCharset"></a>

### `fontFace.setCharset(fontCharset)` ⇒ [<code>FontFace</code>](#FontFace)
The `setCharset()` method sets whether the font defines glyphs according to the semantics of Unicode or not.

The value can be `x-symbol` or a character encoding.

If an illegal value is provided, the value will be ignored.

#### Parameters
- fontCharset <code>string</code> | <code>undefined</code>  
The charset of the font or `undefined` to unset the charset

**Return value**  
[<code>FontFace</code>](#FontFace) - The `FontFace` object

**Example**  
```js
const font = new FontFace('OpenSymbol', 'OpenSymbol', FontPitch.Variable);
font.setCharset('x-symbol'); // 'x-symbol'
font.setCharset('23');       // 'x-symbol'
font.setCharset(undefined);  // undefined
```
**Since**: 0.8.0  

* * *

<a name="FontFace+getCharset"></a>

### `fontFace.getCharset()` ⇒ <code>string</code> \| <code>undefined</code>
The `getCharset()` method returns whether the font defines glyphs according to the semantics of Unicode or not.

**Return value**  
<code>string</code> \| <code>undefined</code> - The charset of the font or `undefined` if the charset is not set

**Example**  
```js
const font = new FontFace('OpenSymbol', 'OpenSymbol', FontPitch.Variable);
font.getCharset();           // undefined
font.setCharset('x-symbol');
font.getCharset();           // 'x-symbol'
```
**Since**: 0.8.0  

* * *

<a name="FontFace+setFontFamily"></a>

### `fontFace.setFontFamily(fontFamily)` ⇒ [<code>FontFace</code>](#FontFace)
The `setFontFamily()` method sets the font family which is to be used to render the text.

#### Parameters
- fontFamily <code>string</code> | <code>undefined</code>  
The font family of the font or `undefined` to unset the font family

**Return value**  
[<code>FontFace</code>](#FontFace) - The `FontFace` object

**Example**  
```js
const font = new FontFace('OpenSymbol');
font.setFontFamily('OpenSymbol'); // 'OpenSymbol'
font.setFontFamily(undefined);    // undefined
```
**Since**: 0.8.0  

* * *

<a name="FontFace+getFontFamily"></a>

### `fontFace.getFontFamily()` ⇒ <code>string</code> \| <code>undefined</code>
The `getFontFamily()` method returns the font family which is to be used to render the text.

**Return value**  
<code>string</code> \| <code>undefined</code> - The font family of the font or `undefined` if the font family is not set

**Example**  
```js
const font = new FontFace('OpenSymbol');
font.setFontFamily('OpenSymbol'); // 'OpenSymbol'
font.setFontFamily(undefined);    // undefined
```
**Since**: 0.8.0  

* * *

<a name="FontFace+setFontFamilyGeneric"></a>

### `fontFace.setFontFamilyGeneric(fontFamilyGeneric)` ⇒ [<code>FontFace</code>](#FontFace)
The `setFontFamilyGeneric()` method sets the generic font family name of the font.

#### Parameters
- fontFamilyGeneric <code>FontFamilyGeneric</code> | <code>undefined</code>  
The generic font family name
                                                         or `undefined` to unset the generic font family name

**Return value**  
[<code>FontFace</code>](#FontFace) - The `FontFace` object

**Example**  
```js
const font = new FontFace('OpenSymbol');
font.setFontFamilyGeneric(FontFamilyGeneric.System); // 'system'
font.setFontFamilyGeneric(undefined);                // undefined
```
**Since**: 0.8.0  

* * *

<a name="FontFace+getFontFamilyGeneric"></a>

### `fontFace.getFontFamilyGeneric()` ⇒ <code>string</code> \| <code>undefined</code>
The `getFontFamilyGeneric()` method returns the generic font family name of the font.

**Return value**  
<code>string</code> \| <code>undefined</code> - The generic font family name of the font
                              or `undefined` if the generic font family name is not set

**Example**  
```js
const font = new FontFace('OpenSymbol');
font.getFontFamilyGeneric();                         // undefined
font.setFontFamilyGeneric(FontFamilyGeneric.System);
font.getFontFamilyGeneric();                         // 'system'
```
**Since**: 0.8.0  

* * *

<a name="FontFace+setFontPitch"></a>

### `fontFace.setFontPitch(fontPitch)` ⇒ [<code>FontFace</code>](#FontFace)
The `setFontPitch()` method sets whether the font has a fixed or variable width.

#### Parameters
- fontPitch <code>FontPitch</code> | <code>undefined</code>  
The pitch of the font or `undefined` to unset the font pitch

**Return value**  
[<code>FontFace</code>](#FontFace) - The `FontFace` object

**Example**  
```js
const font = new FontFace('OpenSymbol');
font.setFontPitch(FontPitch.Variable); // variable
font.setFontPitch(undefined);          // undefined
```
**Since**: 0.8.0  

* * *

<a name="FontFace+getFontPitch"></a>

### `fontFace.getFontPitch()` ⇒ <code>string</code> \| <code>undefined</code>
The `getFontPitch()` method returns whether the font has a fixed or variable width.

**Return value**  
<code>string</code> \| <code>undefined</code> - The pitch of the font or `undefined` if the font pitch is not set

**Example**  
```js
const font = new FontFace('OpenSymbol');
font.getFontPitch();                   // undefined
font.setFontPitch(FontPitch.Variable);
font.getFontPitch();                   // variable
```
**Since**: 0.8.0  

* * *

<a name="FontFace+getName"></a>

### `fontFace.getName()` ⇒ <code>string</code>
The `getName()` method returns the unique name of the font.

**Return value**  
<code>string</code> - A string that identifies the font in this document

**Example**  
```js
const font = new FontFace('FreeSans');
font.getName(); // 'FreeSans'
```
**Since**: 0.8.0  

* * *

<a name="ListStyle"></a>

## ListStyle
This class represents a list style.

List styles are used to specify the formatting of a list and its items.
A list style contains a set of style elements for each list level (@see ListLevelStyle).
If a list style is applied to a list but does not contain a list level specification for a specific level, the list level style of the next lower level is used.

**Since**: 0.11.0  

* [ListStyle](#ListStyle)
    * [`new ListStyle(displayName)`](#new_ListStyle_new)
    * [`.getConsecutiveNumbering()`](#ListStyle+getConsecutiveNumbering) ⇒ <code>boolean</code>
    * [`.setConsecutiveNumbering(consecutiveNumbering)`](#ListStyle+setConsecutiveNumbering) ⇒ [<code>ListStyle</code>](#ListStyle)
    * [`.createBulletListLevelStyle(level)`](#ListStyle+createBulletListLevelStyle) ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
    * [`.getListLevelStyle(level)`](#ListStyle+getListLevelStyle) ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle) \| <code>undefined</code>
    * [`.getListLevelStyles()`](#ListStyle+getListLevelStyles) ⇒ [<code>Array.&lt;BulletListLevelStyle&gt;</code>](#BulletListLevelStyle)
    * [`.removeListLevelStyle(level)`](#ListStyle+removeListLevelStyle) ⇒ [<code>ListStyle</code>](#ListStyle)


* * *

<a name="new_ListStyle_new"></a>

### `new ListStyle(displayName)`
Creates a `ListStyle` instance that represents the formatting of a list.

#### Parameters
- displayName <code>string</code>  
The unique display name for the style

**Example**  
```js
const style = new ListStyle('Contents');
```

* * *

<a name="ListStyle+getConsecutiveNumbering"></a>

### `listStyle.getConsecutiveNumbering()` ⇒ <code>boolean</code>
The `getConsecutiveNumbering()` method returns whether the style uses consecutive numbering for all list levels or whether each list level restarts the numbering.

**Return value**  
<code>boolean</code> - `true` if consecutive numbering is used for all list levels or `false` if each list level restarts numbering

**Example**  
```js
const style = new ListStyle('Contents');
style.getConsecutiveNumbering();     // false
style.setConsecutiveNumbering(true);
style.getConsecutiveNumbering();     // true
```
**Since**: 0.11.0  

* * *

<a name="ListStyle+setConsecutiveNumbering"></a>

### `listStyle.setConsecutiveNumbering(consecutiveNumbering)` ⇒ [<code>ListStyle</code>](#ListStyle)
The `setConsecutiveNumbering()` method sets returns whether the style uses consecutive numbering for all list levels or whether each list level restarts the numbering.

#### Parameters
- consecutiveNumbering <code>boolean</code>  
`true` if consecutive numbering is used for all list levels or `false` if each list level restarts numbering

**Return value**  
[<code>ListStyle</code>](#ListStyle) - The `ListStyle` object

**Example**  
```js
const style = new ListStyle('Contents');
style.setConsecutiveNumbering(true); // true
```
**Since**: 0.11.0  

* * *

<a name="ListStyle+createBulletListLevelStyle"></a>

### `listStyle.createBulletListLevelStyle(level)` ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle)
The `createBulletListLevelStyle()` method creates a new `BulletListLevelStyle` instance for the given list level.
If a list level style for this level already exists, the existing style will be overwritten.

#### Parameters
- level <code>number</code>  
The level of the list style, starting with `1`

**Return value**  
[<code>BulletListLevelStyle</code>](#BulletListLevelStyle) - A new `BulletListLevelStyle` instance with the specified level

**Throws**:

- <code>Error</code> if the given list level is invalid

**Example**  
```js
const style = new ListStyle('Contents');
style.createBulletListLevelStyle(3);
```
**Since**: 0.11.0  

* * *

<a name="ListStyle+getListLevelStyle"></a>

### `listStyle.getListLevelStyle(level)` ⇒ [<code>BulletListLevelStyle</code>](#BulletListLevelStyle) \| <code>undefined</code>
The `getListLevelStyle()` method returns the list level style for the given list level.
If a list level style for this level already exists, the existing style will be overwritten.

#### Parameters
- level <code>number</code>  
The level of the list style, starting with `1`

**Return value**  
[<code>BulletListLevelStyle</code>](#BulletListLevelStyle) \| <code>undefined</code> - The list level style for the specified level or `undefined` if no list level style is defined for the specified level

**Example**  
```js
const style = new ListStyle('Contents');
style.getListLevelStyle(3);
```
**Since**: 0.11.0  

* * *

<a name="ListStyle+getListLevelStyles"></a>

### `listStyle.getListLevelStyles()` ⇒ [<code>Array.&lt;BulletListLevelStyle&gt;</code>](#BulletListLevelStyle)
The `getListLevelStyles()` method returns a new `Array` object that contains all list level styles of a list style.

**Return value**  
[<code>Array.&lt;BulletListLevelStyle&gt;</code>](#BulletListLevelStyle) - A new `Array` object that contains the list level styles of a list style

**Example**  
```js
const style = new ListStyle('Contents');
style.createBulletListLevelStyle(1);
style.createBulletListLevelStyle(2);
styles.getListLevelStyles();
```
**Since**: 0.11.0  

* * *

<a name="ListStyle+removeListLevelStyle"></a>

### `listStyle.removeListLevelStyle(level)` ⇒ [<code>ListStyle</code>](#ListStyle)
The `removeListLevelStyle()` method removes the list level style for the given list level.

#### Parameters
- level <code>number</code>  
The level of the list style, starting with `1`

**Return value**  
[<code>ListStyle</code>](#ListStyle) - The `ListStyle` object

**Example**  
```js
const style = new ListStyle('Contents');
style.createBulletListLevelStyle(3);
style.removeListLevelStyle(3);
styles.getListLevelStyles();             // []
```
**Since**: 0.11.0  

* * *

<a name="Style"></a>

## Style
This class represents a style.

It is used to specify the formatting of a document or a portion of a document.
The unique name of a style can be used to apply a formatting to elements.

**Since**: 0.9.0  

* [Style](#Style)
    * [`new Style(displayName, family)`](#new_Style_new)
    * [`.setClass(clazz)`](#Style+setClass) ⇒ [<code>Style</code>](#Style)
    * [`.getClass()`](#Style+getClass) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.getDisplayName()`](#Style+getDisplayName) ⇒ <code>string</code>
    * [`.getFamily()`](#Style+getFamily) ⇒ <code>string</code>
    * [`.getName()`](#Style+getName) ⇒ <code>string</code>


* * *

<a name="new_Style_new"></a>

### `new Style(displayName, family)`
Creates a `Style` instance that represents the formatting of a document or a portion of a document.

#### Parameters
- displayName <code>string</code>  
The unique display name for the style
- family <code>StyleFamily</code>  
The family of the style

**Example**  
```js
const style = new Style('Summary', StyleFamily.Paragraph);
```

* * *

<a name="Style+setClass"></a>

### `style.setClass(clazz)` ⇒ [<code>Style</code>](#Style)
The `setClass()` method sets the name of the style class.

#### Parameters
- clazz <code>string</code> | <code>undefined</code>  
The name of the style class of the style or `undefined` to unset the style class

**Return value**  
[<code>Style</code>](#Style) - The `Style` object

**Example**  
```js
const style = new Style('Text body', StyleFamily.Paragraph);
style.setClass('text');    // 'text'
style.setClass(undefined); // undefined
```
**Since**: 0.9.0  

* * *

<a name="Style+getClass"></a>

### `style.getClass()` ⇒ <code>string</code> \| <code>undefined</code>
The `getClass()` method returns name of the style class.

**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the style class of the style or `undefined` if the style class is not set

**Example**  
```js
const style = new Style('Text body', StyleFamily.Paragraph);
style.getClass();       // undefined
style.setClass('text');
style.getClass();       // 'text'
```
**Since**: 0.9.0  

* * *

<a name="Style+getDisplayName"></a>

### `style.getDisplayName()` ⇒ <code>string</code>
The `getDisplayName()` method returns the name of a style as it should appear in the user interface.

**Return value**  
<code>string</code> - The pretty and user-friendly name of a style

**Example**  
```js
const style = new Style('Text body', StyleFamily.Paragraph);
style.getDisplayName(); // 'Text body'
```
**Since**: 0.9.0  

* * *

<a name="Style+getFamily"></a>

### `style.getFamily()` ⇒ <code>string</code>
The `getFamily()` method returns the family of the style.

**Return value**  
<code>string</code> - The family of the style

**Example**  
```js
const style = new Style('Text body', StyleFamily.Paragraph);
style.getFamily(); // 'paragraph'
```
**Since**: 0.9.0  

* * *

<a name="Style+getName"></a>

### `style.getName()` ⇒ <code>string</code>
The `getName()` method returns the unique name of the style.

Non-alphanumeric characters in the display name are converted to hexadecimal and wrapped in underscores.
Thus blanks are converted to `_20_`.

**Return value**  
<code>string</code> - A string that identifies the style in this document

**Example**  
```js
const style = new Style('Text body', StyleFamily.Paragraph);
style.getName(); // 'Text_20_body'
```
**Since**: 0.9.0  

* * *

<a name="TabStop"></a>

## TabStop
This class represents a tab stop.

Tab stops are used to align text in a paragraph.
To become effective they must be set to the style of the respective paragraph.

**Since**: 0.3.0  

* [TabStop](#TabStop)
    * [`new TabStop(position, [type])`](#new_TabStop_new)
    * [`.getChar()`](#TabStop+getChar) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setChar(char)`](#TabStop+setChar) ⇒ [<code>TabStop</code>](#TabStop)
    * [`.getLeaderColor()`](#TabStop+getLeaderColor) ⇒ [<code>Color</code>](#new_Color_new) \| <code>undefined</code>
    * [`.setLeaderColor(color)`](#TabStop+setLeaderColor) ⇒ [<code>TabStop</code>](#TabStop)
    * [`.getLeaderStyle()`](#TabStop+getLeaderStyle) ⇒ <code>TabStopLeaderStyle</code>
    * [`.setLeaderStyle(leaderStyle)`](#TabStop+setLeaderStyle) ⇒ [<code>TabStop</code>](#TabStop)
    * [`.getPosition()`](#TabStop+getPosition) ⇒ <code>number</code>
    * [`.setPosition(position)`](#TabStop+setPosition) ⇒ [<code>TabStop</code>](#TabStop)
    * [`.getType()`](#TabStop+getType) ⇒ <code>TabStopType</code>
    * [`.setType(type)`](#TabStop+setType) ⇒ [<code>TabStop</code>](#TabStop)


* * *

<a name="new_TabStop_new"></a>

### `new TabStop(position, [type])`
Creates a `TabStop` instance that represents the settings of a tab stop.

#### Parameters
- position <code>number</code>  
The position of the tab stop in millimeters relative to the left margin.
If a negative value is given, the `position` will be set to `0`.
- [type] <code>TabStopType</code> <code> = TabStopType.Left</code>  
The type of the tab stop

**Example**  
```js
const tabStop = new TabStop(23);                     // 23mm, TabStopType.Left
const tabStop = new TabStop(23, TabStopType.Center); // 23mm, TabStopType.Center
```

* * *

<a name="TabStop+getChar"></a>

### `tabStop.getChar()` ⇒ <code>string</code> \| <code>undefined</code>
The `getChar()` method returns delimiter character for tab stops of type `char`.

**Return value**  
<code>string</code> \| <code>undefined</code> - The delimiter character or `undefined` if the delimiter character is not set

**Example**  
```js
const tabStop = new TabStop(23, TabStopType.Char);
tabStop.getChar();    // undefined
tabStop.setChar('~');
tabStop.getChar();    // '~'
```
**Since**: 0.10.0  

* * *

<a name="TabStop+setChar"></a>

### `tabStop.setChar(char)` ⇒ [<code>TabStop</code>](#TabStop)
The `setChar()` method sets the delimiter character for tab stops of type `char`.

If an illegal value is provided, the value will be ignored.

#### Parameters
- char <code>string</code> | <code>undefined</code>  
The delimiter character or `undefined` to unset the delimiter character

**Return value**  
[<code>TabStop</code>](#TabStop) - The `TabStop` object

**Example**  
```js
const tabStop = new TabStop(23, TabStopType.Char);
tabStop.setChar('~');       // '~'
tabStop.setChar('foo');     // '~'
tabStop.setChar(undefined); // undefined
```
**Since**: 0.10.0  

* * *

<a name="TabStop+getLeaderColor"></a>

### `tabStop.getLeaderColor()` ⇒ [<code>Color</code>](#new_Color_new) \| <code>undefined</code>
The `getLeaderColor()` method returns the color of a leader line.

**Return value**  
[<code>Color</code>](#new_Color_new) \| <code>undefined</code> - The color of a leader line or `undefined` if the current text color will be used

**Example**  
```js
const tabStop = new TabStop(23);
tabStop.getLeaderColor();                           // `undefined`
tabStop.setLeaderColor(Color.fromRgb(255, 128, 0));
tabStop.getLeaderColor();                           // yellow color
```
**Since**: 0.10.0  

* * *

<a name="TabStop+setLeaderColor"></a>

### `tabStop.setLeaderColor(color)` ⇒ [<code>TabStop</code>](#TabStop)
The `setLeaderColor()` method sets the color of a leader line.

#### Parameters
- color [<code>Color</code>](#new_Color_new) | <code>undefined</code>  
The color of a leader line or `undefined` if the current text color will be used

**Return value**  
[<code>TabStop</code>](#TabStop) - The `TabStop` object

**Example**  
```js
const tabStop = new TabStop(23);
tabStop.setLeaderColor(Color.fromRgb(255, 128, 0));
tabStop.setLeaderColor(undefined);
```
**Since**: 0.10.0  

* * *

<a name="TabStop+getLeaderStyle"></a>

### `tabStop.getLeaderStyle()` ⇒ <code>TabStopLeaderStyle</code>
The `getLeaderStyle()` method returns the style for a leader line.

**Return value**  
<code>TabStopLeaderStyle</code> - The style for a leader line

**Example**  
```js
const tabStop = new TabStop(23);
tabStop.getLeaderStyle();                          // TabStopLeaderStyle.None
tabStop.setLeaderStyle(TabStopLeaderStyle.Dotted);
tabStop.getLeaderStyle();                          // TabStopLeaderStyle.Dotted
```
**Since**: 0.10.0  

* * *

<a name="TabStop+setLeaderStyle"></a>

### `tabStop.setLeaderStyle(leaderStyle)` ⇒ [<code>TabStop</code>](#TabStop)
The `setLeaderStyle()` method sets the style for a leader line.

#### Parameters
- leaderStyle <code>TabStopLeaderStyle</code>  
The style for a leader line

**Return value**  
[<code>TabStop</code>](#TabStop) - The `TabStop` object

**Example**  
```js
const tabStop = new TabStop(23);
tabStop.setLeaderStyle(TabStopLeaderStyle.Dotted);
```
**Since**: 0.10.0  

* * *

<a name="TabStop+getPosition"></a>

### `tabStop.getPosition()` ⇒ <code>number</code>
The `getPosition` method returns the position of the tab stop which is interpreted as being relative
to the left margin or the left indent.

**Return value**  
<code>number</code> - The position of the tab stop in millimeters

**Example**  
```js
const tabStop = new TabStop(23);
tabStop.getPosition();   // 23
tabStop.setPosition(42);
tabStop.getPosition();   // 42
```
**Since**: 0.3.0  

* * *

<a name="TabStop+setPosition"></a>

### `tabStop.setPosition(position)` ⇒ [<code>TabStop</code>](#TabStop)
The `setPosition` method sets the position of the tab stop which is interpreted as being relative
to the left margin or the left indent.

#### Parameters
- position <code>number</code>  
The position of the tab stop in millimeters.
If a negative value is given, the `position` will be set to `0`.

**Return value**  
[<code>TabStop</code>](#TabStop) - The `TabStop` object

**Example**  
```js
const tabStop = new TabStop(23); // 23 mm
tabStop.setPosition(42);         // 42 mm
tabStop.setPosition(-7);         // 0 mm
```
**Since**: 0.3.0  

* * *

<a name="TabStop+getType"></a>

### `tabStop.getType()` ⇒ <code>TabStopType</code>
The `getType` method returns the type of the tab stop.

**Return value**  
<code>TabStopType</code> - The type of the tab stop

**Example**  
```js
const tabStop = new TabStop(23);
font.getType();                   // TabStopType.Left
font.setType(TabStopType.Center);
font.getType();                   // TabStopType.Center
```
**Since**: 0.3.0  

* * *

<a name="TabStop+setType"></a>

### `tabStop.setType(type)` ⇒ [<code>TabStop</code>](#TabStop)
The `setType` method sets the type of the tab stop.

#### Parameters
- type <code>TabStopType</code>  
The type of the tab stop

**Return value**  
[<code>TabStop</code>](#TabStop) - The `TabStop` object

**Example**  
```js
const tabStop = new TabStop(23);     // TabStopType.Left
tabStop.setType(TabStopType.Center); // TabStopType.Center
```
**Since**: 0.3.0  

* * *

<a name="Heading"></a>

## Heading ⇐ [<code>Paragraph</code>](#Paragraph)
This class represents a heading in a document.

It is used to structure a document into multiple sections.
A chapter or section begins with a heading and extends to the next heading at the same or higher level.

**Extends**: [<code>Paragraph</code>](#Paragraph)  
**Since**: 0.1.0  

* [Heading](#Heading) ⇐ [<code>Paragraph</code>](#Paragraph)
    * [`new Heading([text], [level])`](#new_Heading_new)
    * [`.setLevel(level)`](#Heading+setLevel) ⇒ [<code>Heading</code>](#Heading)
    * [`.getLevel()`](#Heading+getLevel) ⇒ <code>number</code>
    * [`.addText(text)`](#Paragraph+addText) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.getText()`](#Paragraph+getText) ⇒ <code>string</code>
    * [`.setText(text)`](#Paragraph+setText) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.addHyperlink(text, uri)`](#Paragraph+addHyperlink) ⇒ [<code>Hyperlink</code>](#Hyperlink)
    * [`.addImage(path)`](#Paragraph+addImage) ⇒ [<code>Image</code>](#Image)
    * [`.setStyle(style)`](#Paragraph+setStyle) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.getStyle()`](#Paragraph+getStyle) ⇒ <code>ParagraphStyle</code> \| <code>undefined</code>
    * [`.setStyleName(styleName)`](#Paragraph+setStyleName) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.getStyleName()`](#Paragraph+getStyleName) ⇒ <code>string</code> \| <code>undefined</code>


* * *

<a name="new_Heading_new"></a>

### `new Heading([text], [level])`
Creates a `Heading` instance that represents a heading in a document.

#### Parameters
- [text] <code>string</code> <code> = &quot;&#x27;&#x27;&quot;</code>  
The text content of the heading; defaults to an empty string if omitted
- [level] <code>number</code> <code> = 1</code>  
The level of the heading, starting with `1`; defaults to `1` if omitted

**Example**  
```js
new Heading('First Headline', 1);
new Heading('First Headline');
new Heading();
```

* * *

<a name="Heading+setLevel"></a>

### `heading.setLevel(level)` ⇒ [<code>Heading</code>](#Heading)
The `setLevel()` method sets the level of the heading, starting with `1`.
If an illegal value is provided, then the heading is assumed to be at level `1`.

#### Parameters
- level <code>number</code>  
The level of the heading, starting with `1`

**Return value**  
[<code>Heading</code>](#Heading) - The `Heading` object

**Since**: 0.1.0  

* * *

<a name="Heading+getLevel"></a>

### `heading.getLevel()` ⇒ <code>number</code>
The `getLevel()` method returns the level of the heading.

**Return value**  
<code>number</code> - The level of the heading

**Since**: 0.1.0  

* * *

<a name="Paragraph+addText"></a>

### `heading.addText(text)` ⇒ [<code>Paragraph</code>](#Paragraph)
Appends the specified text to the end of the paragraph.

**Overrides**: [<code>addText</code>](#Paragraph+addText)  
#### Parameters
- text <code>string</code>  
The additional text content

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')      // Some text
  .addText('\nEven more text'); // Some text\nEven more text
```
**Since**: 0.1.0  

* * *

<a name="Paragraph+getText"></a>

### `heading.getText()` ⇒ <code>string</code>
Returns the text content of the paragraph.
Note: This will only return the text; other elements and markup will be omitted.

**Overrides**: [<code>getText</code>](#Paragraph+getText)  
**Return value**  
<code>string</code> - The text content of the paragraph

**Example**  
```js
const paragraph = new Paragraph('Some text, ');
paragraph.addHyperlink('some linked text');
paragraph.addText(', even more text');
paragraph.getText(); // Some text, some linked text, even more text
```
**Since**: 0.1.0  

* * *

<a name="Paragraph+setText"></a>

### `heading.setText(text)` ⇒ [<code>Paragraph</code>](#Paragraph)
Sets the text content of the paragraph.
Note: This will replace any existing content of the paragraph.

**Overrides**: [<code>setText</code>](#Paragraph+setText)  
#### Parameters
- text <code>string</code>  
The new text content

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')     // Some text
  .setText('Some other text'); // Some other text
```
**Since**: 0.1.0  

* * *

<a name="Paragraph+addHyperlink"></a>

### `heading.addHyperlink(text, uri)` ⇒ [<code>Hyperlink</code>](#Hyperlink)
Appends the specified text as hyperlink to the end of the paragraph.

**Overrides**: [<code>addHyperlink</code>](#Paragraph+addHyperlink)  
#### Parameters
- text <code>string</code>  
The text content of the hyperlink
- uri <code>string</code>  
The target URI of the hyperlink

**Return value**  
[<code>Hyperlink</code>](#Hyperlink) - The added `Hyperlink` object

**Example**  
```js
new Paragraph('Some text, ')         // Some text,
  .addHyperlink('some linked text'); // Some text, some linked text
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+addImage"></a>

### `heading.addImage(path)` ⇒ [<code>Image</code>](#Image)
Appends the image of the denoted path to the end of the paragraph.
The current paragraph will be set as anchor for the image.

**Overrides**: [<code>addImage</code>](#Paragraph+addImage)  
#### Parameters
- path <code>string</code>  
The path to the image file

**Return value**  
[<code>Image</code>](#Image) - The added `Image` object

**Example**  
```js
new Paragraph('Some text')
  .addImage('/home/homer/myself.png');
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+setStyle"></a>

### `heading.setStyle(style)` ⇒ [<code>Paragraph</code>](#Paragraph)
Sets the new style of the paragraph.
To reset the style, `undefined` must be given.

If style and style name are both set, the custom style will be set and the common style will be ignored.

**Overrides**: [<code>setStyle</code>](#Paragraph+setStyle)  
#### Parameters
- style <code>ParagraphStyle</code> | <code>undefined</code>  
The new style or `undefined` to reset the style

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')
  .setStyle(new ParagraphStyle());
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+getStyle"></a>

### `heading.getStyle()` ⇒ <code>ParagraphStyle</code> \| <code>undefined</code>
Returns the style of the paragraph.

**Overrides**: [<code>getStyle</code>](#Paragraph+getStyle)  
**Return value**  
<code>ParagraphStyle</code> \| <code>undefined</code> - The style of the paragraph or `undefined` if no style was set

**Example**  
```js
const paragraph = new Paragraph('Some text');
paragraph.getStyle();                     // undefined
paragraph.setStyle(new ParagraphStyle());
paragraph.getStyle();                     // previously set style
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+setStyleName"></a>

### `heading.setStyleName(styleName)` ⇒ [<code>Paragraph</code>](#Paragraph)
Sets the name of the common style that should be applied to the paragraph.
To reset the common style, `undefined` must be given.

If style and style name are both set, the custom style will be set and the common style will be ignored.

**Overrides**: [<code>setStyleName</code>](#Paragraph+setStyleName)  
#### Parameters
- styleName <code>string</code> | <code>undefined</code>  
The name of the common style or `undefined` to reset the common style

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')
  .setStyleName('Summary');
```
**Since**: 0.9.0  

* * *

<a name="Paragraph+getStyleName"></a>

### `heading.getStyleName()` ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of the common style of the paragraph.

**Overrides**: [<code>getStyleName</code>](#Paragraph+getStyleName)  
**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the common style or `undefined` if no common style was set

**Example**  
```js
const paragraph = new Paragraph('Some text');
paragraph.getStyleName();         // undefined
paragraph.setStyleName('Summary);
paragraph.getStyleName();         // 'Summary'
```
**Since**: 0.3.0  

* * *

<a name="Hyperlink"></a>

## Hyperlink
This class represents a hyperlink in a paragraph.

**Since**: 0.3.0  

* [Hyperlink](#Hyperlink)
    * [`new Hyperlink(text, uri)`](#new_Hyperlink_new)
    * [`.setURI(uri)`](#Hyperlink+setURI) ⇒ [<code>Hyperlink</code>](#Hyperlink)
    * [`.getURI()`](#Hyperlink+getURI) ⇒ <code>string</code>


* * *

<a name="new_Hyperlink_new"></a>

### `new Hyperlink(text, uri)`
Creates a hyperlink

#### Parameters
- text <code>string</code>  
The text content of the hyperlink
- uri <code>string</code>  
The target URI of the hyperlink

**Example**  
```js
new Hyperlink('My website', 'https://example.com/');
```

* * *

<a name="Hyperlink+setURI"></a>

### `hyperlink.setURI(uri)` ⇒ [<code>Hyperlink</code>](#Hyperlink)
The `setURI()` method sets the target URI for this hyperlink.
If an illegal value is provided, the value will be ignored.

#### Parameters
- uri <code>string</code>  
The target URI of this hyperlink

**Return value**  
[<code>Hyperlink</code>](#Hyperlink) - The `Hyperlink` object

**Example**  
```js
const hyperlink = new Hyperlink('My website', 'https://example.com/');
hyperlink.setURI('https://github.com'); // https://github.com
hyperlink.setURI('');                   // https://github.com
```
**Since**: 0.3.0  

* * *

<a name="Hyperlink+getURI"></a>

### `hyperlink.getURI()` ⇒ <code>string</code>
The `getURI()` method returns the target URI of this hyperlink.

**Return value**  
<code>string</code> - The target URI of this hyperlink

**Example**  
```js
const hyperlink = new Hyperlink('My website', 'https://example.com/');
hyperlink.getURI();                     // https://example.com
hyperlink.setURI('https://github.com');
hyperlink.getURI();                     // https://github.com
```
**Since**: 0.3.0  

* * *

<a name="List"></a>

## List
This class represents a list and may contain any number list items.

**Since**: 0.2.0  

* [List](#List)
    * [`new List()`](#new_List_new)
    * [`.addItem([item])`](#List+addItem) ⇒ [<code>ListItem</code>](#ListItem)
    * [`.getItem(position)`](#List+getItem) ⇒ [<code>ListItem</code>](#ListItem) \| <code>undefined</code>
    * [`.getItems()`](#List+getItems) ⇒ [<code>Array.&lt;ListItem&gt;</code>](#ListItem)
    * [`.insertItem(position, item)`](#List+insertItem) ⇒ [<code>ListItem</code>](#ListItem)
    * [`.removeItemAt(position)`](#List+removeItemAt) ⇒ [<code>ListItem</code>](#ListItem) \| <code>undefined</code>
    * [`.getStyle()`](#List+getStyle) ⇒ [<code>ListStyle</code>](#ListStyle) \| <code>undefined</code>
    * [`.setStyle(style)`](#List+setStyle) ⇒ [<code>List</code>](#List)
    * [`.getStyleName()`](#List+getStyleName) ⇒ <code>string</code> \| <code>undefined</code>
    * [`.setStyleName(styleName)`](#List+setStyleName) ⇒ [<code>List</code>](#List)
    * [`.clear()`](#List+clear) ⇒ [<code>List</code>](#List)
    * [`.size()`](#List+size) ⇒ <code>number</code>


* * *

<a name="new_List_new"></a>

### `new List()`
Creates a `List` instance that represents a list.

**Example**  
```js
new List();
```

* * *

<a name="List+addItem"></a>

### `list.addItem([item])` ⇒ [<code>ListItem</code>](#ListItem)
The `addItem()` method adds a new list item or adds the specified item to the list.

#### Parameters
- [item] [<code>ListItem</code>](#ListItem)  
The item to add

**Return value**  
[<code>ListItem</code>](#ListItem) - The added `ListItem` object

**Example**  
```js
const list = new List();
list.addItem();
list.addItem(new ListItem());
```
**Since**: 0.2.0  

* * *

<a name="List+getItem"></a>

### `list.getItem(position)` ⇒ [<code>ListItem</code>](#ListItem) \| <code>undefined</code>
The `getItem()` method returns the item at the specified position in the list.
If an invalid position is given, undefined is returned.

#### Parameters
- position <code>number</code>  
The index of the requested list item (starting from 0).

**Return value**  
[<code>ListItem</code>](#ListItem) \| <code>undefined</code> - The `ListItem` object at the specified position
or `undefined` if there is no list item at the specified position

**Example**  
```js
const list = new List();
list.addItem();
list.addItem();
list.getItem(1); // second item
list.getItem(2); // undefined
```
**Since**: 0.2.0  

* * *

<a name="List+getItems"></a>

### `list.getItems()` ⇒ [<code>Array.&lt;ListItem&gt;</code>](#ListItem)
The `getItems()` method returns all list items.

**Return value**  
[<code>Array.&lt;ListItem&gt;</code>](#ListItem) - A copy of the list of `ListItem` objects

**Example**  
```js
const list = new List();
list.getItems(); // []
list.addItem();
list.addItem();
list.getItems(); // [first item, second item]
```
**Since**: 0.2.0  

* * *

<a name="List+insertItem"></a>

### `list.insertItem(position, item)` ⇒ [<code>ListItem</code>](#ListItem)
The `insertItem` method inserts the specified item at the specified position.
The item is inserted before the item at the specified position.

If the position is greater than the current number of items, the new item is appended at the end of the list.
If the position is negative, the new item is inserted as first element.

#### Parameters
- position <code>number</code>  
The index at which to insert the list item (starting from 0).
- item [<code>ListItem</code>](#ListItem)  
The item to insert

**Return value**  
[<code>ListItem</code>](#ListItem) - The inserted `ListItem` object

**Example**  
```js
const list = new List();
list.addItem();
list.insertItem(0, new ListItem()); // insert before existing item
```
**Since**: 0.2.0  

* * *

<a name="List+removeItemAt"></a>

### `list.removeItemAt(position)` ⇒ [<code>ListItem</code>](#ListItem) \| <code>undefined</code>
The `removeItemAt()` method removes the list item from the specified position.

#### Parameters
- position <code>number</code>  
The index of the list item to remove (starting from 0).

**Return value**  
[<code>ListItem</code>](#ListItem) \| <code>undefined</code> - The removed `ListItem` object
or undefined if there is no list item at the specified position

**Example**  
```js
const list = new List();
list.addItem();
list.addItem();
list.removeItemAt(0); // first item
list.getItems();      // [second item]
list.removeItemAt(2); // undefined
```
**Since**: 0.2.0  

* * *

<a name="List+getStyle"></a>

### `list.getStyle()` ⇒ [<code>ListStyle</code>](#ListStyle) \| <code>undefined</code>
Returns the style of the list.

**Return value**  
[<code>ListStyle</code>](#ListStyle) \| <code>undefined</code> - The style of the list or `undefined` if no style was set

**Example**  
```js
const list = new List();
list.getStyle();                // undefined
list.setStyle(new ListStyle());
list.getStyle();                // previously set style
```
**Since**: 0.11.0  

* * *

<a name="List+setStyle"></a>

### `list.setStyle(style)` ⇒ [<code>List</code>](#List)
Sets the new style of the list.
To reset the style, `undefined` must be given.

If style and style name are both set, the custom style will be set and the common style will be ignored.

#### Parameters
- style [<code>ListStyle</code>](#ListStyle) | <code>undefined</code>  
The new style or `undefined` to reset the style

**Return value**  
[<code>List</code>](#List) - The `List` object

**Example**  
```js
new List()
  .setStyle(new ListStyle());
```
**Since**: 0.11.0  

* * *

<a name="List+getStyleName"></a>

### `list.getStyleName()` ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of the common style of the list.

**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the common style or `undefined` if no common style was set

**Example**  
```js
const list = new List();
list.getStyleName();         // undefined
list.setStyleName('Summary');
list.getStyleName();         // 'Summary'
```
**Since**: 0.11.0  

* * *

<a name="List+setStyleName"></a>

### `list.setStyleName(styleName)` ⇒ [<code>List</code>](#List)
Sets the name of the common style that should be applied to the list.
To reset the common style, `undefined` must be given.

If style and style name are both set, the custom style will be set and the common style will be ignored.

#### Parameters
- styleName <code>string</code> | <code>undefined</code>  
The name of the common style or `undefined` to reset the common style

**Return value**  
[<code>List</code>](#List) - The `List` object

**Example**  
```js
new List()
  .setStyleName('Summary');
```
**Since**: 0.11.0  

* * *

<a name="List+clear"></a>

### `list.clear()` ⇒ [<code>List</code>](#List)
The `clear()` method removes all items from the list.

**Return value**  
[<code>List</code>](#List) - The `List` object

**Example**  
```js
const list = new List();
list.addItem();
list.addItem();
list.clear();
list.getItems(); // []
```
**Since**: 0.2.0  

* * *

<a name="List+size"></a>

### `list.size()` ⇒ <code>number</code>
The `size()` method returns the number of items in the list.

**Return value**  
<code>number</code> - The number of items in this list

**Example**  
```js
const list = new List();
list.size();    // 0
list.addItem();
list.addItem();
list.size();    // 2
```
**Since**: 0.2.0  

* * *

<a name="ListItem"></a>

## ListItem
This class represents an item in a list.

**Since**: 0.2.0  

* [ListItem](#ListItem)
    * [`new ListItem()`](#new_ListItem_new)
    * [`.addHeading([text], [level])`](#ListItem+addHeading) ⇒ [<code>Heading</code>](#Heading)
    * [`.addList()`](#ListItem+addList) ⇒ [<code>List</code>](#List)
    * [`.addParagraph([text])`](#ListItem+addParagraph) ⇒ [<code>Paragraph</code>](#Paragraph)


* * *

<a name="new_ListItem_new"></a>

### `new ListItem()`
Creates a `ListItem` instance that represents an item in a list.

**Example**  
```js
new ListItem();
```

* * *

<a name="ListItem+addHeading"></a>

### `listItem.addHeading([text], [level])` ⇒ [<code>Heading</code>](#Heading)
Adds a heading at the end of the list item.
If a text is given, this will be set as text content of the heading.

#### Parameters
- [text] <code>string</code>  
The text content of the heading
- [level] <code>number</code> <code> = 1</code>  
The heading level; defaults to 1 if omitted

**Return value**  
[<code>Heading</code>](#Heading) - The newly added heading

**Since**: 0.11.0  

* * *

<a name="ListItem+addList"></a>

### `listItem.addList()` ⇒ [<code>List</code>](#List)
Adds an empty list at the end of the list item.

**Return value**  
[<code>List</code>](#List) - The newly added list

**Example**  
```js
new ListItem()
  .addList();
```
**Since**: 0.11.0  

* * *

<a name="ListItem+addParagraph"></a>

### `listItem.addParagraph([text])` ⇒ [<code>Paragraph</code>](#Paragraph)
Adds a paragraph at the end of the list item.
If a text is given, this will be set as text content of the paragraph.

#### Parameters
- [text] <code>string</code>  
The text content of the paragraph

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The newly added paragraph

**Since**: 0.11.0  

* * *

<a name="Paragraph"></a>

## Paragraph
This class represents a paragraph.

**Since**: 0.1.0  

* [Paragraph](#Paragraph)
    * [`new Paragraph([text])`](#new_Paragraph_new)
    * [`.addText(text)`](#Paragraph+addText) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.getText()`](#Paragraph+getText) ⇒ <code>string</code>
    * [`.setText(text)`](#Paragraph+setText) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.addHyperlink(text, uri)`](#Paragraph+addHyperlink) ⇒ [<code>Hyperlink</code>](#Hyperlink)
    * [`.addImage(path)`](#Paragraph+addImage) ⇒ [<code>Image</code>](#Image)
    * [`.setStyle(style)`](#Paragraph+setStyle) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.getStyle()`](#Paragraph+getStyle) ⇒ <code>ParagraphStyle</code> \| <code>undefined</code>
    * [`.setStyleName(styleName)`](#Paragraph+setStyleName) ⇒ [<code>Paragraph</code>](#Paragraph)
    * [`.getStyleName()`](#Paragraph+getStyleName) ⇒ <code>string</code> \| <code>undefined</code>


* * *

<a name="new_Paragraph_new"></a>

### `new Paragraph([text])`
Creates a `Paragraph` instance.

#### Parameters
- [text] <code>string</code>  
The text content of the paragraph; defaults to an empty string if omitted

**Example**  
```js
new Paragraph('Some text');
new Paragraph();
```

* * *

<a name="Paragraph+addText"></a>

### `paragraph.addText(text)` ⇒ [<code>Paragraph</code>](#Paragraph)
Appends the specified text to the end of the paragraph.

#### Parameters
- text <code>string</code>  
The additional text content

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')      // Some text
  .addText('\nEven more text'); // Some text\nEven more text
```
**Since**: 0.1.0  

* * *

<a name="Paragraph+getText"></a>

### `paragraph.getText()` ⇒ <code>string</code>
Returns the text content of the paragraph.
Note: This will only return the text; other elements and markup will be omitted.

**Return value**  
<code>string</code> - The text content of the paragraph

**Example**  
```js
const paragraph = new Paragraph('Some text, ');
paragraph.addHyperlink('some linked text');
paragraph.addText(', even more text');
paragraph.getText(); // Some text, some linked text, even more text
```
**Since**: 0.1.0  

* * *

<a name="Paragraph+setText"></a>

### `paragraph.setText(text)` ⇒ [<code>Paragraph</code>](#Paragraph)
Sets the text content of the paragraph.
Note: This will replace any existing content of the paragraph.

#### Parameters
- text <code>string</code>  
The new text content

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')     // Some text
  .setText('Some other text'); // Some other text
```
**Since**: 0.1.0  

* * *

<a name="Paragraph+addHyperlink"></a>

### `paragraph.addHyperlink(text, uri)` ⇒ [<code>Hyperlink</code>](#Hyperlink)
Appends the specified text as hyperlink to the end of the paragraph.

#### Parameters
- text <code>string</code>  
The text content of the hyperlink
- uri <code>string</code>  
The target URI of the hyperlink

**Return value**  
[<code>Hyperlink</code>](#Hyperlink) - The added `Hyperlink` object

**Example**  
```js
new Paragraph('Some text, ')         // Some text,
  .addHyperlink('some linked text'); // Some text, some linked text
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+addImage"></a>

### `paragraph.addImage(path)` ⇒ [<code>Image</code>](#Image)
Appends the image of the denoted path to the end of the paragraph.
The current paragraph will be set as anchor for the image.

#### Parameters
- path <code>string</code>  
The path to the image file

**Return value**  
[<code>Image</code>](#Image) - The added `Image` object

**Example**  
```js
new Paragraph('Some text')
  .addImage('/home/homer/myself.png');
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+setStyle"></a>

### `paragraph.setStyle(style)` ⇒ [<code>Paragraph</code>](#Paragraph)
Sets the new style of the paragraph.
To reset the style, `undefined` must be given.

If style and style name are both set, the custom style will be set and the common style will be ignored.

#### Parameters
- style <code>ParagraphStyle</code> | <code>undefined</code>  
The new style or `undefined` to reset the style

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')
  .setStyle(new ParagraphStyle());
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+getStyle"></a>

### `paragraph.getStyle()` ⇒ <code>ParagraphStyle</code> \| <code>undefined</code>
Returns the style of the paragraph.

**Return value**  
<code>ParagraphStyle</code> \| <code>undefined</code> - The style of the paragraph or `undefined` if no style was set

**Example**  
```js
const paragraph = new Paragraph('Some text');
paragraph.getStyle();                     // undefined
paragraph.setStyle(new ParagraphStyle());
paragraph.getStyle();                     // previously set style
```
**Since**: 0.3.0  

* * *

<a name="Paragraph+setStyleName"></a>

### `paragraph.setStyleName(styleName)` ⇒ [<code>Paragraph</code>](#Paragraph)
Sets the name of the common style that should be applied to the paragraph.
To reset the common style, `undefined` must be given.

If style and style name are both set, the custom style will be set and the common style will be ignored.

#### Parameters
- styleName <code>string</code> | <code>undefined</code>  
The name of the common style or `undefined` to reset the common style

**Return value**  
[<code>Paragraph</code>](#Paragraph) - The `Paragraph` object

**Example**  
```js
new Paragraph('Some text')
  .setStyleName('Summary');
```
**Since**: 0.9.0  

* * *

<a name="Paragraph+getStyleName"></a>

### `paragraph.getStyleName()` ⇒ <code>string</code> \| <code>undefined</code>
Returns the name of the common style of the paragraph.

**Return value**  
<code>string</code> \| <code>undefined</code> - The name of the common style or `undefined` if no common style was set

**Example**  
```js
const paragraph = new Paragraph('Some text');
paragraph.getStyleName();         // undefined
paragraph.setStyleName('Summary);
paragraph.getStyleName();         // 'Summary'
```
**Since**: 0.3.0  

* * *

