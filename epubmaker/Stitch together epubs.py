import epubmaker
import epubmerge
import os

<<<<<<< HEAD
=======
#merges together epubs in a directory in accordance with the regex extracted number from each epub
>>>>>>> 52501bce83f8e36dc63cc4aee3ea5d3c46d12ee1
def stitchepubs():
    filelist=sorted([file for file in os.listdir(os.getcwd()) if file.endswith(".epub")], key=epubmaker.extract_num)
    epubmerge.doMerge("book.epub", filelist, flattentoc=True)
stitchepubs()
