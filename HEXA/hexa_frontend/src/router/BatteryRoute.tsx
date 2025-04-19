import BatteryInfoList from "@/views/battery/BatteryInfoList.tsx";
import BatteryInfoAdd from "@/views/battery/BatteryInfoAdd.tsx";
import BatteryInfoModify from "@/views/battery/BatteryInfoModify.tsx";
import BatteryUsageHistoryList from "@/views/battery/history/BatteryUsageHistoryList.tsx";
import BatteryChargeHistoryList from "@/views/battery/history/BatteryChargeHistoryList.tsx";
import BatteryRsrvHistoryList from "@/views/battery/history/BatteryRsrvHistoryList.tsx";
import BatteryChangeStateHistoryList from "@/views/battery/history/BatteryChangeStateHistoryList.tsx";
import BatteryStateList from "@/views/battery/stat/BatteryStateList.tsx";
import BatteryMonthly from "@/views/battery/stat/BatteryMonthly.tsx";
import BatterySohSearch from "@/views/battery/stat/BatterySohSearch.tsx";
import BatterySwapAndLocHistoryList from "@/views/battery/history/BatterySwapAndLocHistoryList.tsx";
import BatteryChargeStat from "@/views/battery/stat/BatteryChargeStat.tsx";


const BatteryRoute = [
  {
    path: "battery",
    children: [
      {//배터리 정보 관리
        path: "info",
        children: [
          {
            path: "",
            element: <BatteryInfoList/>,
          },
          {//배터리 정보 등록
            path: "add",
            element: <BatteryInfoAdd/>,

          },
          {//배터리 정보 상세
            path: "detail",
            element: <BatteryInfoModify/>,

          },
        ]

      },

      { //배터리 사용 변경 이력
        path: "usage-history",
        element: <BatteryUsageHistoryList/>,
      },
      { //배터리 교환 및 위치 이력
        path: "swap-history",
        element: <BatterySwapAndLocHistoryList/>,
      },
      { //배터리 예약 이력
        path: "reserv-history",
        element: <BatteryRsrvHistoryList/>,
      },
      { //배터리 충전 이력
        path: "charge-history",
        element: <BatteryChargeHistoryList/>,
      },
      { //배터리 상태 변화 이력
        path: "change-state",
        element: <BatteryChangeStateHistoryList/>,
      },
      { //배터리 충전 통계
        path: "charge-summary",
        element: <BatteryChargeStat/>,
      },
      { //배터리 주요지표
        path: "statistics",
        children: [
          { //배터리 교환 통계
            path: "average",
            element: <BatteryStateList/>,
          },
          { //배터리별 월변화량
            path: "monthly",
            element: <BatteryMonthly/>,
          }
          , { //배터리 SOH 조회
            path: "soh",
            element: <BatterySohSearch/>,
          }
        ]
      }
    ],
  },
];

export default BatteryRoute;
