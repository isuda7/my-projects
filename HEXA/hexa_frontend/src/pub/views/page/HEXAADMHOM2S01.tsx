// 	HEXAADMHOM2S01 : 대시보드

import * as React from "react";
import { Link } from "react-router-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import SliderDashbard from "../../components/SliderDashboard.tsx";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";

const sampleProducts = [
  {
    generation: "1세대",
    Address: "GS25 아름다운 미소점/서울특별시 영등포구",
    State: "정상",
    Possible: "14/30",
  },
  {
    generation: "2세대",
    Address: "본도시락 문정법조타운점/서울특별시 영등포구",
    State: "교환불가",
    Possible: "14/30",
  },
  {
    generation: "2세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "오류발생",
    Possible: "14/30",
  },
  {
    generation: "1세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "전체잠금",
    Possible: "14/30",
  },
  {
    generation: "2세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "통신단절",
    Possible: "14/30",
  },
  {
    generation: "2세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "교환불가",
    Possible: "14/30",
  },
  {
    generation: "2세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "오류발생",
    Possible: "14/30",
  },
  {
    generation: "1세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "전체잠금",
    Possible: "14/30",
  },
  {
    generation: "2세대",
    Address: "GS25 강남점/서울특별시 영등포구",
    State: "통신단절",
    Possible: "14/30",
  },
];

export default function HEXAADMHOM2S01() {
  React.useEffect(() => {
    document.body.classList.add("dark");

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

  // 윈도우 팝업 사이즈
  const width = 1710;
  const height = 1038;

  //slider
  const dataImg = [
    {
      ImgName: "잠금",
      ImgStyle: "lock",
    },
    {
      ImgName: "업데이트 중",
      ImgStyle: "updating",
    },
    {
      ImgName: "교환 중",
      ImgStyle: "exchanging",
    },
    {
      ImgName: "교환 가능",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "충전 중",
      ImgStyle: "charging",
    },
    {
      ImgName: "예약 중",
      ImgStyle: "reservation",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "잠금",
      ImgStyle: "lock",
    },
    {
      ImgName: "교환 중",
      ImgStyle: "exchanging",
    },
    {
      ImgName: "교환 가능",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "충전 중",
      ImgStyle: "charging",
    },
    {
      ImgName: "예약 중",
      ImgStyle: "reservation",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "잠금",
      ImgStyle: "lock",
    },
    {
      ImgName: "교환 중",
      ImgStyle: "exchanging",
    },
    {
      ImgName: "교환 가능",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "충전 중",
      ImgStyle: "charging",
    },
    {
      ImgName: "예약 중",
      ImgStyle: "reservation",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "빈 슬롯",
      ImgStyle: "blank",
    },
    {
      ImgName: "교환 가능",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "충전 중 ",
      ImgStyle: "charging",
    },
    {
      ImgName: "예약 중",
      ImgStyle: "reservation",
    },
  ];

  //sort
  const initialSort: Array<SortDescriptor> = [
    { field: "Possible", dir: "asc" },
  ];
  const [sort, setSort] = React.useState(initialSort);

  const CustomCellGeneration = (props: any) => {
    const str = props.children;
    const gen = str.charAt(0);
    {
      /*
      class='flag-1' 1세대
      class='flag-2' 2세대
    */
    }
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={`flag-${gen}`}>{props.children}</span>
      </td>
    );
  };

  const CustomCellAddress = (props: any) => {
    const str = props.children;
    const words = str.split("/");
    const wordlist = words.map((item: any, i: any) => <p key={i}>{item}</p>);
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <div className="list-address">{wordlist}</div>
      </td>
    );
  };

  const CustomCellState = (props: any) => {
    const str = props.children;
    let style = "";

    switch (str) {
      case "정상":
        style = "mark-normal";
        break;

      case "교환불가":
        style = "mark-unable";
        break;

      case "오류발생":
        style = "mark-error";
        break;

      case "전체잠금":
        style = "mark-lock";
        break;

      case "통신단절":
        style = "mark-disconnection";
        break;
    }
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={style}>{props.children}</span>
      </td>
    );
  };

  const CustomCellPossible = (props: any) => {
    const str = props.children;
    const words = str.split("/");
    const wordlist = words.map((item: any, i: any) => (
      <span key={i}>{item}</span>
    ));
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="list-possible">{wordlist}</div>
      </td>
    );
  };

  return (
    <>
      <div className="dashboard">
        <div className="breadcrumbs">
          <span>홈</span>
          <span>대시보드</span>
        </div>

        <div className="head-group">
          <h2 className="t-header">Dashboard</h2>
        </div>

        <div className="dashboard-box">
          <div className="dashboard-row">
            <div className="t-update">업데이트 일시 2024-08-05 22:00:10</div>
          </div>

          <div className="dashboard-row">
            {/* 1세대 */}
            <div className="box type-card">
              <div className="type-card-title">
                <h3>
                  first generation
                  <span className="flag-1">1세대</span>
                </h3>
              </div>

              <div className="type-card-01">
                <div className="card-exchange">
                  <h4>1세대 스테이션</h4>
                  <div className="row">
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-register">등록</span>
                        </dt>
                        <dd>416</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-operation">운영</span>
                        </dt>
                        <dd>375</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-exchangeable">교환가능</span>
                        </dt>
                        <dd>342</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-exchanging">교환중</span>
                        </dt>
                        <dd>
                          <Link to="/">342</Link>
                        </dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-lock">전체잠금</span>
                        </dt>
                        <dd>
                          <Link to="/">33</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-unable">교환불가</span>
                        </dt>
                        <dd>
                          <Link to="/">32</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-error">오류발생</span>
                        </dt>
                        <dd>
                          <Link to="/">21</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-disconnection">통신단절</span>
                        </dt>
                        <dd>
                          <Link to="/">3</Link>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="card-battery">
                  <h4>1세대 배터리</h4>
                  <dl>
                    <div>
                      <dt>
                        <span className="mark-operation">운영</span>
                      </dt>
                      <dd>3,007</dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-lock">잠금</span>
                      </dt>
                      <dd>
                        <Link to="/">32</Link>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-reservation">예약</span>
                      </dt>
                      <dd>
                        <Link to="/">0</Link>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="type-card-02">
                <h4>교환 횟수</h4>
                <dl>
                  <div>
                    <dt>금일</dt>
                    <dd>86</dd>
                  </div>
                  <div>
                    <dt>전일</dt>
                    <dd>538</dd>
                  </div>
                  <div>
                    <dt>전체</dt>
                    <dd>160,520</dd>
                  </div>
                </dl>
              </div>

              <div className="type-card-03">
                <dl>
                  <div>
                    <dt>
                      진단 <br />
                      스테이션
                    </dt>
                    <dd>
                      <Link to="/">18</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      진단 <br />
                      배터리
                    </dt>
                    <dd>
                      <Link to="/">1,000</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      전기스쿠터
                      <br />
                      (운영, 운행중)
                    </dt>
                    <dd>
                      <span>1,500</span>
                      <span>1,500</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* 2세대 */}
            <div className="box type-card">
              <div className="type-card-title">
                <h3>
                  Second generation
                  <span className="flag-2">2세대</span>
                </h3>
              </div>

              <div className="type-card-01">
                <div className="card-exchange">
                  <h4>2세대 스테이션</h4>
                  <div className="row">
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-register">등록</span>
                        </dt>
                        <dd>416</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-operation">운영</span>
                        </dt>
                        <dd>375</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-exchangeable">교환가능</span>
                        </dt>
                        <dd>342</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-lock">전체잠금</span>
                        </dt>
                        <dd>
                          <Link to="/">33</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-unable">교환불가</span>
                        </dt>
                        <dd>
                          <Link to="/">32</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-error">오류발생</span>
                        </dt>
                        <dd>
                          <Link to="/">21</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-disconnection">통신단절</span>
                        </dt>
                        <dd>
                          <Link to="/">3</Link>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="card-battery">
                  <h4>2세대 배터리</h4>
                  <dl>
                    <div>
                      <dt>
                        <span className="mark-operation">운영</span>
                      </dt>
                      <dd>3,007</dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-lock">잠금</span>
                      </dt>
                      <dd>
                        <Link to="/">32</Link>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-reservation">예약</span>
                      </dt>
                      <dd>
                        <Link to="/">1</Link>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="type-card-02">
                <h4>교환 횟수</h4>
                <dl>
                  <div>
                    <dt>금일</dt>
                    <dd>86</dd>
                  </div>
                  <div>
                    <dt>전일</dt>
                    <dd>538</dd>
                  </div>
                  <div>
                    <dt>전체</dt>
                    <dd>160,520</dd>
                  </div>
                </dl>
              </div>

              <div className="type-card-03">
                <dl>
                  <div>
                    <dt>
                      진단 <br />
                      스테이션
                    </dt>
                    <dd>
                      <Link to="/">18</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      진단 <br />
                      배터리
                    </dt>
                    <dd>
                      <Link to="/">25</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      전기스쿠터
                      <br />
                      (운영, 운행중)
                    </dt>
                    <dd>
                      <span>1,500</span>
                      <span>1,500</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* 목록 */}
            <div className="box type-list">
              <div className="type-list-search">
                <DropDownList
                  defaultValue={"전체"}
                  className="w150"
                  data={["서울특별시", "인천광역시", "부산광역시", "경기도"]}
                />
                <DropDownList defaultValue={"전체"} className="w150" />
                <div className="inner-item type-icon">
                  <Input placeholder="검색어를 입력하세요." />
                  <Button size={"small"} fillMode="flat" className="btn-icon">
                    <i className="icon icon-glass"></i>
                  </Button>
                </div>
              </div>

              <div className="sort-group type-dark">
                <div className="sort-group__counter">
                  <span className="total">
                    전체 <span> 36</span>
                  </span>
                </div>
              </div>

              <div className="grid-dark">
                <Grid
                  style={{ height: "400px" }}
                  data={sampleProducts}
                  scrollable="scrollable"
                  sortable={true}
                  sort={sort}
                  onSortChange={(e: GridSortChangeEvent) => {
                    setSort(e.sort);
                  }}
                >
                  <Column
                    field="generation"
                    title="세대"
                    width="80"
                    cells={{
                      data: CustomCellGeneration,
                    }}
                  />
                  <Column
                    field="Address"
                    title="스테이션명"
                    width="200"
                    cells={{
                      data: CustomCellAddress,
                    }}
                  />
                  <Column
                    field="State"
                    title="상태"
                    width="120"
                    cells={{
                      data: CustomCellState,
                    }}
                  />
                  <Column
                    field="Possible"
                    title="교환가능"
                    width="90"
                    cells={{
                      data: CustomCellPossible,
                    }}
                  />
                </Grid>
              </div>
            </div>

            {/* 지도 */}
            <div className="box type-map">
              <div className="type-map-state">교환 가능 / 전체</div>
              <div className="map-area">
                <div className="map-head">
                  <span className="type-1" role="button">
                    1세대
                  </span>
                  <span className="type-2" role="button">
                    2세대
                  </span>
                </div>

                <div
                  style={{
                    float: "left",
                    marginTop: "60px",
                    marginLeft: "60px",
                  }}
                >
                  {/* 1세대 */}
                  {/* 상태 : 정상 활성화 is-active 추가 */}
                  <div className="custom-marker g-1 state-normal is-active">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">정상</p>
                  </div>

                  <br />

                  {/* 상태 : 교환불가 */}
                  <div className="custom-marker g-1 state-unable">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">교환불가</p>
                  </div>

                  <br />

                  {/* 상태 : 오류발생 */}
                  <div className="custom-marker g-1 state-error">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">오류발생</p>
                  </div>

                  <br />

                  {/* 상태 : 전체잠금 */}
                  <div className="custom-marker g-1 state-lock">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">전체잠금</p>
                  </div>

                  <br />

                  {/* 상태 : 통신단절 */}
                  <div className="custom-marker g-1 state-disconnection">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">통신단절</p>
                  </div>
                </div>

                <div
                  style={{
                    float: "left",
                    marginTop: "60px",
                    marginLeft: "30px",
                  }}
                >
                  {/* 2세대 */}
                  {/* 상태 : 정상 */}
                  <div className="custom-marker g-2 state-normal">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">정상</p>
                  </div>

                  <br />

                  {/* 상태 : 교환불가 */}
                  <div className="custom-marker g-2 state-unable">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">교환불가</p>
                  </div>

                  <br />

                  {/* 상태 : 오류발생 */}
                  <div className="custom-marker g-2 state-error">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">오류발생</p>
                  </div>

                  <br />

                  {/* 상태 : 전체잠금 */}
                  <div className="custom-marker g-2 state-lock">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">전체잠금</p>
                  </div>

                  <br />

                  {/* 상태 : 통신단절 */}
                  <div className="custom-marker g-2 state-disconnection">
                    <p className="tit">
                      <span>바이크시티(JS바이크)</span>
                      <span>
                        <strong>5</strong>/30
                      </span>
                    </p>
                    <p className="con">통신단절</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 슬라이더 */}
            <div className="box type-slider">
              <div className="type-slider-title">
                <h3 className="t-title">
                  <span className="qr">C0334</span>
                  <Button
                    size={"small"}
                    fillMode="flat"
                    onClick={() =>
                      window.open(
                        `${window.location.origin}/pub/page/HEXAADMHOM2P03`,
                        "_blank",
                        `width=${width},height=${height},top=100,left=100`
                      )
                    }
                  >
                    본도시락 문정법조타운점 문정법조타운점
                  </Button>
                </h3>

                <p className="t-txt">
                  경기도 의정부시 신흥로 222번길 5-30 106-109호
                </p>
                <p className="t-txt-b">2024.11.10 스테이션 철거 예정</p>
              </div>

              <div className="slider-grid">
                <SliderDashbard dataImg={dataImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
