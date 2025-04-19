import { useEffect, useRef, useState } from "react";
import { Reveal } from "@progress/kendo-react-animation";

export default function uiAlertbox() {
  const dropMenuRef = useRef(document.createElement("div"));
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isDropMenuOpen && !dropMenuRef.current.contains(e.target))
        setDropMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropMenuOpen]);

  const dropListClick = () => {
    setDropMenuOpen(false);
  };
  const dropCloseClick = () => {
    setDropMenuOpen(false);
  };

  const alertList = [
    {
      type: "Error",
      class: "error",
      title: "Major Update Released Major Update Released",
    },
    { type: "Warning", class: "warning", title: "Alert Message.." },
    { type: "Fault", class: "fault", title: "Alert Message.." },
    { type: "Error", class: "error", title: "Major Update Released" },
    { type: "Error", class: "error", title: "Major Update Released" },
    { type: "Warning", class: "warning", title: "Alert Message.." },
    { type: "Fault", class: "fault", title: "Alert Message.." },
    { type: "Error", class: "error", title: "Major Update Released" },
    { type: "Error", class: "error", title: "Major Update Released" },
    { type: "Warning", class: "warning", title: "Alert Message.." },
    { type: "Fault", class: "fault", title: "Alert Message.." },
    { type: "Error", class: "error", title: "Major Update Released" },
  ];

  return (
    <div ref={dropMenuRef} className="alertbox">
      <button
        type="button"
        className={`alertbox-btn ${isDropMenuOpen ? "is-active" : ""}`}
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
      >
        <span className="k-sr-only"></span>
        <span className="counter">99+</span>
      </button>

      <Reveal className="ani">
        {isDropMenuOpen ? (
          <div className="alertbox-con">
            <div className="alertbox-con-tit">
              <span>Alert</span>
              <button
                type="button"
                className="btn-close"
                onClick={dropCloseClick}
              >
                <span className="k-sr-only">close</span>
              </button>
            </div>

            <ul>
              {alertList.length > 0 ? (
                alertList.map((item: any, i: any) => (
                  <li key={i}>
                    <button type="button" onClick={dropListClick}>
                      <span className={`alert-type ${item.class}`}>
                        {item.type}
                      </span>
                      <span>{item.title}</span>
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <span className="data-empty"> No Data avaliable</span>
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </Reveal>

      {/* {isDropMenuOpen && (
        <div className={`alertbox-con ${isDropMenuOpen ? "is-active" : ""}`}>
          <div className="alertbox-con-tit">
            <span>Alert</span>
            <button
              type="button"
              className="btn-close"
              onClick={dropCloseClick}
            >
              <span className="k-sr-only">close</span>
            </button>
          </div>

          <ul>
            {alertList.length > 0 ? (
              alertList.map((item: any, i: any) => (
                <li key={i}>
                  <button type="button" onClick={dropListClick}>
                    <span className={`alert-type ${item.class}`}>
                      {item.type}
                    </span>
                    <span>{item.title}</span>
                  </button>
                </li>
              ))
            ) : (
              <li>
                <span className="data-empty"> No Data avaliable</span>
              </li>
            )}
          </ul>
        </div>
      )} */}
    </div>
  );
}
