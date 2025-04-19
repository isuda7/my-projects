// 	HEXAADMHOM2P03 : 2세대 상세 팝업(관리자)

import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "함체 전체",
    Name: "냉난방기 ON",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "함체 01",
    Name: "메인보드 리셋",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 02",
    Name: "개방",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 02",
    Name: "강제 배출",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 02",
    Name: "강제 배출",
    YN: "Y",
  },
];

const sampleProducts2 = [
  {
    No: "01",
    Temperature: "23",
    Humidity: "60",
    CO2: "2",
    Flooding: "X",
    Ver: "1.0.00",
    Communication: "Online",
    Reset: "disabled",
    Door: "Close",
    KWH: "1,625,205",
    State: "ON",
    Switch: "냉난방기 ON",
    FanState: "Fail",
    FanSwitch: "",
    Gate: "차단기 OFF",
  },
  {
    No: "02",
    Temperature: "23",
    Humidity: "60",
    CO2: "2",
    Flooding: "X",
    Ver: "1.0.00",
    Communication: "Online",
    Reset: "",
    Door: "Close",
    KWH: "1,625,205",
    State: "ON",
    Switch: "냉난방기 ON",
    FanState: "Fail",
    FanSwitch: "disabled",
    Gate: "차단기 OFF",
  },
  {
    No: "03",
    Temperature: "23",
    Humidity: "60",
    CO2: "2",
    Flooding: "O",
    Ver: "1.0.00",
    Communication: "Online",
    Reset: "",
    Door: "Close",
    KWH: "1,625,205",
    State: "ON",
    Switch: "냉난방기 ON",
    FanState: "Fail",
    FanSwitch: "",
    Gate: "차단기 OFF",
  },
];

const sampleProducts3 = [
  {
    SlotBoard: "1",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "정상",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "OFF",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "2",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "정상",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "3",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "충전중",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "ON",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "4",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "예약중",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "ON",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "5",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "교환중",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "OFF",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "6",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "슬롯잠금",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "OFF",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "7",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "업데이트 중",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "ON",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "8",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "9",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "ON",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "10",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "OFF",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "11",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "12",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "13",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "14",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
  {
    SlotBoard: "15",
    FWver: "1.0.00",
    Communication: "Online",
    Switch: "",
    SlotNo: "1",
    NFCFWVer: "1.0.00",
    NFCComm: "Online",
    ChargerState: "ON",
    ChargerFWver: "1.0.00",
    ChargerComm: "Offline",
    ChargerSwitch: "",
    ChargerOff: "",
    Led: "빈슬롯",
    Sequence: "인증 중",
    SlotTop: "ON",
    SlotBottom: "ON",
    SlotState: "Close",
    SlotSwitch: "",
    BatterySensor1: "ON",
    BatterySensor2: "ON",
    BatteryLock: "",
    FanState: "Fail",
    FanSwitch: "",
    Certified: "",
    Gate: "",
  },
];

const sampleProducts4 = [
  {
    SlotNo: "1",
    ID: "1201211012",
    ChargeNo: "10",
    Charge: "0.45C Step 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "2",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "3",
    ID: "1201211012",
    ChargeNo: "8",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "4",
    ID: "1201211012",
    ChargeNo: "7",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "5",
    ID: "1201211012",
    ChargeNo: "6",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "6",
    ID: "1201211012",
    ChargeNo: "5",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "7",
    ID: "1201211012",
    ChargeNo: "4",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "8",
    ID: "1201211012",
    ChargeNo: "3",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "9",
    ID: "1201211012",
    ChargeNo: "2",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "10",
    ID: "1201211012",
    ChargeNo: "1",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },

  {
    SlotNo: "11",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "12",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "13",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "14",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "15",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "16",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "17",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "18",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "19",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "20",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },

  {
    SlotNo: "21",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "22",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "23",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "24",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "25",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "26",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "27",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "28",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "29",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
  {
    SlotNo: "30",
    ID: "1201211012",
    ChargeNo: "9",
    Charge: "0.45C 4.15V 충전",
    Sensor: "Y",
    State: "O",
    Pack: "40",
    PackTerminal: "15",
    Current: "6",
    TemLowest: "23",
    TemTop: "23",
    TemAverage: "23",
    SOC: "88",
    SOH: "60",
    BMSver: "1.0.00",
    DFET: "ON",
    CFET: "OFF",
    WakeUp: "O",
    BMS: "",
  },
];

export default function HEXAADMHOM2P03() {
  const [selected, setSelected] = React.useState<number>(0);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellBtn1 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button size={"small"} themeColor={"dark"} className={props.children}>
          메인보드 리셋
        </Button>
      </td>
    );
  };

  const CustomCellBtn2 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <div className="row flex-gap-0.5 flex-center">
          <Button size={"small"} themeColor={"dark"} className={props.children}>
            냉난방기 ON
          </Button>
          <Button size={"small"} fillMode="outline" className={props.children}>
            냉난방기 OFF
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellBtn3 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button size={"small"} themeColor={"dark"} className={props.children}>
            FAN ON
          </Button>
          <Button size={"small"} fillMode="outline" className={props.children}>
            FAN OFF
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellBtn4 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* 버튼 비활성화 class='disabeld' */}
        <div className="row flex-gap-0.5 flex-center">
          <Button size={"small"} fillMode="outline" className={props.children}>
            차단기 OFF
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellBtn5 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button size={"small"} themeColor={"dark"} className={props.children}>
          슬롯보드 리셋
        </Button>
      </td>
    );
  };

  const CustomCellBtn6 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button size={"small"} themeColor={"dark"} className={props.children}>
          충전기 리셋
        </Button>
      </td>
    );
  };

  const CustomCellBtn7 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button size={"small"} fillMode="outline" className={props.children}>
          충전기 OFF
        </Button>
      </td>
    );
  };

  const CustomCellBtn8 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button size={"small"} themeColor={"dark"} className={props.children}>
            ON
          </Button>
          <Button size={"small"} fillMode="outline" className={props.children}>
            OFF
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellBtn9 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button size={"small"} themeColor={"dark"} className={props.children}>
          1회 인증(개방)
        </Button>
      </td>
    );
  };

  const CustomCellBtn10 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button size={"small"} themeColor={"dark"} className={props.children}>
            Open
          </Button>
          <Button size={"small"} fillMode="outline" className={props.children}>
            Close
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellState = (props: any) => {
    const str = props.children;
    let style = "";

    switch (str) {
      case "정상":
        style = "mark-normal";
        break;

      case "충전중":
        style = "mark-charging";
        break;

      case "빈슬롯":
        style = "mark-blank";
        break;

      case "예약중":
        style = "mark-reservation";
        break;

      case "교환중":
        style = "mark-exchanging";
        break;

      case "슬롯잠금":
        style = "mark-lock";
        break;

      case "업데이트 중":
        style = "mark-updating";
        break;
    }
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={style}></span>
      </td>
    );
  };

  const CustomCellTextColor = (props: any) => {
    const textColor = () => {
      if (props.children === "Fail") {
        return "c-red";
      }
    };

    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={`${textColor()}`}>{props.children}</span>
      </td>
    );
  };

  return (
    <>
      <div className="win-pop-wrap">
        {/* 스테이션 정보 */}
        <section className="section">
          {/* 2025-03-20 수정 (1.상단 틀고정) */}
          <div className="title-group__sticky">
            <div className="title-group">
              <h3 className="t-title">스테이션 정보</h3>
              <div className="title-group__update">
                <span>업데이트 일시 2024-08-05 22:00:10</span>
                <Button themeColor={"info"}>
                  <i className="icon icon-refresh-thin"></i>
                </Button>
                <Button size={"medium"} themeColor={"dark"}>
                  사용자 화면 전환
                </Button>
              </div>
            </div>
          </div>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">스테이션 ID</th>
                <td>0218B04C1</td>
                <th scope="row">스테이션명</th>
                <td>GS25 강남점</td>
                <th scope="row">QR ID </th>
                <td>C03334</td>
                <th scope="row">세대 구분 </th>
                <td>2세대</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td colSpan={3}>서울특별시 강남구 강남대로 382 </td>
                <th scope="row">슬롯 개수</th>
                <td>30</td>
                <th scope="row">스테이션 상태 </th>
                <td>
                  <span className="mark-normal">정상</span>
                  {/* <span className="mark-unable">교환불가</span>
                  <span className="mark-error">오류발생</span>
                  <span className="mark-lock">전체잠금</span>
                  <span className="mark-disconnection">통신단절</span> */}
                </td>
              </tr>
              <tr>
                <th scope="row">사용가능전력량(Wh)</th>
                <td>2,300</td>
                <th scope="row">누적전력량(kWh)</th>
                <td>1,625,205</td>
                <th scope="row">누적 교환횟수</th>
                <td>1,600</td>
                <th scope="row">금일 교환횟수 </th>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">비고</th>
                <td colSpan={5}>2024-11-10 스테이션 철거 예정</td>
                <th scope="row">APP 노출여부</th>
                <td>Y</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 최근 제어 이력 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">최근 제어 이력</h3>
            <div className="group-align-right">
              <Button fillMode="flat" className="btn-arr">
                더보기
              </Button>
            </div>
          </div>

          <div className="grid-box-line">
            <Grid
              style={{ maxHeight: "600px" }}
              data={sampleProducts}
              scrollable="none"
            >
              <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

              <Column
                className="txt-left"
                field="DateTime"
                title="제어일시"
                width="140"
                cells={{
                  data: CustomCellDateTime,
                }}
              />
              <Column
                className="txt-left"
                field="Target"
                title="대상"
                width="140"
              />
              <Column
                className="txt-left"
                field="Name"
                title="제어명"
                width="200"
              />
              <Column
                className="txt-center"
                field="YN"
                title="성공여부"
                width="100"
              />
            </Grid>
          </div>
        </section>

        {/* 함체 정보 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">함체 정보</h3>
          </div>

          <div className="row">
            {/* OS 및 운용 프로그램 */}
            <div className="col-7">
              <div className="title-group mt0">
                <h4 className="t-title-s mr1">1&#41; OS 및 운용 프로그램</h4>
                <div className="group-align-right gap0.38">
                  <Button size={"medium"}>제어프로그램 재구동</Button>
                  <Button size={"medium"}>OS 재부팅</Button>
                </div>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>스테이션 제어 프로그램</th>
                    <th>마지막 부팅 일시</th>
                    <th>부팅 사유</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="txt-center">1.0.00</td>
                    <td className="txt-center">2024-08-10 12:30:40</td>
                    <td className="txt-center">E234 2024-08-10 09:11:50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 라우터 */}
            <div className="col-5 pl1">
              <div className="title-group mt0">
                <h4 className="t-title-s mr1">2&#41; 라우터</h4>

                <div className="group-align-right">
                  <Button size={"medium"}>라우터 리셋</Button>
                </div>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>SW 버전</th>
                    <th>전화번호</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="txt-center">1.0.00</td>
                    <td className="txt-center">012-220-5110</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 내부 시스템 */}
            <div className="col-12">
              <div className="title-group mt0">
                <h4 className="t-title-s mr1">3&#41; 내부 시스템 </h4>
              </div>

              <div className="grid-row-2">
                <Grid
                  style={{ maxHeight: "600px" }}
                  data={sampleProducts2}
                  scrollable="scrollable"
                >
                  <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

                  <Column
                    className="txt-center"
                    field="No"
                    title="함체 번호"
                    width="90"
                  />
                  <Column
                    className="txt-center"
                    field="Temperature"
                    title="온도(℃)"
                    width="90"
                  />
                  <Column
                    className="txt-center"
                    field="Humidity"
                    title="습도(%)"
                    width="90"
                  />
                  <Column
                    className="txt-center"
                    field="CO2"
                    title="이산화탄소(ppm)"
                    width="100"
                  />
                  <Column
                    className="txt-center"
                    field="Flooding"
                    title="침수여부"
                    width="90"
                  />
                  <Column title="메인 보드 상태">
                    <Column
                      className="txt-center"
                      field="Ver"
                      title="FW 버전"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Communication"
                      title="통신"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Reset"
                      title="리셋"
                      width="100"
                      cells={{
                        data: CustomCellBtn1,
                      }}
                    />
                  </Column>
                  <Column
                    className="txt-center"
                    field="Door"
                    title="함체 도어"
                    width="100"
                  />
                  <Column
                    className="txt-center"
                    field="KWH"
                    title="누적 전력량(kWh)"
                    width="110"
                  />
                  <Column title="냉난방기">
                    <Column
                      className="txt-center"
                      field="State"
                      title="상태"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Switch"
                      title="제어"
                      width="120"
                      cells={{
                        data: CustomCellBtn2,
                      }}
                    />
                  </Column>
                  <Column title="FAN">
                    <Column
                      className="txt-center"
                      field="FanState"
                      title="상태"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="FanSwitch"
                      title="FAN 제어"
                      width="200"
                      cells={{
                        data: CustomCellBtn3,
                      }}
                    />
                  </Column>
                  <Column
                    className="txt-center"
                    field="Gate"
                    title="차단기 OFF"
                    width="100"
                    cells={{
                      data: CustomCellBtn4,
                    }}
                  />
                </Grid>
              </div>
            </div>
          </div>
        </section>

        <div className="tabs mt3">
          <TabStrip selected={selected} onSelect={handleSelect}>
            <TabStripTab title="슬롯 보드 및 슬롯">
              <section className="section">
                <div className="title-group">
                  <h3 className="t-title">슬롯 보드 및 슬롯 정보</h3>
                  <div className="group-align-right gap0.38">
                    <Button size={"medium"}>전체 슬롯보드 리셋 </Button>
                    <Button size={"medium"}>전체 슬롯 잠금</Button>
                    <Button size={"medium"}>전체 슬롯 잠금 해제</Button>
                  </div>
                </div>

                <div className="grid-row-2">
                  <Grid
                    style={{ maxHeight: "900px" }}
                    data={sampleProducts3}
                    scrollable="scrollable" // 2025-03-19 수정 (4.열고정)
                    className="k-grid-even k-grid-divider" // 2025-03-20 수정 (3.2줄단위 굵은선 추가)
                  >
                    <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

                    <Column
                      className="txt-center"
                      field="SlotBoard"
                      title="슬롯보드번호"
                      width="90"
                      locked={true}
                    />
                    <Column
                      className="txt-center"
                      field="Communication"
                      title="통신"
                      width="90"
                    />
                    <Column
                      className="txt-center"
                      field="Led"
                      title="LED표현"
                      width="100"
                      cells={{
                        data: CustomCellState,
                      }}
                    />
                    <Column
                      className="txt-center"
                      field="Sequence"
                      title="Sequence 상태"
                      width="110"
                    />

                    <Column title="슬롯 도어">
                      <Column
                        className="txt-center"
                        field="SlotTop"
                        title="감지 센서 상단"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="SlotBottom"
                        title="감지 센서 하단"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="SlotState"
                        title="상태"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="SlotSwitch"
                        title="도어 잠금 제어"
                        width="140"
                        cells={{
                          data: CustomCellBtn8,
                        }}
                      />
                    </Column>

                    <Column title="배터리 Lock">
                      <Column
                        className="txt-center"
                        field="BatterySensor1"
                        title="감지 센서#1"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="BatterySensor2"
                        title="감지 센서#2"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="BatteryLock"
                        title="배터리 Lock제어"
                        width="140"
                        cells={{
                          data: CustomCellBtn8,
                        }}
                      />
                    </Column>

                    <Column title="FAN">
                      <Column
                        className="txt-center"
                        field="FanState"
                        title="상태"
                        width="100"
                        cells={{
                          data: CustomCellTextColor,
                        }}
                      />
                      <Column
                        className="txt-center"
                        field="FanSwitch"
                        title="FAN 제어"
                        width="140"
                        cells={{
                          data: CustomCellBtn8,
                        }}
                      />
                    </Column>

                    <Column
                      className="txt-center"
                      field="Certified"
                      title="1회 인증"
                      width="140"
                      cells={{
                        data: CustomCellBtn9,
                      }}
                    />
                    <Column
                      className="txt-center"
                      field="Gate"
                      title="슬롯 도어 제어"
                      width="140"
                      cells={{
                        data: CustomCellBtn10,
                      }}
                    />
                    <Column title="충전기">
                      <Column
                        className="txt-center"
                        field="ChargerState"
                        title="상태"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="ChargerFWver"
                        title="FW 버전"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="ChargerComm"
                        title="통신"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="ChargerSwitch"
                        title="제어"
                        width="120"
                        cells={{
                          data: CustomCellBtn6,
                        }}
                      />
                      <Column
                        className="txt-center"
                        field="ChargerOff"
                        title="충전기 OFF"
                        width="120"
                        cells={{
                          data: CustomCellBtn7,
                        }}
                      />
                    </Column>
                    <Column title="NFC 보드">
                      <Column
                        className="txt-center"
                        field="NFCFWVer"
                        title="FW 버전"
                        width="100"
                      />
                      <Column
                        className="txt-center"
                        field="NFCComm"
                        title="통신"
                        width="100"
                      />
                    </Column>
                    <Column title="슬롯보드">
                      <Column
                        className="txt-center"
                        field="SlotNo"
                        title="슬롯번호"
                        width="90"
                        rowspan="2"
                      />
                      <Column
                        className="txt-center"
                        field="FWver"
                        title="FW 버전"
                        width="90"
                        rowspan="2"
                      />
                      <Column
                        className="txt-center"
                        field="Switch"
                        title="제어"
                        width="140"
                        rowspan="2"
                        cells={{
                          data: CustomCellBtn5,
                        }}
                      />
                    </Column>
                  </Grid>
                </div>
              </section>
            </TabStripTab>
            <TabStripTab title="배터리">
              <section className="section">
                <div className="title-group">
                  <h3 className="t-title">배터리 정보</h3>
                </div>

                <div className="grid-row-2">
                  <Grid
                    style={{ maxHeight: "900px" }}
                    data={sampleProducts4}
                    scrollable="scrollable"
                  >
                    <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

                    <Column
                      className="txt-center"
                      field="SlotNo"
                      title="슬롯번호"
                      width="90"
                    />
                    <Column
                      className="txt-center"
                      field="ID"
                      title="배터리 ID"
                      width="120"
                    />

                    <Column
                      className="txt-left"
                      field="ChargeNo"
                      title="충전 프로파일 NO"
                      width="80"
                    />
                    <Column
                      className="txt-left"
                      field="Charge"
                      title="충전 조건"
                      width="100"
                    />

                    <Column
                      className="txt-center"
                      field="Sensor"
                      title="배터리 반입 인식 센서"
                      width="90"
                    />
                    <Column
                      className="txt-center"
                      field="State"
                      title="배터리 인입 상태"
                      width="90"
                    />
                    <Column title="전압(V)">
                      <Column
                        className="txt-right"
                        field="Pack"
                        title="팩"
                        width="90"
                      />
                      <Column
                        className="txt-right"
                        field="PackTerminal"
                        title="팩 터미널"
                        width="90"
                      />
                    </Column>

                    <Column
                      className="txt-right"
                      field="Current"
                      title="전류(A)"
                      width="90"
                    />

                    <Column title="온도(℃)">
                      <Column
                        className="txt-right"
                        field="TemLowest"
                        title="최저"
                        width="90"
                      />
                      <Column
                        className="txt-right"
                        field="TemTop"
                        title="최고"
                        width="90"
                      />
                      <Column
                        className="txt-right"
                        field="TemAverage"
                        title="평균"
                        width="90"
                      />
                    </Column>

                    <Column
                      className="txt-right"
                      field="SOC"
                      title="SOC(%)"
                      width="90"
                    />
                    <Column
                      className="txt-right"
                      field="SOH"
                      title="SOH(%)"
                      width="90"
                    />
                    <Column
                      className="txt-center"
                      field="BMSver"
                      title="BMS SW 버전"
                      width="90"
                    />
                    <Column
                      className="txt-center"
                      field="DFET"
                      title="DFET"
                      width="90"
                    />
                    <Column
                      className="txt-center"
                      field="CFET"
                      title="CFET"
                      width="90"
                    />

                    <Column title="Wake-up">
                      <Column
                        className="txt-center"
                        field="WakeUp"
                        title="여부"
                        width="90"
                      />
                      <Column
                        className="txt-center"
                        field="BMS"
                        title="BMS 제어"
                        width="140"
                        cells={{
                          data: CustomCellBtn8,
                        }}
                      />
                    </Column>
                  </Grid>
                </div>
              </section>
            </TabStripTab>
          </TabStrip>
        </div>
      </div>
    </>
  );
}
