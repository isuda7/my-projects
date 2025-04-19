/**
 * 스테이션 정보 상세 - 사진 크게 보기 팝업
 * URL: /station/info/management/detail - 사진 크게 보기 팝업
 */

import { useState, useEffect } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import SliderImg from "./SliderImg.tsx";
import { useTranslation } from "react-i18next";

export default function PhotoSlider(props: any) {
  const {t} = useTranslation();
  const { data, onClose } = props;
  const [ dataImg, setDataImg ] = useState<any[]>([]);

  useEffect(() => {
    const newDataImg = []
    for(let key in data) {
      newDataImg.push({key, ImgUrl: data[key]})
    }
    setDataImg(newDataImg)
  }, [data])

  return (
    <Dialog title={t('station.photo_zoom')} onClose={onClose}> {/* "사진 크게 보기" */}
      <div className="dialog-box" style={{ width: "600px" }}>
        <div className="slider-img">
          <SliderImg dataImg={dataImg} />
        </div>
      </div>
    </Dialog>
  );
}
