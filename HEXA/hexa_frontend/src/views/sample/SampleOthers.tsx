import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import Header from "@/new_components/common/Header.tsx";

import ThreeTest from "./others/ThreeTest";
import TestComponent from "./others/TestComponent";

export default function SampleOthers() {

  return (
    <>
      <Header headName="Other Samples" />
      <ThreeTest />
    </>
  );
}
