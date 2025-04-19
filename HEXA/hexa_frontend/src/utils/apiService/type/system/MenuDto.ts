export interface MenuInfo {
	tsid: string;
	name: string;
	engName: string;
	url: string;
	icon?: string;
	depth: number;
	sort: number;
	parentId: string | null;
}

export interface MenuTree {
	tsid: string;
	name: string;
	engName: string;
	url: string;
	icon?: string | null;
	depth: number;
	sort?: number;
	parent?: MenuInfo | null;
	children: MenuTree[];
	parentId?: string | null;
	iconBlob?: number;
	iconBlobData?: string;
}

export interface MenuName {
	id: string;
	menuName: string;
	engName: string;
}
