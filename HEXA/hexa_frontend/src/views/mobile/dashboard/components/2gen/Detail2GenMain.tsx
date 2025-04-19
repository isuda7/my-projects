import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

/* Common */
import ChassisGraph from "./ChassisGraph";
import SlotInfo2Gen from "@/views/mobile/common/SlotInfo2Gen";

/* Types */
import { DashboardStationDto, StationChassis, StationSlot } from "@/utils/apiService/type/dashboard/DashboardStation";

export default function Detail2GenMain(props: any) {
  const {t} = useTranslation()
  const { data } = props;
  // tab
  const [selected, setSelected] = useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="m-tab">
      <TabStrip selected={selected} onSelect={handleSelect}>
        {
          data?.stationChassis?.map((v: StationChassis, i:number) => {
            return (
              //함체
              <TabStripTab title={`${t('station.device')} 0${i+1}`}>
                <ChassisGraph 
                  data = {v}
                />
                {
                  data?.stationSlots?.map((slot: StationSlot, j: number) => {
                    const rangeValue = (i+1) * 10;
                    if(j < rangeValue && rangeValue-10 <= j) {
                      return (
                        <SlotInfo2Gen
                          data = {slot}
                          generation = {data.generation}
                        />
                      )
                    }
                  })
                }
              </TabStripTab>
            )
          })
        }
      </TabStrip>
    </div>
  );
}
