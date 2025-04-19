/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationHome from "@/new_components/home/StationHome";
import BatteryHome from "@/new_components/home/BatteryHome";
import DisconnectionHome from "@/new_components/home/DisconnectionHome";
import NoticeHome from "@/new_components/home/NoticeHome";
import PopupLayout from "@/new_components/home/popup/PopupLayout";
import dayjs from "dayjs";
import HomeApiService from "@/utils/apiService/home/HomeApiService";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";
import { getFormattedTime } from "@/utils/common";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";

/* Types */
import { BatteryStatic, IrregularCount, DisconnectCount } from "@/utils/apiService/type/home/Home";
import RegisterPhoneModal from "./modal/RegisterPhoneModal";

export default function Home() {
  const { t, i18n } = useTranslation();
  const role = useAppSelector(roleSelector);
  const [dateArray, setDateArray] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState<string>(getFormattedTime(new Date));
  const [isPhoneNumberNull, setIsPhoneNumberNull] = useState<boolean>();

  //스테이션 차트데이터
  const [stationData, setStationData] = useState<any>({})

  //일별 진단 건수 데이터
  const [irregularData, setIrregularData] = useState<IrregularCount[]>([])

  //배터리 차트데이터
  const [batteryData, setBatteryData] = useState<{
    dataA: BatteryStatic[],
    dataB: BatteryStatic[]
  }>({ dataA: [], dataB: []})

  //통신단절 건수 데이터
  const [disconnectData, setDisconnectData] = useState<DisconnectCount[]>([])

  //공지사항 데이터
  const [noticeData, setNoticeData] = useState<any[]>([])

  const onSearchHomeData = async () => {
    //현재일자 ~ 이전6일 조회
    const params = {
      startDate: dayjs().subtract(6, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    }
    const pageParams: any = {
      page: 0,
      size: 5,
    }

    const apiList = [];
    apiList.push(() => HomeApiService().getHomeRankingData()) //누적교환건수, 운영현황
    apiList.push(() => HomeApiService().getHomeIrregularCount(params)) //일별 진단 건수
    apiList.push(() => HomeApiService().getBatteryStatistics(params)) //배터리
    apiList.push(() => HomeApiService().getHomeDisconnectCount(params)) //통신단절건수
    if(role.roleName === 'admin') {
      apiList.push(() => NoticeApiService().getNoticeList(pageParams))
    }
    else {
      apiList.push(() => NoticeApiService().getPeriodNotices(pageParams))
    }

    const [stationRes, irrRes, betRes2, disRes, noticeRes] = await Promise.all(apiList.map(fn => fn()));

    const station = stationRes?.data;
    setStationData(station)

    setIrregularData(irrRes?.data as IrregularCount[]);

    if (Array.isArray(betRes2?.data)) {
      const batteryDataList1 = (betRes2?.data as BatteryStatic[]).filter((item: BatteryStatic) => item.genCode === 'G1');
      const batteryDataList2 = (betRes2?.data as BatteryStatic[]).filter((item: BatteryStatic) => item.genCode === 'G2');
      processBatteryData(batteryDataList1, batteryDataList2);
    } else {
      console.error('betRes2.data is not an array');
    }


    setDisconnectData(disRes?.data as DisconnectCount[])

    const noticePage: any = noticeRes?.data
    setNoticeData(noticePage?.content)

    //조회후 업데이트 일시 변경
    setCurrentTime(getFormattedTime(new Date()))

    setInitDate();
  }

  const processBatteryData = (list1: BatteryStatic[], list2: BatteryStatic[]) => {
    setBatteryData({
      dataA: list1,
      dataB: list2,
    })
  }

  const setInitDate = () => {
    const array = [];
    const dateFormat = i18n.language === 'ko'? 'MM월 DD일' : 'MMM DD';
    for(let i=6; i>=0; i--) {
      const date = dayjs().subtract(i, 'days');
      array.push({
        date,
        name: date.format(dateFormat),
      })
    }
    console.log('setInitDate array', array)
    setDateArray(array)
  }

  useEffect(() => {
    chkPhone();
    onSearchHomeData();
  }, [])

  const chkPhone = async () => {
    const isPhoneNull = await HomeApiService().checkPhoneIsNull();
    console.log('isPhoneNull', isPhoneNull);
    if(isPhoneNull) setIsPhoneNumberNull(true);
  }

  const onCloseModal = () => {
		setIsPhoneNumberNull(false);
	}

  return (
    <>
      {
        dateArray.length > 0 &&
        <div className="home">
          <div className="t-update">
            <span>
              {/* 업데이트 일시 {currentTime} */}
              {`${t('home.update_history')} ${currentTime}`}
            </span>
            {/* [2024-11-27] 새로고침 버튼 디자인 수정 */}
            <Button 
              fillMode="flat"
              onClick={onSearchHomeData}  
            >
              <i className="icon icon-refresh-thin"></i>
            </Button>
          </div>
          <StationHome 
            data = {stationData}
            irrData = {irregularData}
            dateArray = {dateArray}
          />

          {/* 배터리 */}
          <BatteryHome 
            data = {batteryData}
            dateArray = {dateArray}
          />

          <div className="home-row">
            {/* 통신단절 건수 */}
            <DisconnectionHome
              data = {disconnectData}
              dateArray = {dateArray}
            />

            {/* 공지사항 */}
            <NoticeHome 
              data = {noticeData}
            />
          </div>
        </div>
        
      }
      { isPhoneNumberNull &&
        <RegisterPhoneModal
          onClose={onCloseModal}
        />
      }
      {/* 팝업 Component */}
      <PopupLayout />
    </>
  );
}
