/**
 * 생산정보 현황 Component
 * URL: /station/info/device
 */

/* React */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import RowSpanCellData from "@/components/kendo/grid/RowSpanCellData.tsx";
import CustomExpandIconCell from "@/views/station/components/CustomExpandIconCell"
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import DeviceSearchBox from "@/views/station/components/DeviceSearchBox";
import _ from 'lodash';
import { getFormattedTime } from '@/utils/common'

//Type
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { GridCellProps } from "@progress/kendo-react-grid";
import { NoticeReponse } from "@/utils/apiService/type/auth/Notice.type.ts";
import { Page } from "@/utils/apiService/type/common/Page.type.ts";
import { StationDeviceProcessDto, SlotInfo } from "@/utils/apiService/type/station/StationDeviceDto";

export default function StationInfoDeviceList() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  //검색조건
  const [searchParams, setSearchParams] = useState<{[key:string]:string}>({
    chassisSerialNumber: '',
  })

  const gridRef = useRef<{ 
    getSearchParams: () => object;
  }>(null)

  const [origin, setOrigin] = useState<Page<StationDeviceProcessDto>>({
    content: [],
    paging: undefined
  });
  const [processData, setProcessData] = useState<Page<StationDeviceProcessDto>>({
    content: [],
    paging: undefined
  });

  const { data, isLoading, isFetching, refetch } = useQuery<any, Error>({
    queryKey: ["stationDevice"],
    queryFn: () => {
      if(gridRef.current) {
        const params = gridRef.current.getSearchParams();
        return getStationDeviceList(params)
      }
      return undefined;
    },
    enabled: false, // 자동 실행 비활성화
  });

  const getStationDeviceList = async (params: any) => {
    const result: any = await StationApiService().getStationDeviceList(params);
    setInfoMessage(result.data.lastReceivedAt);
    const totalData = result.data.deviceInfoPages;
    const { content, ...orther} = totalData;
		return {
      content,
      paging: orther,
    };
  }

  const getOriginContent = (content: any[]) => {
    const cloneContent = _.cloneDeep(content);
    console.log('cloneContent', cloneContent)
    const processContent: StationDeviceProcessDto[] = [];
    cloneContent?.forEach(v => {
      const { chassisList, ...rest } = v;
      chassisList?.forEach((w: any) => {
        const { slots, tsid:housingTsid, isPrimary, ...restChassisList } = w;

        //슬롯Number로 정렬
        slots.sort((a:SlotInfo, b:SlotInfo) => a.slotNumber - b.slotNumber);

        slots?.forEach((x: any) => {
          const { 
            tsid:slotTsid,
            serialNumber:slotSerialNumber,
            hwVersion:slotHwVersion,
            manufacturedAt:slotManufacturedAt,
            ...restSloat
          } = x;
          
          const expanded = !isPrimary? undefined : chassisList?.length > 1? true : undefined;
          processContent.push({
            expanded,
            ...rest,
            housingTsid,
            isPrimary,
            ...restChassisList,
            slotTsid,
            slotSerialNumber,
            slotHwVersion,
            slotManufacturedAt,
            ...restSloat,
            //2024-11-14 추가
            qrId: v.qrId? v.qrId : '-',
          })
        })
      })
    })
    //console.log('processContent', processContent)
    const resultContent = RowSpanCellData(columns, processContent, 'serialNumber');
    return resultContent;
  }

  /**
   * 가공된 조회 데이터를 받아 대상
   * @param content 
   * @returns 
   */
  const getProcessContent = (content: any[]) => {
    const resultContent = content.filter(v => v.isPrimary);
    return resultContent;
  }

  const onClickExpanded = useCallback((e: any, cellProps: GridCellProps) => {
    console.log('onClickExpanded', e, cellProps)

    const expanded = !cellProps.dataItem.expanded;
    const housingTsid = cellProps.dataItem.housingTsid;
    const tsid = cellProps.dataItem.tsid;

    let originContent: any[] = [];
    setOrigin((prevState: any) => {
      originContent = prevState.content;
      return prevState;
    })

    setProcessData((prevState: any) => {
      const content = _.cloneDeep(prevState.content)
      console.log('content', content)
      //Step1. 기존 Content에서 클릭한 항목에대한 expanded 변경함
      content.forEach((v: any) => {
        if(v.housingTsid === housingTsid) v.expanded = expanded;
      })

      //Step2. 현재의 expanded에 따라 가져온걸 Content에서 날려버리거나 중간에 넣어줌
      let result: any[] = [];
      if(expanded) {
        //Step2-1. 현재 클릭한 함체의 ID와 동일하며 대표함체가 아닌것들은 날려버림
        result = content.filter((v: any) => !(v.tsid === tsid && !v.isPrimary))
      }
      else {
        //Step2-2-1. Origin Content에서 tsid가 동일하고 isPrimary가 false인 항목들을 가져옴
        const filterContent = originContent.filter(v => (v.tsid === tsid && !v.isPrimary));
        
        //Step2-2-2. 갖고온 항목들을 기존 Content 중간에 넣어줌
        for(let i=0; i<content.length; i++) {
          if(i !== 0) {
            if((content[i].tsid !== content[i-1].tsid) && (content[i-1].tsid === tsid)) {
              result.push(...filterContent)
            }
          }

          result.push(content[i])

          if((i === content.length - 1) && (content[i].tsid === tsid)) result.push(...filterContent)
        }
      }

      console.log('result', result)
      return {
        ...prevState,
        content: result,
      };
    })
  }, [processData]);

  /**
   * rowStyles 변경 예시 : flag라는 속성이 true인 값들만색칠
   * onSearch인 getNoticeList함수에서 가공해서 flag값을 만들어줌
   * @param props 
   * @returns 
   */
  const getRowStyles = (props: any) => {
    if(!props.dataItem['isPrimary']) return {background: '#FDFBF1'}
    return undefined;
  }

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "expanded",
      title: "",
      width: 50,
      cell: (props) => 
        <CustomExpandIconCell 
          {...props}
          onClick={onClickExpanded}
        />,
      isRowSpan: true,
      align: "center",
    },
    {
      field: "modelName",
      title: t("station.model_name"), //"모델명",
      width: 120,
      isRowSpan: true,
      align: "center",
    },
    {
      field: "qrId",
      title: t("station.qr_id"), //"QR ID",
      width: 90,
      isRowSpan: true,
      align: 'center',
    },
    {
      field: 'col1',
      title: t("station.device"), //'함체',
      children: [
        {
          field: "isPrimary",
          title: t("station.is_representative"), //"대표여부",
          width: 100,
          cell: (props: any) => <CustomRepresentativeCell {...props} />,
          isRowSpan: true,
          align: 'center',
        },
        {
          field: "orderNumber",
          title: t("station.sequence_number"), //"순번",
          width: 50,
          isRowSpan: true,
          align: "center",
        },
        {
          field: "serialNumber",
          title: t("station.case_serial_number"), //"함체 S/N",
          width: 140,
          isRowSpan: true,
          align: "center",
        },
        {
          field: "generationCode",
          title: t("station.generation_type"), //"세대구분",
          width: 100,
          isRowSpan: true,
          selectData: [],
          cellType: 'select',
          align: "center",
        },
        {
          field: "hwVersion",
          title: t("station.hw_version"), //"HW버전",
          width: 100,
          isRowSpan: true,
          align: "center",
        },
        {
          field: "manufacturedAt",
          title: t("station.production_date"), //"생산일",
          width: 120,
          isRowSpan: true,
          cellType: 'date',
          align: "center",
        },
      ]
    },
    {
      field: "changedAt",
      title: t("station.replace_datetime"), //"교체일시",
      width: 180,
      cellType: 'dateTime',
      isRowSpan: true,
      align: "center",
    },
    {
      field: "col2",
      title: t("station.slot"), //"슬롯",
      children: [
        {
          field: "slotNumber",
          title: t("station.number"), //"번호",
          width: 50,
          align: "center",
        },
        {
          field: "slotSerialNumber",
          title: t("station.serial_number"), //"S/N",
          width: 150,
          align: "center",
        },
        {
          field: "slotHwVersion",
          title: t("station.hw_version"), //"HW버전",
          width: 100,
          align: "center",
        },
        {
          field: "slotManufacturedAt",
          title: t("station.production_date"), //"생산일",
          width: 120,
          cellType: 'date',
          align: "center",
        },
        {
          field: "assembledAt",
          title: t("station.replace_datetime"), //"교체일시",
          width: 180,
          cellType: 'dateTime',
          align: "center",
        },
      ]
    },
  ])

  const downloadButton = async (params: any) => {
    console.log('params', params)

    const excludedFields = new Set(["expanded", "col1", "col2"]); // 제외할 필드 목록
    const prefixedFields = new Map([ // field명 변경할 field 목록
      ["isPrimary", "isPrimaryChassis"],
      ["orderNumber", "chassisOrderNumber"],
      ["serialNumber", "chassisSerialNumber"],
      ["generationCode", "chassisGenerationName"],
      ["hwVersion", "chassisHwVersion"],
      ["manufacturedAt", "chassisManufacturedAt"],
      ["changedAt", "chassisChangedAt"],
      ["assembledAt", "slotAssembledAt"],
    ]);
    const changeTitles = new Map([ // title명 변경할 field 목록 ['field명', 'title명']
      ["slotSerialNumber", t('station.slot_serial_number')],
    ]); 

    const excelMap = columns
      .flatMap(v => v.children ? v.children : v)
      .flatMap(v => {
        if (excludedFields.has(v.field)) return []; // 특정 필드는 제외

        const newField = prefixedFields.has(v.field)? prefixedFields.get(v.field) : v.field;
        const newTitle = changeTitles.has(v.field)? changeTitles.get(v.field) : v.title;
        return [{ [newField]: newTitle }];
      }
    );

    const excelParams: {[key:string]:string} = {
      'excelMap': JSON.stringify(excelMap),
    }

    for(let key in searchParams) {
      if((key === 'chassisSerialNumber' || key === 'slotSerialNumber') && searchParams[key] ) {
        excelParams[key] = searchParams[key];
      }
    }

    await StationApiService().downloadExcelStationDevice(excelParams);
  }

  /**
	 * 조회한 데이터에 이상 데이터가 존재할경우 그리드 info message를 보여줌
	 */
	const setInfoMessage = (date?: Date) => {
    const gridInfoMessage = <span>{`${t("station.device_last_received")} : ${date? getFormattedTime(date) : ''}`}</span>

		setGridProps({
			...gridProps,
			gridInfoMessage,
		})
	}

  const [gridProps, setGridProps] = useState<CommonGridProps<NoticeReponse>>(
    {
      gridHeight: 540, //그리드 높이
      //columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      //defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      //sortableGrid: true, //전체 정렬여부
      //unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      //multipleSorting: true, //다중 컬럼 sorting 여부
      //isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부 
      //isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      //displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      //isFilterResetButton: true, //필터 리셋버튼 생성여부
      //isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부
      //isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부

      //addButton,
      //onSearch : getFakeData,
      //deleteButton : deleteNotice,
      downloadButton,
    },
  );

  //data호출시 props 전달 state 변수에 담아줌
  useEffect(() => {
    console.log('useEffect data', data)
    const processContent = getOriginContent(data?.content);
    const process = {
      ...data,
      content: processContent,
    }
    setOrigin(process)
  }, [data])

  /**
   * OriginData에서 대표함체가 아닌것들을 제외해서 초기 데이터를 세팅해준다
   */
  useEffect(() => {
    const content = getProcessContent(origin?.content);
    const process = {
      ...origin,
      content,
    }
    setProcessData(process);
  }, [origin])

  const searchEvent = () => {
    refetch()
	}

  const setInitData = async() => {
    const result = await CodeApiService().getCodesByGroupCode({groupCode: 'SMGEN'});
    const genTypeList = result.data;

    setInitColumn([genTypeList])
  }

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
      if(v.children) {
        v.children.forEach(w => {
          if(w.field === 'generationCode') w.selectData = seletData[0];
        })
      }
		})
		setColumns(newColumn);
	}

  useEffect(() => {
    setInitData()
  }, [])

  return (
    <>
      {/* "생산정보 현황" */}
      <Header headName={t("station.production_info_status")} /> 
      <DeviceSearchBox
        searchEvent = {searchEvent}
        searchParams = {searchParams}
        setSearchParams = {setSearchParams}
      />
      <GridCommonComponent
        {...gridProps}
        ref={gridRef}
        rowStyles={getRowStyles}
        columnHeader = {columns} //캡쳐링 방지를위해 직관적으로 props 넘겨줌
        externalData = {processData} // New prop for external data
        externalLoading = {isLoading} // New prop for external loading state
        externalFetching = {isFetching} // New prop for external fetching state
        externalRefetch = {refetch} // New prop for external refetch

        searchParams={searchParams}
      />
    </>
  );
}
