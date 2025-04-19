/**
 * 스테이션 QR 코드 관리 신규생성 모달 Component
 * URL: /station/code/qr - 신규생성
 */
/* React */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";

/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

export default function QrCodeCreateModal(props: any) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const { onClose } = props;
	const [count, setCount] = useState('');

	const registerQrCode = useMutation({
		mutationFn: async (params: any) => {
			if(params) {
				return StationApiService().registerQrCodeList(params)
			}
		},
		onSuccess: (response: any) => {
			//저장되었습니다.
			showAlert({message: t('common.save_success')})
			onClose?.('success');
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const createQrCode = () => {
		if(!count) return;

		showAlert({
			title: t('station.creation'), //'생성',
			message: t('station.qr_creation_confirm'), //'QR 코드를 생성하시겠습니까?',
			type: 'confirm',
			onConfirm: () => registerQrCode.mutate({count: Number(count)})
		})
	}

	const onChange = (e: InputChangeEvent) => {
		const newValue = e.value;

    // 정규식을 사용하여 숫자만 입력 가능하고, 3자리까지 제한
    if (/^\d*$/.test(newValue) && newValue.length <= 3) {
      setCount(newValue);
    }
	}

	return (
		<Dialog>
			<Button
				size={"medium"}
				onClick={() => onClose()}
				fillMode="flat"
				className="btn-dialog-actions"
			></Button>
			<div className="dialog-box pop-s">
				<p className="txt-left mt1">
					{t('station.qr_creation_message')}
					{/* 생성할 QR코드 개수를 입력하세요. */}
				</p>
				<div className="in-input">
					<Input 
						value={count}
						onChange={onChange}
					/>
				</div>
			</div>

			<DialogActionsBar>
				<Button
					size={"medium"}
					themeColor={"primary"}
					onClick={createQrCode}
				>
					{t('common.confirm') /* 확인 */}
				</Button>
			</DialogActionsBar>
		</Dialog>
	);
}
