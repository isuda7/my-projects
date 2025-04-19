/* React */
import { useEffect, useState } from "react";

/* Common */
import NoticePopup from "./NoticePopup";
import { setCookie, getCookie } from "@/utils/common";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";


export default function PopupLayout(props: any) {

  const [popupVisible, setpopupVisible] = useState<boolean>(false)
  const [popupData1, setPopupData1] = useState({
    open: false,
    index: 1,
    title: '',
    description: '',
    files: []
  })
  const [popupData2, setPopupData2] = useState({open: false, index: 2})
  const [popupData3, setPopupData3] = useState({open: false, index: 3})
  const popupDataSetters = [setPopupData1, setPopupData2, setPopupData3]

  const setInit = async() => {
    const res: any = await NoticeApiService().getNoticePopupList()
    const data = [...res.data];

    //Step2. 팝업 데이터를 일일히 비교해 팝업을 연다
    data.map((v, i) => {
      const flag = getCookie(`popup${i+1}`)
      console.log('cookie flag', flag)
      if(!flag) {
        const newValue = {
          open: true,
          index: i+1,
          files: v.noticeFiles,
          ...v,
        }
        popupDataSetters[i](newValue)
      }
    })

  }

  useEffect(() => {
    setInit()
  }, [])

  useEffect(() => {
    if(popupData1.open || popupData2.open || popupData3.open) {
      setpopupVisible(true)
    }
    else { setpopupVisible(false) }
  }, [popupData1, popupData2, popupData3])
  
  return (
    <>
      {
        popupVisible && 
        <div className="notice-pop">
          {
            popupData1.open &&
            <NoticePopup 
              data={popupData1}
              setData={setPopupData1}
            />
          }
          {
            popupData2.open &&
            <NoticePopup 
              data={popupData2}
              setData={setPopupData2}
            />
          }
          {
            popupData3.open &&
            <NoticePopup 
              data={popupData3}
              setData={setPopupData3}
            />
          }
        </div>
      }
    </>
  );
}
