// 	HEXAADMHOM2P10 : 공지 팝업
import { useTranslation } from "react-i18next";

import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import { Checkbox, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import { setCookie } from "@/utils/common";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";

export default function NoticePopup(props: any) {
  const {t} = useTranslation();
  const { data, setData } = props;
  const { index, title, description, files} = data;

  const onChangeChecked = (e:CheckboxChangeEvent) => {
    if(e.value) {
      setCookie(`popup${index}`, 'done', 1);
      setData((prevState: any) => {
        return {
          ...prevState,
          open: false,
        }
      })
    }
  }

  const onClickFileDownload = async (e: any, id: string) => {
    e.preventDefault();
    await NoticeApiService().fileDownload(id);
  }
  
  return (
    <div className="win-pop">
      <div className="notice-pop-head">
        <div className="notice-pop-title">
          {/* 공지사항 */}
          {t('board.notice')}
        </div>
        <Button
          size={"small"}
          fillMode="flat"
          className="notice-pop-close"
          onClick={() => {
            setData((prevState: any) => {
              return {
                ...prevState,
                open: false,
              }
            })
          }}
        >
          <span className="sr-only">닫기</span>
        </Button>
      </div>
      <div className="notice-pop-body">
        <div className="notice-title">{title}</div>
        <div className="notice-cont">
          <div className="notice-file">
            {
              files && files.map((v:any) => <Link key={v.fileId} to='/' onClick={(e) => onClickFileDownload(e, v.fileId)}>{v.fileName}</Link>)
            }
          </div>
          <div 
            dangerouslySetInnerHTML={{__html: description}} 
          />
        </div>
      </div>
      <div className="notice-pop-footer">
        <div className="chexkbox-round">
          <Checkbox
            label={t('home.do_not_show_today')} // 오늘 하루 그만 보기
            onChange={onChangeChecked}
          />
        </div>
      </div>
    </div>
  );
}
