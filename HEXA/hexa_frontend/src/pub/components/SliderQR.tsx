import { useState } from "react";

export default function uiSlider(props: any) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const timeOutRef = useRef<null | number>(null);

  // const delay: number = 3000;
  // const resetTimeOut = () => {
  //   if (timeOutRef.current) {
  //     clearTimeout(timeOutRef.current);
  //   }
  // };

  const handleArrowRight = () => {
    if (activeIndex === props.dataImg.length - 1) {
      setActiveIndex(0);
    } else setActiveIndex(activeIndex + 1);
  };

  const handleArrowLeft = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

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

  const arrleft = activeIndex === 0;
  const arrright = activeIndex + 1 === props.dataImg.length;

  return (
    <div className="slider">
      <div className="slideVisible">
        <div className="sliderTotal">
          <span>{activeIndex + 1}</span> / <span>{props.dataImg.length}</span>
        </div>

        <div
          className="slideContainer"
          style={{
            transform: `translate3d(${-activeIndex * 100}%, 0, 0)`,
          }}
        >
          {props.dataImg.map((imgs: any, index: any) => (
            <div key={index} className="slide">
              <div className="slide-text">
                QR ID : <span>{props.dataImg[index].ImgID}</span>
              </div>
              <div className="slide-img">
                <img src={props.dataImg[index].ImgUrl} alt="" />
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
        {props.dataImg.map((_: any, index: any) => (
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
