import { Button } from "@progress/kendo-react-buttons";

export default function uiButton() {
  return (
    <div>
      {/* button */}
      <h2 className="k-mt-14">Button</h2>
      <hr className="k-mt-4 k-mb-4" />

      <div className="btn-group">
        <Button size={"small"}>small</Button>
      </div>

      <div className="btn-group k-mt-4">
        <Button size={"medium"}>Medium</Button>
        <Button size={"medium"} themeColor={"primary"}>
          Primary
        </Button>
        <Button size={"medium"} disabled={true}>
          Disabled
        </Button>
        <div className="group-align-right">
          <Button>Right Button</Button>
          <Button themeColor={"primary"}>Right Button</Button>
        </div>
      </div>

      <div className="btn-group k-mt-4">
        <Button size={"large"}>Large</Button>
        <Button size={"large"} themeColor={"primary"}>
          Primary
        </Button>
        <Button size={"large"} disabled={true}>
          Disabled
        </Button>
        <div className="group-align-right">
          <Button size={"large"}>Right Button</Button>
          <Button size={"large"} themeColor={"primary"}>
            Right Button
          </Button>
        </div>
      </div>

      <div className="btn-group k-mt-4">
        <Button size={"small"} fillMode="outline">
          outline
        </Button>
        <Button size={"small"} fillMode="outline" themeColor={"light"}>
          outline light
        </Button>
        <Button size={"small"} fillMode="outline" disabled>
          outline
        </Button>
      </div>

      <div className="btn-group k-mt-4">
        <Button size={"small"} themeColor={"dark"}>
          dark
        </Button>
        <Button size={"small"} themeColor={"dark"} disabled>
          dark
        </Button>
      </div>

      <div className="btn-group k-mt-4">
        <Button size={"small"} fillMode="flat">
          flat default
        </Button>
      </div>

      <div className="sort-group k-mt-4">
        <div className="group-align-right gap0.38">
          <Button size={"small"} fillMode="flat" className="btn-in-icon">
            행 추가
            <i className="icon icon-plus"></i>
          </Button>
          <Button size={"small"} fillMode="flat" className="btn-in-icon">
            행 삭제
            <i className="icon icon-minus"></i>
          </Button>
          <Button size={"small"} fillMode="flat" className="btn-in-icon">
            열 추가
            <i className="icon icon-plus"></i>
          </Button>
          <Button size={"small"} fillMode="flat" className="btn-in-icon">
            열 삭제
            <i className="icon icon-minus"></i>
          </Button>
        </div>
      </div>

      <div className="sort-group k-mt-4">
        <div className="group-align-right gap0.38">
          <Button
            size={"medium"}
            fillMode="outline"
            themeColor={"light"}
            className="btn-in-icon"
          >
            엑셀 업로드 <i className="icon icon-excel"></i>
          </Button>
          <Button size={"medium"} className="btn-in-icon">
            시코드 추가 <i className="icon icon-city"></i>
          </Button>
          <Button size={"medium"} className="btn-in-icon">
            구코드 추가 <i className="icon icon-district"></i>
          </Button>
          <Button
            size={"medium"}
            themeColor={"primary"}
            className="btn-in-icon"
          >
            신규등록 <i className="icon icon-new-add"></i>
          </Button>
        </div>
      </div>

      <div className="sort-group__btns k-mt-4">
        <Button themeColor={"info"} title="필터 초기화">
          <i className="icon icon-filter"></i>
        </Button>
        <Button themeColor={"info"} title="컬럼 초기화">
          <i className="icon icon-tbl-layout"></i>
        </Button>
        <Button themeColor={"info"} title="컬럼 설정">
          <i className="icon icon-column"></i>
        </Button>
        <Button themeColor={"info"} title="파일 다운로드">
          <i className="icon icon-download"></i>
        </Button>
        <Button themeColor={"info"} title="인쇄하기">
          <i className="icon icon-print"></i>
        </Button>
        <Button themeColor={"info"} title="삭제하기">
          <i className="icon icon-recyclebin"></i>
        </Button>
        <Button themeColor={"info"} title="새로고침">
          <i className="icon icon-refresh-thin"></i>
        </Button>
        <Button themeColor={"info"}>
          <i className="icon icon-arr-left"></i>
        </Button>
        <Button themeColor={"info"}>
          <i className="icon icon-arr-right"></i>
        </Button>
        <Button themeColor={"info"}>
          <i className="icon icon-arr-up"></i>
        </Button>
        <Button themeColor={"info"}>
          <i className="icon icon-arr-down"></i>
        </Button>
      </div>

      <div className="etc-group__btns k-mt-4">
        <Button size={"none"} title="새로고침">
          <i className="icon icon-refresh-sm"></i>
        </Button>
      </div>
    </div>
  );
}
