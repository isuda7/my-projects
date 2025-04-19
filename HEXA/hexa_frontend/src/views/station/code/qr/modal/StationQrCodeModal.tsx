/**
 * 스테이션 QR 코드 관리 프린트 모달 Component
 * URL: /station/code/qr - 프린트아이콘
 */
import {useTranslation} from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import SliderQR from "../components/SliderQR.tsx";
import QRPrinterButton from "../components/QRPrinterButton.tsx";
import QRDownloadButton from "../components/QRDownloadButton.tsx";

export default function StationQrCodeModal(props: any) {
	const { t } = useTranslation();
	const { onClose, data } = props;

  return (
		<Dialog title={t("station.qr_code_printing")} onClose={onClose}> {/* QR코드 인쇄하기 */}
			<div className="dialog-box" style={{ width: "510px" }}>
				<div className="slider-qr">
					<SliderQR data={data} />
				</div>
			</div>

			<DialogActionsBar>
        <QRDownloadButton data={data} />
				<Button size={"medium"} fillMode="outline" onClick={onClose}>
					{/* 취소 */}
					{t("common.cancel")}
				</Button>
				<QRPrinterButton data={data} />
			</DialogActionsBar>
		</Dialog>
  );
}
