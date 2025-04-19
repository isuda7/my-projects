import { useEffect, useRef, useState } from "react";
import { Reveal } from "@progress/kendo-react-animation";

export default function uiDroppop(props: any) {
  const dropMenuRef = useRef(document.createElement("div"));
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [isDropTitle] = useState<boolean>(props.title);
  let [val, setVal] = useState<string>(props.defaultvalue);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isDropMenuOpen && !dropMenuRef.current.contains(e.target))
        setDropMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropMenuOpen]);

  const dropListClick = (e: any) => {
    setDropMenuOpen(false);
    setVal(e.currentTarget.value);
  };
  const dropCloseClick = () => {
    setDropMenuOpen(false);
  };

  return (
    <div ref={dropMenuRef} className="droppop">
      <button
        type="button"
        value={val}
        className={`droppop-btn ${isDropMenuOpen ? "is-active" : ""}`}
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
      >
        <span>{props.text}</span>
      </button>

      <Reveal className="ani">
        {isDropMenuOpen && (
          <div className="droppop-con">
            {isDropTitle && (
              <div className="droppop-con-tit">
                <span>{props.title}</span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={dropCloseClick}
                >
                  <span className="k-sr-only">close</span>
                </button>
              </div>
            )}
            <ul>
              {props.list.map((item: any, i: any) => (
                <li key={i}>
                  <button
                    type="button"
                    value={item.value}
                    onClick={dropListClick}
                  >
                    <span>{item.title}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Reveal>
    </div>
  );
}
