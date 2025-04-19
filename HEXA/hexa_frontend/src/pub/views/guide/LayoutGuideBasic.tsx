import { Outlet } from "react-router-dom";

export default function LayoutGuideBasic() {
  return (
    <div className="wrap-basic">
      <Outlet />
    </div>
  );
}
