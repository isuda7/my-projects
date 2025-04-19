import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import _ from "lodash";

export default function LayoutGuide() {
  const navigate = useNavigate();

  return (
    <div className="wrap">
      {/* winpop */}
      <div className="win-pop">
        <Outlet />
      </div>
    </div>
  );
}
