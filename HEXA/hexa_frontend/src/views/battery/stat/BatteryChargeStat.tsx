// HEXAADMBTM2S10 : 배터리 상태변화 이력

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import SearchBox, {SearchBoxProps} from "@/new_components/battery/SearchBox.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import Header from "@/new_components/common/Header.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {useTranslation} from "react-i18next";
import useAlert from "@/hooks/useAlert.tsx";
import BatteryStatApiService from "@/utils/apiService/battery/BatteryStatApiService.ts";
import {BatteryChargeStatRequestDto} from "@/utils/apiService/type/battery/BatteryStatRequestDto.ts";
import {Page} from "@/utils/apiService/type/common/Page.type.ts";
import {useQuery} from "@tanstack/react-query";


export default function BatteryChargeStat() {
  const {t} = useTranslation();
  const showAlert = useAlert();
  const [gridData, setGridData] = useState();
  const [processData, setProcessData] = useState<Page<any>>({
    content: [],
    paging: undefined
  });
  const gridRef = useRef<{
    getSearchParams: () => object;
  }>(null)

  const { data, isLoading, isFetching, refetch } = useQuery<any, Error>({
    queryKey: ["batteryChargeStatSearch"],
    queryFn: () => {
      if(gridRef.current) {
        const params = gridRef.current.getSearchParams() as BatteryChargeStatRequestDto;;
        return getBatteryChargeSummary(params)
      }
      return undefined;
    },
    enabled: false, // 자동 실행 비활성화
  });

  const getBatteryChargeSummary = async (param: BatteryChargeStatRequestDto) => {
    const result = await BatteryStatApiService().getBatteryChargeStat(param);
    return result.data;
  }
  useEffect(() => {
    if(data){
      setProcessData(prevState => {
        return {
          ...prevState,
          paging: {
            ...prevState.paging,
            totalElements: data.length,
            first: prevState.paging?.first || false,
            last: prevState.paging?.last || false,
            totalPages: prevState.paging?.totalPages || 0,
            size: prevState.paging?.size || 0,
            page: prevState.paging?.page || 0,
            numberOfElements: prevState.paging?.numberOfElements || 0,
          },
          content: data
        }
      });
    }

  }, [data]);



  const COLUMNS: GridHeader[] = [
    {
      field: "btryId",
      title: t("battery.battery_id"),
      align: "center",
    },
    {
      field: "profileId",
      title: t("battery.charge_profile_no"),
      align: "center",
    },
    {
      field: "chargeConditionCode",
      title: t("battery.charging_condition"),
      align: "center",
    },
    {
      field: "count",
      title: t("battery.charging_count"),
      align: "center",
    },

  ];
  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const [gridProps, setGridProps] = useState<CommonGridProps<any>>(
    {
      gridHeight: 900, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      checkKey: "btryId", //Table의 PK컬럼 필드, default: id
      pagination: false,
      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
    },
  );

  const [searchBoxProps, setSearchBoxProps] = useState<SearchBoxProps>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
    allFlag: false,
    type: 'date',
    initState: 'week',
    btryId: '',
  });


  const searchEvent = () => {
    if (searchBoxProps.btryId === '') {

      showAlert({message: t("common.input_required2", {string: t('battery.battery_id')})});
      return;
    }
    refetch();
  }

  return (
    <>
      <Header headName={"배터리 충전 통계"}/>

      <SearchBox
        setSearchBoxProps={setSearchBoxProps}
        searchProps={searchBoxProps}
        searchEvent={searchEvent}
      />


      <section className="section">
        <div>
          <GridCommonComponent
            {...gridProps}
            ref={gridRef}
            externalData = {processData} // New prop for external data
            externalLoading = {isLoading} // New prop for external loading state
            externalFetching = {isFetching} // New prop for external fetching state
            externalRefetch = {refetch} // New prop for external refetch
            searchParams={{
              startAt: searchBoxProps?.startDate,
              endAt: searchBoxProps?.endDate,
              allFlag: searchBoxProps.allFlag,
              btryId: searchBoxProps.btryId,
            }}
          />
        </div>
      </section>
    </>);
}
