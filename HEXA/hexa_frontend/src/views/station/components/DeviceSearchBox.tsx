/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';

/* Common */
import _ from "lodash";
import CodeApiService from "@/utils/apiService/CodeApiService";

type SearchParams = {
  chassisSerialNumber: string,
  slotSerialNumber: string,
}

export default function DeviceSearchBox(props: any) {
  const { t } = useTranslation();

  const { searchParams, setSearchParams, searchEvent } = props;
  //DropDownList
  const [codeList, setCodeList] = useState<any[]>([])
  const [codeData, setCodeData] = useState({code:'', value:''})

  const handleDropDownList = (event: DropDownListChangeEvent) => {
    console.log('handleDropDownList event', event);
    setCodeData(event.value)

    const key = event.value.code === "CSSSN"? 'chassisSerialNumber' : 'slotSerialNumber';
    setSearchParams((prevState: any) => {
      const prevKeys = Object.keys(prevState);
      const prevKey = prevKeys.length > 0? prevKeys[0] : undefined;
      if(prevKey && prevKey !== key) {
        return {[key] : prevState[prevKey]}
      }
      else {
        return prevState;
      }
    })
  }

  const onChangeInput = (e: InputChangeEvent) => {
    console.log('searchParams, e', searchParams, e)
    const key = codeData.code === 'CSSSN'? 'chassisSerialNumber' : 'slotSerialNumber';
    setSearchParams({[key] : e.value})
  }

  const setSMDVSRCode = async () => {
    const res: any = await CodeApiService().getCodesByGroupCode({groupCode: 'SMDVSR'});
    setCodeList(res.data)

    let params = {};
    if(res.data.length > 0) {
      setCodeData(res.data[0]);

      const keyValue = res.data[0].code;
      params = { [keyValue === 'CSSSN'? 'chassisSerialNumber' : 'slotSerialNumber'] : ''}
    }
    setSearchParams(params)
  }

  useEffect(() => {
    setSMDVSRCode();
  }, [])

  return (
    <section className="section">
      <div className="search-group">
        <div className="search-flex">
          <DropDownList 
            data={codeList}
            className="w200"
            textField="value"
            dataItemKey="code"
            onChange={handleDropDownList}
            value={codeData}
          />
          <Input 
            className="w500"
            onChange={onChangeInput}
          />
        </div>

        <div className="group-align-right">
          <Button 
            size={"medium"} 
            themeColor={"dark"}
            onClick={() => searchEvent?.()}
          >
            <i className="icon icon-search"></i>
            {t('common.search') /* 검색 */}
          </Button>
        </div>
      </div>
    </section>
  );
}
