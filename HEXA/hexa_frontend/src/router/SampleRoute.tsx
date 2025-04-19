import { Navigate } from "react-router-dom";
import SampleGrids from "@/views/sample/SampleGrids.tsx";
import SampleNoticeAdd from "@/views/sample/grid/SampleNoticeAdd.tsx";
import SampleNoticeModify from "@/views/sample/grid/SampleNoticeModify";
import SampleComponents from "@/views/sample/SampleComponents.tsx";
import SampleOthers from "@/views/sample/SampleOthers.tsx";

const SampleRoute = [
  {
    path: "sample",
    children: [
      {
        path: "",
        element: <Navigate to="grid" replace />,
      },
      {
        path: "grid",
        element: <SampleGrids />,
      },
      {
        path: "grid/add",
        element: <SampleNoticeAdd />,
      },
      {
        path: "grid/:id",
        element: <SampleNoticeModify />,
      },
      {
        path: "components",
        element: <SampleComponents />,
      },
      {
        path: "other",
        element: <SampleOthers />,
      },
    ],
  },
];

export default SampleRoute;
