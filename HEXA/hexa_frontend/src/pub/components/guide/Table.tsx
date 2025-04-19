import * as React from "react";
import { Label, Error } from "@progress/kendo-react-labels";
import { FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import Gridsample from "../../components/guide/Grid-sample1.tsx";

import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";

const sampleProducts = [
  {
    divide: "슬롯 S/N",
    slot1: "20240610001",
    slot2: "20240610001",
    slot3: "20240610001",
    slot4: "20240610001",
    slot5: "20240610001",
    slot6: "20240610001",
    slot7: "20240610001",
  },
  {
    divide: "HW 버전",
    slot1: "1.0",
    slot2: "1.0",
    slot3: "1.0",
    slot4: "1.0",
    slot5: "1.0",
    slot6: "1.0",
    slot7: "1.0",
  },
  {
    divide: "생산일",
    slot1: "2024-08-04",
    slot2: "2024-08-04",
    slot3: "2024-08-04",
    slot4: "2024-08-04",
    slot5: "2024-08-04",
    slot6: "2024-08-04",
    slot7: "2024-08-04",
  },
  {
    divide: "교환일시",
    slot1: "2024-08-04 12:30:41",
    slot2: "2024-08-04 12:30:40",
    slot3: "2024-08-04 12:30:40",
    slot4: "2024-08-04 12:30:40",
    slot5: "2024-08-04 12:30:40",
    slot6: "2024-08-04 12:30:40",
    slot7: "2024-08-04 12:30:40",
  },
];

export default function uiTable() {
  const [value, setValue] = React.useState();
  const [value2, setValue2] = React.useState();
  const editorId1 = "firstName1";
  const editorId2 = "firstName2";

  return (
    <div>
      <h2 className="k-mt-14">Table</h2>
      <hr className="k-mt-4 k-mb-4" />
      <div>
        <div>
          <h3>1. tbl-base</h3>
        </div>
        <FormElement>
          <table className="tbl-base">
            <caption hidden>table</caption>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "35%" }} />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">Tbody Header</th>
                <td>Tbody Content</td>
                <th scope="row">
                  <Label editorId={editorId1}>
                    input readlony
                    <span className="required">
                      <span className="sr-only">필수</span>
                    </span>
                  </Label>
                </th>
                <td>
                  <FieldWrapper>
                    <Input
                      id={editorId1}
                      value={value}
                      readOnly={true}
                      ariaDescribedBy={"firstNameError"}
                      onChange={(e: any) => setValue(e.value)}
                    />
                    {!value && (
                      <Error id={"firstNameError"}>
                        This field is required.
                      </Error>
                    )}
                  </FieldWrapper>
                </td>
              </tr>
              <tr>
                <th scope="row">Tbody Header</th>
                <td>Tbody Content</td>
                <th scope="row">
                  <Label editorId={editorId2}>
                    input disabled<span className="required"></span>
                  </Label>
                </th>
                <td>
                  <FieldWrapper>
                    <Input
                      id={editorId2}
                      value={value2}
                      disabled={true}
                      ariaDescribedBy={"firstNameError2"}
                      onChange={(e: any) => setValue2(e.value)}
                    />
                    {!value2 && (
                      <Error id={"firstNameError2"}>
                        This field is required. 2
                      </Error>
                    )}
                  </FieldWrapper>
                </td>
              </tr>
              <tr>
                <th scope="row">Tbody Header</th>
                <td colSpan={3} className="scroll">
                  <Grid data={sampleProducts} scrollable="none">
                    <GridNoRecords>There is no data available</GridNoRecords>
                    <Column
                      field="divide"
                      title="구분"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot1"
                      title="슬롯1"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot2"
                      title="슬롯2"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot3"
                      title="슬롯3"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot4"
                      title="슬롯4"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot5"
                      title="슬롯5"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot6"
                      title="슬롯6"
                      width="150"
                      className="txt-center"
                    />
                    <Column
                      field="slot7"
                      title="슬롯7"
                      width="150"
                      className="txt-center"
                    />
                  </Grid>
                </td>
              </tr>
            </tbody>
          </table>
        </FormElement>
      </div>

      <br />
      <br />

      <div className="sort-group">
        <h3>2. tbl-base th 대각선</h3>
      </div>
      <div>
        <table className="tbl-base">
          <caption hidden>table</caption>
          <colgroup>
            {/* 사이즈 픽셀로 고정 */}
            <col style={{ width: "480px" }} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className="diagonal">
                <span>팩 온도 (℃)</span>
                <span>등록일시</span>
              </th>
              <th>kk</th>
              <th>kk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Tbody Header</th>
              <td>Tbody Content</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Gridsample />
    </div>
  );
}
