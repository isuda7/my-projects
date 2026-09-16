import re

with open('main.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="m_board"')
idx2 = text.find('</section>', idx)
m_board_html = text[idx:idx2+10]

print('Total length:', len(m_board_html))
for m in re.finditer(r'(<!--|-->)', m_board_html):
    start = max(0, m.start() - 40)
    end = min(len(m_board_html), m.end() + 40)
    snippet = m_board_html[start:end].replace('\n', ' ')
    print(f"{m.group()} at pos {m.start()}: {snippet}")
