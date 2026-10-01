with open(r"c:\Workspace\My\my-projects\서울여자대학교입학처\publish\theme\swu\css\main.css", "r", encoding="utf-8") as f:
    content = f.read()

s_marker = "/* =================== S: 2026 m_board renewal =================== */"
s_pos = content.find(s_marker)
if s_pos != -1:
    content = content[:s_pos].rstrip()

new_renewal_css = """/* =================== S: 2026 m_board renewal =================== */
#m_board {
  position: relative;
  width: 100%;
  padding: 60px 0 70px;
  background: linear-gradient(105deg, #fedada 0%, #e0ecfd 45%, #bce3fe 100%);
  overflow: hidden;
  margin-top: 0 !important;
}

#m_board::before {
  content: '';
  position: absolute;
  left: 1%;
  bottom: -20px;
  width: 320px;
  height: 270px;
  background: url('../img/main/m_board_seal.png') no-repeat left bottom;
  background-size: contain;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
}

.m_board_renewal {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.m_board_inner {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  box-sizing: border-box;
}

/* --- 좌측 탭 메뉴 --- */
.m_board_tabs {
  flex: 0 0 150px;
  padding-top: 36px;
}

.m_board_tabs .tab_list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.m_board_tabs .tab_btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  letter-spacing: -0.03em;
  white-space: nowrap;
}

.m_board_tabs .tab_btn .ico_dia {
  display: none;
  font-size: 10px;
  color: #a63435;
  line-height: 1;
}

.m_board_tabs .tab_item.active .tab_btn {
  color: #a63435;
  text-shadow: none;
}

.m_board_tabs .tab_item.active .tab_btn .ico_dia {
  display: inline-block;
}

.m_board_tabs .tab_btn:hover {
  color: #a63435;
  transform: translateX(3px);
}

/* --- 메인 콘텐츠 영역 --- */
.m_board_main {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.m_board_sec {
  margin-bottom: 28px;
  width: 100%;
  box-sizing: border-box;
}

.m_board_sec:last-child {
  margin-bottom: 0;
}

.sec_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  width: 100%;
  box-sizing: border-box;
}

.sec_title {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.03em;
  margin: 0;
}

.btn_more_notice {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 15px;
  background: #fff;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #222;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid transparent;
  flex-shrink: 0;
}

.btn_more_notice .ico_plus {
  color: #a63435;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  transition: color 0.25s ease;
}

.btn_more_notice:hover {
  background: #a63435;
  color: #fff;
  box-shadow: 0 4px 12px rgba(166, 52, 53, 0.35);
}

.btn_more_notice:hover .ico_plus {
  color: #fff;
}

/* --- 공지사항 슬라이더 --- */
.notice_slider_wrap {
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.notice_swiper {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 4px 2px;
  box-sizing: border-box;
}

.notice_card {
  display: block;
  position: relative;
  height: 175px;
  background: #fff;
  text-decoration: none;
  box-sizing: border-box;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #9e2a2b;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}

.notice_card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.notice_card .card_content {
  padding: 22px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.notice_card .card_title {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  line-height: 1.45;
  letter-spacing: -0.03em;
  word-break: keep-all;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notice_card .card_date {
  font-size: 13px;
  color: #999;
  font-weight: 400;
}

/* 카드 1 (대표 공지 - 와인레드) */
.notice_card.card_featured {
  background: #9e2a2b;
  border-top: none;
}

.notice_card.card_featured .card_title {
  color: #fff;
}

.notice_card.card_featured .card_date {
  color: rgba(255, 255, 255, 0.75);
}

.notice_card.card_featured .card_watermark {
  position: absolute;
  right: -5px;
  bottom: -15px;
  font-family: 'Montserrat', serif;
  font-size: 100px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.12);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.05em;
}

/* 슬라이더 하단 컨트롤 (프로그레스바 + 버튼) */
.notice_controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.notice_pagination.swiper-pagination-progressbar {
  position: relative;
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 2px;
  overflow: hidden;
  top: auto;
  left: auto;
  width: auto;
}

.notice_pagination .swiper-pagination-progressbar-fill {
  background: #000;
  height: 100%;
}

.notice_nav_btns {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.notice_nav_btns button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 0;
}

.notice_nav_btns .swiper-btn-prev {
  background: rgba(255, 255, 255, 0.65);
  color: #555;
}

.notice_nav_btns .swiper-btn-prev:hover,
.notice_nav_btns .swiper-btn-next:hover {
  background: #7e8d9b;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* --- 주요정보 섹션 --- */
.info_grid {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

.info_banner_card {
  flex: 0 0 30%;
  position: relative;
  height: 95px;
  text-decoration: none;
  display: block;
  overflow: hidden;
  transition: filter 0.25s ease;
}

.info_banner_card .banner_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info_banner_card:hover {
  filter: brightness(1.06);
}

.info_quick_group {
  flex: 1;
  display: flex;
  background: #1e385b;
}

.quick_card {
  flex: 1;
  height: 95px;
  padding: 16px 18px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  text-decoration: none;
  background: #1e385b;
  transition: background 0.25s ease;
}

.quick_card .card_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quick_card .card_name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
}

.quick_card .card_icon {
  color: #fff;
  display: inline-flex;
  align-items: center;
}

.quick_card .icon_naver_blog {
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 1;
}

.quick_card .icon_naver_blog b {
  font-size: 19px;
}

.quick_card .icon_naver_blog i {
  font-style: normal;
  font-weight: 300;
  margin-left: 1px;
}

.quick_card .btn_arrow_circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

/* Quick Card Hover Effect (시안 2) */
.quick_card:hover {
  background: #17283c;
}

.quick_card:hover .btn_arrow_circle {
  background: #fff;
  color: #17283c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* --- 반응형 (태블릿 & 모바일) --- */
@media (max-width: 1024px) {
  .m_board_inner {
    gap: 30px;
  }
  .m_board_tabs {
    flex: 0 0 130px;
  }
  .m_board_tabs .tab_btn {
    font-size: 17px;
  }
}

@media (max-width: 720px) {
  #m_board {
    padding: 30px 0 40px;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
  }
  .m_board_renewal {
    padding: 0 16px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .m_board_inner {
    flex-direction: column;
    gap: 18px;
    width: 100%;
    box-sizing: border-box;
  }
  .m_board_tabs {
    width: 100%;
    max-width: 100%;
    flex: none;
    padding-top: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.45);
    padding-bottom: 10px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }
  .m_board_tabs::-webkit-scrollbar {
    display: none;
  }
  .m_board_tabs .tab_list {
    flex-direction: row;
    gap: 16px;
    white-space: nowrap;
  }
  .m_board_tabs .tab_btn {
    font-size: 16px;
    text-shadow: none;
  }

  .m_board_main {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  /* 모바일에서 카드 1은 흰색 카드로 전환 (모바일 시안 준수) */
  .notice_card.card_featured {
    background: #fff;
    border-top: 3px solid #9e2a2b;
  }
  .notice_card.card_featured .card_title {
    color: #111;
  }
  .notice_card.card_featured .card_date {
    color: #999;
  }
  .notice_card.card_featured .card_watermark {
    display: none;
  }

  .sec_header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sec_title {
    font-size: 18px;
  }
  .btn_more_notice {
    font-size: 12px;
    padding: 4px 12px;
  }

  .notice_controls {
    margin-top: 14px;
    width: 100%;
  }
  .notice_nav_btns {
    display: none;
  }

  .info_grid {
    flex-direction: column;
    box-shadow: none;
    width: 100%;
  }
  .info_banner_card {
    flex: none;
    width: 100%;
    height: auto;
    max-height: 85px;
    margin-bottom: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }
  .info_banner_card .banner_img {
    height: auto;
  }
  .info_quick_group {
    flex-direction: column;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    width: 100%;
  }
  .quick_card {
    flex: none;
    width: 100%;
    height: 52px;
    padding: 0 16px;
    flex-direction: row;
    align-items: center;
    border-left: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
  }
  .quick_card:last-child {
    border-bottom: none;
  }
  .quick_card .card_head {
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
  }
  .quick_card .card_head .card_icon {
    order: 1;
  }
  .quick_card .card_head .card_name {
    order: 2;
  }
  .quick_card .btn_arrow_circle {
    margin-left: auto;
  }
}
/* =================== E: 2026 m_board renewal =================== */
"""

content = content + "\n\n" + new_renewal_css
with open(r"c:\Workspace\My\my-projects\서울여자대학교입학처\publish\theme\swu\css\main.css", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated main.css successfully!")
