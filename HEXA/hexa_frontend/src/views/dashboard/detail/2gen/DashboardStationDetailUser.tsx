// 	HEXAADMHOM2P04 : 2세대 상세 팝업(일반 사용자)

import * as React from "react";
import {useEffect, useState} from "react";
import StationDetailUserCenter from "@/new_components/dashboard/detail/2gen/user/StationDetailUserCenter.tsx";
import StationDetailUserRight from "@/new_components/dashboard/detail/2gen/user/StationDetailUserRight.tsx";
import StationDetailUserLeft from "@/new_components/dashboard/detail/2gen/user/StationDetailUserLeft.tsx";
import {
  ChassisResponseDto,
  Station,
  StationChassis,
  StationSlot
} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import IF_DATA_ENUM from "@/utils/apiService/type/dashboard/IfDataEnum.ts";
import {useNavigate, useParams} from "react-router-dom";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import dayjs from "dayjs";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import {getControlHistoryList} from "@/utils/StationControlUtil.ts";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {useTranslation} from "react-i18next";
import {Button} from "@progress/kendo-react-buttons";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {isAdmin} from "@/utils/common.ts";
import {createConsumeUriStation, createWebsocketUri} from "@/utils/createConsumeUri.ts";
import {useQueries} from "@tanstack/react-query";
import WebSocketMessageService from "@/utils/WebSocketMessageServices.ts";

type SseService = {
  execute: (json: any) => void;
};

export interface RecommendBtry {
  btryId: string;
  slotNumber: number;
}

const refetchInervals = 10000;

export default function DashboardStationDetailUser() {
  const {t, i18n} = useTranslation();
  const {id} = useParams<"id">();
  const navigate = useNavigate();
  const role = useAppSelector(roleSelector);
  const [stationSlotList, setStationSlotList] = useState<StationSlot[]>([]);
  const [stationChassisList, setStationChassisList] = useState<StationChassis[]>([]);
  const [station, setStation] = useState<Station>();
  const [selectSlotNo, setSelectSlotNo] = useState<number>(0);
  const [updateAt, setUpdateAt] = useState(dayjs().format(t("format.date-time-uppercase")));
  const [controlList, setControlList] = useState<StationCtrlHistoryDto[]>([]);
  const [title, setTitle] = useState<string>();
  const [titleClass, setTitleClass] = useState<string>();

  const [recommendBtry, setRecommendBtry] = useState<RecommendBtry[]>([]);
  const [isReady, setIsReady] = useState(false);

  const queries = [

    {
      queryKey: [`dashboard2ndStationDetailUser${id}`],
      queryFn: () => {
        return getStation(id)
      },
      enabled: isReady,
      refetchInterval: refetchInervals,
      refetchIntervalInBackground: true
    },
    // {
    //   queryKey: [`dashboard2ndStationControlHistory${id}`],
    //   queryFn: () => {
    //     return getControlHistory(id)
    //   },
    //   enabled: isReady,
    //   refetchInterval: refetchInervals,
    //   refetchIntervalInBackground: true
    // },


  ];

  useQueries({queries: queries});

  function eventAggregate(): SseService {
    return {
      execute: (json: any) => {
        setStation((prevState) => {
          return {
            ...prevState
            , stationStatus: json.bssSts
          }
        })
      },
    };
  }


  function eventChassis(): SseService {
    return {
      execute: (json: ChassisResponseDto) => {
        setStationChassisList((prevList) => {
          const existingIndex = prevList.findIndex(item => item.chassisNumber === json.chassNum);
          if (existingIndex !== -1) {
            return prevList.map(item =>
              item.chassisNumber === json.chassNum ? {
                ...item,
                chassisNumber: json.chassNum,
                chassisStatus: json.chassSts,
                floodStatus: json.bssFloodSts,
                fireStatus: json.bssFireSts,
                chassisErrorCode: json.chassErrCd,
                chassisChargeCompleteNumber: json.chassChgCpltNum,
                chassisChargeNumber: json.chassChgNum,
                chassisWaitNumber: json.chassWaitNum,
                chassisFaultNumber: json.chassFltNum,
                chassisTemperature: json.chassTemp,
                chassisHumidity: json.chassHumid,
                chassisCO2: json.chassCO2,
                chassisAirConStatus: json.chassAirconSts,
                chassisTargetTemperature: json.chassTgtTemp,
                chassisDoorStatus: json.chassDoorSts,
                chassisAccumulatedPower: json.chassAccumPwr,
                chassisFanStatus: json.chassFanSts,
                chassisSwapCount: json.chassSwapCnt,
                chassisAvailablePower: json.chassAvailPwr,
                chassisUsedPower: json.chassUsedPwr,
              } : item
            );
          } else {
            return prevList;
          }
        })
      },
    };
  }

  function eventSlot(): SseService {
    return {
      execute: async (json: any) => {
        setStationSlotList((prevList) => {
          const existingIndex = prevList.findIndex(item => item.slotNum === json.slotNum);
          // 기존 stationId가 있는 경우 해당 데이터를 교체하고, 없는 경우 새로 추가합니다.
          if (existingIndex !== -1) {
            // 이미 stationId가 존재하므로 교체합니다.
            return prevList.map(item =>
              item.slotNum === json.slotNum ?
                {
                  ...item
                  , ...json
                } : item
            );
          } else {
            return prevList;
          }
        });
      },
    };
  }

  function eventBatterySlot(): SseService {
    return {
      execute: async (json: any) => {
        setStationSlotList((prevList) => {
          return prevList.map(item => {
            const list = json.data.find((data: any) => item.slotNum === data.slotNum);
            if(list){
              return {
                ...item,
                ...list
              };
            }else{
              return item;
            }
          })
        });
      },
    };
  }


  function createDefaultService(): SseService {
    return {
      execute: (json: any) => {
        console.log("createDefaultService 실행");
      },
    };
  }

  const serviceMap: Map<string, SseService> = new Map([
    [IF_DATA_ENUM.BSS_AGGREGATE, eventAggregate()],
    [IF_DATA_ENUM.BSS_CHASSIS, eventChassis()],
    [IF_DATA_ENUM.BSS_SLOT, eventSlot()],
    [IF_DATA_ENUM.BSS_BATTERY, eventBatterySlot()],
  ]);

  function getService(condition: string): SseService {
    return serviceMap.get(condition) || createDefaultService();
  }

  const getStation = async (stationId: string) => {
    const result = await DashboardApiService().getStation(stationId);
    if(result){
      setStation(result.data);
      setStationChassisList(result.data.stationChassis);
      setStationSlotList(result.data.stationSlots);
      setUpdateAt(dayjs().format(t("format.date-time-uppercase")));
      return result.data;
    }
    return {};
  }

  useEffect(() => {
    if (id) {
      setIsReady(true);
      // getStation(id);
      getControlHistory(id);

    }
  }, [id]);

  useEffect(() => {
    const webSocketService = new WebSocketMessageService(createWebsocketUri(), serviceMap, `/topic/${id}`);

    return () => {
      webSocketService.close();
    };

  }, []);


  const getControlHistory = async (id: string) => {
    setControlList(await getControlHistoryList(id, 4));
  }


  useEffect(() => {
    if(station){
      const status = station?.isDisconnect ? 'DISCONNECTION' : station?.stationStatus;
      setTitle(t(`dashboard.bss-status.${status}`));
      setTitleClass(`tit-state-${station_status[status]}`);
    }
  }, [station]);

  const gotoAdminDashboard = () => {
    navigate(`/dashboard/2nd/admin/${station?.stationId}`)
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-pop">

          <div className="dashboard-pop__head">
            <div className="dashboard-pop__head__left" >
              {isAdmin(role.roleCode) &&
                <Button size={"small"} themeColor={"info"} onClick={gotoAdminDashboard}>관리자 화면 전환</Button>
              }
            </div>
            <h2 className="pop-title">
              <span className="stit-ico">{station?.qrId}</span>
              <span>{station?.stationName}</span>
            </h2>
            <div className="tit-pos">
              <span className={titleClass}>{title}</span>
            </div>
            <div className="t-update">{t("dashboard.update-at")} {updateAt}</div>
          </div>

          <div className="dashboard-pop__body">
            <div className="pop-layout">
              {station &&
                <StationDetailUserLeft
                  station={station}
                  stationSlotList={stationSlotList}
                  controlList={controlList}
                />
              }
              <StationDetailUserCenter
                stationChassisList={stationChassisList}
                stationSlotList={stationSlotList}
                setSelectSlotNo={setSelectSlotNo}
                selectSlotNo={selectSlotNo}
                recommendBtry={recommendBtry}
              />
              <StationDetailUserRight
                station={station}
                selectSlotNo={selectSlotNo}
                stationSlotList={stationSlotList}
                setRecommendBtry={setRecommendBtry}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
