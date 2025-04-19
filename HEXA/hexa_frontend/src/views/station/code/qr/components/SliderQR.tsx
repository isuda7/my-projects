/**
 * 스테이션 QR 코드 관리 프린트 모달 - QR코드 슬라이더 Component
 * URL: /station/code/qr - 프린트아이콘 - QR코드 슬라이더
 */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { convertToImageSrc } from "@/utils/common"

export default function uiSlider(props: any) {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleArrowRight = () => {
    if (activeIndex === props.data.length - 1) {
      setActiveIndex(0);
    } else setActiveIndex(activeIndex + 1);
  };

  const handleArrowLeft = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

  const arrleft = activeIndex === 0;
  const arrright = activeIndex + 1 === props.data.length;

  return (
    <div className="slider">
      <div className="slideVisible">
        <div className="sliderTotal">
          <span>{activeIndex + 1}</span> / <span>{props.data.length}</span>
        </div>

        <div
          className="slideContainer"
          style={{
            transform: `translate3d(${-activeIndex * 100}%, 0, 0)`,
          }}
        >
          {props.data.map((v: any, index: any) => (
            <div key={index} className="slide">
              <div className="slide-text">
                {t('station.qr_id')} : <span>{props.data[index].id}</span>
              </div>
              <div className="slide-img">
                <img src={convertToImageSrc(props.data[index].qrCode)} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!arrleft && (
        <button onClick={handleArrowLeft} className="leftArrow">
          <span className="k-sr-only">Back</span>
        </button>
      )}
      {!arrright && (
        <button onClick={handleArrowRight} className="rightArrow">
          <span className="k-sr-only">Next</span>
        </button>
      )}

      <div className="slideDotsContainer">
        {props.data.map((_: any, index: any) => (
          <div
            key={index}
            className={`slideDots ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
