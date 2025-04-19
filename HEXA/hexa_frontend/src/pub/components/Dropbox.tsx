import { useEffect, useRef, useState } from "react";
import { Reveal } from "@progress/kendo-react-animation";
import { useTranslation } from 'react-i18next';
import store from "@/store";
import {setLanguage} from "@/store/modules/commonStore.ts";

export default function uiDropbox(props: any) {
  const { i18n } = useTranslation();
  const dropMenuRef = useRef(document.createElement("div"));
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const { list } = props;
  // const [isIconView] = useState<boolean>(props.icon);

  const [selectedLng, setSelectedLng] = useState<{title:string, value:string}>({
    title:'', value:''
  })
  // const [btnText, btnTextState] = useState<string>(
  //   props.icon
  //     ? "<span class='flag " + props.flag + "' ></span>" + props.text
  //     : props.text
  // );
  // let [val, setVal] = useState<string>(props.defaultvalue);

  //넘겨받은 언어코드와 매칭되는 object를 반환
  const getSelectedObj = (lang: string) => {
    for(let i=0; i<list.length; i++) {
      if(list[i].value === lang) {
        return list[i];
      }
    }
  }

  useEffect(() => {
    const lang = i18n.language
    const obj = getSelectedObj(lang)
    setSelectedLng(obj)
  }, [])

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
    // console.log('dropListClick', e)
    // let eText = (e.target as HTMLLIElement).innerHTML;
    // if (typeof eText === "string") {
    //   btnText = eText;
    // }
    // btnTextState(btnText);
    // setVal(e.currentTarget.value);
    const obj = getSelectedObj(e.currentTarget.value)
    setSelectedLng(obj)
    i18n.changeLanguage(e.currentTarget.value);
    store.dispatch(setLanguage(e.currentTarget.value));
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language])

  return (
    <div ref={dropMenuRef} className="dropbox" data-role={props.disabled}>
      <button
        type="button"
        value={selectedLng.value}
        className={`dropbox-btn ${isDropMenuOpen ? "is-active" : ""}`}
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
      >
        <span dangerouslySetInnerHTML={{ __html: selectedLng?.title }}></span>
      </button>

      <Reveal className="ani">
        {isDropMenuOpen ? (
          <div className="dropbox-con">
            <ul>
              {props.list.map((item: any) => (
                <li key={item.title}>
                  <button
                    type="button"
                    value={item.value}
                    onClick={dropListClick}
                  >
                    {/* {isIconView && (
                      <span className={`flag ${item.flag}`}></span>
                    )} */}
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
