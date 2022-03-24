import epubmaker
import epubmerge
import os

def stitchepubs():
    filelist=sorted([file for file in os.listdir(os.getcwd()) if file.endswith(".epub")], key=epubmaker.extract_num)
    epubmerge.doMerge("book.epub", filelist, flattentoc=True)
stitchepubs()
