/**
 * File: RegisterInfo.tsx
 * Description: 공통 모든 등록정보 컴포넌트
 */

/* React */
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps  } from "@progress/kendo-react-form";

/* Common */
import BasicDateTime from "@/new_components/common/BasicDateTime";

export default function RegisterInfo(props: any) {
  const { t } = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  return (
    <>
      {/* 등록 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">
            {t('common.registration_info') /* 등록 정보 */}
          </h3>
        </div>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {t('common.registration_datetime') /* 등록일시 */}
              </th>
              <td>
                <BasicDateTime value={formProps.valueGetter('createdAt')} />
              </td>
              <th scope="row">
                {t('common.registration_id') /* 등록자 ID */}
              </th>
              <td>{formProps.valueGetter('createdUserId')}</td>
            </tr>
            <tr>
              <th scope="row">
                {t('common.modification_datetime') /* 수정일시 */}
              </th>
              <td>
                <BasicDateTime value={formProps.valueGetter('updatedAt')} />
              </td>
              <th scope="row">
                {t('common.modifier_id') /* 수정자 ID */}
              </th>
              <td>{formProps.valueGetter('updatedUserId')}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
