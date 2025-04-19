import { useEffect, useRef, useState } from "react";

export default function uiSlider(props: any) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const timeOutRef = useRef<null | number>(null);

  // const delay: number = 3000;
  // const resetTimeOut = () => {
  //   if (timeOutRef.current) {
  //     clearTimeout(timeOutRef.current);
  //   }
  // };

  // useEffect(() => {
  //   resetTimeOut();
  //   timeOutRef.current = window.setTimeout(
  //     () =>
  //       setActiveIndex((prevIndex: number) =>
  //         prevIndex === props.dataImg.length - 1 ? 0 : prevIndex + 1
  //       ),
  //     delay
  //   );
  //   return () => {
  //     resetTimeOut();
  //   };
  // }, [activeIndex]);

  const chunk = (data = [], size = 1) => {
    const arr = [];
    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }
    return arr;
  };
  const listData = chunk(props.dataImg, 10);
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

  return (
    <div className="slider">
      <div className="slideVisible">
        <div className="sliderTotal">
          <span>{activeIndex + 1}</span> / <span>{listData.length}</span>
        </div>

        <div
          className="slideContainer"
          style={{
            // cursor: "grab",
            // transitionDuration: "0ms",
            // transitionDelay: "0ms",
            transform: `translate3d(${-activeIndex * 100}%, 0, 0)`,
          }}
        >
          {listData.map((imgs: any, index: any) => (
            <div
              key={index}
              className="slide"
              style={
                {
                  // transform: `rotateX(0deg) rotateY(${activeIndex == index ? "0" : "-180"}deg)`,
                }
              }
            >
              {listData[index].map((item: any, i: any) => (
                <div key={i}>{item.ImgName}</div>
              ))}
              <div className="slide-text"></div>
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
