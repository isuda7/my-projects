import { useEffect, useRef, useState } from "react";
import { Reveal } from "@progress/kendo-react-animation";
import styled from "styled-components";

type ListType = {
  value: string;
  title: string;
  flag?: string;
  name?: string;
};
type PropsType = {
  list: ListType[];
  text: string;
  icon?: boolean;
  flag?: string;
  disabled?: boolean;
  clickEvent?: (value: string) => void;
  defaultValue?: string;
};
export default function Dropbox(props: PropsType) {
  const { list, text, icon, flag, disabled, clickEvent, defaultValue } = props;
  const dropMenuRef = useRef(document.createElement("div"));
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [btnText, btnTextState] = useState<string>(
    icon ? `<span class='flag ${flag}' ></span>${text}` : text,
  );

  const dropListClick = (item: ListType) => {
    setDropMenuOpen(false);
    const btnTitle = icon
      ? `<span class='flag " ${item.flag} "' ></span>${item.title}`
      : item.title;
    btnTextState(btnTitle);
    if (clickEvent) {
      clickEvent(item.value);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      list.map((item) => {
        if (item.value === defaultValue) {
          dropListClick(item);
        }
      });
    }
  }, []);

  return (
    <DropBoxWrap ref={dropMenuRef} className="dropbox" data-role={disabled}>
      <button
        type="button"
        value={btnText}
        className={`dropbox-btn ${isDropMenuOpen ? "is-active" : ""}`}
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
        aria-label={btnText}
      >
        <NationalFlag dangerouslySetInnerHTML={{ __html: btnText }} />
      </button>

      <Reveal className="ani">
        {isDropMenuOpen ? (
          <div className="dropbox-con">
            <ul>
              {list.map((item) => (
                <li key={item.value}>
                  <button
                    type="button"
                    value={item.value}
                    onClick={() => dropListClick(item)}
                  >
                    {icon && <span className={`flag ${item.flag}`} />}
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Reveal>
    </DropBoxWrap>
  );
}
Dropbox.defaultProps = {
  icon: false,
  flag: "",
  disabled: false,
  clickEvent: null,
};

const NationalFlag = styled.span`
  width: 100px;
`;

const DropBoxWrap = styled.span`
  width: 150px;
`;
