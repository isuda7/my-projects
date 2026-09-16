with open('main.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('class="info_banner_card is-hover"', 'class="info_banner_card"')

with open('main.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Reverted is-hover class cleanly!")
