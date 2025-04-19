/* React */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import BatterySuccessChart from "./chart/BatterySuccessChart"
import BatteryFailedChart from "./chart/BatteryFailedChart"
import dayjs, { Dayjs } from "dayjs";

//Types
import { BatteryStatic } from "@/utils/apiService/type/home/Home"

interface ChartData {
  dataA: number[], //1세대 성공, 실패
  dataB: number[], //2세대 성공, 실패
  dataC?: number[], //1세대 인증실패
  dataD?: number[], //2세대 인증실패
}

export default function BatteryHome(props: any) {
  const {t} = useTranslation();
  const navigate = useNavigate()
  const { data, dateArray } = props;

  const [succData, setSuccData] = useState<ChartData>()
  const [failData, setFailData] = useState<ChartData>()

  useEffect(() => {
    console.log('useEffect data', data)
    processBatteryData(data)
  }, [data])

  const processBatteryData = (data: any) => {
    //data의 dataA는 1세대, dataB는 2세대
    const obj1gen = getValueList(data.dataA);
    const obj2gen = getValueList(data.dataB);

    setSuccData({
      dataA: obj1gen.succList,
      dataB: obj2gen.succList,
    })
    setFailData({
      dataA: obj1gen.failList,
      dataB: obj2gen.failList,
      dataC: obj1gen.authFailList,
      dataD: obj2gen.authFailList,
    })
  }

  /**
   * 배터리 정보를 넘겨받아 조회 날짜별로
   * 성공 리스트, 교환 실패 리스트, 인증 실패 리스트 값 반환해줌
   * @param data 
   * @returns 
   */
  const getValueList = (data: BatteryStatic[]) => {
    const succList: number[] = [];
    const failList: number[] = [];
    const authFailList: number[] = [];
    dateArray.forEach((dateObj: any) => {
      //각 날짜에 맞는 데이터가 존재하는지 조회
      const findObj = data.find((v: BatteryStatic) => dayjs(v.statDate).isSame(dateObj.date, 'days'))
      succList.push(findObj?.succCnt || 0)
      failList.push(findObj?.failCnt || 0)
      authFailList.push(findObj?.authFailCnt || 0)
    })
    return {succList, failList, authFailList}
  }

  useEffect(() => {
    console.log('succData', succData)
  }, [succData])

  return (
    <>
      {/* 배터리 */}
      <div className="home-row">
        <div className="home-box type-title">
          <h2>
            {t('home.battery') /* 배터리 */}
          </h2>
        </div>

        {/* 교환 성공 */}
        <div className="home-box type-success">
          <h3>
            {t('home.swap_success') /* 교환 성공 */}
          </h3>
          <Button 
            fillMode="flat" 
            className="btn-arr"
            onClick={() => navigate('/battery/swap-history')}  
          >
            {/* 더보기 */}
            {t('home.more_info')}
          </Button>
          <div className="home-chart-bar3">
            <BatterySuccessChart data={succData} dataX={dateArray} />
          </div>
        </div>

        {/* 교환 실패 */}
        <div className="home-box type-fail">
          <h3>
            {t('home.swap_fail') /* 교환 실패 */}
          </h3>
          <Button 
            fillMode="flat" 
            className="btn-arr"
            onClick={() => navigate('/battery/swap-history')}  
          >
            {/* 더보기 */}
            {t('home.more_info')}
          </Button>

          <div className="home-chart-bar4">
            <div className="chart-legend">
              <span className="round-g1">
                {/* 1세대 교환실패 */}
                {t('home.first_gen_swap_fail')}
              </span>
              <span className="round-g1-1">
                {/* 1세대 인증실패 */}
                {t('home.first_gen_auth_fail')}
              </span>
              <span className="round-g2">
                {/* 2세대 교환실패 */}
                {t('home.second_gen_swap_fail')}
              </span>
              <span className="round-g2-1">
                {/* 2세대 인증실패 */}
                {t('home.second_gen_auth_fail')}
              </span>
            </div>
            <BatteryFailedChart data={failData} dataX={dateArray} />
          </div>
        </div>
      </div>
    </>
  );
}
