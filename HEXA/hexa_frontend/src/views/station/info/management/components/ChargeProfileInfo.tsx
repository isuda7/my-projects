/**
 * 교환기 정보 상세 - 충전프로파일 정보 Component
 * URL: /station/info/management/detail/detail - 기기정보
 */
/* React */
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps  } from "@progress/kendo-react-form";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";

/* Common */
import BasicDateTime from "@/new_components/common/BasicDateTime";

/* Types */
import { ChargeProfileCompact } from "@/utils/apiService/type/station/StationInfoDto";

export default function ChargeProfileInfo(props: any) {
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  const chgProfiles: ChargeProfileCompact[] = formProps.valueGetter('chgProfiles'); 

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} {...props.tdProps}>
        <BasicDateTime value={props.children}/>
      </td>
    );
  };

  return (
    <>
      {/* 충전프로파일 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">
            {t('station.charge_profile_info')}
            {/* 충전 프로파일 정보 */}
          </h3>
        </div>

        <div className="grid-box-line">
          <Grid data={chgProfiles} scrollable="none">
            <GridNoRecords>{t('common.no_search_results')}</GridNoRecords>
            <Column
              field="no"
              title="No"
              width="80"
              className="txt-left"
            />
            <Column
              field="chgProfileNo"
              title={t('station.charge_profile_no')} //"충전 프로파일 NO"
              width="140"
              className="txt-left"
            />
            <Column
              field="condition"
              title={t('station.charging_condition')} //"충전 조건"
              width="140"
              className="txt-left"
            />
            <Column
              field="appliedAt"
              title={t('station.applied_at')} //"적용일시"
              width="140"
              className="txt-left"
              cells={{
                data: CustomCellDateTime,
              }}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
