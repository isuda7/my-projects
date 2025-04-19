import BatteryDiagnosisHist from "@/views/irregular/BatteryDiagnosisHist";
import DisconnectionHist from "@/views/irregular/DisconnectionHist";
import IrregularCodeAdd from "@/views/irregular/irregularCode/IrregularCodeAdd";
import IrregularCodeDetail from "@/views/irregular/irregularCode/IrregularCodeDetail";
import IrregularCodeList from "@/views/irregular/irregularCode/IrregularCodeList";
import IrregularHist from "@/views/irregular/IrregularHist";
import {Navigate} from "react-router-dom";

const FailureRouter = [
    {
        path: "irregular",
        children: [
            {// 스테이션 고장 이력
                path: "station/history",
                element: <IrregularHist />,
            },
            {// 배터리 진단 이력
                path: "battery/history",
                element: <BatteryDiagnosisHist />,
            },
            {// 고장 코드 관리
                path: "code",
                children : [
                    {
                      path: "",
                      element: <IrregularCodeList />,
                    },
                    { // 고장 코드 등록
                        path: "add",
                        element: <IrregularCodeAdd />,
                    },
                    { // 고장 코드 상세
                        path: "detail",
                        element: <IrregularCodeDetail />,
                    }
                ]
            },
            {// 통신단절 현황
                path: "disruption",
                element: <DisconnectionHist />,
            },
        ],
    },
];

export default FailureRouter;
