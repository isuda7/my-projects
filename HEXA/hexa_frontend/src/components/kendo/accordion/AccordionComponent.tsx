import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import React from "react";

interface Item {
  id: string;
  title: string | React.ReactNode;
  children?: Item[] | undefined;
  disabled?: boolean | undefined;
}

interface AccordionComponents {
  items: NonNullable<Item[]>;
}

function mapItemsToPanelBarItemProps(items: Item[]): React.ReactNode {
  return items.map((item) => (
    <PanelBarItem key={item.id} title={item.title} disabled={item.disabled}>
      {item.children ? mapItemsToPanelBarItemProps(item.children) : undefined}
    </PanelBarItem>
  ));
}

function AccordionComponent({ items }: AccordionComponents) {
  const components = mapItemsToPanelBarItemProps(items);

  return <PanelBar expandMode="single">{components}</PanelBar>;
}

export default AccordionComponent;
