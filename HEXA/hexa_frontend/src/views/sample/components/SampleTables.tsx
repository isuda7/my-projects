import { useCallback, useEffect, useRef, useState } from "react";
import useAlert from "@/hooks/useAlert.tsx";

const SampleTables = () => {
  /**
   * 초기 변수 선언 영역
   */
  const showAlert = useAlert();
  const [sampleData, setSampleData] = useState(
    {
      "serialNumber" : 123466126525,
      "type" : 2,
      "hwVersion" : 1,
      "createAt" : "2024-08-23 13:33:44",
      "information" : [
        {
          "sloatNumber": 12345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
        {
          "sloatNumber": 2345678,
          "hwVersion": 1.0,
          "createdAt": "2024-08-04 23:33:11",
          "exchangeDate": "2024-08-04 23:33:11",
        },
      ]
    }
  )



  const sampleList = [
    { text : '111', value: "1"},
    { text : '222', value: "2"},
    { text : '333', value: "3"},
    { text : '444', value: "1"},
    { text : '555', value: "2"},
    { text : '666', value: "3"},
    { text : '777', value: "1"},
    { text : '888', value: "2"},
  ]

  /**
   * 함수 선언 영역
   */
  const getPivotData = (list: any[]) => {
    // Step 1: Extract the keys to use as row headers
    const rowHeaders = Object.keys(list[0]);

    // Step 2: Transpose the data into a pivot table format
    const pivotTable = rowHeaders.map(rowHeader => {
      const row = { header: rowHeader } as any;
      list.forEach((item, index) => {
        row[`Item ${index + 1}`] = item[rowHeader];
      });
      return row;
    });
    console.log('rowHeaders', rowHeaders)
    console.log('pivotTable', pivotTable)
  } 

  const renderInnerTable = () => {
    const list = sampleData.information;
    const rowHeaders = Object.keys(list[0]);

    // Step 2: Transpose the data into a pivot table format
    const pivotTable = rowHeaders.map(rowHeader => {
      const row = { header: rowHeader } as any;
      list.forEach((item, index) => {
        row[`Item ${index + 1}`] = item[rowHeader];
      });
      return row;
    });

    return (
      <table className="tbl-base">
        <thead>
          <tr>
            <th>구분</th>
            {list.map((_, index) => (
              <th key={index}>Item {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pivotTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{row.header}</th>
              {Object.keys(row)
                .filter(key => key !== 'header')
                .map((key, index) => (
                  <td key={index}>{row[key]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  

  /**
   * 최초 렌더링 이후 동작함수
   */
  useEffect(() => {

  }, [])

  return (
    <table className="tbl-base">
      <colgroup>
        <col style={{ width: "10%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            S/N
          </th>
          <td>{sampleData.serialNumber}</td>
          <th scope="row">
            구분
          </th>
          <td>{sampleData.type}</td>
          <th scope="row">
            HW 버전
          </th>
          <td>{sampleData.hwVersion}</td>
          <th scope="row">
            생성일자
          </th>
          <td>{sampleData.createAt}</td>
        </tr>
        <tr>
          <th scope="row">Group Description</th>
          <td colSpan={7}>
            {renderInnerTable()}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default SampleTables;
