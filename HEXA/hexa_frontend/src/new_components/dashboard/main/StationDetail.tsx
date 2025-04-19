import {Button} from "@progress/kendo-react-buttons";
import * as React from "react";
import {useEffect} from "react";
import {Station, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import SliderDashboard from "@/new_components/dashboard/main/SliderDashboard.tsx";
import {useNavigate} from "react-router-dom";
import {roleSelector} from "@/store/modules/userStore.ts";
import {useAppSelector} from "@/store";
import IF_DATA_ENUM from "@/utils/apiService/type/dashboard/IfDataEnum.ts";
import {openDashboardDetail} from "@/utils/common.ts";
import {createConsumeUriIfNo, createConsumeUriStation, createWebsocketUri} from "@/utils/createConsumeUri.ts";
import WebSocketMessageService from "@/utils/WebSocketMessageServices.ts";

// 윈도우 팝업 사이즈
const width = 1800;
const height = 1108;

type SseService = {
  execute: (json: any) => void;
};

interface StationDetailProps {
  stationId?: string;
  station?: Station;
  stationSlotList: StationSlot[];
  setStationSlotList: React.Dispatch<React.SetStateAction<StationSlot[]>>;
}

const StationDetail = ({station, stationSlotList, setStationSlotList}: StationDetailProps) => {
  const role = useAppSelector(roleSelector);
  const navigate = useNavigate();
  useEffect(() => {
  }, [stationSlotList]);

  const navigateFunction = (e: any) => {
    openDashboardDetail(role, station?.generation, station?.stationId);
  };

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
  function createDefaultService(): SseService {
    return {
      execute: (json: any) => {
        console.log("createDefaultService 실행");
      },
    };
  }

  const serviceMap: Map<string, SseService> = new Map([
    [IF_DATA_ENUM.BSS_SLOT, eventSlot()],
  ]);

  function getService(condition: string): SseService {
    return serviceMap.get(condition) || createDefaultService();
  }

  // let eventSource: EventSource;
  // useEffect(() => {
  //   const connectSse = (id: string) => {
  //     eventSource = new EventSource(createConsumeUriStation(id));
  //
  //     eventSource.addEventListener(id, (event) => {
  //       if (event?.data) {
  //         const newMessage = event.data;
  //         const json = JSON.parse(newMessage);
  //         const service = getService(event.lastEventId);
  //         service.execute(json);
  //       }
  //     })
  //
  //     eventSource.onerror = () => {
  //       console.log(`EventSource connection error. `);
  //       eventSource.close();
  //       if (station && station.generation == '2') {
  //         setTimeout(connectSse(station.stationId), 1000);
  //       }
  //     };
  //
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  //
  //   if (station && station.generation == '2') {
  //     if(eventSource){
  //       eventSource.close();
  //     }
  //     connectSse(station.stationId);
  //   }
  //   return () => {
  //     if (eventSource) {
  //       eventSource.close();
  //     }
  //   };
  //
  // }, [station]);

  useEffect(() => {
    const webSocketService = new WebSocketMessageService(createWebsocketUri(), serviceMap, `/topic/${station?.stationId}/${IF_DATA_ENUM.BSS_SLOT}`);

    return () => {
      webSocketService.close();
    };
  }, [station]);


  return (
    <div className="box type-slider">
      <div className="type-slider-title">
        <h3 className="t-title"><span className="qr">{station?.qrId}</span>
          <Button
            size={"small"}
            fillMode="flat"
            onClick={(e) => navigateFunction(e)}
          >
            {station?.stationName}
          </Button>
        </h3>
        <p className="t-txt">{(station?.cityName ?? "") + " " + (station?.districtName ?? "") + " " + station?.address}</p>
        <p className="t-txt-b">{station?.note}</p>
      </div>

      <div className="slider-grid">
        <SliderDashboard station={station} slotList={stationSlotList}/>
      </div>
    </div>
  );
}

export default StationDetail;