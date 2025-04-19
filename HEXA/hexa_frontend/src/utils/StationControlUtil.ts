import {StationCtrlDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import useAlert from "@/hooks/useAlert.tsx";
import StationApiService from "@/utils/apiService/StationApiService.ts";
import i18n from "@/utils/i18n/i18n.ts";

const onClickSlotCtrl = (data: any, cntrl: string, gen: string) =>{
  let dto: StationCtrlDto = {
    stationId: data.stationId,
    slotNum: data.slotNum || data.positionNumber,
    controlTargetCode: "SLT",
    commandCode: cntrl,
  }
  console.log(data)
  if(cntrl == 'PACKDISPOSE'){
    dto = {
      ...dto,
        btryId: data.slotBatteryId || data.slotBatId
    }
  }

  callControlApi(dto, gen);
}

const onClickStationCtrl = (stationId: string | undefined, cntrl: string, gen: string) =>{
  if(!stationId){
    return false;
  }
  const dto: StationCtrlDto = {
    stationId: stationId,
    controlTargetCode: "STN",
    commandCode: cntrl
  }
  callControlApi(dto, gen);
}

const onClickChassisCtrl = (data: any, cntrl: string, gen: string) =>{
  const dto: StationCtrlDto = {
    stationId: data.stationId,
    chassNum: data.chassisNumber,
    controlTargetCode: "CHS",
    commandCode: cntrl
  }

  callControlApi(dto, gen);
}

const onClickSlotBoardCtrl = (data: any, cntrl: string, gen: string) =>{

  const dto: StationCtrlDto = {
    stationId: data.stationId,
    slotBoardNum: data.slotBoardNumber ?? (parseInt(data.slotNum / 2) + data.slotNum % 2),
    controlTargetCode: "SBD",
    commandCode: cntrl
  }

  callControlApi(dto, gen);
}

const callControlApi = (data: StationCtrlDto, gen: string) => {
  gen = gen ?? 'G2';
  const showAlert = useAlert();
  const handleConfirm = () => {
    StationApiService().controlStation(data, gen)
      .then(r => {
        showAlert({message: "제어 명령이 실행중에 있습니다.\n현재 화면에서 다른화면으로 이동하시면 제어가 제대로 적용되지 않을 수 있습니다.\n잠시만 기다려주십시오."})
      });
  }
  const controlName = `iot-control-name.${data.commandCode}`;
  showAlert({message: `[${i18n.t(controlName)}] 지금 실행하시겠습니까?`, type: "confirm", onConfirm: handleConfirm});

}

const getControlHistoryList = async (id: string, maxLength: number) => {
  const urlParams = {
    stationId: id
  }
  const result = await StationApiService().getStationControlHistoryList(urlParams, { showLoading: false });
  let controlList = result.data.content;
  if(result.data.content.length > maxLength){
    controlList = result.data.content.slice(0, maxLength);
  }
  return controlList;
}

export {
  onClickSlotCtrl,
  onClickSlotBoardCtrl,
  onClickStationCtrl,
  onClickChassisCtrl,
  getControlHistoryList
}