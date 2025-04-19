export type SubMenuType = {
  id: number;
  text: string;
  selected: boolean;
  value: string;
};
export type MainMenuType = {
  id: number;
  showCheck: number[];
  name: string;
  value: string;
  subMenu: SubMenuType[];
};

export const mainMenu: MainMenuType[] = [
  {
    id: 1,
    showCheck: [1, 2, 3, 4, 5, 6, 7],
    name: "Dash Board",
    value: "dashboard",
    subMenu: [
      { id: 11, text: "Dash Board", selected: true, value: "dashboard" },
    ],
  },
  {
    id: 2,
    showCheck: [2, 3, 4, 5, 6, 7],
    name: "System",
    value: "system",
    subMenu: [
      { id: 21, text: "company", selected: true, value: "company" },
      { id: 22, text: "branch", selected: false, value: "branch" },
      { id: 23, text: "user", selected: false, value: "user" },
    ],
  },
  {
    id: 3,
    showCheck: [1, 2, 3, 4],
    name: "User Management",
    value: "userManage",
    subMenu: [
      { id: 21, text: "company", selected: true, value: "company" },
      { id: 22, text: "branch", selected: false, value: "branch" },
      { id: 23, text: "user", selected: false, value: "user" },
    ],
  },
  {
    id: 4,
    showCheck: [2, 3, 4, 5, 6, 7],
    name: "Alert",
    value: "alert",
    subMenu: [{ id: 41, text: "Alert", selected: false, value: "alert" }],
  },
  {
    id: 5,
    showCheck: [2, 3, 4, 5, 6, 7],
    name: "Support",
    value: "support",
    subMenu: [{ id: 41, text: "Support", selected: false, value: "support" }],
  },
  {
    id: 6,
    showCheck: [1],
    name: "FirmWare",
    value: "firmware",
    subMenu: [{ id: 41, text: "Firmware", selected: false, value: "firmware" }],
  },
  {
    id: 7,
    showCheck: [2],
    name: "FOTA",
    value: "fota",
    subMenu: [
      {
        id: 31,
        text: "Firmware Registration",
        selected: true,
        value: "firmRegist",
      },
      { id: 32, text: "Firmware List", selected: false, value: "firmList" },
      {
        id: 33,
        text: "Firmware SystemManagement",
        selected: false,
        value: "firmManage",
      },
      { id: 34, text: "Firmware Update", selected: false, value: "firmUpdate" },
      { id: 35, text: "FOTA Status", selected: false, value: "fotaStat" },
      { id: 36, text: "FOTA History", selected: false, value: "fotaHis" },
      { id: 37, text: "Create Package", selected: false, value: "createPack" },
    ],
  },

  // {
  //   id: 8,
  //   showCheck: [1],
  //   name: "Setting",
  //   value: "setting",
  //   subMenu: [{ id: 51, text: "Setting", selected: false, value: "setting" }],
  // },
  // {
  //   id: 9,
  //   showCheck: [2],
  //   name: "Transfer",
  //   value: "transfer",
  //   subMenu: [{ id: 51, text: "Transfer", selected: false, value: "transfer" }],
  // },
  {
    id: 10,
    showCheck: [1],
    name: "Guide",
    value: "guide",
    subMenu: [{ id: 51, text: "Guide", selected: false, value: "guide" }],
  },
  {
    id: 11,
    showCheck: [1],
    name: "Sample",
    value: "sample",
    subMenu: [
      {
        id: 52,
        text: "Common-Component",
        selected: false,
        value: "commonComponent",
      },
      {
        id: 53,
        text: "Grid-Component",
        selected: false,
        value: "gridComponent",
      },
      { id: 54, text: "Tab-Component", selected: false, value: "tapComponent" },
      {
        id: 55,
        text: "Accordion-Component",
        selected: false,
        value: "accordionComponent",
      },
    ],
  },
];
