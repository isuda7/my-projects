import {useEffect, useState} from 'react';
import {useLocation, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";
import {menuSelector} from "@/store/modules/userStore.ts";
import {useSelector} from "react-redux";
import Breadcrumbs from "@/new_components/common/Breadcrumbs.tsx";

export type Header = {
  headName: string;
  descrption?: string;
  children?: any;
}

type BreadCrumbData = {
  text: string;
  url: string;
}

export default function Header(props: Header) {
  const { i18n} = useTranslation();
  const location = useLocation();
  const params = useParams(); // { id: '12345', subid: '456' }
  const [data, setData] = useState<BreadCrumbData[]>([]);
  const initMenuList: Menu[] = useSelector(menuSelector);

	/**
   * findMenuPath
   * 재귀적으로 메뉴 트리에서 현재 URL(currentUrl)에 해당하는 메뉴까지의 부모 체인을 찾는다.
   * 예) [스테이션관리, 스테이션코드관리, 스테이션QR코드관리]
   */
	const findMenuPath = (menus: Menu[], url: string, path: Menu[] = []): Menu[] | null => {
		for (const menu of menus) {
			const newPath = [...path, menu];
			if (menu.url === url) {
				return newPath;
			}
			if (menu.children && menu.children.length > 0) {
				const result = findMenuPath(menu.children, url, newPath);
				if (result) return result;
			}
		}
		return null;
	};
	
	/**
	 * getScreenProvidingMenu
	 * 재귀적으로 전달된 메뉴의 자식 중 “화면 제공” 메뉴(즉, type이 'L'이면서 더 이상의 L타입 자식이 없는 메뉴)를 찾아 반환한다.
	 * 만약 전달된 메뉴가 이미 화면 제공 메뉴라면 그대로 반환한다.
	 */
	const getScreenProvidingMenu = (menu: Menu): Menu => {
		if (menu.type === 'L' && (!menu.children || menu.children.filter(child => child.type === 'L').length === 0)) {
			return menu;
		}
		if (menu.children && menu.children.length > 0) {
			const firstLChild = menu.children.find(child => child.type === 'L');
			if (firstLChild) {
				return getScreenProvidingMenu(firstLChild);
			}
		}
		return menu;
	};
	
	useEffect(() => {
		let originUrl = location.pathname;
		let currentUrl = location.pathname;

		//스테이션 정보관리 상세 처럼 id값을 path로 쓰는 화면은 id값을 제거해준다
		if(Object.keys(params).length !== 0) {
			for(let key in params) {
				currentUrl = currentUrl.replace(`/${params[key]}`, '')
			}
		}

		// 현재 URL에 해당하는 메뉴 체인을 찾는다.
		const path = findMenuPath(initMenuList, currentUrl);
		if (path) {
			let breadcrumbs: BreadCrumbData[] = [];
			if (path.length > 1) {
				/**
				 * 부모 breadcrumb들은 모두 현재 화면의 바로 상위 메뉴(즉, 체인에서 마지막 바로 위 항목)의
				 * 자식 리스트에서 **첫 번째 화면 제공 메뉴**의 URL을 사용해야 한다.
				 *
				 * 예)
				 * 체인: [스테이션관리, 스테이션코드관리, 스테이션QR코드관리] 인 경우,
				 * targetScreen = getScreenProvidingMenu( 스테이션코드관리 ) 
				 *   → 결과: 스테이션코드관리 자식 리스트의 첫 번째 화면 제공 메뉴 (예, 스테이션ID코드관리)
				 *
				 * 따라서 체인에서 마지막 항목(현재 화면)을 제외한 모든 breadcrumb는 targetScreen.url을 링크로 사용한다.
				 */
				const targetScreen = getScreenProvidingMenu(path[path.length - 2]);
				breadcrumbs = path.map((menu, index) => {
					return {
						text: i18n.language === 'ko'? menu.name : menu.engName, 
						url: index < path.length - 1 ? targetScreen.url : originUrl,
					};
				});
			} 
			else {
				breadcrumbs = path.map(menu => (
					{ 
						text: i18n.language === 'ko'? menu.name : menu.engName, 
						url: originUrl 
					}
				));
			}
			setData(breadcrumbs);
		} else {
			setData([]);
		}
	}, [location.pathname, initMenuList]);

  return (
	<>
	  <Breadcrumbs data = {data} />
	  <div className="head-group">
		<div>
			{data.length > 0 && 
				<h2 className="t-header">
					{data[data.length - 1]?.text}
				</h2>
			}
		</div>
	  </div>
	</>
  );
}
