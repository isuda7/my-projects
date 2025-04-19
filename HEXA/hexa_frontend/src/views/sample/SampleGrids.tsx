import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@progress/kendo-react-layout';
import Header from "@/new_components/common/Header.tsx";

//Grids
import SampleGrid1 from "./grid/SampleGrid1";
import SampleGrid2 from "./grid/SampleGrid2";
import SampleGrid3 from "./grid/SampleGrid3";
import SampleGrid4 from "./grid/SampleGrid4";

export default function SampleGrids() {

  return (
    <>
      <Header headName={"Grid Samples"} />


      <div className="title-group">
        <h3 className="t-title">Sample1: 검색박스, rowStyle 적용, Filter select박스, cellClick, </h3>
      </div>
      <SampleGrid1 />

      <br />
      <br />

      <div className="title-group">
        <h3 className="t-title">Sample2 : 멀티헤더적용, Filter Multi Select박스, Custom Component Cell 적용</h3>
      </div>
      <SampleGrid2 />

      <br />
      <br />
      
      <div className="title-group">
        <h3 className="t-title">
          Sample3 : pagination삭제, 숫자 포맷 케이스 추가
          <br/>
          rowSpan 케이스(description), 헤더타이틀 멀티라인  
        </h3>
      </div>
      <SampleGrid3 />

      <br />
      <br />

      <div className="title-group">
        <h3 className="t-title">Sample4 : 왼쪽 컬럼 고정, 조회조건에따른 헤더리스트 변경</h3>
      </div>
      <SampleGrid4 />
    </>
  );
}
