import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import { useTranslation } from "react-i18next";
import { any } from "prop-types";
import { IrregularCode, IrregularCodeResponseDto } from "@/utils/apiService/type/irregular/IrregularCodeDto";
import IrregularCodeApiService from "@/utils/apiService/irregular/IrregularCodeApiService";
import { Button } from "@progress/kendo-react-buttons";
import IrregularCodeExcelUpload from "./modal/IrregularCodeExcelUpload";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell";
import CodeApiService from "@/utils/apiService/CodeApiService";
import { getFormattedTime } from "@/utils/common";


export default function IrregularCodeList() {
  console.log('IrregularCodeList')
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cellClickFunction = (e: any, dataItem: any) => {
    console.log(dataItem);
    navigate('/irregular/code/detail', { state: dataItem.id });
  };

  const COLUMNS: GridHeader[] = [
    {
      field: "irrObject",
      title: t("station.target"),
      width: 100,
      align: "left",
      selectData: [],
      searchkey: "irrObject",
      filterable: true,
      filterType: "select",
      cellType: 'select',
    },
    {
      field: "asType",
      title: t("irregular.level"),
      width: 90,
      align: "center",
      selectData: [],
      searchkey: "asType",
      filterable: true,
      filterType: "select",
      cellType: 'select',
    },
    {
      field: "id",
      title: t("irregularCode.id"),
      hidden: true
    },
    {
      field: "code",
      title: t("irregular.irregular_code"),
      width: 120,
      align: "left",
      filterable: true,
      cellClick: cellClickFunction,
      cellTypeProps: {
        link: true,
      },
    },
    {
      field: "name",
      title: t("irregular.codeName"),
      width: 180,
      align: "left",
      filterable: true,
    },
    {
      field: "description",
      title: t("common.description"),
      width: 200,
      align: "left",
      filterable: true,
    },
    {
      field: "isAlert",
      title: t("irregular.isAlert"),
      width: 100,
      filterable: true,
      filterType: "select",
      selectData: [
        {code: true, value: 'Y'},
        {code: false, value: 'N'},
      ],
      align: 'center',
      cell: (props: any) => <CustomRepresentativeCell {...props} />,
    },
    {
      field: "updatedAt",
      title: t("common.modification_datetime"),
      width: 100,
      align: "left",
      cellType: "dateTime", // cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
    {
      field: "updatedUserId",
      title: t("common.modifier_id"),
      width: 120,
      align: "left",
      filterable: true,
    },
    {
      field: "createdAt",
      title: t("common.registration_datetime"),
      width: 100,
      align: "left",
      cellType: "dateTime",
    },
    {
      field: "createdUserId",
      title: t("common.registration_id"),
      width: 120,
      align: "left",
      filterable: true,
    },

  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)


  const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

  const setInitData = async () => {
    // 고장 대상
	  const res = await CodeApiService().getCodesByGroupCode({groupCode: 'EMIROJ'});
    const emiroj = res.data;

    // 고장 레벨
    const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'EMIRLV'});
    const emirlv = res2.data;

    setInitColumn([emiroj, emirlv]);
  }

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
        if (v.field === 'irrObject') v.selectData = seletData[0];
        if (v.field === 'asType') v.selectData = seletData[1];
    })
    setColumns(newColumn);
  }

  useEffect(() => {

	  setInitData()
  }, [])

  const addButton = () => {
    console.log('addButton')
    navigate("/irregular/code/add");
  };

  const downloadButton = async (params: IrregularCode) => {
    // 다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = columns.map(v => ({ [v.field]: v.title }));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      "excelMap": JSON.stringify(excelMap)
    }
    const result = await IrregularCodeApiService().downloadList(params);
  }

  const getIrregularCodeList = async (params: IrregularCode) => {
    const result = await IrregularCodeApiService().getIrregularCodeList(params);
    console.log("result.data", result.data);
    return result.data
  }
  
  const gridInfoMessage = () => <span>{`${t("grid.update")} ${getFormattedTime(new Date())}`}</span>

  const [gridProps, setGridProps] = useState<CommonGridProps<IrregularCodeResponseDto>>(
    {
      gridHeight: 550, //그리드 높이
      columnHeader: columns, //column 헤더 설정, 상단 defaultColumn 참고
      defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: true, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: false, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      addButton,
      onSearch: getIrregularCodeList,
      //deleteButton : deleteNotice,
      gridInfoMessage,
      downloadButton,
      queryKey: "getIrregularCodeList",
    },
  );

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  const buttonList = [
    <Button
      size={"medium"}
      fillMode="outline"
      themeColor={"light"}
      className="btn-in-icon"
      onClick={() => setModalOpen(true)}
    >
      {/* 엑셀 업로드  */}
      {t("common.excel_upload")}
      <i className="icon icon-excel"></i>
    </Button>
  ]

  const onCloseModal = () => {
    setModalOpen(false);
  }

  const onExcelUpload = () => {
    setModalOpen(false);
    window.location.reload();
  }

  return (
    <>
          <Header headName={t("irregular.irregular_code_management")} />
          <GridCommonComponent
            {...gridProps}
            ref={gridRef}
            buttonList={buttonList}
          />
          {
            modalOpen &&
            <IrregularCodeExcelUpload
              onClose={onCloseModal}
              onConfirm={onExcelUpload}
            />
          }
    </>
  );
}
