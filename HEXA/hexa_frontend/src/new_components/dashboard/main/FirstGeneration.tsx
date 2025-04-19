import * as React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useQueries, useQueryClient} from "@tanstack/react-query";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";

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
}

interface vehicle {
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
const initialExchangeCount: exchangeCount = {
    today: 0,
    yesterday: 0,
    total: 0
};
const initialDiagnosis: diagnosis = {
    diagnosisStation: 0,
    diagnosisBattery: 0
};

const initialVehicleCnt: vehicle = {
    vehicleOperation: 0,
    vehicleDriving: 0

}

const refetchInervals = 10000;

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<string>>;
}

const FirstGeneration = ({setShowModal}: Props) => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const {t} = useTranslation();
    const [stationInfo, setStationInfo] = useState<stationInfo>(initialStation);
    const [batteryInfo, setBatteryInfo] = useState<batteryInfo>(initialBattery);
    const [exchangeCount, setExchangeCount] = useState<exchangeCount>(initialExchangeCount);
    const [diagnosis, setDiagnosis] = useState<diagnosis>(initialDiagnosis);
    const [vehicleCnt, setVehicleCnt] = useState<vehicle>(initialVehicleCnt);

    const queries = [

        // {
        // 	queryKey: ["dashboardIrregularStatus"],
        // 	queryFn: () => {
        // 		return getIrregularSummary()
        // 	},
        // 	refetchInterval: refetchInervals,
        // 	refetchIntervalInBackground: true
        // },
        {
            queryKey: ["dashboard1stStationSwapCnt"],
            queryFn: () => {
                return getStationSwapCnt()
            },
            enabled: isReady,
            refetchInterval: refetchInervals,
            refetchIntervalInBackground: true
        },
        {
            queryKey: ["dashboard1stStationStatusCnt"],
            queryFn: () => {
                return getStationStatusCnt()
            },
            enabled: isReady,
            refetchInterval: refetchInervals,
            refetchIntervalInBackground: true
        },
        {
            queryKey: ["dashboard1stVehicleCnt"],
            queryFn: () => {
                return getVehicleCount()
            },
            enabled: isReady,
            refetchInterval: refetchInervals,
            refetchIntervalInBackground: true
        },
        {
            queryKey: ["dashboard1stAsCnt"],
            queryFn: () => {
                return getAsCount()
            },
            enabled: isReady,
            refetchInterval: refetchInervals,
            refetchIntervalInBackground: true
        },

    ];
    useQueries({queries: queries});


    const getStationSwapCnt = async () => {
        const result = await DashboardApiService().getBtryStatCntAndSwapCnt();
        setExchangeCount((prevState) => ({
            ...prevState,
            today: result?.data?.find((d: any) => d.type === 'batteryChangeCount' && d.stat === '9')?.cnt || 0,
            yesterday: result?.data?.find((d: any) => d.type === 'batteryChangeCount' && d.stat === '8')?.cnt || 0,
            total: result?.data?.find((d: any) => d.type === 'batteryChangeCount' && d.stat === '7')?.cnt || 0,
        }))

        setBatteryInfo((prevState) => ({
            ...prevState,
            operation: result?.data?.find((d: any) => d.type === 'battery' && d.stat === '1')?.cnt || 0,
            reservation: result?.data?.find((d: any) => d.type === 'battery' && d.stat === '4')?.cnt || 0,
            lock: result?.data?.find((d: any) => d.type === 'battery' && d.stat === '5')?.cnt || 0,
        }));
        return result.data;
    }

    const getStationStatusCnt = async () => {
        const result = await DashboardApiService().get1stStationStatusCnt();
        const data = result.data || [];
        const sumByStatus = (status: string) => data.reduce((sum, d) => sum + (d.bssSts === status ? d.cnt : 0), 0);

        setStationInfo((prevState) => ({
            ...prevState,
            register: data.reduce((sum, d) => sum + d.cnt, 0),
            operation: data.reduce((sum, d) => sum + d.cnt, 0),
            exchanging: sumByStatus('NORMAL'),
            lock: sumByStatus('LOCKED'),
            unable: sumByStatus('UNAVAILABLE'),
            error: sumByStatus('ERROR'),
            disconnection: sumByStatus('DISCONNECTION')
        }));
        return data;
    }

    const getVehicleCount = async () => {
        const result = await DashboardApiService().getVehicleCount();
        setVehicleCnt({vehicleOperation: 'TODO', vehicleDriving: result.data.nowOnBikeCount})
        return result.data;
    }


    const getAsCount = async () => {
        const result = await DashboardApiService().get1stAsCount();
        setDiagnosis({diagnosisStation: result.data?.stationCount, diagnosisBattery: result.data?.batteryCount})
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
                    First generation
                    <span className="flag-1">{t("dashboard.1st-generation")}</span>
                </h3>
            </div>

            <div className="type-card-01">
                <div className="card-exchange">
                    <h4>{t("dashboard.1st-generation-station")}</h4>
                    <div className="row">
                        <dl>
                            <div>
                                <dt>
                                    <span className="mark-register">{t("dashboard.station-status.regi")}</span>
                                </dt>
                                <dd>{stationInfo.register.toLocaleString()}</dd>
                            </div>
                            <div>
                                <dt>
                                    <span className="mark-operation">{t("dashboard.station-status.oper")}</span>
                                </dt>
                                <dd>{stationInfo.operation?.toLocaleString()}</dd>
                            </div>
                            <div>
                                <dt>
                                    <span
                                        className="mark-exchangeable">{t("dashboard.station-status.available-change")}</span>
                                </dt>
                                <dd>{stationInfo.exchanging?.toLocaleString()}</dd>
                            </div>
                            <div>
                                <dt>
                                    <span className="mark-exchanging">{t("dashboard.station-status.changing")}</span>
                                </dt>
                                <dd><Link to="/public">TODO</Link></dd>
                            </div>
                        </dl>
                        <dl>
                            <div>
                                <dt>
                                    <span className="mark-lock">{t("dashboard.station-status.all-lock")}</span>
                                </dt>
                                <dd>
                                    <Link to={"#"}
                                          onClick={(e) => handleLink(e, "STATION-1-LOCKED")}>{stationInfo.lock?.toLocaleString()}</Link>
                                </dd>
                            </div>
                            <div>
                                <dt>
                                    <span
                                        className="mark-unable">{t("dashboard.station-status.unavailable-change")}</span>
                                </dt>
                                <dd>
                                    <Link to={"#"}
                                          onClick={(e) => handleLink(e, "STATION-1-UNAVAILABLE")}>{stationInfo.unable?.toLocaleString()}</Link>
                                </dd>
                            </div>
                            <div>
                                <dt>
                                    <span className="mark-error">{t("dashboard.station-status.error")}</span>
                                </dt>
                                <dd>
                                    <Link to={"#"}
                                          onClick={(e) => handleLink(e, "STATION-1-ERROR")}>{stationInfo.error?.toLocaleString()}</Link>
                                </dd>
                            </div>
                            <div>
                                <dt>
                                    <span
                                        className="mark-disconnection">{t("dashboard.station-status.disconnect")}</span>
                                </dt>
                                <dd>
                                    <Link to="/public">TODO</Link>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="card-battery">
                    <h4>{t("dashboard.1st-generation-battery")}</h4>
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
                            <dd><Link to={"#"} onClick={(e)=> handleLink(e, "BATLOCK-1")}>{batteryInfo.lock?.toLocaleString()}</Link></dd>
                        </div>
                        <div>
                            <dt>
                                <span className="mark-reservation">{t("dashboard.battery-status.rsrv")}</span>
                            </dt>
                            <dd><Link to={"#"} onClick={(e)=> handleLink(e, "BATRSRV-1")}>{batteryInfo.reservation?.toLocaleString()}</Link></dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="type-card-02">
                <h4>{t("dashboard.change-count")}</h4>
                <dl>
                    <div>
                        <dt>{t("dashboard.today")}</dt>
                        <dd>{exchangeCount.today?.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt>{t("dashboard.yesterday")}</dt>
                        <dd>{exchangeCount.yesterday?.toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt>{t("dashboard.allday")}</dt>
                        <dd>{exchangeCount.total?.toLocaleString()}</dd>
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
                        <dd><Link to={"#"} onClick={(e)=> handleLink(e, "IRRSTATION-1")}>{diagnosis.diagnosisStation}</Link></dd>
                    </div>
                    <div>
                        <dt>
                            {t("dashboard.irr")} <br/>
                            {t("battery.battery")}
                        </dt>
                        <dd><Link to={"#"} onClick={(e)=> handleLink(e, "IRRBATTERY-1")}>{diagnosis.diagnosisBattery}</Link></dd>
                    </div>
                    <div>
                        <dt>
                            {t("dashboard.vehicle")}
                            <br/>
                            {t("dashboard.oper-riding")}
                        </dt>
                        <dd>
                            <span>{vehicleCnt.vehicleOperation?.toLocaleString()}</span>
                            <span>{vehicleCnt.vehicleDriving?.toLocaleString()}</span>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
export default FirstGeneration;