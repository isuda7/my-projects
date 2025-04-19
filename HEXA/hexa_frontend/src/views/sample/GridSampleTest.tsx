import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Popup } from "@progress/kendo-react-popup";
import { GridRowClickEvent } from "@progress/kendo-react-grid";
import GridComponent from "@/components/kendo/grid/GridComponent.tsx";
import { CommonGridProps } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import SampleApiService from "@/utils/apiService/SampleApiService.ts";
import useAlert from "@/hooks/useAlert.tsx";

function testHeaderGroup() {
  return (
    <div className="head-group">
      <h2 className="h2">Dashboard</h2>
      <div className="time-update">
        <span className="time">2023-11-12 11:10:15</span>
        <button aria-label="reload" type="button" className="btn-reload" />
      </div>

      <div className="group-align-right location">
        <i className="icon icon-home" /> <span>HeaderGroup</span>
      </div>
    </div>
  );
}

export default function GridSample() {
  const showAlert = useAlert();
  const cellClickPopMap = (event: {
    nativeEvent: { clientX: any; clientY: any };
    clientX: any;
    clientY: any;
  }) => {
    const mouseX = event.nativeEvent
      ? event.nativeEvent.clientX
      : event.clientX;
    const mouseY = event.nativeEvent
      ? event.nativeEvent.clientY
      : event.clientY;

    setPopupPosition({ left: mouseX, top: mouseY });
    setShowPopup((currentShowPopup) => !currentShowPopup);
  };

  const cellClickAlert = () => {
    console.log("cellClickAlert~!!!!!!!!!!!!!!!");
    showAlert({ title: "", message: "" });
  };

  const column = [
    {
      field: "title",
      title: "title",
      width: 200,
      align: "center",
      cellType: "link",
      filterable: true,
      filterType: "select",
      cellClick: cellClickPopMap,
      backGroundColor: "#772B2B3F",
      headerTextAlign: "center",
    },
    {
      field: "filePath",
      title: "filePath",
      width: 200,
      align: "center",
      show: false,
    },
    {
      field: "description",
      title: "description",
      width: 200,
      filterable: true,
      filterType: "select",
      cellType: "link",
      cellClick: cellClickAlert,
    },
    {
      field: "typeCd",
      title: "typeCd",
      width: 200,
      align: "left",
      filterable: true,
      filterType: "select",
    },
    {
      field: "fileName",
      title: "fileName",
      width: 200,
      align: "left",
    },
    {
      field: "createdAt",
      title: "createdAt",
      width: 200,
      align: "left",
    },
    {
      field: "createdBy",
      title: "createdBy",
      width: 200,
      align: "left",
      headerTextAlign: "center",
    },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  const addButton = () => {
    showAlert({ message: "add Button Click Page Move" });
  };

  const deleteButton = () => {
    alert("delete Button Click ");
  };

  const [commonGridProps, setCommonGridProps] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 500,
    columnHeader: column,
    rowSelectable: true,
    checkKey: "id",
    // isReorder: true,
    isGridResetButton: true,
    girdToolBar: true,
    // isResizable: true,

    defaultFilter: true,
  });

  // const [commonGridProps2, setCommonGridProps2] = useState<
  //   CommonGridProps<Company>
  // >({
  //   gridHeight: 500,
  //   columnHeader: column,
  //   isChecked: true,
  //   girdToolBar: true,
  //   addButton,
  //   deleteButton,
  //   isReorder: true,
  //   isGridResetButton: true,
  // });

  // const [commonGridProps3, setCommonGridProps3] = useState<
  //   CommonGridProps<Company>
  // >({
  //   gridHeight: 500,
  //   columnHeader: column,
  //   defaultFilter: true,
  //   rowSelectable: true,
  // });

  // const [commonGridProps4, setCommonGridProps4] = useState<
  //   CommonGridProps<Company>
  // >({
  //   gridHeight: 500,
  //   columnHeader: column,
  //   defaultFilter: true,
  //   sortableGrid: true,
  //   unsorted: true,
  //   isReorder: true,
  //   isResizable: true,
  //   girdToolBar: true,
  // });

  // const [commonGridProps5, setCommonGridProps5] = useState<
  //   CommonGridProps<Company>
  // >({
  //   gridHeight: 500,
  //   columnHeader: column,
  //   defaultFilter: true,
  //   sortableGrid: true,
  //   unsorted: true,
  //   isReorder: true,
  //   isResizable: true,
  //   girdToolBar: true,
  //   displayCount: [10, 20],
  // });

  const companyListQuery = () => ({
    queryKey: ["notice"],
    queryFn: async () => {
      const params = {page:0, size:500}
      const result = await SampleApiService().getNoticeList(params);
      return result as object;
    },
  });

  const { data } = useQuery<object, Error>(
    companyListQuery(),
  );

  useEffect(() => {
    if (data && data?.data?.content) {
      setCommonGridProps((prevState) => ({
        ...prevState,
        gridData: data?.data?.content,
      }));

      // setCommonGridProps2((prevState) => ({
      //   ...prevState,
      //   gridData: company?.data as unknown as Company[],
      // }));
      // setCommonGridProps3((prevState) => ({
      //   ...prevState,
      //   gridData: company?.data as unknown as Company[],
      // }));
      // setCommonGridProps4((prevState) => ({
      //   ...prevState,
      //   gridData: company?.data as unknown as Company[],
      // }));
      // setCommonGridProps5((prevState) => ({
      //   ...prevState,
      //   gridData: company?.data as unknown as Company[],
      // }));
    }
  }, [data]);

  const [popupPosition, setPopupPosition] = useState({ left: 50, top: 50 });

  return (
    <div className="contents">
      {/* <div style={{ marginBottom: 20 }}>
        <GridDataBindRestApiSample />
      </div> */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ margin: 20 }}>
          <span>1. * Notice 정보 가져오기 기존 AS_IS DataGrid</span>
        </div>
        <GridComponent {...commonGridProps} />
      </div>
{/* 
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <span>
            2. checkbox 그리드 ( add 버튼, delete 버튼, headerGroup 추가)
          </span>
        </div>
        <GridComponent {...commonGridProps2} headerGroup={testHeaderGroup()} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <span>3. 기본 필터 그리드</span>
        </div>
        <GridComponent {...commonGridProps3} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <span>
            4. 컬럼이동, 컬럼사이즈 조정 그리드 + 필터 초기화, 그리드 사이즈 및
            순서 초기화
          </span>
        </div>
        <GridComponent {...commonGridProps4} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <span>5. 필터 종류 ( 기본, 드랍다운, 체크박스)</span>
        </div>
        <GridComponent {...commonGridProps5} />
        {showPopup && (
          <div ref={popupRef}>
            <Popup offset={popupPosition} show={showPopup}>
              <p style={{ width: 200, height: 150 }}>
                <GoogleMapsWrapper>
                  <MapAddress address="서울시청" />
                </GoogleMapsWrapper>
              </p>
            </Popup>
          </div>
        )}
      </div> */}
    </div>
  );
}
