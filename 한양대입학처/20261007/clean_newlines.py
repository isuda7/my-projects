import os

file_path = r'c:\workspace\My\my-projects\한양대입학처\20261007\main.html'

# Detect encoding
encodings_to_try = ['utf-8', 'cp949', 'euc-kr']
content = None
used_enc = None

for enc in encodings_to_try:
    try:
        with open(file_path, 'r', encoding=enc) as f:
            content = f.read()
            used_enc = enc
            break
    except UnicodeDecodeError:
        continue

if content is None:
    print("Could not read file with known encodings.")
    exit(1)

print(f"Read file using encoding: {used_enc}")

lines = content.splitlines()
new_lines = []
blank_count = 0

for line in lines:
    if line.strip() == '':
        blank_count += 1
        if blank_count <= 1:
            new_lines.append(line) # Keep the original whitespace if it's the first blank
    else:
        blank_count = 0
        new_lines.append(line)

with open(file_path, 'w', encoding=used_enc, newline='') as f:
    f.write('\n'.join(new_lines) + '\n')

print("Cleaned up excessive blank lines.")
