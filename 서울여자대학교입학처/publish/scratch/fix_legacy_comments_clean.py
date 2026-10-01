import re

file_path = r"c:\Workspace\My\my-projects\서울여자대학교입학처\publish\main.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Find start of legacy comment: right after renewal script
script_end_tag = "/* =================== E: 2026 m_board renewal script =================== */\n    </script>"
s_pos = text.find(script_end_tag)
if s_pos == -1:
    script_end_tag = "</script>"
    # find </script> after renewal
    r_idx = text.find("2026 m_board renewal")
    s_pos = text.find("</script>", r_idx)
    s_pos += len("</script>")
else:
    s_pos += len(script_end_tag)

# Find end of m_board: </section> before <section id="m8">
m8_pos = text.find('<section id="m8">')
m_board_close_pos = text.rfind('</section>', s_pos, m8_pos)

legacy_raw = text[s_pos:m_board_close_pos]

# Clean up legacy_raw by stripping out whatever broken comment tags were there before
# Remove any existing [기존 m_board 소스 보존...] headers/footers
legacy_cleaned = re.sub(r'<!?--?\s*=+\s*\[[^\]]*m_board[^\]]*\]\s*=+--?>?', '', legacy_raw)

# Now escape any internal '-->' so they don't break HTML comment
legacy_escaped = legacy_cleaned.replace('-->', '-- >')

wrapped_legacy = f"""
    <!-- =================== [기존 m_board 소스 보존 시작] ===================
{legacy_escaped.strip()}
    =================== [기존 m_board 소스 보존 끝] =================== -->
"""

new_text = text[:s_pos] + "\n" + wrapped_legacy + "\n" + text[m_board_close_pos:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_text)

print("Successfully wrapped legacy m_board code in comments!")
