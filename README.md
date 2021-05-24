# webnovel-epub-makerwebnovel-epub-maker
Three scripts to assist in creating epubs from the web from webpages and webnovels

## Extract text from websites
A Google Chrome extension useful for extracting text from protected google doc files or for simple webpage downloads as .txt It saves the `document.body.innerText` variable as a .txt document. For Google Docs use, you need to scroll through the whole page first for it to be able to extract text. Click the extension icon to save the .txt file.

## Extract websites ignoring selectors
A python scraper which utilises BeautifulSoup4 to ignore elements within a webpage that can introduce garbage data and downloads text as .txt Customise ignored elements by editing line 24.

##  epubmaker
Uses the python3 compatible version of pypub3 by imgurbot12 https://github.com/imgurbot12/pypub/tree/feat/py3 to stitch together gathered .txt files in the parent directory as an epub. It attempts to extract the first consecutive series of numbers it sees as the chapter number and organises chapters in the Table of Contents of the epub based upon this. This script uses a `patterns.txt` file to specify quick regex replacements for text cleaning. The `open_file` function accepts a tuple of filenames for which linebreaks are broken. For example

> This might be
> a paragraph in the
> extracted text.

The singlineline parameter in `parse_file` attempts to establish the end of a paragraph based upon punctuation such as fullstops in order to produce a nicely formatted epub. So in the above example, it would be one line instead of three, if the name of the .txt file with this problem is put in as an argument.
