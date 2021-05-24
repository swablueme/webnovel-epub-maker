# -*- coding: utf-8 -*-
import os
import io
import pypub
import re

import logging
import time

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

FILENAME="new epub.epub"
EPUBNAME=FILENAME.split(".")[0]
class retrywrapper:
    """wrapper for retrying stuff like deleting files etc"""
    @staticmethod
    def retry(func):
        def funcrun(*args, **kwargs):
            tries=5
            delay=1
            while tries > 0:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    logger.error(str(e), exc_info=True)
                    print(*args, **kwargs)
                    tries-=1
                    time.sleep(delay)
                    delay=delay*2
        return funcrun

@retrywrapper.retry
def del_file(file=FILENAME):
    #Deletes file
    if os.path.exists(file):
        os. remove(file)

#singlelined is a tuple of filenames that should be treated
#as if it has no paragraph breaks
def open_file(singlelined=()):
    #opens each file for processing
    del_file()

    #adds every .txt file not called patterns.txt as chapters in a book
    filelist=sorted([file for file in os.listdir(os.getcwd()) if file.endswith(".txt") and file!="patterns.txt"], key=extract_num)
    EPUBNAME=filelist[0]
    #creates an epub
    epub = pypub.Epub(EPUBNAME)
    for file in filelist: 
        if file in singlelined:
            #on some protected google drive docs, there are no paragraph breaks so the text is a solid wall of text
            #if singleline is true, the program will look for punctuation at the end 
            parse_file(file, singleline=True)
        else:
            parse_file(file, singleline=False)
        #creates a chapter from each .txt file
        create_epub_ch(epub, file)      
    paths=os.getcwd()
    epub.create_epub(paths)
    EPUBNAME=filelist[0]+".epub"
    return EPUBNAME


def extract_num(text):
    """extracts the chapter number to put in the Table of Contents and sorts extras"""
    #the first number found in the filename is the "chapter number"
    chapter_num=re.search('.*?(\d+)([\.-][0-9]{0,})?.*?', text, re.IGNORECASE)
    if chapter_num is not None:
        main_number=chapter_num.group(1)
        if chapter_num.group(2) is not None:
            extra_number=chapter_num.group(2)
        else:
            extra_number=""
    if "extra" in text:
        main_number="9999"+main_number
    chapter_num=main_number+extra_number
    chapter_num=chapter_num.replace("-",".")
    return float(chapter_num)

def parse_file(file, singleline=False):
    #make an output directory for cleaned .txt files
    if not os.path.exists("output"):
        os.makedirs("output")
    #cleaned .txt files have "_fixed.txt" appended to the end of the filename
    with open(os.path.join("output", file+"_fixed.txt"), "w", encoding='utf-8') as g:
        with open(file, "r", encoding='utf-8') as f:
            collector=[]
            cleaned_text=""
            for line in f:
                #replace some junk unicode
                line_spaces=line.replace(u"\u200c", "")
                #replace linebreaks
                line=line_spaces.rstrip().strip("\n\n")
                if len(line)!=0:
                    #if there is punctuation at the end of a line, count it as a "paragraph"
                    if singleline == True and re.search(r"[\.|!|?|\"|\”]\s{0,}$", line):
                        collector.append(line)
                        cleaned_text+=" ".join(collector)
                        cleaned_text+="\n\n"
                        collector=[]
                    else:
                        collector.append(line)
                else:
                    #when obtaining text from google docs, paragraphs may be broken up into
                    #individual lines, reconnect these lines if they come before two newlines
                    cleaned_text+=" ".join(collector)
                    cleaned_text+="\n\n"
                    collector=[]
            if collector:
                #if any remaining text is left in the collector, for example it's at the very
                #end of the document so there are no more two newlines to tell the program
                #to add it in, add the remaining text into the chapter
                cleaned_text+=" ".join(collector)
                cleaned_text+="\n\n"                
            cleaned_text=clean_text(cleaned_text)
            g.write(cleaned_text)
    

def create_epub_ch(epub, file):
    #pypub only accepts html, collect .txt file text and put it into html
    message="""<html>
        <head></head>
        <body>%s</body>
        </html>"""
    added_text=[]
    #from the cleaned (txt files ending in "_fixed.txt")
    with open(os.path.join("output", file+"_fixed.txt"), "r", encoding='utf-8') as f:
        for line in f.read().split('\n'):
            if line:
                text_adding="<p>"+line+"</p>"
                added_text.append(text_adding)
            
    message=message%"".join(added_text)
    #create the chapters
    chapter=pypub.create_chapter_from_string(message, url=None, title=str("%g" % extract_num(file)))
    epub.add_chapter(chapter)


def clean_text(text):
    """regex cleaning function"""
    #patterns.txt describes regex patterns and their replacement
    
    #the first line is always the pattern to be replaced
    #the second line is always the substitution
    #the third line is blank. Or it can be Capture (which tells the program
    #to replace with a captured group)
    
    #regex replacements occur in order, so the first/second/third line describes
    #the first replacement, the fourth/fifth/six line is the second replacement etc
    patterns=open("patterns.txt", "r", encoding='utf-8').read().split('\n')
    for i in range(len(patterns)//3):
        pattern=re.compile(patterns[i*3],re.DOTALL)
        if patterns[i*3+2] == "Capture":
            return re.search(pattern, text).group(1)
        else:   
            replacement= patterns[i*3+1]
            text=pattern.sub(replacement,text)
    return text

if __name__ == "__main__":          
    open_file(())

