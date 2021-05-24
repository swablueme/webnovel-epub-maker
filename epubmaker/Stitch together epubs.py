import epubmaker
import epubmerge
import os

#merges together epubs in a directory in accordance with the regex extracted number from each epub
def stitchepubs():
    filelist=sorted([file for file in os.listdir(os.getcwd()) if file.endswith(".epub")], key=epubmaker.extract_num)
    epubmerge.doMerge("book.epub", filelist, flattentoc=True)
stitchepubs()
