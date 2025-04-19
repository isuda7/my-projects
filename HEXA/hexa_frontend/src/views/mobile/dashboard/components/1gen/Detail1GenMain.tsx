import { useState, useEffect } from "react";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

/* Common */
import SlotInfo1Gen from "@/views/mobile/common/SlotInfo1Gen";

/* Types */
import { StationSlot } from "@/utils/apiService/type/dashboard/DashboardStation";

export default function Detail1GenMain(props: any) {

  const { data } = props;

  return (
    <section className="section mt1.5">
      {
        data?.stationSlots?.map((slot: StationSlot, i: number) => {
          return (
            <SlotInfo1Gen
              data = {slot}
            />
          )
        })
      }
    </section>
  );
}
