# 검색 레이어 추가 작업 내역

## 공통확인
- 수정/추가 소스 : "2026-07-09 검색추가건" 주석 표기 (HTML, JS)
- 수정/추가 파일 : 목록으로 정리
- 자세한 수정내역은 아래 내용을 확인해주세요.

## 📁 파일 목록 (수정/추가된 파일)
- `/search.html`
- `/main.html`
- `/resources/web/css/hanyang-entrance.css`
- `/resources/web/css/contents.css`
- `/resources/web/js/front_ui.js`
- `/resources/web/images/bg_srch_logo.png`
- `/resources/web/images/srch-gnb.png`
- `/resources/web/images/img_subvisual_search.png`
- `/resources/web/images/img_subvisual_search_m.png`
- `/resources/web/images/instagram-logo.png`
- `/resources/web/images/youtube-logo.png`
- 위 파일 목록 외에 다른 파일들은 UI 확인목적을 위한 파일입니다.

---
## 📄 HTML
### `/search.html`
- **[추가]** `<ul class="util">` 내 검색 돋보기 아이콘 (`id="gnbSrch"`)
- **[추가]** `<div class="header">` 하단 검색 레이어 팝업 (`class="searchlayer"`)
- **[추가]** 본문 상단 서브 비주얼 영역 (`.subvisual` 내 텍스트 및 전용 배경 이미지 적용)
- **[추가]** 본문 검색 결과 영역 (`.page-search` 및 `.totalcnt-schbox2` 레이아웃 구성)
- **[추가]** 검색 결과 게시판 리스트 (`.board-listgroup` 영역 구조 반영)
> *참고: 소스 내 `<!-- 2026-07-08 검색추가건` 및 `<!-- 2026-07-09 검색추가건` 주석 표기*

---
## 🎨 CSS
### `/resources/web/css/hanyang-entrance.css`
- **[추가]** `.header .search-layer` (검색 레이어 전체 디자인)
- **[추가]** `.header.searchOpen` (레이어 오픈 시 기타 유틸 아이콘 숨김)
- **[수정]** `.header .btn-allmenu` (기존 유지보수가 어렵게 처리된 부분. 코드 단순화)
- **[추가]** `.search-dim`, `.search-dim.active` (팝업 뒷배경 딤 처리 및 페이드 인/아웃 효과)
- **[추가]** `@media only screen and (max-width:1023px)` 내부 모바일용 `.search-layer` 및 폼 영역 반응형 스타일 추가

### `/resources/web/css/contents.css`
- **[추가]** `body#apply` (신규 페이지에 대한 페이지 스타일 추가)

---
## ⚙️ JavaScript
### `/resources/web/js/front_ui.js`
- **[수정]** `allmenuToggle: function()` (검색 레이어가 열려있을 때 닫아주는 예외 분기 로직 추가)
- **[추가]** `searchToggle: function()` (검색 레이어 열림/닫힘 토글 및 딤 레이어 동적 생성, 페이드 효과 연동)

---
## 🖼️ 이미지 (Images)
### [추가됨] (Untracked)
- `/resources/web/images/bg_srch_logo.png` (검색 레이어 배경 로고)
- `/resources/web/images/srch-gnb.png` (GNB 돋보기 아이콘)
- `/resources/web/images/img_subvisual_search.png` (서브 비주얼 배경 피시용)
- `/resources/web/images/img_subvisual_search_m.png` (서브 비주얼 배경 모바일용)

### [수정됨] (Modified)
- `/resources/web/images/instagram-logo.png` (GNB 인스타그램 아이콘)
- `/resources/web/images/youtube-logo.png` (GNB 유튜브 아이콘)
