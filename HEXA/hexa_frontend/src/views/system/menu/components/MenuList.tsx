// HEXAADMSYM2S10 : 메뉴 관리
// layout LayoutGuideSystem 사용 (대시보드와 동일한 형태)

import { useState, useEffect, useRef } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import _ from 'lodash'

/* Common */
import MenuApiService from "@/utils/apiService/system/MenuApiService";

/* Type */
import { MenuTree } from "@/utils/apiService/type/system/MenuDto";
import { useTranslation } from "react-i18next";

export default function MenuList(props: any) {
  const { t, i18n } = useTranslation();
  const { getMenuItem, setFiles, menuList, setMenuList, getMenuList } = props;
  const [activeList, setActiveList] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newMenuParent, setNewMenuParent] = useState<any>(null);
  const newMenuInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 메뉴추가
   * 현재 선택된 menu의 하위 메뉴로 새로 생성
   */
  const addNewMenu = () => {
    if(activeList.length > 0) {
      setNewMenuParent({ depth: activeList.length, tsid: activeList[activeList.length - 1] });
    }
    else {
      setNewMenuParent(null);
    }

    setIsAdding(true);
  };

  //새 메뉴를 만들때 기본 sort 세팅
  const getLastSort = () => {
    let returnSort = 1;
    if(newMenuParent) {
      let parent;
      parent = getSearchTreeMenuItem(menuList, newMenuParent.tsid)
      returnSort = parent.children.length + 1;
    }
    else {
      returnSort = menuList.length + 1;
    }

    return returnSort;
  }

  const getSearchTreeMenuItem = (tree: MenuTree[], id: string) => {
    for(const item of tree) {
      if(item.tsid === id) {
        return item;
      }

      if(item.children) {
        const foundItem: any = getSearchTreeMenuItem(item.children, id);
        if(foundItem) {
          return foundItem;
        }
      }
    }
  }

  const registerMenuItem = async (data: MenuTree) => {
    const res: any = await MenuApiService().registerMenu(data);

    //새 메뉴 생성 완료 후
    if(res.code === 200) {
      getMenuList?.(); //전체메뉴리스트 다시 불러오기
      getMenuItem?.(res.data.tsid); //새 메뉴 정보 불러오기

      //새메뉴 선택상태로 만들어주기
      setActiveList((prevState: string[]) => {
        prevState.push(res.data.tsid);
        return prevState;
      })
    }
  }

  const handleSaveNewMenu = (name: string) => {
    if (!name.trim()) {
      setIsAdding(false);
      return;
    }

    const sort = getLastSort();
    const newMenu: any = {
      url: '/',
      name,
      engName: name,
      sort,
      depth: newMenuParent? newMenuParent.depth + 1 : 1,
      parentId: newMenuParent?.tsid || null,
      //type: 'L',
      children: [],
    };
    registerMenuItem(newMenu)
    setIsAdding(false);
  }

  useEffect(() => {
    if (isAdding && newMenuInputRef.current) {
      newMenuInputRef.current.focus();
    }
  }, [isAdding]);

  /**
   * 메뉴 이동 버튼 클릭시 동작 함수
   * @param direction 
   * @returns 
   */
  const moveMenuItem = (direction: 'up' | 'down') => {
    if (activeList.length === 0) return;

    const updatedMenuList = [...menuList];

    let parentArray = updatedMenuList;
    for (let i = 0; i < activeList.length - 1; i++) {
      const currentTsid = activeList[i];
      const foundNode = parentArray.find((item: any) => item.tsid === currentTsid);
      if (!foundNode) return; // 경로상의 항목이 없으면 중단.
      // 다음 단계로 children 배열로 내려갑니다.
      parentArray = foundNode.children || [];
    }

    // parentArray 안에서 마지막 activeList 항목(실제 이동할 대상)의 인덱스를 찾습니다.
    const targetTsid = activeList[activeList.length - 1];
    const targetIndex = parentArray.findIndex((item: any) => item.tsid === targetTsid);
    if (targetIndex === -1) return; // 대상 항목을 찾지 못하면 중단.

    // 이동할 대상 인덱스를 결정합니다.
    const newIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1;
    // newIndex가 유효 범위 내에 있는지 확인합니다.
    if (newIndex < 0 || newIndex >= parentArray.length) return;

    // 두 항목의 위치를 swap합니다.
    [parentArray[targetIndex], parentArray[newIndex]] = [parentArray[newIndex], parentArray[targetIndex]];

    setMenuList(updatedMenuList);
  };

  /**
   * 현재 클릭한 메뉴의 id를 1depth부터 현재 depth까지 배열상태로 반환해준다
   * @param tree 
   * @param targetId 
   * @returns 
   */
  const findPathArray = (tree:MenuTree[], targetId: string) => {
    const dfs = (node:MenuTree, path: string[]) => {
      path.push(node.tsid);

      if(node.tsid === targetId) {
        return path;
      }

      for(const item of node.children) {
        const result: any = dfs(item, [...path]);
        if(result) return result;
      }
      return null;
    }

    for(const rootNode of tree) {
      const result: any = dfs(rootNode, []);
      if(result) return result;
    }
  }

  /**
   * 메뉴클릭시 클릭한 메뉴를 활성화 표시하기위한 함수
   * 마지막에 해당 메뉴의 상세정보 조회를 호출한다
   * @param item 
   */
  const clickMenuItem = (item: MenuTree) => {
    let callApiFlag = true;
    const result = findPathArray(menuList, item.tsid);
    console.log('result', result)
    if(item.depth === 1) {
      if(activeList.length > 0 && activeList[0] === item.tsid) {
        callApiFlag = false;
        setActiveList([])
      }
      else {
        setFiles([])
        setActiveList(result)
      }
    }
    else {
      setFiles([])
      setActiveList(result)
    }

    if(callApiFlag) getMenuItem?.(item.tsid)
  }

  /**
   * 3depth 이후의 메뉴 표현을 위한 Jsx 생성 함수
   * 4depth부터 표현된다
   * @param data 
   * @param parent 
   * @returns 
   */
  const setAfter3DepthRender = (data: any[], parent: any) => {
    return (
      <>
        {(data.length !== 0 || (isAdding && newMenuParent && newMenuParent?.tsid === parent?.tsid)) &&
          <ul
            className={`menu-acco-level-2`}
            role="group"
          >
            {
              data.map((v, i) => {
                const active = (activeList.length > v.depth-1 && v.tsid === activeList[v.depth-1])? 'is-active': '';
                return (
                  <li key={v.tsid} role="listitem">
                    <span
                      className={active}
                      style={{marginLeft: `${(v.depth-3) * 10}px`}}
                      onClick={() => clickMenuItem(v)}
                    >
                      {`└ ${i18n.language === 'ko'? v?.name: v?.engName}`}
                    </span>
                    {setAfter3DepthRender(v.children, v)}
                  </li>
                )
              })
            }
            {
              isAdding && newMenuParent && newMenuParent.tsid === parent.tsid && (
                <li>
                  <Input
                    type="text"
                    ref={newMenuInputRef}
                    onBlur={(e) => handleSaveNewMenu(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveNewMenu(e.currentTarget.value);
                      }
                    }}
                  />
                </li>
              )
            }
          </ul>
        }
      </>
    )
  }

  console.log('menuList', menuList)

  return (
    <div className="menu-box-left">
      <div className="title-group">
        <h3 className="t-title">
          {/* 전체 메뉴 */}
          {t('menu.all_menu')}
        </h3>
        <div className="group-align-right">
          <Button 
            type={'button'}
            size={"small"}
            onClick={addNewMenu}
          >
            {/* 메뉴 추가 */}
            {t('menu.add_menu')}
          </Button>
        </div>
      </div>

      <div className="menu-acco">
        <ul className="menu-acco-level-0" role="list">
          {menuList.map((item: any, idx1: number) => {
            const active = activeList.length > 0 && item.tsid === activeList[0]
            const noDepth = !(item.children && item.children.length > 0);

            return (
              <li key={item.tsid} role="listitem">
                <span
                  className={`${active ? "is-active" : ""} ${!noDepth ? "in-icon" : ""}`}
                  onClick={() => clickMenuItem(item)}
                >
                  {i18n.language === 'ko'? item?.name: item?.engName}
                </span>

                {(!noDepth || (isAdding && newMenuParent && newMenuParent?.tsid === item.tsid)) && (
                  <ul
                    className={`menu-acco-level-1 ${active ? "is-active" : ""}`}
                    role="group"
                  >
                    {item.children.map((item2: any, idx2: number) => {
                      const active = (activeList.length > 1 && item2.tsid === activeList[1])? 'is-active': '';
                      const noDepth = !(item2.children && item2.children.length > 0);

                      return (
                        <li key={item2.tsid} role="listitem">
                          <span
                            className={`${active}`}
                            //onClick={() => handleClickMenuItem(item2)}
                            onClick={() => clickMenuItem(item2)}
                          >
                            {i18n.language === 'ko'? item2?.name: item2?.engName}
                          </span>

                          {(!noDepth || isAdding && newMenuParent && newMenuParent.tsid === item2.tsid) && (
                            <ul
                              className={`menu-acco-level-2`}
                              role="group"
                            >
                              {item2.children.map((item3: any, idx3:number) => {
                                const active = (activeList.length > 2 && item3.tsid === activeList[2])? 'is-active': '';

                                return (
                                  <li key={item3.tsid} role="listitem">
                                    <span
                                      className={`${active}`}
                                      onClick={() => clickMenuItem(item3)}
                                    >
                                      {`• ${i18n.language === 'ko'? item3?.name: item3?.engName}`}
                                    </span>
                                   {setAfter3DepthRender(item3.children, item3)}
                                  </li>
                                );
                              })}
                              {
                                isAdding && newMenuParent && newMenuParent.tsid === item2.tsid && (
                                  <li>
                                    <Input
                                      type="text"
                                      ref={newMenuInputRef}
                                      onBlur={(e) => handleSaveNewMenu(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleSaveNewMenu(e.currentTarget.value);
                                        }
                                      }}
                                    />
                                  </li>
                                )
                              }
                            </ul>
                          )}
                        </li>
                      );
                    })}
                    {
                      (isAdding && newMenuParent && newMenuParent?.tsid === item.tsid) && (
                        <li>
                          <Input
                            type="text"
                            ref={newMenuInputRef}
                            onBlur={(e) => handleSaveNewMenu(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveNewMenu(e.currentTarget.value);
                              }
                            }}
                          />
                        </li>
                      )
                    }
                  </ul>
                )}
              </li>
            );
          })}
          {
            isAdding && !newMenuParent && (
              <li>
                <Input
                  type="text"
                  ref={newMenuInputRef}
                  onBlur={(e) => handleSaveNewMenu(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveNewMenu(e.currentTarget.value);
                    }
                  }}
                />
              </li>
            )
          }
        </ul>
      </div>
      <div className="menu-btns">
        <Button 
          type="button"
          themeColor={"info"}
          onClick={() => moveMenuItem('up')}
        >
          <i className="icon icon-arr-up"></i>
        </Button>
        <Button 
          type="button"
          themeColor={"info"}
          onClick={() => moveMenuItem('down')}
        >
          <i className="icon icon-arr-down"></i>
        </Button>
      </div>
    </div>
  );
}
