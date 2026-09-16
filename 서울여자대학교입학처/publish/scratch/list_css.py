import re

with open('main.html', encoding='utf-8') as f:
    text = f.read()

links = re.findall(r'<link[^>]*rel=[\"\']stylesheet[\"\'][^>]*>', text)
for l in links:
    print(l)
