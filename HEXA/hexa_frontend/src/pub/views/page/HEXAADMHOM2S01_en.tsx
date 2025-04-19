// 	HEXAADMHOM2S01 en : 대시보드

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
    generation: "1st",
    Address: "BONIf Munjeongbeopjo Town Branch/Yeongdeungpo-gu, Seoul",
    State: "Normal",
    Possible: "14/30",
  },
  {
    generation: "2nd",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Not Available for Exchange",
    Possible: "14/30",
  },
  {
    generation: "2nd",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Error Occurred",
    Possible: "14/30",
  },
  {
    generation: "1st",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Fully Locked",
    Possible: "14/30",
  },
  {
    generation: "2nd",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Communication Disconnection",
    Possible: "14/30",
  },
  {
    generation: "2nd",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Not Available for Exchange",
    Possible: "14/30",
  },
  {
    generation: "1st",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Error Occurred",
    Possible: "14/30",
  },
  {
    generation: "1st",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Fully Locked",
    Possible: "14/30",
  },
  {
    generation: "2nd",
    Address: "GS25 Gangnam branch/Yeongdeungpo-gu, Seoul",
    State: "Communication Disconnection",
    Possible: "14/30",
  },
];

export default function HEXAADMHOM2S01() {
  React.useEffect(() => {
    document.documentElement.lang = "en"; // 퍼블 확인용

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
      ImgName: "Locked",
      ImgStyle: "lock",
    },
    {
      ImgName: "Updating",
      ImgStyle: "updating",
    },
    {
      ImgName: "Exchanging",
      ImgStyle: "exchanging",
    },
    {
      ImgName: "Available for Exchange",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "Charging",
      ImgStyle: "charging",
    },
    {
      ImgName: "Reserved",
      ImgStyle: "reservation",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Locked",
      ImgStyle: "lock",
    },
    {
      ImgName: "Exchanging",
      ImgStyle: "exchanging",
    },
    {
      ImgName: "Available for Exchange",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "Charging",
      ImgStyle: "charging",
    },
    {
      ImgName: "Reserved",
      ImgStyle: "reservation",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Locked",
      ImgStyle: "lock",
    },
    {
      ImgName: "Exchanging",
      ImgStyle: "exchanging",
    },
    {
      ImgName: "Available for Exchange",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "Charging",
      ImgStyle: "charging",
    },
    {
      ImgName: "Reserved",
      ImgStyle: "reservation",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Empty Slot",
      ImgStyle: "blank",
    },
    {
      ImgName: "Available for Exchange",
      ImgStyle: "exchangeable",
    },
    {
      ImgName: "Charging",
      ImgStyle: "charging",
    },
    {
      ImgName: "Reserved",
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
      case "Normal":
        style = "mark-normal";
        break;

      case "Not Available for Exchange":
        style = "mark-unable";
        break;

      case "Error Occurred":
        style = "mark-error";
        break;

      case "Fully Locked":
        style = "mark-lock";
        break;

      case "Communication Disconnection":
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
          <span>Home</span>
          <span>Dashboard</span>
        </div>

        <div className="head-group">
          <h2 className="t-header">Dashboard</h2>
        </div>

        <div className="dashboard-box">
          <div className="dashboard-row">
            <div className="t-update">
              Update Date & Time 2024-08-05 22:00:10
            </div>
          </div>

          <div className="dashboard-row">
            {/* 1세대 */}
            <div className="box type-card">
              <div className="type-card-title">
                <h3>
                  1st generation <span className="flag-1">1st</span>
                </h3>
              </div>

              <div className="type-card-01">
                <div className="card-exchange">
                  <h4>1st generation Station</h4>
                  <div className="row">
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-register">Register</span>
                        </dt>
                        <dd>416</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-operation">Operating</span>
                        </dt>
                        <dd>375</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-exchangeable">
                            Available for Exchange
                          </span>
                        </dt>
                        <dd>342</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-exchanging">Exchanging</span>
                        </dt>
                        <dd>
                          <Link to="/">342</Link>
                        </dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-lock">Fully Locked</span>
                        </dt>
                        <dd>
                          <Link to="/">33</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-unable">
                            Not Available for Exchange
                          </span>
                        </dt>
                        <dd>
                          <Link to="/">32</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-error">Error Occurred</span>
                        </dt>
                        <dd>
                          <Link to="/">21</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-disconnection">
                            Communication Disconnection
                          </span>
                        </dt>
                        <dd>
                          <Link to="/">3</Link>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="card-battery">
                  <h4>1st generation Battery</h4>
                  <dl>
                    <div>
                      <dt>
                        <span className="mark-operation">Operating</span>
                      </dt>
                      <dd>3,007</dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-lock">Locked</span>
                      </dt>
                      <dd>
                        <Link to="/">32</Link>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-reservation">Reserved</span>
                      </dt>
                      <dd>
                        <Link to="/">0</Link>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="type-card-02">
                <h4>Exchange Count</h4>
                <dl>
                  <div>
                    <dt>Today</dt>
                    <dd>86</dd>
                  </div>
                  <div>
                    <dt>Yesterday</dt>
                    <dd>538</dd>
                  </div>
                  <div>
                    <dt>All</dt>
                    <dd>160,520</dd>
                  </div>
                </dl>
              </div>

              <div className="type-card-03">
                <dl>
                  <div>
                    <dt>
                      Diagnostic
                      <br />
                      Station
                    </dt>
                    <dd>
                      <Link to="/">18</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      Diagnostic
                      <br /> Battery
                    </dt>
                    <dd>
                      <Link to="/">1,000</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      Electric Scooter
                      <br />
                      (Operating/In Use)
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
                  2nd generation <span className="flag-2">2nd</span>
                </h3>
              </div>

              <div className="type-card-01">
                <div className="card-exchange">
                  <h4>2nd generation Station</h4>
                  <div className="row">
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-register">Register</span>
                        </dt>
                        <dd>416</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-operation">Operating</span>
                        </dt>
                        <dd>375</dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-exchangeable">
                            Available for Exchange
                          </span>
                        </dt>
                        <dd>342</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>
                          <span className="mark-lock">Fully Locked</span>
                        </dt>
                        <dd>
                          <Link to="/">33</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-unable">
                            Not Available for Exchange
                          </span>
                        </dt>
                        <dd>
                          <Link to="/">32</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-error">Error Occurred</span>
                        </dt>
                        <dd>
                          <Link to="/">21</Link>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          <span className="mark-disconnection">
                            Communication Disconnection
                          </span>
                        </dt>
                        <dd>
                          <Link to="/">3</Link>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="card-battery">
                  <h4>2nd generation Battery</h4>
                  <dl>
                    <div>
                      <dt>
                        <span className="mark-operation">Operating</span>
                      </dt>
                      <dd>3,007</dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-lock">Locked</span>
                      </dt>
                      <dd>
                        <Link to="/">32</Link>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span className="mark-reservation">Reserved</span>
                      </dt>
                      <dd>
                        <Link to="/">1</Link>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="type-card-02">
                <h4>Exchange Count</h4>
                <dl>
                  <div>
                    <dt>Today</dt>
                    <dd>86</dd>
                  </div>
                  <div>
                    <dt>Yesterday</dt>
                    <dd>538</dd>
                  </div>
                  <div>
                    <dt>All</dt>
                    <dd>160,520</dd>
                  </div>
                </dl>
              </div>

              <div className="type-card-03">
                <dl>
                  <div>
                    <dt>
                      Diagnostic
                      <br />
                      Station
                    </dt>
                    <dd>
                      <Link to="/">18</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      Diagnostic
                      <br />
                      Battery
                    </dt>
                    <dd>
                      <Link to="/">25</Link>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      Electric Scooter
                      <br />
                      (Operating/In Use)
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
                  defaultValue={"All"}
                  className="w150"
                  data={["서울특별시", "인천광역시", "부산광역시", "경기도"]}
                />
                <DropDownList defaultValue={"All"} className="w150" />
                <div className="inner-item type-icon">
                  <Input placeholder="Please enter a search term." />
                  <Button size={"small"} fillMode="flat" className="btn-icon">
                    <i className="icon icon-glass"></i>
                  </Button>
                </div>
              </div>

              <div className="sort-group type-dark">
                <div className="sort-group__counter">
                  <span className="total">
                    All {"  "}
                    <span> 36</span>
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
                    title="Generation"
                    width="80"
                    cells={{
                      data: CustomCellGeneration,
                    }}
                  />
                  <Column
                    field="Address"
                    title="Station Name"
                    width="200"
                    cells={{
                      data: CustomCellAddress,
                    }}
                  />
                  <Column
                    field="State"
                    title="Status"
                    width="120"
                    cells={{
                      data: CustomCellState,
                    }}
                  />
                  <Column
                    field="Possible"
                    title="Available for Exchange"
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
              <div className="type-map-state">Available for Exchange / All</div>
              <div className="map-area">
                <div className="map-head">
                  <span className="type-1" role="button">
                    1st
                  </span>
                  <span className="type-2" role="button">
                    2nd
                  </span>
                </div>

                <div
                  style={{
                    float: "left",
                    marginTop: "60px",
                    marginLeft: "10px",
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
                    <p className="con">Normal</p>
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
                    <p className="con">Not Available for Exchange</p>
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
                    <p className="con">Error Occurred</p>
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
                    <p className="con">Fully Locked</p>
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
                    <p className="con">Communication Disconnection</p>
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
                    <p className="con">Normal</p>
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
                    <p className="con">Not Available for Exchange</p>
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
                    <p className="con">Error Occurred</p>
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
                    <p className="con">Fully Locked</p>
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
                    <p className="con">Communication Disconnection</p>
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
                    BONIf Munjeongbeopjo Town Branch
                  </Button>
                </h3>

                <p className="t-txt">
                  #106-109, 5-30, Sinheung-ro 222beon-gil, Uijeongbu-si,
                  Gyeonggi-do
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
