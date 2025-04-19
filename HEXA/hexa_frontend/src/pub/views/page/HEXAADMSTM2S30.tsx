// HEXAADMSTM2S30 : 스테이션 로그 다운로드

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";

const sampleProducts = [
  {
    DateTime: "2024-10-30 20:05:19",
    Division: "2세대",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Log: "station_D1234567890-20241019.json",
    Download: "Download",
  },
];
import { DatePicker } from "@progress/kendo-react-dateinputs";

export default function HEXAADMSTM2S30() {
  const CustomCellButton = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        <Button themeColor={"info"}>
          <i className="icon icon-download"></i>
        </Button>
      </td>
    );
  };

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };
  const changeDateEnd = () => {
    setValue(value);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 정보 관리 </span>
        <span>스테이션 로그 다운로드</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 로그 다운로드</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>스테이션ID</dt>
              <dd>
                <div className="in-input">
                  <div className="inner-item">
                    <Input
                      id="phoneNumber"
                      placeholder="스테이션명을 정확하게 입력 해 주세요."
                      className="w300"
                    />
                    <Button fillMode="outline" size={"medium"}>
                      조회
                    </Button>
                  </div>
                </div>
              </dd>
            </div>
            <div>
              <dt>로그 기간</dt>
              <dd>
                <span className="period">
                  <Button fillMode="outline" togglable={true}>
                    오늘
                  </Button>
                  <Button fillMode="outline" togglable={true} selected>
                    1주
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    1달
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    전체
                  </Button>
                </span>

                <span className="datepicker">
                  <span className="cell">
                    <DatePicker
                      value={value}
                      onChange={changeDateStart}
                      format={"yyyy-MM-dd"}
                    />
                  </span>
                  ~
                  <span className="cell">
                    <DatePicker
                      value={value}
                      onChange={changeDateEnd}
                      format={"yyyy-MM-dd"}
                    />
                  </span>
                </span>
              </dd>
            </div>
          </dl>
          <div className="group-align-right">
            <Button size={"medium"} fillMode="outline">
              <i className="icon icon-refresh"></i>
              초기화
            </Button>
            <Button size={"medium"} themeColor={"dark"}>
              로그 요청
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div>
          {/* 문구 검수용 grid */}
          <Grid /*data={sampleProducts}*/ scrollable="none">
            <GridNoRecords>
              스테이션ID를 입력하고 [조회]버튼을 클릭하면 이전 요청 파일 목록이
              출력되고, <br />
              스테이션ID와 기간을 설정하고 [로그요청]버튼을 클릭하면 로그파일을
              요청합니다.
            </GridNoRecords>

            <Column
              className="txt-left"
              field="DateTime"
              title="요청일시"
              width="130"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="세대구분"
              width="140"
            />
            <Column
              className="txt-center"
              field="ID"
              title="스테이션ID"
              width="140"
            />
            <Column
              className="txt-left"
              field="Name"
              title="스테이션명"
              width="140"
            />
            <Column
              className="txt-left"
              field="Log"
              title="로그 파일명"
              width="140"
            />
            <Column
              className="txt-center"
              field="Download"
              title="다운로드"
              width="140"
              cells={{
                data: CustomCellButton,
              }}
            />
          </Grid>

          <Grid data={sampleProducts} scrollable="none">
            <GridNoRecords>
              스테이션ID를 입력하고 [조회]버튼을 클릭하면 이전 요청 파일 목록이
              출력되고, <br />
              스테이션ID와 기간을 설정하고 [로그요청]버튼을 클릭하면 로그파일을
              요청합니다.
            </GridNoRecords>

            <Column
              className="txt-left"
              field="DateTime"
              title="요청일시"
              width="130"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="세대구분"
              width="140"
            />
            <Column
              className="txt-center"
              field="ID"
              title="스테이션ID"
              width="140"
            />
            <Column
              className="txt-left"
              field="Name"
              title="스테이션명"
              width="140"
            />
            <Column
              className="txt-left"
              field="Log"
              title="로그 파일명"
              width="140"
            />
            <Column
              className="txt-center"
              field="Download"
              title="다운로드"
              width="140"
              cells={{
                data: CustomCellButton,
              }}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
