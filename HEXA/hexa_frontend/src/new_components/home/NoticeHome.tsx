/* React */
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import BasicDateTime from "@/new_components/common/BasicDateTime";

export default function NoticeHome(props: any) {
  const {t} = useTranslation();
  const navigate = useNavigate()
  //console.log('role', role)

  const { data } = props;

  const moveNotice = (id: number) => {
    navigate(`/board/notice/detail`, { state: {id} })
  }

  return (
    <>
      {/* 공지사항 */}
      <div className="home-box type-notice">
        <h2>
          {t('home.notice') /* 공지사항 */}
        </h2>
        <Button 
          fillMode="flat" 
          className="btn-arr"
          onClick={() => navigate(`/board/notice`)}  
        >
          {/* 더보기 */}
          {t('home.more_info')}
        </Button>

        <ul className="home-notice">
          {
            data.map((v: any, i: number) => {
              return (
                <li key={`notice_${i}`}>
                  <a 
                    onClick={() => moveNotice(v.id)}
                    style={{
                      textDecoration: 'underline', /* 언더라인 추가 */
                      cursor: 'pointer' /* 손가락 모양 커서 */
                    }}  
                  >{v.title}</a>
                  {/* <Link to='/'>{v.title}</Link> */}
                  <span style={{whiteSpace: "nowrap" }}>
                    <BasicDateTime value={v.updatedAt} />
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
}
