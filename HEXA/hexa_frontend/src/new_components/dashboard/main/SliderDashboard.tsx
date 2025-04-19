import { useEffect, useRef, useState } from "react";
import {led_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {useTranslation} from "react-i18next";

export default function SliderDashboard(props: any) {

  const [slotSize, setSlotSize] = useState<number>(10);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {t} = useTranslation();
  const chunk = (data = [], size = 1) => {
    const arr = [];
    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }
    return arr;
  };
  const listData = chunk(props.slotList, slotSize);
  const arrleft = activeIndex === 0;
  const arrright = activeIndex + 1 === listData.length;

  const handleArrowRight = () => {
    if (activeIndex === listData.length - 1) return;
    setActiveIndex(activeIndex + 1);
  };

  const handleArrowLeft = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

  const customSlot = (item: any, i: any) => {
    let im = led_status[item?.slotLedSts] ?? 'blank' ;
    if(props.station?.generation == "1"){
       im = item.slotBatSts && led_status[item.slotBatSts];
    }
    // if(im){
      return <div key={i} className={`item state-${im}`}>
        <span>{t(`dashboard.led-status.${im}`)}</span>
      </div>

    // }else{
    //   return <div key={i} className={`item state-blank`}><span>{t(`dashboard.led-status.blank`)}</span></div>
    // }
  }

  useEffect(() => {
    setActiveIndex(0);
    if(props.station){
      setSlotSize(props.station?.generation == "2" ? 10 : 8);
    }
  }, [props.station]);

  return (
    <div className="slider">
      <div className="slideVisible">
        <div
          className="slideContainer"
          style={{
            transform: `translate3d(${-activeIndex * 100}%, 0, 0)`,
          }}
        >
          {listData.map((imgs: any, index: any) => (
            <div key={index} className="slide">
              {listData[index].map((item: any, i: any) => (
                customSlot(item, i)
              ))}
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
        {listData.map((_: any, index: any) => (
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
