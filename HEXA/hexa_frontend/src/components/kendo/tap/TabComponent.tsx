import React, { useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';

interface TabItem {
  title: string;
  children: React.ReactNode;
}

interface TabComponentProps {
  tabList: TabItem[];
  selected?: number;
  keepTabsMounted?: boolean;
}

function TabComponent({ 
  tabList, 
  selected = 0 ,
  keepTabsMounted = true
}: TabComponentProps) {
  const [tabSelected, setTabSelected] = useState(selected);

  return (
    <TabStrip
      selected={tabSelected}
      animation={false}
      onSelect={(e) => setTabSelected(e.selected)}
      keepTabsMounted={keepTabsMounted}
    >
      {tabList.map((tab) => (
        <TabStripTab key={`tab_${tab.title}`} title={tab.title}>
          {tab.children}
        </TabStripTab>
      ))}
    </TabStrip>
  );
}

export default TabComponent;
