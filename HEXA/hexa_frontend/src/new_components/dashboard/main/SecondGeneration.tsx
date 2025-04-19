import * as React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {useQueries, useQuery} from "@tanstack/react-query";
import {Page} from "@/utils/apiService/type/common/Page.type.ts";
import {useTranslation} from "react-i18next";

interface stationInfo {
  register: number;//등록
  operation: number;//운영
  exchanging: number;//교환 가능
  lock: number;//전체 잠금
  unable: number;//교환 불가
  error: number;//오류 발생
  disconnection: number;//통신 단절
}

interface batteryInfo {
  operation: number;//운영
  lock: number;//잠금
  reservation: number;//예약
}

interface exchangeCount {
  today: number;//금일
  yesterday: number;//전일
  total: number;//전체
}

interface diagnosis {
  diagnosisStation: number;//진단 스테이션
  diagnosisBattery: number;//진단 배터리
  vehicleOperation: number;//전기 스쿠터 운영
  vehicleDriving: number;//전기 스쿠터 운행중
}
const initialStation: stationInfo = {
  register: 0,
  operation: 0,
  exchanging: 0,
  lock: 0,
  unable: 0,
  error: 0,
  disconnection: 0
};
const initialBattery: batteryInfo = {
  operation: 0,
  lock: 0,
  reservation: 0
};

const initialDiagnosis: diagnosis = {
  diagnosisStation: 0,
  diagnosisBattery: 0,
  vehicleOperation: 0,
  vehicleDriving: 0
};
interface Props {
	setShowModal: React.Dispatch<React.SetStateAction<string>>;
}
const refetchInervals = 10000;

const SecondGeneration = ({setShowModal}: Props) => {
	const {t} = useTranslation();
	const [isReady, setIsReady] = useState<boolean>(false);
  const [stationStatusCnt, setStationStatusCnt] = useState<stationInfo>(initialStation);
  const [batteryInfo, setBatteryInfo] = useState<batteryInfo>(initialBattery);
  const [exchangeCount, setExchangeCount] = useState<exchangeCount>();
  const [diagnosis, setDiagnosis] = useState<diagnosis>(initialDiagnosis);
	const queries = [
		{
			queryKey: ["dashboardBatteryStatus"],
			queryFn: () =>  getBatteryStatus(),
			enabled: isReady,
			refetchInterval: refetchInervals,
			refetchIntervalInBackground: true
		},
		{
			queryKey: ["dashboardIrregularStatus"],
			queryFn: () => {
				return getIrregularSummary()
			},
			enabled: isReady,
			refetchInterval: refetchInervals,
			refetchIntervalInBackground: true
		},
		{
			queryKey: ["dashboardStationSwapCnt"],
			queryFn: () => {
				return getStationSwapCnt()
			},
			enabled: isReady,
			refetchInterval: refetchInervals,
			refetchIntervalInBackground: true
		},
		{
			queryKey: ["dashboardStationStatusCnt"],
			queryFn: () => {
				return getStationStatusCnt()
			},
			enabled: isReady,
			refetchInterval: refetchInervals,
			refetchIntervalInBackground: true
		},
		// {
		// 	queryKey: ["batteryStatus2"],
		// 	queryFn: () => {
		// 		return getBatteryStatus()
		// 	},
		// 	refetchInterval: refetchInervalms,
		// 	refetchIntervalInBackground: true
		// }
	];
	useQueries({queries: queries});

	const sumByStatus = (data: any[], status: string) => data.reduce((sum, d) => sum + (d.status === status ? d.count : 0), 0);

	const getIrregularSummary = async () => {
		const result = await DashboardApiService().getIrregularStat();
		setDiagnosis((prevState)=> ({
			...prevState,
			diagnosisStation:  result?.data?.find((d: any) => d.irrObject === 'STAT')?.count || 0,
			diagnosisBattery:  result?.data?.find((d: any) => d.irrObject === 'BTR')?.count || 0,
		}))
		return result.data;
	}
	const getBatteryStatus = async () => {
		const result = await DashboardApiService().getBatteryStat();
		const data = result.data;
		setBatteryInfo((prevState) => ({
			...prevState,
			operation: sumByStatus(data, 'BTR'),
			lock: sumByStatus(data, 'LOCK'),
			reservation: sumByStatus(data, 'RSRV')
		}));
		return result.data;
	}

	const getStationSwapCnt = async () =>  {
		const result = await DashboardApiService().getStationSwapCnt();
		setExchangeCount((prevState)=>({
			...prevState,
			today: result?.data?.todaySwapCount || 0,
			yesterday: result?.data?.yesterdaySwapCount || 0,
			total: result?.data?.totalSwapCount || 0,
		}))
		return result.data;
	}

	const getStationStatusCnt = async () =>  {
		const result = await DashboardApiService().getStationStatusCnt();
		const data = result.data;
		setStationStatusCnt((prevState) => ({
			...prevState,
			register: sumByStatus(data, 'TOTAL'),
			operation: sumByStatus(data, 'OPER'),
			exchanging: sumByStatus(data, 'NORMAL'),
			lock: sumByStatus(data, 'LOCKED'),
			unable: sumByStatus(data, 'UNAVAILABLE'),
			error: sumByStatus(data, 'ERROR'),
			disconnection: sumByStatus(data, 'DISCONNECTION')
		}));
		return result.data;
	}


	const handleLink = (event: any, modalName: string) => {
		event.preventDefault();
		setShowModal(modalName);
	}

	useEffect(() => {
		setIsReady(true);
	}, []);

  return (
	<div className="box type-card">
	  <div className="type-card-title">
		<h3>
		  Second generation
		  <span className="flag-2">{t("dashboard.2nd-generation")}</span>
		</h3>
	  </div>

	  <div className="type-card-01">
		<div className="card-exchange">
		  <h4>{t("dashboard.2nd-generation-station")}</h4>
		  <div className="row">
			<dl>
			  <div>
				<dt>
				  <span className="mark-register">{t("dashboard.station-status.regi")}</span>
				</dt>
				<dd>{stationStatusCnt?.register?.toLocaleString()}</dd>
			  </div>
			  <div>
				<dt>
				  <span className="mark-operation">{t("dashboard.station-status.oper")}</span>
				</dt>
				<dd>{stationStatusCnt?.operation?.toLocaleString()}</dd>
			  </div>
			  <div>
				<dt>
				  <span className="mark-exchanging">{t("dashboard.station-status.available-change")}</span>
				</dt>
				<dd>{stationStatusCnt?.exchanging?.toLocaleString()}</dd>
			  </div>
			</dl>
			<dl>
			  <div>
				<dt>
				  <span className="mark-lock">{t("dashboard.station-status.all-lock")}</span>
				</dt>
				<dd>
				  <Link to={"#"} onClick={(e)=> handleLink(e,"STATION-2-LOCKED")}>{stationStatusCnt?.lock?.toLocaleString()}</Link>
				</dd>
			  </div>
			  <div>
				<dt>
				  <span className="mark-unable">{t("dashboard.station-status.unavailable-change")}</span>
				</dt>
				<dd>
				  <Link to={"#"} onClick={(e)=> handleLink(e,"STATION-2-UNAVAILABLE")}>{stationStatusCnt?.unable?.toLocaleString()}</Link>
				</dd>
			  </div>
			  <div>
				<dt>
				  <span className="mark-error">{t("dashboard.station-status.error")}</span>
				</dt>
				<dd>
				  <Link to={"#"} onClick={(e)=> handleLink(e,"STATION-2-ERROR")}>{stationStatusCnt?.error?.toLocaleString()}</Link>
				</dd>
			  </div>
			  <div>
				<dt>
				  <span className="mark-disconnection">{t("dashboard.station-status.disconnect")}</span>
				</dt>
				<dd>
				  <Link to={"#"} onClick={(e)=> handleLink(e,"STATION-2-DISCONNECT")}>{stationStatusCnt?.disconnection?.toLocaleString()}</Link>
				</dd>
			  </div>
			</dl>
		  </div>
		</div>
		<div className="card-battery">
		  <h4>{t("dashboard.2nd-generation")} {t("battery.battery")}</h4>
		  <dl>
			<div>
			  <dt>
				<span className="mark-operation">{t("dashboard.battery-status.oper")}</span>
			  </dt>
			  <dd>{batteryInfo.operation?.toLocaleString()}</dd>
			</div>
			<div>
			  <dt>
				<span className="mark-lock">{t("dashboard.battery-status.lock")}</span>
			  </dt>
				<dd><Link to={"#"} onClick={(e)=> handleLink(e, "BATLOCK-2")}>{batteryInfo.lock?.toLocaleString()}</Link></dd>
			</div>
			<div>
			  <dt>
				<span className="mark-reservation">{t("dashboard.battery-status.rsrv")}</span>
			  </dt>
				<dd><Link to={"#"} onClick={(e)=> handleLink(e, "BATRSRV-2")}>{batteryInfo.reservation?.toLocaleString()}</Link></dd>
			</div>
		  </dl>
		</div>
	  </div>

	  <div className="type-card-02">
		<h4>{t("dashboard.change-count")}</h4>
		<dl>
		  <div>
			<dt>{t("dashboard.today")}</dt>
			<dd>{exchangeCount?.today?.toLocaleString()}</dd>
		  </div>
		  <div>
			<dt>{t("dashboard.yesterday")}</dt>
			<dd>{exchangeCount?.yesterday?.toLocaleString()}</dd>
		  </div>
		  <div>
			<dt>{t("dashboard.allday")}</dt>
			<dd>{exchangeCount?.total?.toLocaleString()}</dd>
		  </div>
		</dl>
	  </div>

	  <div className="type-card-03">
		<dl>
		  <div>
			<dt>
				{t("dashboard.irr")} <br/>
				{t("station.station")}
			</dt>
				<dd><Link to={"#"} onClick={(e)=> handleLink(e, "IRRSTATION-2")}>{diagnosis.diagnosisStation?.toLocaleString()}</Link></dd>
		  </div>
		  <div>
			<dt>
				{t("dashboard.irr")} <br/>
				{t("battery.battery")}
			</dt>
			<dd><Link to={"#"} onClick={(e)=> handleLink(e, "IRRBATTERY-2")}>{diagnosis.diagnosisBattery?.toLocaleString()}</Link></dd>
		  </div>
		  <div>
			<dt>
				{t("dashboard.vehicle")}
			  <br/>
				{t("dashboard.oper-riding")}
			</dt>
			<dd>
			  <span>TODO</span>
			  <span>TODO</span>
			</dd>
		  </div>
		</dl>
	  </div>
	</div>
  );

}
export default SecondGeneration;