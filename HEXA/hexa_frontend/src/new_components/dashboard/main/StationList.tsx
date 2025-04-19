import * as React from "react";
import {useEffect, useState} from "react";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {Input} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn, GridRowClickEvent, GridSortChangeEvent} from "@progress/kendo-react-grid";
import {orderBy, SortDescriptor} from "@progress/kendo-data-query";
import {DashboardStaionRequestDto, Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import StationApiService from "@/utils/apiService/StationApiService.ts";
import {StationIdCodeDto} from "@/utils/apiService/type/station/StationIdCodeDto.ts";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {useTranslation} from "react-i18next";


interface Props {
  setStationList?: React.Dispatch<React.SetStateAction<Station[]>>;
  stationList: Station[];
  rowClick?: (props: GridRowClickEvent) => void;
  setSearchParams: React.Dispatch<React.SetStateAction<DashboardStaionRequestDto>>;
}

const StationList = ({stationList, rowClick, setSearchParams}: Props) => {
  const {t} = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [citys, setCitys] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);

  const cityFn = async () => {
    let cityArr: any[] = [];

    const res2 = await StationApiService().getCityList();
    if (Array.isArray(res2?.data)) cityArr = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}));
    setCitys(cityArr);
  }

  const districtFn = async () => {
    //구 코드
    let districtsArr: any[] = [];
    const resData = await StationApiService().getStationCodeList({page: 0, size: 9999});
    if (resData.data && Array.isArray(resData?.data?.content)) {
      districtsArr = (resData.data.content as StationIdCodeDto[]).map((v: StationIdCodeDto) => ({
        code: v.tsid,
        value: v.districtName
      }))
    }

    setDistrict(districtsArr);
  }


  useEffect(() => {
  }, [stationList]);

  useEffect(() => {
    cityFn();
    districtFn();
  }, []);

  //sort
  const initialSort: Array<SortDescriptor> = [
    {field: "Possible", dir: "asc"},
  ];

  const [sort, setSort] = React.useState(initialSort);

  const CustomCellGeneration = (props: any) => (
    <td colSpan={1} className="k-table-td txt-center">

      <span className={`flag-${props.children}`}>{props.children}세대</span>
    </td>
  );

  const CustomCellAddress = (props: any) => {
    const dataItem = props.dataItem;
    if (!dataItem) return false;
    const address = (dataItem?.cityName ?? "") + " " + (dataItem?.districtName ?? "")
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <div className="list-address"><p>{dataItem.stationName}</p><p>{address}</p></div>
      </td>
    );
  };

  const CustomCellState = (props: any) => {
    const str = props.dataItem.isDisconnect ? 'DISCONNECTION':  props.children;
    let style = `mark-${station_status[str]}`;

    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={style}>{t(`dashboard.bss-status.${str}`)}</span>
      </td>
    );
  };

  const CustomCellPossible = (props: any) => {
    const dataItem = props.dataItem;
    if (!dataItem) return false;

    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="list-possible"><span>{dataItem.possibleSlot}</span><span>{dataItem.totSlot}</span></div>
      </td>
    );
  };

  const onRowClick = (e: GridRowClickEvent) => {
    rowClick?.(e);
  }
  const onChangeCity = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      cityCode: e.value.code
    }));
  }

  const onChangeDistrict = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      idCodeTsid: e.value.code
    }));
  }

  const onClickSearchKeyword = () => {
    setSearchParams((prev) => ({
      ...prev,
      searchKeyword: searchKeyword
    }));
  }

  const rowRender = (trElement: React.ReactElement<HTMLTableRowElement>, props: any) => {
    const trProps = {
      ...trElement.props,
      onClick: (e: React.MouseEvent<HTMLTableRowElement>) => onRowClick(props),
    };
    return React.cloneElement(trElement, trProps, trElement.props.children);
  };

  const handleSort = (e: GridSortChangeEvent) => {
    setSort(e.sort);
  }

  return (
    <div className="box type-list">
      <div className="type-list-search">
        <DropDownList
          defaultItem={{code: '', value: t("grid.total")}}
          className="w150"
          textField={"value"} // 표시될 텍스트 필드 (원하는 필드로 설정 가능)
          dataItemKey={"code"}
          data={citys}
          onChange={onChangeCity}
        />
        <DropDownList
          defaultItem={{code: '', value: t("grid.total")}}
          textField={"value"} // 표시될 텍스트 필드 (원하는 필드로 설정 가능)
          dataItemKey={"code"}
          data={district}
          className="w150"
          onChange={onChangeDistrict}
        />
        <div className="inner-item type-icon">
          <Input placeholder="검색어를 입력하세요." onChange={(e) => setSearchKeyword(e.value)}/>
          <Button
            size={"small"}
            fillMode="flat"
            className="btn-icon"
            onClick={onClickSearchKeyword}
          >
            <i className="icon icon-glass"></i>
          </Button>
        </div>
      </div>

      <div className="sort-group type-dark">
        <div className="sort-group__counter">
          <span className="total">
            {t("grid.total")} <span> {stationList?.length}</span>
          </span>
        </div>
      </div>

      <div className="grid-dark">
        <Grid
          style={{height: "400px"}}
          data={orderBy(stationList,sort)}
          scrollable="scrollable"
          sortable={true}
          sort={sort}
          onSortChange={(e: GridSortChangeEvent) => handleSort(e)}
          onRowClick={(e: GridRowClickEvent) => onRowClick(e)}
          rowRender={rowRender}
        >
          <GridColumn
            field="generation"
            title={t("dashboard.generation")}
            width="80"
            cells={{
              data: CustomCellGeneration,
            }}
          />
          <GridColumn
            field="stationName"
            title={t("dashboard.station-name")}
            width="200"
            cells={{
              data: CustomCellAddress,
            }}
          />
          <GridColumn
            field="stationStatus"
            title={t("dashboard.status")}
            width="120"
            cells={{
              data: CustomCellState,
            }}
          />
          <GridColumn
            field="possibleSlot"
            title={t("dashboard.available-exchaing")}
            width="90"
            cells={{
              data: CustomCellPossible,
            }}
          />
        </Grid>
      </div>
    </div>
  );
}
export default StationList;