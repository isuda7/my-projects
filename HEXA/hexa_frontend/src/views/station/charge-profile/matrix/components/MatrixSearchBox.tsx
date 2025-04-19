/**
 * 충전 프로파일 조건 설정 > 검색박스 Component
 * URL: /station/charge-profile/matrix > 검색박스
 */
import { useTranslation } from "react-i18next";

import { Button } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";

export default function MatrixSearchBox(props: any) {
  const { t } = useTranslation();
  const { setSearchParams, searchParams, searchEvent } = props;

  const onChange = (e: InputChangeEvent) => {
    console.log('onChange e', e)
    const regEx = /^\d*$/;
    const value = e.value;
    const name: string = e.target.props.name as string;
    if(regEx.test(value)) {
      setSearchParams((prevState: any) => {
        return {
          ...prevState,
          [name]: value,
        }
      })
    }
  }

  return (
    <>
      <section className="section">
        {/* 검색 박스 */}
        <p className="t-desc c-red">
          {/* ※ From ~ To 검색으로 숫자만 입력해주시고 두 개 이상을 조합하는 경우에는 & 조건으로 검색하게 됩니다. */}
          {t('station.matrix_search_info_message')}
        </p>
        <div className="search-group">
          <dl className="search-group__box">
            <div>
              <dt>
                {/* 온도(℃) */}
                {t('station.temperature')}(℃)
              </dt>
              <dd>
                <div className="in-input">
                  <Input
                    name={"tempMin"}
                    value={searchParams.tempMin}
                    onChange={onChange}
                    className="w100" 
                  /> 
                    ~ 
                  <Input
                    name={"tempMax"}
                    value={searchParams.tempMax}
                    onChange={onChange}
                    className="w100" 
                  /> 
                </div>
              </dd>
            </div>
            <div>
              <dt>
                {/* SOC(%) */}
                {t('common.SOC')}(%)
              </dt>
              <dd>
                <div className="in-input">
                  <Input
                    name={"socMin"}
                    value={searchParams.socMin}
                    onChange={onChange}
                    className="w100" 
                  /> 
                    ~ 
                  <Input
                    name={"socMax"}
                    value={searchParams.socMax}
                    onChange={onChange}
                    className="w100" 
                  /> 
                </div>
              </dd>
            </div>
            <div>
              <dt>
                {/* SOH(%) */}
                {t('common.SOH')}(%)
              </dt>
              <dd>
                <div className="in-input">
                  <Input
                    name={"sohMin"}
                    value={searchParams.sohMin}
                    onChange={onChange}
                    className="w100" 
                  /> 
                    ~ 
                  <Input
                    name={"sohMax"}
                    value={searchParams.sohMax}
                    onChange={onChange}
                    className="w100" 
                  /> 
                </div>
              </dd>
            </div>
          </dl>
          <div className="group-align-right">
            <Button 
              type={"button"}
              size={"medium"} 
              themeColor={"dark"}
              onClick={() => searchEvent?.()}
            >
              <i className="icon icon-search"></i>
              {t('common.search') /* 검색 */}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
