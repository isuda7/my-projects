import urllib.request
import json

# Let's inspect CSS files for any min-width or width: 1000px/1200px
css_path = r"c:\Workspace\My\my-projects\서울여자대학교입학처\publish\theme\swu\css\main.css"
with open(css_path, "r", encoding="utf-8", errors="ignore") as f:
    css_text = f.read()

import re
# Find occurrences of width: 1...px or min-width: 1...px
matches = re.findall(r'([^{}]*)\{([^}]*(?:min-width|width)\s*:\s*(?:1[0-9]{3}|[7-9][0-9]{2})px[^}]*)\}', css_text)
print(f"Found {len(matches)} large width rules in main.css:")
for sel, body in matches[:15]:
    print(f"Selector: {sel.strip()[:60]} -> {body.strip()[:60]}")
