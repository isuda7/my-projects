import { useEffect, useRef, useState } from "react";
import { Reveal } from "@progress/kendo-react-animation";

export default function uiDropbox(props: any) {
  const dropMenuRef = useRef(document.createElement("div"));
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [isIconView] = useState<boolean>(props.icon);
  let [btnText, btnTextState] = useState<string>(
    props.icon ? "<img src=" + props.iconImg + " />" + props.text : props.text
  );
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
    let eText = (e.target as HTMLLIElement).innerHTML;
    if (typeof eText === "string") {
      btnText = eText;
    }
    btnTextState(btnText);
    setVal(e.target.value);
  };

  return (
    <div ref={dropMenuRef} className="dropbox">
      <button
        type="button"
        value={val}
        className={`dropbox-btn ${isDropMenuOpen ? "is-active" : ""}`}
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
      >
        <span dangerouslySetInnerHTML={{ __html: btnText }}></span>
      </button>

      <Reveal className="ani">
        {isDropMenuOpen ? (
          <div className="dropbox-con">
            <ul>
              {props.list.map((item: any) => (
                <li key={item.title}>
                  <button type="button" value={item.id} onClick={dropListClick}>
                    {isIconView && <img src={item.iconUrl} />}
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Reveal>
    </div>
  );
}
