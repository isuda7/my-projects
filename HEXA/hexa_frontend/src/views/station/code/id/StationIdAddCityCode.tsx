/**
 * 시코드 추가 Component
 * URL: /station/code/id/add-city
 */

/* React */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

/* Kendo UI */
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert.tsx";
import Header from "@/new_components/common/Header.tsx";
import _ from 'lodash';

/* Type */
import { CityInfo } from "@/utils/apiService/type/station/StationIdCodeDto";

export default function StationIdAddCityCode() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();

	const [cityInfo, setCityInfo] = useState<CityInfo[]>([
		{ cityName: '', cityCode: '' }
	])

	const registerCityInfo = useMutation({
		mutationFn: async () =>
			StationApiService().registStationCodeList(cityInfo),
		onSuccess: (response: any) => {
			//{title: '저장', message: '저장되었습니다'}
			showAlert({title: t('common.save'), message: t('common.save_success')})
			navigate('/station/code/id');
		},
		onError: (error) => {
			console.log(error);
			showAlert({ message: error.message })
		},
	});

	/**
	 * 플러스 마이너스 클릭 이벤트
	 * @param flag 행추가,삭제 flag
	 * @param index 현재 아이콘 클릭한 행의 index
	 */
	const onClickIcon = (flag: string, index?: number) => {
		const newCityInfo = _.cloneDeep(cityInfo);
		//신규행 추가
		if (flag === 'add') {
			newCityInfo.push({ cityName: '', cityCode: '' })
		}
		//행 삭제
		else {
			newCityInfo.splice(index as number, 1)
		}
		setCityInfo(newCityInfo);
	}

	/**
	 * 단위,코드 값 입력 이벤트
	 * 정규식으로 입력제한
	 * @param event 
	 * @param index 현재 입력중인 행의 index
	 */
	const onChangeCityValue = (event: InputChangeEvent, index: number) => {
		const newCityInfo = _.cloneDeep(cityInfo);
		const name = event.target.name;

		let regExp;
		if(name === 'cityCode') {
			regExp = /^(|[0-9]{0,2}?)$/;
		}
		if(regExp && !regExp?.test(event.value)) return;

		if (name) newCityInfo[index][name] = event.value;

		setCityInfo(newCityInfo)
	}

	const onSaveCityInfo = () => {
		//Validation Check
		if (!validationCityInfo()) return;

		// title: '저장',
		// message: '저장하시겠습니까?',
		showAlert({
			title: t('common.save'),
			message: t('common.save_confirm'),
			type: 'confirm',
			onConfirm: () => registerCityInfo.mutate(),
		})

		//registerCityInfo.mutate();
	}

	/**
	 * 유효성검사
	 * 빈값 체크, TODO:중복체크
	 * @returns 
	 */
	const validationCityInfo = () => {
		let result = true;
		let message = '';
		for(let i=0; i<cityInfo.length; i++) {
			if(!cityInfo[i].cityName) {
				message = t("common.input_required", { string: t("station.city_unit")}); //'시 단위를 입력해주세요'
				break;
			}

			if(!cityInfo[i].cityCode) {
				//'시 코드를 입력해주세요'
				message = t("common.input_required", { string: t("station.city_code")});
				break;
			}
		}
		if(message) {
			showAlert({message})
			return false
		}
		return result;
	}

	return (
		<>
			{/* 시코드 추가 */}
			<Header headName={t("station.add_city_code")} />
			{/* 시 정보 */}
			<section className="section">
				<div className="title-group">
					<h3 className="t-title">
						{/* 시 정보 */}
						{t("station.city_info")}
					</h3>
					<div className="group-align-right gap0.38">
						<Button
							size={"small"}
							fillMode="flat"
							className="btn-in-icon"
							onClick={() => onClickIcon('add')}
						>
							{/* 행 추가 */}
							{t("station.add_row")}
							<i className="icon icon-plus"></i>
						</Button>
					</div>
				</div>

				<table className="tbl-base">
					<colgroup>
						<col style={{ width: "50%" }} />
						<col style={{ width: "50%" }} />
					</colgroup>
					<thead>
						<tr>
							<th scope="col">
								{/* 시 단위 */}
								{t("station.city_unit")}
								<span className="required">
									<span className="sr-only">필수</span>
								</span>
							</th>
							<th scope="col">
								{/* 시 코드 */}
								{t("station.city_code")}
								<span className="required">
									<span className="sr-only">필수</span>
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{
							cityInfo.map((v, i) => {
								return (
									<tr>
										<td>
											<div className="in-input w300 m0-atuo">
												<Input
													name="cityName"
													value={v.cityName}
													onChange={(e) => onChangeCityValue(e, i)}
												/>
											</div>
										</td>
										<td>
											<div className="in-input w300 m0-atuo">
												<div className="inner-item gap0.25">
													<Input
														name="cityCode"
														value={v.cityCode}
														onChange={(e) => onChangeCityValue(e, i)}
													/>
													<Button 
														size={"small"} 
														fillMode="flat"
														onClick={() => onClickIcon('remove', i)}
													>
														<i className="icon icon-minus"></i>
													</Button>
												</div>
											</div>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</section>

      <div className="btn-group">
        <div className="group-align-right">
          <Button 
						size={"large"} 
						fillMode="outline"
						onClick={() => navigate(-1)}	
					>
            {/* 취소 */}
						{t("common.cancel")}
          </Button>
          <Button 
						size={"large"} 
						themeColor={"primary"}
						onClick={onSaveCityInfo}	
					>
            {/* 저장 */}
						{t("common.save")}
          </Button>
        </div>
      </div>
		</>
	);
}
