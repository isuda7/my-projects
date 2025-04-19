import { Fragment } from "react";
import TabComponent from "@/components/kendo/tap/TabComponent.tsx";
import SampleModalAlert from "@/views/sample/components/SampleModalAlert";
import SampleTables from "@/views/sample/components/SampleTables";
import SampleAccordion from "@/views/sample/components/SampleAccordion";
import SampleMap from "@/views/sample/components/SampleMap";


function SampleComponents() {

  const tabList = [
    {
      title: "Modal, Alert",
      children: <SampleModalAlert />,
    },
    {
      title: "Tables",
      children: <SampleTables />,
    },
    {
      title: "Accordion",
      children: <SampleAccordion />,
    },
    {
      title: "Tabs",
      children: <Fragment />,
    },
    {
      title: "Form",
      children: <Fragment />,
    },
    {
      title: "Map",
      children: <SampleMap />,
    },
  ];
  return (
    <div className="contents">
      <div className="content">
        <div className="head-group">
          <div>
            <h2 className="h2">Components</h2>
            <p>
              Component Sample
            </p>
          </div>
          <div className="group-align-right location">
            <i className="icon icon-home" />
            {/* <span>Alert</span>
            <span>Alert History</span> */}
          </div>
        </div>
        
        <div className="tabs k-mt-7.5">
          <div style={{marginBottom: '10px'}}>공통 Tab Component</div>
          <TabComponent tabList={tabList} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default SampleComponents;
