/**
 * 구코드 추가 Component
 * URL: /station/code/id/add-district
 */
/* React */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

/* Kendo UI */
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert.tsx";
import _ from 'lodash';
import Header from "@/new_components/common/Header.tsx";

/* Type */
import { CityDistrictInfo, CityInfo } from "@/utils/apiService/type/station/StationIdCodeDto";

export default function StationIdAddDistrictCode() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();

	const [cityList, setCityList] = useState<CityInfo[]>([]);
	const [cityDistrictInfo, setCityDistrictInfo] = useState<CityDistrictInfo[]>([
		{ cityName: t('common.select'), cityCode: '-', districtName: '', districtCode: '' }
	])

	const registerCityInfo = useMutation({
		mutationFn: async () =>
			StationApiService().registStationCodeList(cityDistrictInfo),
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
		const newCityInfo = _.cloneDeep(cityDistrictInfo);
		//신규행 추가
		if (flag === 'add') {
			newCityInfo.push({ cityName: t('common.select'), cityCode: '-', districtName: '', districtCode: '' })
		}
		//행 삭제
		else {
			newCityInfo.splice(index as number, 1)
		}
		setCityDistrictInfo(newCityInfo);
	}

	/**
	 * 단위,코드 값 입력 이벤트
	 * 정규식으로 입력제한
	 * @param event 
	 * @param index 현재 입력중인 행의 index
	 */
	const onChangeCityValue = (event: InputChangeEvent, index: number) => {
		const newCityInfo = _.cloneDeep(cityDistrictInfo);
		const name = event.target.name;

		let regExp;
		if(name === 'districtCode') {
			regExp = /^(|[0-9]{0,2}?)$/;
		}
		if(regExp && !regExp?.test(event.value)) return;

		if (name) newCityInfo[index][name] = event.value;

		setCityDistrictInfo(newCityInfo)
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
	}

	/**
	 * 저장 전 유효성검사
	 * @returns 
	 */
	const validationCityInfo = () => {
		let result = true;
		
		let message = '';
		for(let i=0; i<cityDistrictInfo.length; i++) {
			if(cityDistrictInfo[i].cityCode === '-') {
				//'시 단위를 선택해주세요'
				message = t("common.select_required", { string: t("station.city_unit")}); 
				break;
			}

			if(!cityDistrictInfo[i].districtName) {
				//'구 단위를 입력해주세요'
				message = t("common.input_required", { string: t("station.district_unit")});
				break;
			}

			if(!cityDistrictInfo[i].districtCode) {
				//'구 코드를 입력해주세요'
				message = t("common.input_required", { string: t("station.district_code")});
				message = '구 코드를 입력해주세요'; 
				break;
			}
		}
		if(message) {
			showAlert({message})
			return false
		}

		return result;
	}

	/**
	 * DropDownList 값 변경 이벤트
	 * @param event 
	 * @param index 현재 변경중인 행의 Index
	 */
	const onDropDownListChange = (event: DropDownListChangeEvent, index: number) => {
		const newCityInfo = _.cloneDeep(cityDistrictInfo);
		newCityInfo[index] = {
			...newCityInfo[index],
			...event.value
		}
		setCityDistrictInfo(newCityInfo)
	}

	/**
	 * 시코드 목록 호출
	 * @returns 
	 */
	const getCityList = async () => {
		const response = await StationApiService().getCityList();
		console.log('getCityList', response.data)
		if(Array.isArray(response.data)) setCityList(response.data)
	}

	//최초로딩시 city list 조회
	useEffect(() => {
		getCityList(); //시코드 목록 호출
	}, [])

	return (
		<>
			{/* 구코드 추가 */}
			<Header headName={t("station.add_district_code")} />

			{/* 구 정보 */}
			<section className="section">
				<div className="title-group">
					{/* 구 정보 */}
					<h3 className="t-title">{t("station.district_info")}</h3>
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
						<col style={{ width: "30%" }} />
						<col style={{ width: "30%" }} />
						<col style={{ width: "40%" }} />
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
								{/* 구 단위 */}
								{t("station.district_unit")}
								<span className="required">
									<span className="sr-only">필수</span>
								</span>
							</th>
							<th scope="col">
								{/* 구 코드 */}
								{t("station.district_code")}
								<span className="required">
									<span className="sr-only">필수</span>
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{
							cityDistrictInfo.map((v, i) => {
								return (
									<tr>
										<td>
											<div className="in-input w300 m0-atuo">
												<DropDownList
													data={cityList}
													textField="cityName"
													dataItemKey="cityCode"
													value={{cityName : v.cityName, cityCode : v.cityCode}}
													onChange={(e) => onDropDownListChange(e, i)}
													defaultItem={{cityName: t("common.select"), cityCode: '-'}}
												/>
											</div>
										</td>
										<td>
											<div className="in-input w300 m0-atuo">
												<Input
													name="districtName"
													value={v.districtName}
													onChange={(e) => onChangeCityValue(e, i)}
												/>
											</div>
										</td>
										<td>
											<div className="in-input w300 m0-atuo">
												<div className="inner-item gap0.25">
													<Input
														name="districtCode"
														value={v.districtCode}
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
