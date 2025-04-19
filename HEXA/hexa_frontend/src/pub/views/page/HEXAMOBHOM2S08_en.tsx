// HEXAMOBHOM2S08 : 스테이션 목록 en

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAMOBHOM2S08() {
  React.useEffect(() => {
    document.documentElement.lang = "en"; // 퍼블 확인용
  }, []);

  return (
    <>
      <header className="m-header">
        <div className="m-prev">
          <Button size={"small"} fillMode="flat">
            <span className="sr-only">이전화면으로 이동</span>
          </Button>
        </div>

        <h1 className="m-title">Station List</h1>
      </header>

      <div className="m-content">
        <section className="section mt1.5">
          <div className="m-search-group">
            <div className="in-select-btn">
              <Button size={"small"} fillMode="flat">
                All
              </Button>
            </div>
            <div className="in-select-btn">
              <Button size={"small"} fillMode="flat">
                All
              </Button>
            </div>
            <div className="in-select-btn">
              <Button size={"small"} fillMode="flat">
                Fully Locked
              </Button>
            </div>
            <div className="inner-item type-icon">
              <Input placeholder="Please enter a search term." />
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
                All <span> 100</span>
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
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-1">1</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-error">Error Occurred</span>
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>

              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>
              <li role="button">
                <div className="part-1">
                  <span className="flag-2">2</span>
                </div>
                <div className="part-2">
                  <span className="txt-bold">GS25 Gangnam Segok Branch</span>
                  <span>382 Gangnam-daero, Gangnam-gu, Seoul</span>
                </div>
                <div className="part-3">
                  <span className="state-lock">Fully Locked</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
