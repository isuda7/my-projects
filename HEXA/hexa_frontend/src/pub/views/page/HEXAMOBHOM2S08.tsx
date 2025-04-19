// HEXAMOBHOM2S08 : 스테이션 목록

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAMOBHOM2S08() {
  return (
    <>
      <header className="m-header">
        <div className="m-prev">
          <Button size={"small"} fillMode="flat">
            <span className="sr-only">이전화면으로 이동</span>
          </Button>
        </div>

        <h1 className="m-title">스테이션 목록</h1>
      </header>

      <div className="m-content">
        <section className="section mt1.5">
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
            <div className="in-select-btn">
              <Button size={"small"} fillMode="flat">
                전체잠금
              </Button>
            </div>
            <div className="inner-item type-icon">
              <Input placeholder="검색어를 입력해주세요." />
              <Button size={"small"} fillMode="flat" className="btn-icon">
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
                  <span className="state-lock">전체잠금</span>
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
                  <span className="state-error">오류발생</span>
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
                  <span className="state-lock">전체잠금</span>
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
                  <span className="state-lock">전체잠금</span>
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
                  <span className="state-lock">전체잠금</span>
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
                  <span className="state-lock">전체잠금</span>
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
                  <span className="state-lock">전체잠금</span>
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
                  <span className="state-lock">전체잠금</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
