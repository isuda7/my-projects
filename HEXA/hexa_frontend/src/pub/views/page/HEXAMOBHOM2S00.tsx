// HEXAMOBHOM2S00 : 홈(대시보드)

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";

export default function HEXAMOBHOM2S00() {
  // 검색 시 스크롤 이동 위치
  const scrollToTop = () => {
    const pos = document.querySelector("#searchPos") as HTMLElement;
    const top = pos.offsetTop;
    window.scrollTo({
      top: top - 70,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="m-header">
        <div className="m-logo">
          <a href="">
            <h1 className="sr-only">KooRoo Hexa</h1>
          </a>
        </div>
        <div className="m-lang-btn">
          <Button size={"small"} fillMode="flat">
            한국어
          </Button>
        </div>

        <div className="m-logout">
          <Button size={"small"} fillMode="flat">
            <span className="sr-only">로그아웃</span>
          </Button>
        </div>
      </header>

      <div className="m-content">
        <h2 className="m-t-header">Dashboard</h2>

        <section className="section">
          {/* 1세대 */}
          <div className="m-box">
            <span className="flag-1">1세대</span>
            <div className="card-exchange">
              <div role="button" className="m-btn-box">
                <div className="tit">
                  <span className="mark-lock">전체잠금</span>
                </div>
                <div className="con">47</div>
              </div>
              <div role="button" className="m-btn-box">
                <div className="tit">
                  <span className="mark-error">오류발생</span>
                </div>
                <div className="con">2</div>
              </div>
            </div>
          </div>

          {/* 2세대 */}
          <div className="m-box">
            <span className="flag-2">2세대</span>
            <div className="card-exchange">
              <div role="button" className="m-btn-box">
                <div className="tit">
                  <span className="mark-lock">전체잠금</span>
                </div>
                <div className="con">47</div>
              </div>
              <div role="button" className="m-btn-box">
                <div className="tit">
                  <span className="mark-error">오류발생</span>
                </div>
                <div className="con">2</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section mt2">
          <h3 className="m-t-title" id="searchPos">
            Search
          </h3>

          <div className="m-search-group">
            <div className="in-select-btn">
              <Button size={"small"} fillMode="flat">
                전체
              </Button>
            </div>
            <div className="in-select-btn">
              <Button size={"small"} fillMode="flat">
                전체
              </Button>
            </div>
            <div className="inner-item type-icon">
              <Input placeholder="검색어를 입력해주세요." />
              <Button
                size={"small"}
                fillMode="flat"
                className="btn-icon"
                onClick={scrollToTop}
              >
                <i className="icon icon-glass"></i>
              </Button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sort-group type-dark">
            <div className="sort-group__counter">
              <span className="total">
                전체 <span> 100</span>
              </span>
            </div>
          </div>
          <div className="m-list">
            <ul>
              <li role="button">
                <div className="part-1">
                  <span className="flag-1">1</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-1">1</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 강남 세곡점</span>
                  <span>서울시 강남구 강남대로 382</span>
                </div>
                <div className="part-3">
                  <strong>14 </strong> / 30
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
