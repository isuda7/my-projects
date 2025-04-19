// 	HEXAADMHOM2S01 : 대시보드

import * as React from "react";
import {useEffect, useState} from "react";
import {GridRowClickEvent,} from "@progress/kendo-react-grid";
import FirstGeneration from "@/new_components/dashboard/main/FirstGeneration.tsx";
import StationList from "@/new_components/dashboard/main/StationList.tsx";
import StationGoogleMap from "@/new_components/dashboard/main/StationGoogleMap.tsx";
import StationDetail from "@/new_components/dashboard/main/StationDetail.tsx";
import {DashboardStaionRequestDto, Station, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import IF_DATA_ENUM from "@/utils/apiService/type/dashboard/IfDataEnum.ts";
import dayjs from "dayjs";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import SecondGeneration from "@/new_components/dashboard/main/SecondGeneration.tsx";
import ModalComponent from "@/components/kendo/modal/ModalComponent.tsx";
import StationListModal from "@/views/dashboard/modal/StationListModal.tsx";
import IrregularStationListModal from "@/views/dashboard/modal/2gen/IrregularStationListModal.tsx";
import IrregularStation1stListModal from "@/views/dashboard/modal/1gen/IrregularStationListModal.tsx";
import IrregularBatteryListModal from "@/views/dashboard/modal/IrregularBatteryListModal.tsx";
import {useTranslation} from "react-i18next";
import ReservationBatteryModal from "@/views/dashboard/modal/2gen/ReservationBatteryModal.tsx";
import Reservation1stBatteryModal from "@/views/dashboard/modal/1gen/ReservationBatteryModal.tsx";
import LockedBatteryModal from "@/views/dashboard/modal/LockedBatteryModal.tsx";
import {createWebsocketUri} from "@/utils/createConsumeUri.ts";
import Header from "@/new_components/common/Header.tsx";
import WebSocketMessageService from "@/utils/WebSocketMessageServices.ts";

type SseService = {
  execute: (json: any) => void;
};

const initParam: DashboardStaionRequestDto = {
  idCodeTsid: '',
  cityCode: '',
  searchKeyword: ''
}

export default function Dashboard() {
  const {t, i18n} = useTranslation();
  const [stationList, setStationList] = useState<Station[]>([]);
  const [station, setStation] = useState<Station>(stationList[0]);
  const [stationSlotList, setStationSlotList] = useState<StationSlot[]>([]);
  const [stationId, setStationId] = useState<string>('');
  const [updateAt, setUpdateAt] = useState(dayjs().format(t("format.date-time-uppercase")));
  const [searchParam, setSearchParams] = useState<DashboardStaionRequestDto>(initParam);

  const [showModal, setShowModal] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');

  function eventAggregate(): SseService {
    return {
      execute: (newStation: any) => {
        console.log(newStation)
        setStationList((prevList) => {
          const existingIndex = prevList.findIndex(item => item.stationId === newStation.stationId);
          // 기존 stationId가 있는 경우 해당 데이터를 교체하고, 없는 경우 새로 추가합니다.
          if (existingIndex !== -1) {
            // 이미 stationId가 존재하므로 교체합니다.
            return prevList.map(item =>
              item.stationId === newStation.stationId ? {...item, ...newStation, stationStatus: newStation.bssSts} : item
            );
          } else {
            return prevList;
          }
        });
      },
    };
  }

  function eventChassis(): SseService {
    return {
      execute: (json: any) => {
      },
    };
  }

  // function eventSlot(): SseService {
  //   return {
  //     execute: async (json: any) => {
  //       let stationId = '';
  //       await setStation((prev) => {
  //         if(prev){
  //           stationId = prev.stationId;
  //         }
  //         return prev;
  //       });
  //
  //       if (json.stationId && json.stationId == stationId) {
  //         setStationSlotList((prevList) => {
  //           if (!prevList) return [json];
  //           const existingIndex = prevList.findIndex(item => item.slotNum === json.slotNum);
  //           if (existingIndex !== -1) {
  //             return prevList.map(item =>
  //               item.slotNum === json.slotNum ?
  //                 {
  //                   ...item
  //                   , ...json
  //                 } : item
  //             );
  //           } else {
  //             return prevList;
  //           }
  //         });
  //       }
  //     },
  //   };
  // }

  function createDefaultService(): SseService {
    return {
      execute: (json: any) => {
      },
    };
  }

  const serviceMap: Map<string, SseService> = new Map([
    [IF_DATA_ENUM.BSS_AGGREGATE, eventAggregate()],
    [IF_DATA_ENUM.BSS_CHASSIS, eventChassis()],
    // [IF_DATA_ENUM.BSS_SLOT, eventSlot()],
  ]);

  function getService(condition: string): SseService {
    return serviceMap.get(condition) || createDefaultService();
  }

  useEffect(() => {
    const fnStationList = async () => {
      const resultData: [] = await getStationList(searchParam);
      if (resultData && resultData.length > 0) {
        setStationId(resultData[0].stationId);
      }

    }
    fnStationList();
  }, [searchParam]);

  useEffect(() => {
    const webSocketService = new WebSocketMessageService(createWebsocketUri(), serviceMap, '/topic/all');

    return () => {
      webSocketService.close();
    };
  }, []);

  // useEffect(() => {
  //   let eventSource: EventSource | null = null;
  //
  //   const connectSSE = () => {
  //     eventSource = new EventSource(createConsumeUri());
  //
  //     eventSource.addEventListener("all", (event) => {
  //       if (event?.data) {
  //         const newMessage = event.data;
  //         const json = JSON.parse(newMessage);
  //         const service = getService(event.lastEventId);
  //         service.execute(json);
  //         setUpdateAt(dayjs().format(t("format.date-time-uppercase")));
  //
  //       }
  //     })
  //     eventSource.onerror = () => {
  //       console.log(`EventSource connection error. `);
  //       eventSource?.close();
  //       setTimeout(connectSSE(), 1000);
  //
  //     };
  //   }
  //
  //   connectSSE();
  //
  //   return () => {
  //     if(eventSource){
  //       eventSource.close();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    document.body.classList.add("dark");
    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

  const getStation = async (stationId: string) => {
    // const result = await DashboardApiService().getStation(stationId);
    const result = await DashboardApiService().getGenStation(stationId)
        .catch(e => console.log(e));
    if(result?.data){
      setStation(result.data);
      setStationSlotList(result.data.stationSlots);
    }
  }

  const getStationList = async (params: DashboardStaionRequestDto) => {
    const reqParam = {
      ...params,
      "notStatusCode": "REGI"
    }
    const result = await DashboardApiService().getStationList(reqParam).catch(e => console.log(e));
    if(result?.data){
      setStationList(result.data);
    }
    return result?.data;
  }

  useEffect(() => {
    if (stationId) {
      getStation(stationId);
    }
  }, [stationId]);

  const stationListClick = (e: GridRowClickEvent) => {
    setStationId(e.dataItem.stationId);
  }

  return (
    <>
      <div className="dashboard">
        <Header headName={"Dashboard"} />

        <div className="dashboard-box">
          <div className="dashboard-row">
            <div className="t-update">{t("dashboard.update-at")} {updateAt}</div>
          </div>

          <div className="dashboard-row">
            {/* 1세대 */}
            <FirstGeneration setShowModal={setShowModal}/>

            {/* 2세대 */}
            <SecondGeneration setShowModal={setShowModal}/>

            {/* 목록 */}
            <StationList
              setStationList={setStationList}
              stationList={stationList}
              rowClick={stationListClick}
              setSearchParams={setSearchParams}
            />

            {/* 지도 */}
            {stationList && <StationGoogleMap stationList={stationList} station={station} setStationId={setStationId}/> }

            {/* 슬라이더 */}
            <StationDetail
              station={station}
              stationSlotList={stationSlotList}
              setStationSlotList={setStationSlotList}
            />
          </div>
        </div>
        {showModal && showModal.split('-')[0] == 'STATION' && (
          <ModalComponent
            onClose={() => setShowModal('')}
            title="스테이션 목록"
            showCloseButton={true}
            className="pop-dark"
            menuUrl={'/dashboard/popup/station'}
          >
            <StationListModal generation={showModal.split('-')[1]} status={showModal.split('-')[2]}/>
          </ModalComponent>
        )}
        {showModal && showModal.split('-')[0] == 'BATLOCK' && (
          <ModalComponent
            onClose={() => setShowModal('')}
            title="잠금 배터리 목록"
            showCloseButton={true}
            className="pop-dark"
            menuUrl={'/dashboard/popup/locked-battery'}
          >
            <LockedBatteryModal generation={showModal.split('-')[1]}/>
          </ModalComponent>
        )}
        {showModal && showModal == 'BATRSRV-2' && (
          <ModalComponent
            onClose={() => setShowModal('')}
            title="예약 배터리 목록"
            showCloseButton={true}
            className="pop-dark"
            menuUrl={'/dashboard/popup/gen2/reserved-battery'}
          >
            <ReservationBatteryModal />
          </ModalComponent>
        )}
        {showModal && showModal == 'BATRSRV-1' && (
            <ModalComponent
                onClose={() => setShowModal('')}
                title="예약 배터리 목록"
                showCloseButton={true}
                className="pop-dark"
                menuUrl={'/dashboard/popup/gen1/reserved-battery'}
            >
              <Reservation1stBatteryModal />
            </ModalComponent>
        )}
        {showModal && showModal == 'IRRSTATION-2' && (
          <ModalComponent
            onClose={() => setShowModal('')}
            title="진단 스테이션 목록"
            showCloseButton={true}
            className="pop-dark"
            menuUrl={'/dashboard/popup/gen2/irr-station'}
          >
            <IrregularStationListModal />
          </ModalComponent>
        )}
        {showModal && showModal == 'IRRSTATION-1' && (
            <ModalComponent
                onClose={() => setShowModal('')}
                title="진단 스테이션 목록"
                showCloseButton={true}
                className="pop-dark"
                menuUrl={'/dashboard/popup/gen1/irr-station'}
            >
              <IrregularStation1stListModal />
            </ModalComponent>
        )}
        {showModal && showModal.split('-')[0] == 'IRRBATTERY' && (
          <ModalComponent
            onClose={() => setShowModal('')}
            title="진단 배터리 목록"
            showCloseButton={true}
            className="pop-dark"
            menuUrl={'/dashboard/popup/irr-battery'}
          >
            <IrregularBatteryListModal generation={showModal.split('-')[1]}/>
          </ModalComponent>
        )}
      </div>

      </>
      );
      }
