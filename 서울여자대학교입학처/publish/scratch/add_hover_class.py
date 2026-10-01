with open('main.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('class="info_banner_card"', 'class="info_banner_card is-hover"')

with open('main.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Applied is-hover class!")
