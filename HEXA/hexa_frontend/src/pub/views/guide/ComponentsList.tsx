import { Link } from "react-router-dom";
import Title from "../../components/guide/Title.tsx";
import ButtonGroupUI from "../../components/guide/Button.tsx";
import Dialog from "../../components/guide/Dialog.tsx";
import Table from "../../components/guide/Table.tsx";
import Form from "../../components/guide/Form.tsx";
import Tabs from "../../components/guide/Tabs.tsx";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import Slider from "../../components/SliderQR.tsx";

export default function Guide() {
  const sort = ["20", "50", "100"];

  const dataImg = [
    {
      ImgName: "GS관약점 1",
      ImgID: "HX0224020C1 1",
      ImgUrl: "/src/assets/image/imgs-qr.png",
    },
    {
      ImgName: "GS관약점 2",
      ImgID: "HX0224020C1 2",
      ImgUrl: "/src/assets/image/imgs-qr.png",
    },
  ];

  return (
    <div className="scrollbox" style={{ padding: "1.5rem" }}>
      <div className="k-float-right">
        <Link to="/pub/guide/Home">
          <span>Home</span>
        </Link>
        &nbsp;&nbsp;
        <Link to="/pub/guide/Guide">
          <span>Map</span>
        </Link>
        &nbsp;&nbsp;
        <Link to="/pub/guide/ComponentsList">
          <span>Conponents</span>
        </Link>
      </div>
      <br />
      <h1>Components</h1>

      <Title />
      <ButtonGroupUI />
      <Dialog />
      <Table />
      <br />
      <br />
      <Form />
      <Tabs />
      <br />
      <br />
      <div className="slider-qr">
        <Slider dataImg={dataImg} />
      </div>
    </div>
  );
}
