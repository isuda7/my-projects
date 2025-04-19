
export type Menu = {
    id: number;
    url: string;
    name: string;
    engName: string;
    ico: string;
    depth: number;
    type: string;
    useYn: "Y" | "N" | string;
    crud: any;
    children: Menu[] | null;
    grantType?: string[];
}