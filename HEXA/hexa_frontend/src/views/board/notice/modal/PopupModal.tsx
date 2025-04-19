import { Dialog } from "@progress/kendo-react-dialogs";
import { init } from "i18next";
import { file } from "jszip";
import { useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function PopupModal(props: any) {
  const { t, i18n } = useTranslation(); 
  // TODO 파일 추가해야됨..
  // const [data, setData] = useState<{ title?: string; description?: string } | null>(null);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [file, setFile] = useState<Array<string>>([]);

  const initData = () => {
    console.log(opener.document.getElementById("title").value);
    setTitle(opener.document.getElementById("title").value);
    console.log(opener.document.getElementById("description").textContent);
    setDes(opener.document.getElementById("description").textContent);
    const data = opener.document.getElementById("fileNames").textContent;
    const fileArray = data.split(",").filter(name => name.trim() !== "");
    setFile(fileArray);
  }

  useEffect(() => {
    initData();
    const parentLang = window.opener?.document.documentElement.lang;
    if (parentLang && i18n.language !== parentLang) {
      i18n.changeLanguage(parentLang);
    }
  }, []);

  return (
    <>
      <div className="notice-pop-head">
        <div className="notice-pop-title">
          {/* 공지 미리보기 */}
          {t('board.notice_preview')}
        </div>
        {/* 2024-11-22 'x' 버튼 삭제 */}
      </div>
      <div className="notice-pop-body">
        <div className="notice-title">{title}</div>

        <div className="notice-cont">
          <div className="notice-file">
            {/* {file.map((fileName, index) => (
              <div key={index}><i className="icon ico-files"></i> {fileName}</div>
            ))} */}
            {
              file && file.map((fileName, index) => <Link key={index}>{fileName}</Link>)
            }
          </div>
          <div dangerouslySetInnerHTML={{ __html: des }}></div>
        </div>
      </div>
    </>
  );
}