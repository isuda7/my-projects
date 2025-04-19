/**
 * 함체, 슬롯별 교환횟수
 * URL: /station/statistics/device-slot
 */

/* React */
import {  useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import DeviceExchangeList from "./DeviceExchangeList";
import SlotExchangeList from "./SlotExchangeList";
import _ from 'lodash';

export default function StationDeviceSlotExchangeList() {
  const { t } = useTranslation()
  // tab
  const [selected, setSelected] = useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  return (
    <>
      {/* 함체,슬롯별 교환횟수 */}
			<Header headName={t('station.exchange_count_by_case_and_slot')} />

      <div className="tabs">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title={t('station.device') /* 함체 */}>
            {/* 함체 */}
						<DeviceExchangeList />
          </TabStripTab>
          <TabStripTab title={t('station.slot') /* 슬롯 */}>
            {/* 슬롯 */}
						<SlotExchangeList />
          </TabStripTab>
        </TabStrip>
      </div>
    </>
  );
}
