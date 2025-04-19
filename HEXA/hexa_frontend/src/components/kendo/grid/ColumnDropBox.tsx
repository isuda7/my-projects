import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@progress/kendo-react-animation";
import styled from "styled-components";
import { Button } from "@progress/kendo-react-buttons";
import { Checkbox, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import { GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";

type PropsType = {
  list: GridHeader[];
  defaultColumn: GridHeader[];
  setList: React.Dispatch<React.SetStateAction<GridHeader[]>>;
  initColumns?: boolean;
  isDropMenuOpen?: boolean;
  setIsDropMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  parentShowHideFlag?: boolean;
};

export default function ColumnDropBox(props: Readonly<PropsType>) {
  const {t} = useTranslation();
  const {
    list,
    defaultColumn,
    setList,
    initColumns,
    isDropMenuOpen,
    setIsDropMenuOpen,
    parentShowHideFlag,
  } = props;
  const initColumnList = defaultColumn;
  const dropboxRef = useRef<HTMLDivElement>(null);

  const onShowColumnChange = (e: CheckboxChangeEvent) => {
    const newList = _.cloneDeep(list);
    newList.forEach((v) => {
      if (!parentShowHideFlag && v.children && v.children.length > 0) {
        if (e.target.value) v.hidden = false; //true일 경우 부모 컬럼 당연히 살림

        let hiddenCnt = 0;
        v.children.forEach((w) => {
          if (w.field === e.target.name) w.hidden = !e.target.value;
          if (w.hidden) hiddenCnt += 1;
        });
        //모든 children 컬럼이 hidden일 경우 부모 컬럼도 hidden 처리
        if (hiddenCnt === v.children.length) v.hidden = true;
      } else {
        if (v.field === e.target.name) v.hidden = !e.target.value;
      }
    });
    setList(newList);
  };

  useEffect(() => {
    const updatedColumnList = _.cloneDeep(initColumnList);
    setList(updatedColumnList);
  }, [initColumns]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropboxRef.current &&
        !dropboxRef.current.contains(event.target as Node)
      ) {
        if (setIsDropMenuOpen) {
          setIsDropMenuOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropMenuOpen]);

  const generateItems = (columns: any[]) => {
    return columns?.map((v) => {
      if (!parentShowHideFlag && v.children && v.children.length > 0) {
        return (
          <React.Fragment key={v.field}>
            {generateItems(v.children)}
          </React.Fragment>
        );
      } else {
        return (
          <li key={v.field} style={{ marginBottom: 8 }}>
            <span>
              <Checkbox
                type="checkbox"
                name={v.field}
                checked={v?.hidden ? false : true}
                label={v.title}
                onChange={onShowColumnChange}
              />
            </span>
          </li>
        );
      }
    });
  };

  return (
    <div className="dropbox" ref={dropboxRef}>
      <Button
        type="button"
        themeColor="info"
        onClick={() => {
          if (setIsDropMenuOpen) {
            setIsDropMenuOpen(!isDropMenuOpen);
          }
        }}
      >
        <i 
          className="icon icon-column" 
          title={t('common.column_config')} //컬럼 설정 
        />
      </Button>

      {isDropMenuOpen ? (
        <Reveal className="ani" style={{ left: -115 }}>
          <DropBoxList>
            <ul className="dropbox-inner">{generateItems(list)}</ul>
          </DropBoxList>
        </Reveal>
      ) : null}
    </div>
  );
}

// ColumnDropBox.defaultProps = {
//   initColumns: false,
//   isDropMenuOpen: false,
//   setIsDropMenuOpen: false,
// };

const DropBoxList = styled.div`
  min-width: 130px;
  width: 200px;
  margin-top: 10px;
  padding: 3px 3px 3px 15px;
  border: 1px solid #191919;
  z-index: 100;
  border-radius: 8px;
  background-color: #ffffff;
  &:after {
    content: " ";
    width: 10px;
    height: 10px;
    margin-top: -5px;
    display: block;
    position: absolute;
    top: 10px;
    right: 60px;
    border-top: 1px solid #191919;
    border-right: 1px solid #191919;
    transform: rotate(-45deg);
    background: #fff;
  }
`;
