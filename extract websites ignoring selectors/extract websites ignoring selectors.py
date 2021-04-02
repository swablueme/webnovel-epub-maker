import requests
from bs4 import BeautifulSoup
import os
requests.packages.urllib3.disable_warnings()

baseurl="https://page.torip/lm-%s/"
pagerange=(1,90)


def extractText(pagerange):
    """Using a useragent, extract website text ignoring garbage elements"""
    s = requests.session()
    h={}
    h['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    s.headers.update(h)


    if not os.path.exists("output"):
        os.makedirs("output")

    for i in range(pagerange[0],pagerange[1]):
        r=s.get(baseurl%str(i), verify=False)
        soup = BeautifulSoup(r.text, 'html.parser')
        for element in ["h3", "script", "span", "a", "ins",
                        "[style*='height:1px;width:0;overflow:hidden;display:inline-block']",
                        "div[data-fuse]"]:
            for ele in soup.select(element):
                    ele.extract()
            ch_text=soup.get_text(separator="\n")
        with open(os.path.join("output", str(i)+".txt"), "w", encoding='utf-8') as g:
            g.write(ch_text)

extractText(pagerange)



