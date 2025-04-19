const CONTROL_DATA_ENUM = {

  PC_SW_REBOOT: "pc-sw-reboot",//제어프로그램 재구동
  PC_HW_REBOOT: "pc-hw-reboot",//OS 재부팅
  ROUTER_RESET: "router-reset",//라우터 리셋
  SLOT_BOARD_ALL_RESET: "slot-board-all-reset",//전체 슬롯 보드 리셋
  SLOT_ALL_LOCK: "slot-all-lock",//전체 슬롯 잠금
  SLOT_ALL_UNLOCK: "slot-all-unlock",//젠체 슬롯 잠금 해제
  AIR_CONDITIONING_ON: "air-conditioning-on",
  AIR_CONDITIONING_OFF: "air-conditioning-off",
  MAINBOARD_RESET: "mainboard-reset",
  CHASSIS_FAN_ON: "chassis-fan-on",
  CHASSIS_FAN_OFF: "chassis-fan-off",
  CHASSIS_CIRCUIT_BREAKER_OFF: "chassis-circuit-breaker-off",
  SLOT_BOARD_RESET: "slot-board-reset",
  SLOT_CHARGER_RESET: "slot-charger-reset",
  SLOT_CHARGER_OFF: "slot-charger-off",
  SLOT_LOCK: "slot-lock",
  SLOT_UNLOCK: "slot-unlock",
  SLOT_BATTERY_LOCK: "slot-battery-lock",
  SLOT_BATTERY_UNLOCK: "slot-battery-unlock",
  SLOT_FAN_ON: "slot-fan-on",
  SLOT_FAN_OFF: "slot-fan-off",
  SLOT_ONE_TIME_AUTH: "slot-one-time-auth",
  SLOT_DOOR_OPEN: "slot-door-open",
  SLOT_DOOR_CLOSE: "slot-door-close",
  WAKE_UP_ON: "wake-up-on",
  WAKE_UP_OFF: "wake-up-off",
  SLOT_RESET: "SLOTRESET",




}



type CONTROL_DATA_ENUM = typeof CONTROL_DATA_ENUM[keyof typeof CONTROL_DATA_ENUM];
export default CONTROL_DATA_ENUM;

// air-conditioning-on	냉난방기 ON
// air-conditioning-off	냉난방기 OFF
// mainboard-reset	메인 보드 리셋
// chassis-fan-on	함체 FAN ON
// chassis-fan-off	함체 FAN OFF
// chassis-circuit-breaker-off	함체 차단기 OFF
// slot-board-reset	슬롯 보드 리셋
// slot-charger-reset	충전기 리셋
// slot-charger-off	충전기 OFF
// slot-lock	도어 잠금 ON
// slot-unlock	도어 잠금 OFF
// slot-battery-lock	배터리 LOCK ON
// slot-battery-unlock	배터리 LOCK OFF//강제배출
// slot-fan-on	슬롯 팬 ON
// slot-fan-off	슬롯 팬 OFF
// slot-one-time-auth	1회 인증
// slot-door-open	슬롯 도어 OPEN//개방
// slot-door-close	슬롯 도어 CLOSE
// wake-up-on	BMS Wake-up ON
// wake-up-off	BMS Wake-up OFF