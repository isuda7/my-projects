const led_status: any = {
    "00": "blank"
    , "01": "tbd"
    , "10": "reservation"
    , "11": "tbd"
    , "20": "exchangeable"
    , "21": "exchanging"
    , "30": "lock"
    , "31": "updating"
    , "40": "charging"
    , "41": "unable"
    , "0": "exchangeable"
    , "1": "charging"
    , "2": "exchanging"
    , "3": "error"
    , "4": "blank"
    , "5": "reservation"
    , "6": "lock"
}
//00 : 빈슬롯 - 흰색점등
// 01 : TBD - 흰색점멸
// 10 : 예약중 - 파란색점등
// 11 : TBD - 파란색점멸
// 20 : 교환가능 - 초록색점등
// 21 : 교환 중 - 초록색점멸
// 30 : 잠금 - 보라색점등
// 31 : 업데이트 중 - 보라색점멸
// 40 : 충전 중 - 주황색점등
// 41 : TBD - 주황색점멸

//1세대
/*0	충전완료	충전완료
1	충전중	현재 충전중
2	오프라인교체중	교체를 위해 오프라인예약된 배터리
3	고장	오류발생
4	빈슬롯	배터리가 없이 빈상태
5	온라인예약중	온라인으로 예약된 배터리
6	슬롯잠금	슬롯잠금상태
*/

const station_status: any = {
    "ERROR": "error"
    , "INIT": "reset"
    , "NORMAL": "normal"
    , "UNAVAILABLE": "unable"
    , "LOCKED": "lock"
    , "DISCONNECTION": "disconnection"
    , "-1": "error"
    , "0": "reset"
    , "1": "normal"
    , "2": "unable"
    , "3": "lock"
    , "-99": "disconnection"
}
//"오류발생 (-1) , 초기화 중(0), 정상 (1), 교환불가(2), 전체잠금(3)
//  * 교환불가는 교환 가능한 배터리가 없는 경우 표출
//  * 오류발생(-1)은 고장이며, 교환이 불능 상태인 경우에 표출"

export {
    led_status,
    station_status
}