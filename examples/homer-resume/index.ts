import { TextDocument, FontPitch, Color, ParagraphStyle, Typeface, TabStopType } from '../../';

const FILEPATH = './homer-resume.fodt';

const fontName = 'FreeSans';
const highlightColor = Color.fromHex('000080');

const titleStyle = new ParagraphStyle();
titleStyle.setColor(highlightColor);
titleStyle.setFontName(fontName);
titleStyle.setFontSize(20);
titleStyle.setTypeface(Typeface.Bold);

const subTitleStyle = new ParagraphStyle();
subTitleStyle.setColor(highlightColor);
subTitleStyle.setFontName(fontName);
subTitleStyle.setFontSize(11);

const contactStyle = new ParagraphStyle();
contactStyle.setFontName(fontName);
contactStyle.setFontSize(10);
contactStyle.addTabStop(70, TabStopType.Left);

const sectionTitleStyle = new ParagraphStyle();
sectionTitleStyle.setColor(highlightColor);
sectionTitleStyle.setFontName(fontName);
sectionTitleStyle.setFontSize(14);
sectionTitleStyle.setTypeface(Typeface.Bold);

const datesStyle = new ParagraphStyle();
datesStyle.setFontName(fontName);
datesStyle.setFontSize(10);
datesStyle.setTypeface(Typeface.Bold);

const jobTitleStyle = new ParagraphStyle();
jobTitleStyle.setColor(highlightColor);
jobTitleStyle.setFontName(fontName);
jobTitleStyle.setFontSize(11);
jobTitleStyle.setTypeface(Typeface.Bold);

const companyNameStyle = new ParagraphStyle();
companyNameStyle.setFontName(fontName);
companyNameStyle.setFontSize(10);
companyNameStyle.setTypeface(Typeface.Italic);

const defaultStyle = new ParagraphStyle();
defaultStyle.setFontName(fontName);
defaultStyle.setFontSize(10);

const document = new TextDocument();

const meta = document.getMeta();
meta.setInitialCreator('Marge Simpson');
meta.setTitle('Resume of Homer Simpson');
meta.setLanguage('en-US');
meta.addKeyword('Simpson,Springfield,Resume');

document.getFontFaceDeclarations().create('FreeSans', 'FreeSans', FontPitch.Variable);

// twitter: @HomerJSimpson
const body = document.getBody();
body.addHeading('Homer Simpson')
  .setStyle(titleStyle);
body.addParagraph('Nuclear Safety Inspector')
  .setStyle(subTitleStyle);

body.addParagraph();

body.addParagraph('Address: 742 Evergreen Terrace')
  .setStyle(contactStyle)
  .addText('\n')
  .addText('Phone: 939-555-0113')
  .addText('\t')
  .addText('E-mail: ')
  .addHyperlink('chunkylover53@aol.com', 'mailto:chunkylover53@aol.com');

body.addParagraph();

body.addParagraph('Award-winning nuclear safety inspector with 20 years experience')
  .addText(', plus additional skills as snowplow driver.')
  .setStyle(defaultStyle);

body.addParagraph();

// experience
body.addHeading('Experience', 2)
  .setStyle(sectionTitleStyle);

body.addParagraph('1989 - present')
  .setStyle(datesStyle);
body.addHeading('Nuclear Safety Inspector', 3)
  .setStyle(jobTitleStyle);
body.addParagraph('Springfield Nuclear Power Plant, Springfield, USA')
  .setStyle(companyNameStyle);
const list1 = body.addList();
list1.addItem().addParagraph('Strengthened safety procedures that resulted in 75% fewer accidents on days I was absent');
list1.addItem().addParagraph('Pioneered workplace stress-reduction methods that worked for at least one employee');

body.addParagraph();

body.addParagraph('1992 - 1993')
  .setStyle(datesStyle);
body.addHeading('Owner and Chief Driver for Snow-Plowing Business', 3)
  .setStyle(jobTitleStyle);
body.addParagraph('Mr. Plow, Springfield, USA')
  .setStyle(companyNameStyle);
const list2 = body.addList();
list2.addItem().addParagraph('Boosted business 15% by executing late-night TV marketing campaign');
list2.addItem().addParagraph('Received key to the city in recognition of the achievements');

body.addParagraph();
body.addParagraph();

// education
body.addHeading('Education', 2)
  .setStyle(sectionTitleStyle);

body.addParagraph('1993-10 - present')
  .setStyle(datesStyle);
body.addHeading('Degree in Nuclear Physics, Springfield University', 3)
  .setStyle(jobTitleStyle);

body.addParagraph();

body.addParagraph('1969-10 - 1973-06')
  .setStyle(datesStyle);
body.addHeading('Springfield High School', 3)
  .setStyle(jobTitleStyle);
const list3 = body.addList();
list3.addItem().addParagraph('Graduated 4-');

body.addParagraph();
body.addParagraph();

// skills
body.addHeading('Skills', 2)
  .setStyle(sectionTitleStyle);

body.addParagraph('Songwriting - invented golden record-winning GRUNGE music style')
  .setStyle(defaultStyle);

body.addParagraph();
body.addParagraph();

// awards
body.addHeading('Awards', 2)
  .setStyle(sectionTitleStyle);

body.addParagraph('Montgomery Burns Award for Outstanding Service in the Field Excellence')
  .setStyle(defaultStyle);

document.saveFlat(FILEPATH)
  .then()
  .catch();
