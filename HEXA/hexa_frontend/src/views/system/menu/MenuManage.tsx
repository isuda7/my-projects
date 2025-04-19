
/* React */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { UploadFileInfo, UploadFileStatus } from "@progress/kendo-react-upload";

/* Common */
import MenuList from "./components/MenuList";
import RegisterInfo from "@/new_components/common/RegisterInfo";
import Header from "@/new_components/common/Header";
import MenuApiService from "@/utils/apiService/system/MenuApiService";
import FormField from "@/new_components/common/FormField";
import CustomSelect from "@/new_components/form/CustomSelect";
import IconUpload from "./components/IconUpload";
import useAlert from "@/hooks/useAlert";
import _ from "lodash";

/* Type */
import { MenuTree } from "@/utils/apiService/type/system/MenuDto";
import { ExUploadFileInfo } from "@/utils/apiService/type/common/File.type";

export default function MenuManage() {
  const showAlert = useAlert();
  const { t } = useTranslation()
  const notDeleteMenus = [
    "642232862776654073", //대시보드
    "626237187121274063", //스테이션 관리
    "653855692511758948", //스테이션 통계정보
    "653855919780119896", //스테이션별 누적 교환횟수
    "615730220492642335", //배터리 관리
    "638661196942790336", //배터리 교환 및 위치 이력
    "636100575200708952", //고장 및 통신 관리
    "636100730167658105", //스테이션 고장 이력
    "636108501942596520", //통신단절 현황
  ]


  const [origin, setOrigin] = useState<MenuTree[]>([]) //정렬비교를 위한 원본 MenuList
  const [menuList, setMenuList] = useState<MenuTree[]>([])
  const [menuItem, setMenuItem] = useState<MenuTree>()
  //파일 정보
	const [files, setFiles] = useState<Array<UploadFileInfo>>([]);


  const getSortIds = (dataItem: Record<string, any>) => {
    const sortingIds:string[] = [];
    const originObj = getSearchMenuListById(origin, dataItem.tsid);
    const currentObj = getSearchMenuListById(menuList, dataItem.tsid);
    if(originObj.index != currentObj.Obj) {
      currentObj.array.forEach((v:MenuTree) => {
        sortingIds.push(v.tsid)
      })
    }
    return sortingIds;
  }

  const getSearchMenuListById = (tree: MenuTree[], id: string): any => {
    for(let i=0; i<tree.length; i++) {
      const item = tree[i]

      if(item.tsid === id) {
        return {array: tree, index: i};
      }

      if(item.children) {
        const result = getSearchMenuListById(item.children, id);
        if(result !== undefined) {
          return result;
        }
      }
    }
  }

  /**
	 * 저장 직전 dataItem을 Modify에 맞게 가공
	 * @param dataItem 
	 */
	const processModifyData = async (dataItem: Record<string, any>) => {
		const modifyData = _.cloneDeep(dataItem);
    
		const formData = new FormData();

    //파일 삭제할경우 파일 삭제여부 넣어주기
    if(files.length === 0 && menuItem?.iconBlobData) modifyData.fileDelete = true;

    //순서 변경했을경우 재정렬 할수있도록 재정렬에 필요한 id 배열 넣어주기
    //sortingIds
    const sortingIds = getSortIds(dataItem)
    modifyData.sortingIds = sortingIds;
		console.log('modifyData', modifyData)
		formData.append('saveMenuDto', JSON.stringify(modifyData));
		
    // 파일 새로 저장할 경우 파일 데이터 넣어주기
		for(let i=0; i<files.length; i++) {
			const rawFile = files[i].getRawFile?.();
			if(rawFile) formData.append('iconFile', rawFile)
		}

		// const data = {id : dataItem.tsid, formData}
		// modifyStation.mutate(data)
    try {
      const res = await MenuApiService().modifyMenu(formData, dataItem.tsid)
      if(res.code === 200) {
        showAlert({message: t('common.save_success')}) //저장되었습니다.
        getMenuItem(dataItem.tsid)
      }
    } 
    catch (error) {
      console.log(error)
    }
	}

  const onsubmit = async (dataItem: Record<string, unknown>) => {
    showAlert({
			title: t('common.save'), //'저장',
			message: t('common.save_confirm'), //'저장하시겠습니까?',
			type: 'confirm',
			onConfirm: () => processModifyData(dataItem)
		})
  }

  const hasChildren = (tree:MenuTree[], id: string) => {
    for(const item of tree) {
      if(item.tsid === id) {
        return item.children !== undefined && item.children.length > 0
      }

      if(item.children) {
        const result = hasChildren(item.children, id);
        if(result) {
          return true;
        }
      }
    }
  }

  const onDeleteConfirm = async () => {
    if(menuItem) {
      if(notDeleteMenus.includes(menuItem.tsid)) {
        showAlert({
          message: '기본 메뉴는 삭제할 수 없습니다.'
        })
        return;
      }

      const flag = hasChildren(menuList, menuItem.tsid)
      if(flag) {
        showAlert({
          message: '하위 메뉴를 모두 삭제한 후에 삭제요청바랍니다.'
        })
        return;
      }
    }

    showAlert({
      title: t('common.delete'), // '삭제'
      message: t('menu.delete_menu_alert'), // '해당 메뉴를 삭제하시겠습니까?',
      type:'confirm',
      onConfirm: () => onDelete()
    })
  }

  const onDelete = async () => {
    try {
      if(menuItem) {
        const res = await MenuApiService().deleteMenu(menuItem.tsid);
        if(res.code === 200) {
          showAlert({message: t('common.delete_success')}) //'삭제되었습니다.'
          setMenuItem(undefined);
          getMenuList();
        }
      }
    } 
    catch (error) {
      console.log(error)
    }

  }

  const onResetItem = async (formProps: FormRenderProps) => {
    formProps.onFormReset()
    setFiles([])
    if(menuItem) setFakeFileData(menuItem)
  }

  const setFakeFileData = (data: MenuTree) => {
    if(data.iconBlobData) {
      const fileInfo: ExUploadFileInfo = {
        uid: data.tsid,
        name: data.tsid,
        size: data.iconBlobData.length,
        extension: '.png',
        status: UploadFileStatus.Uploaded,
        progress: 100,
        base64Data: data.iconBlobData,
        getRawFile: undefined,
      }
      setFiles([fileInfo])
    }
  }

  const getMenuItem = async (id: string) => {
    setMenuItem(undefined)
    const res: any = await MenuApiService().getMenu(id)
    console.log('res', res)
    if(res.code === 200) {
      /* File Data Set */
      setFakeFileData(res.data)
      setMenuItem(res.data as MenuTree)
    }
  }

  const getMenuList = async() => {
    const res = await MenuApiService().getMenuTree();
    const newMenuList = res.data as MenuTree[];
    setOrigin(newMenuList)
    setMenuList(newMenuList);
  }

  useEffect(() => {
    getMenuList()
  }, [])


  return (
    <>
      <div className="contents system">
        <div className="menu-box">
          <MenuList
            menuList = {menuList}
            setMenuList = {setMenuList}
            getMenuList = {getMenuList}
            getMenuItem = {getMenuItem}
            setFiles = {setFiles}
          />
          <div className="menu-box-right">
            {/* 메뉴 관리 */}
            <Header headName={t('menu.manage_menu')}/>
            {
              menuItem && 
              <Form
                onSubmit={onsubmit}
                initialValues={menuItem}
                ignoreModified={true}
                render={(formRenderProps: FormRenderProps) => (
                  <FormElement>
                    {/* 메뉴 상세 정보 */}
                    <section className="section">
                      <div className="title-group">
                        <h3 className="t-title">{t('menu.menu_information_detail')}</h3>
                      </div>
                      <table className="tbl-base">
                        <colgroup>
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "70%" }} />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th scope="row">
                              {/* 메뉴명 */}
                              {t('menu.menu_name')}
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <FormField
                                  name={'name'}
                                  validation={true}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              {/* 메뉴명(영문) */}
                              {t('menu.eng_name')}
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <FormField
                                  name={'engName'}
                                  validation={true}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              {/* 메뉴 URL */}
                              {t('menu.menu_url')}
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <FormField
                                  name={'url'}
                                  validation={true}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              {/* 메뉴 타입 */}
                              {t('menu.menu_type')}
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <FormField
                                  name={'type'}
                                  component={CustomSelect}
                                  noSelectDefault={true}
                                  data={[
                                    {code: 'L', value: 'L'},
                                    {code: 'A', value: 'A'},
                                    {code: 'P', value: 'P'},
                                  ]}
                                  validation={true}
                                  className={'w200'}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              {/* 아이콘 */}
                              {t('menu.icon')}
                              <div className="t-desc">
                                {'※ 1 Level img size : 32px x 32px'} <br /> {'※ 2 Level img size : 21px x 21px'}
                              </div>
                            </th>
                            <td>
                              <IconUpload
                                files={files}
                                setFiles={setFiles}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
  
                    {/* 등록 정보 */}
                    <RegisterInfo
                      formProps = {formRenderProps}
                    />
  
                  <div className="btn-group">
                    <div className="group-align-right">
                      <Button
                        type={'button'} 
                        size={"large"}
                        onClick={onDeleteConfirm}
                      >
                        {/* 삭제 */}
                        {t('common.delete')}
                      </Button>
                      <Button
                        type={'button'}
                        size={"large"} 
                        fillMode="outline"
                        onClick={() => onResetItem(formRenderProps)}
                      >
                        {/* 취소 */}
                        {t('common.cancel')}
                      </Button>
                      <Button size={"large"} themeColor={"primary"}>
                        {/* 저장 */}
                        {t('common.save')}
                      </Button>
                    </div>
                  </div>
                  </FormElement>
                )}
              />
            }

          </div>
        </div>
      </div>
    </>
  );
}
