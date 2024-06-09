# Web_Annotator
A Chrome extension that allows users to highlight text and add notes on any webpage. Annotations persist across sessions, ensuring users can revisit pages with their highlights and notes intact.
Features
Highlight Content: Select and highlight text on any webpage using customizable color-coded highlights.
Add Notes: Attach contextual notes to highlighted content to add personal insights, comments, or additional information.
Persistence: Annotations persist across browser sessions.
Customization Options: Customize highlight colors to suit your preferences.
Delete Annotations: Delete highlighted text and added notes easily.

Installation
Clone the repository
Load the extension in Chrome:
Open Chrome and navigate to chrome://extensions/
Enable "Developer mode" by toggling the switch in the top right corner
Click on "Load unpacked" and select the directory where you cloned the repository


Sure, here's a README for your GitHub repository:

Webpage Annotator Chrome Extension
A Chrome extension that allows users to highlight text and add notes on any webpage. Annotations persist across sessions, ensuring users can revisit pages with their highlights and notes intact.

Features
Highlight Content: Select and highlight text on any webpage using customizable color-coded highlights.
Add Notes: Attach contextual notes to highlighted content to add personal insights, comments, or additional information.
Persistence: Annotations persist across browser sessions.
Customization Options: Customize highlight colors to suit your preferences.
Delete Annotations: Delete highlighted text and added notes easily.
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/webpage-annotator.git
Load the extension in Chrome:

Open Chrome and navigate to chrome://extensions/
Enable "Developer mode" by toggling the switch in the top right corner
Click on "Load unpacked" and select the directory where you cloned the repository
Usage
Open the extension:

Click on the extension icon in the Chrome toolbar to open the popup.
Choose an annotation mode: Highlight or Add Note.
Select a highlight color from the color picker.
Highlight text:

Select the "Highlight" option in the popup.
Use your mouse to select text on the webpage. The selected text will be highlighted with the chosen color.
Add a note:

Select the "Add Note" option in the popup.
Click on the desired location on the webpage to add a note. Enter your note in the prompt that appears.
Delete an annotation:

Right-click on a highlighted text or note to delete it.

File Descriptions
manifest.json: Configuration file for the Chrome extension.
background.js: Background script handling persistent storage and communication.
content.js: Content script managing annotations and interactions on the webpage.
popup.html: HTML for the extension popup.
popup.js: JavaScript for the popup's functionality.
popup.css: CSS for the popup's styling.
styles.css: CSS for styling highlights and notes on the webpage.
icon.png: Icon for the Chrome extension.
