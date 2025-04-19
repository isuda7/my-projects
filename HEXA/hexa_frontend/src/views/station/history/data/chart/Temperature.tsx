/**
 * 스테이션 Data 수집 이력 조회 > 온도 탭 Component
 * URL: /station/history/data > 온도 탭
 */

/* React */
import { useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import ChartLine from "@/pub/components/ChartLine";

/* Common */
import GridComponent from "../common/GridComponent"
import useAlert from "@/hooks/useAlert";
import StationApiService from "@/utils/apiService/StationApiService";
import { getFormattedTime } from "@/utils/common";

//Types
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";

export default function Temperature(props: any) {
  const {t} = useTranslation();
  const showAlert = useAlert();

  const { gridData, xData=[], chartData, dateRangeProps } = props;

  const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "eventTime",
			title: t('station.datetime'), //'일시',
			width: 300,
			align: 'center',
      cellType: 'dateTime'
		},
		{
			field: "chassTemp",
			title: `${t('station.temperature')}(°C)`, //'온도(°C)',
			width: 300,
			align: 'center',
		}
  ])

  const gridInfoMessage = () => {
    return (
      <span className="c-red">
        {/* ※ 다운로드 시, 전체 데이터가 다운로드됩니다. */}
        ※ {t('station.download_data_message')}
      </span>
    )
  }

  const downloadButton = async () => {

		const excelMap = columns.map(v => ({[v.field]: v.title }))

    const params = {
      stationId: dateRangeProps.value, //HX0104001A1
      startDate: getFormattedTime(dateRangeProps.startDate),
      endDate: getFormattedTime(dateRangeProps.endDate)
    }

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationStatEvent(excelParams);
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<any>>(
		{
			gridHeight: 400,
			columnHeader: columns,
			girdToolBar: true,
			displayCount: [20, 50, 100],
			gridInfoMessage,
      downloadButton,
      gridClassName: 'grid-box-line'
		},
  );

  return (
    <>
      <div className="tab-chart-box">
        <div className="chart">
          <ChartLine
            data={chartData}
            dataX={xData}
            label={true}
            color={0}
            unit="°C"
          />
        </div>
      </div>

      <GridComponent
        {...gridProps}
        gridData = {gridData}
      />
    </>
  );
}
