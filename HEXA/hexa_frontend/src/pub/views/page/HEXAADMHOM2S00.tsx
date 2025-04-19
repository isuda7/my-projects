// 	HEXAADMHOM2S00 : 홈

import * as React from "react";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import CharthomeBar1 from "../../components/ChartHomeBar1";
import CharthomeBar2 from "../../components/ChartHomeBar2";
import CharthomeBar3 from "../../components/ChartHomeBar3";
import CharthomeBar4 from "../../components/ChartHomeBar4";
import CharthomePie from "../../components/ChartHomePie";

export default function HEXAADMHOM2S00() {
  //chart : bar1
  const chartData1 = [
    { g: "2세대", name: "GS25 아름다운미소점", value: "65" },
    { g: "2세대", name: "본도시락 문정법조타운점", value: "58" },
    { g: "1세대", name: "하이큐바이크관약점", value: "50" },
    { g: "2세대", name: "GS25 양재강남점", value: "43" },
    { g: "2세대", name: "GS25 신림관악점", value: "20" },
  ];

  //chart : pie
  const chartDatapie = [
    { value: 375, name: "1세대" },
    { value: 75, name: "2세대" },
  ];

  //chart : bar2
  const chartData2 = [
    {
      name: "1세대",
      data: [10, 14, 20, 5, 2, 14],
    },
    {
      name: "2세대",
      data: [0, 5, 4, 4, 6, 8],
    },
  ];
  const chartDataX2 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
    "10월 16일",
  ];

  //chart : bar3
  const chartData3 = [
    {
      name: "1세대",
      data: [50, 105, 81, 25, 63],
    },
    {
      name: "2세대",
      data: [30, 55, 35, 10, 15],
    },
  ];
  const chartDataX3 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
  ];

  //chart : bar4
  const chartData4 = [
    {
      name: "1세대 교환 실패",
      data: [5, 2, 10, 2, 8],
    },
    {
      name: "1세대 인증 실패",
      data: [12, 16, 11, 39, 34],
    },
    {
      name: "2세대 교환 실패",
      data: [0, 6, 1, 8, 2],
    },
    {
      name: "2세대 인증 실패",
      data: [3, 10, 5, 20, 15],
    },
  ];
  const chartDataX4 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
  ];

  //chart : bar5
  const chartData5 = [
    {
      name: "1세대",
      data: [10, 14, 20, 5, 2, 14, 10, 8],
    },
    {
      name: "2세대",
      data: [0, 5, 4, 4, 6, 8, 5, 2],
    },
  ];
  const chartDataX5 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
    "10월 16일",
    "10월 17일",
    "10월 18일",
  ];

  return (
    <>
      <div className="home">
        <div className="t-update">
          <span>업데이트 일시 2024-08-05 22:00:10</span>
          {/* [2024-11-27] 새로고침 버튼 디자인 수정 */}
          <Button fillMode="flat">
            <i className="icon icon-refresh-thin"></i>
          </Button>
        </div>
        <div className="home-row">
          {/* 스테이션 */}
          <div className="home-box type-title">
            <h2>스테이션</h2>
          </div>

          {/* 누적교환건수 순위 */}
          <div className="home-box type-ranking">
            <h3>10월 누적교환건수 순위</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-bar1">
              <ul>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">GS25 아름다운미소점</span>
                </li>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">본도시락 문정법조타운점</span>
                </li>
                <li>
                  <span className="flag-1">1세대</span>
                  <span className="tit">하이큐바이크관약점</span>
                </li>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">GS25 양재강남점</span>
                </li>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">GS25 신림관악점</span>
                </li>
              </ul>
              <CharthomeBar1 data={chartData1} />
            </div>
          </div>

          {/* 운영 현황 */}
          <div className="home-box type-situation">
            <h3>운영 현황</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-pie">
              <div className="chart-legend">
                <span className="round-g1">1세대</span>
                <span className="round-g2">2세대</span>
              </div>
              <div className="chart-total">
                <span className="tit">전체</span>
                <span className="con">450</span>
              </div>
              <CharthomePie data={chartDatapie} />
            </div>
          </div>

          {/* 일별 진단 건수 */}
          <div className="home-box type-diagnosis">
            <h3>일별 진단 건수</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-bar2">
              <CharthomeBar2 data={chartData2} dataX={chartDataX2} />
            </div>
          </div>
        </div>

        {/* 배터리 */}
        <div className="home-row">
          <div className="home-box type-title">
            <h2>배터리</h2>
          </div>

          {/* 교환 성공 */}
          <div className="home-box type-success">
            <h3>교환 성공</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-bar3">
              <CharthomeBar3 data={chartData3} dataX={chartDataX3} />
            </div>
          </div>

          {/* 교환 실패 */}
          <div className="home-box type-fail">
            <h3>교환 실패</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>

            <div className="home-chart-bar4">
              <div className="chart-legend">
                <span className="round-g1">1세대 교환실패</span>
                <span className="round-g1-1"> 1세대 인증실패</span>
                <span className="round-g2">2세대 교환실패</span>
                <span className="round-g2-1">2세대 인증실패</span>
              </div>
              <CharthomeBar4 data={chartData4} dataX={chartDataX4} />
            </div>
          </div>
        </div>

        <div className="home-row">
          {/* 통신단절 건수 */}
          <div className="home-box type-disconnection">
            <h2>통신단절 건수</h2>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>

            <div className="home-chart-bar5">
              <CharthomeBar2 data={chartData5} dataX={chartDataX5} />
            </div>
          </div>

          {/* 공지사항 */}
          <div className="home-box type-notice">
            <h2>공지사항</h2>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>

            <ul className="home-notice">
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
