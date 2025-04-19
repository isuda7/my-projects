import Dashboard from "@/views/dashboard/Dashboard.tsx";
import Dashboard2ndStationDetailUser from "@/views/dashboard/detail/2gen/DashboardStationDetailUser.tsx";
import Dashboard2ndStationDetailAdmin from "@/views/dashboard/detail/2gen/DashboardStationDetailAdmin.tsx";
import Dashboard1stStationDetailUser from "@/views/dashboard/detail/1gen/DashboardStationDetailUser.tsx";
import Dashboard1stStationDetailAdmin from "@/views/dashboard/detail/1gen/DashboardStationDetailAdmin.tsx";

const DashboardRouter = [

    {
        path: "dashboard/2nd/user/:id",
        element: <Dashboard2ndStationDetailUser />
    }
    ,{
        path: "dashboard/2nd/admin/:id",
        element: <Dashboard2ndStationDetailAdmin />
    },
    {
        path: "dashboard/1st/user/:id",
        element: <Dashboard1stStationDetailUser />
    }
    ,{
        path: "dashboard/1st/admin/:id",
        element: <Dashboard1stStationDetailAdmin />
    }
];

export default DashboardRouter;
