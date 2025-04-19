import StationIdCodeList from "@/views/station/code/id/StationIdCodeList"
import StationIdAddCityCode from "@/views/station/code/id/StationIdAddCityCode"
import StationIdAddDistrictCode from "@/views/station/code/id/StationIdAddDistrictCode"
import StationQrCodeList from "@/views/station/code/qr/StationQrCodeList"
import StationFirmwareList from "@/views/station/firmware/management/StationFirmwareList";
import StationFirmwareAdd from "@/views/station/firmware/management/StationFirmwareAdd";
import StationFirmwareDetail from "@/views/station/firmware/management/StationFirmwareDetail";
import StationFirmwareDeployList from "@/views/station/firmware/deploy/StationFirmwareDeployList";
import StationFirmwareDeployAdd from "@/views/station/firmware/deploy/StationFirmwareDeployAdd";
import StationFirmwareDeployDetail from "@/views/station/firmware/deploy/StationFirmwareDeployDetail";
import StationInfoDeviceList from "@/views/station/info/device/StationInfoDeviceList";
import StationInfoManagementList from "@/views/station/info/management/StationInfoManagementList";
import StationInfoManagementAdd from "@/views/station/info/management/StationInfoManagementAdd";
import StationInfoManagementDetail from "@/views/station/info/management/StationInfoManagementDetail";
import StationLogDownload from "@/views/station/info/log/StationLogDownload";
import StationConfigManagementList from "@/views/station/config/management/StationConfigManagementList";
import StationConfigManagementAdd from "@/views/station/config/management/StationConfigManagementAdd";
import StationConfigManagementDetail from "@/views/station/config/management/StationConfigManagementDetail";
import StationConfigInit from "@/views/station/config/init/StationConfigInit";
import StationConfigStatusList from "@/views/station/config/status/StationConfigStatusList";
import StationChargeProfileList from "@/views/station/charge-profile/management/StationChargeProfileList";
import StationChargeProfileAdd from "@/views/station/charge-profile/management/StationChargeProfileAdd";
import StationChargeProfileDetail from "@/views/station/charge-profile/management/StationChargeProfileDetail";
import StationChargeProfileDeployList from "@/views/station/charge-profile/deploy/StationChargeProfileDeployList";
import StationChargeProfileDeployAdd from "@/views/station/charge-profile/deploy/StationChargeProfileDeployAdd";
import StationChargeProfileDeployDetail from "@/views/station/charge-profile/deploy/StationChargeProfileDeployDetail";
import ChargeProfileFactorList from "@/views/station/charge-profile/factor/ChargeProfileFactorList";
import ChargeProfileFactorAdd from "@/views/station/charge-profile/factor/ChargeProfileFactorAdd";
import ChargeProfileFactorDetail from "@/views/station/charge-profile/factor/ChargeProfileFactorDetail";
import ChargeProfileMatrixList from "@/views/station/charge-profile/matrix/ChargeProfileMatrixList";

import StationHistoryDashboard from "@/views/station/history/dashboard/StationHistoryDashboard";
import StationHistoryCharge from "@/views/station/history/charge/StationHistoryCharge";
import StationHistoryData from "@/views/station/history/data/StationHistoryData";
import StationExchangeList from "@/views/station/statistics/station-exchange/StationExchangeList";
import StationDeviceSlotExchangeList from "@/views/station/statistics/device-slot";
import StationExchangeFailedList from "@/views/station/statistics/exchange-failed/StationExchangeFailedList";
import PowerCapacityStatList from "@/views/station/statistics/power-capacity/PowerCapacityStatList";
import StationReservationList from "@/views/station/statistics/reservation/StationReservationList";

const BssRouter = [
	{ 
		// 스테이션 관리
		path: "station",
		children: [
			{   
				// 스테이션 정보 관리
				path: "info",
				children: [
					{   
						// 스테이션 생산정보 현황
						path: "device",
						element: <StationInfoDeviceList />,
					},
					{   
						// 스테이션 정보 관리
						path: "management",
						element: <StationInfoManagementList />,
					},
					{   
						// 스테이션 정보 등록
						path: "management/add",
						element: <StationInfoManagementAdd />,
					},
					{   
						// 스테이션 정보 상세
						path: "management/detail/:id",
						element: <StationInfoManagementDetail />,
					},
					{   
						// 스테이션 로그 다운로드
						path: "log",
						element: <StationLogDownload />,
					},
				]
			},
			{
				// 스테이션 코드 관리
				path: "code",
				children: [
					{   // 스테이션 ID 코드 관리
						path: "id",
						element: <StationIdCodeList />,
					},
					{   // 시 코드 추가
						path: "id/add-city",
						element: <StationIdAddCityCode />,
					},
					{   // 구 코드 추가
						path: "id/add-district",
						element: <StationIdAddDistrictCode />,
					},
					{   // 스테이션 QR 코드 관리
						path: "qr",
						element: <StationQrCodeList />,
					},
				]
			},
			{   // 펌웨어 및 배포 관리
				path: "firmware",
				children: [
					{   // 펌웨어 관리
						path: "management",
						element: <StationFirmwareList />,
					},
					{   // 펌웨어 등록
						path: "management/add",
						element: <StationFirmwareAdd />,
					},
					{   // 펌웨어 상세
						path: "management/detail",
						element: <StationFirmwareDetail />,
					},
					{   // 펌웨어 배포 관리
						path: "deploy",
						element: <StationFirmwareDeployList />,
					},
					{   // 펌웨어 배포 관리 등록
						path: "deploy/add",
						element: <StationFirmwareDeployAdd />,
					},
					{   // 펌웨어 배포 관리 상세
						path: "deploy/detail",
						element: <StationFirmwareDeployDetail />,
					},
				]
			},
			{   // 스테이션 설정 관리
				path: "config",
				children: [
					// {   // 스테이션 설정 현황
					// 	path: "management",
					// 	element: <StationFirmwareList />,
					// },
					{   
						// 스테이션 설정 관리
						path: "management",
						element: <StationConfigManagementList />,
					},
					{   
						// 스테이션 설정 변경
						path: "management/add",
						element: <StationConfigManagementAdd />,
					},
					{   
						// 스테이션 설정 상세
						path: "management/detail",
						element: <StationConfigManagementDetail />,
					},
					{   
						// 스테이션 초기 설정
						path: "init",
						element: <StationConfigInit />,
					},
					{   
						// 스테이션 설정 현황
						path: "status",
						element: <StationConfigStatusList />,
					},
				]
			},
			{   
				// 스테이션 충전 프로파일 배포 및 관리
				path: "charge-profile",
				children: [
					{   // 스테이션 충전 프로파일 관리
						path: "management",
						element: <StationChargeProfileList />,
					},
					{   // 스테이션 충전 프로파일 등록
						path: "management/add",
						element: <StationChargeProfileAdd />,
					},
					{   // 스테이션 충전 프로파일 상세
						path: "management/detail",
						element: <StationChargeProfileDetail />,
					},
					{   // 스테이션 충전 프로파일 Factor 관리
						path: "factor",
						element: <ChargeProfileFactorList />,
					},
					{   // 스테이션 충전 프로파일 Factor 등록
						path: "factor/add",
						element: <ChargeProfileFactorAdd />,
					},
					{   // 스테이션 충전 프로파일 Factor 상세
						path: "factor/detail",
						element: <ChargeProfileFactorDetail />,
					},
					{   // 스테이션 충전 프로파일 조건 설정
						path: "matrix",
						element: <ChargeProfileMatrixList />,
					},
					{   // 스테이션 충전 프로파일 배포 관리
						path: "deploy",
						element: <StationChargeProfileDeployList />,
					},
					{   // 스테이션 충전 프로파일 배포 등록
						path: "deploy/add",
						element: <StationChargeProfileDeployAdd />,
					},
					{   // 스테이션 충전 프로파일 배포 상세
						path: "deploy/detail",
						element: <StationChargeProfileDeployDetail />,
					},
				]
			},
			// {   // 스테이션 이력 조회
			//     path: "",
			//     element: <Navigate to="user" replace />,
			// },
			{   
				// 스테이션 이력 조회
				path: "history",
				children: [
					{   // 대시보드 제어이력
						path: "dashboard",
						element: <StationHistoryDashboard />,
					},
					{   // 스테이션 충전 이력
						path: "charge",
						element: <StationHistoryCharge />,
					},
					{   // 수집 Data 이력
						path: "data",
						element: <StationHistoryData />,
					},
				]
			},
			{   
				// 스테이션 통계정보
				path: "statistics",
				children: [
					{   // 스테이션 누적 교환횟수
						path: "station-exchange",
						element: <StationExchangeList />,
					},
					{   // 함체,슬롯별 교환횟수
						path: "device-slot",
						element: <StationDeviceSlotExchangeList />,
					},
					{   // 스테이션 누적 교환 실패횟수
						path: "exchange-failed",
						element: <StationExchangeFailedList />,
					},
					{   // 전력사용량
						path: "power-capacity",
						element: <PowerCapacityStatList />,
					},
					{   // 스테이션별 예약건수
						path: "reservation",
						element: <StationReservationList />,
					},
				]
			},
		],
	},
];

export default BssRouter;
