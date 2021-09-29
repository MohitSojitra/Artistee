import React from "react";
import DashBoardLayout from "../Components/DashBoardLayout/DashBoardLayout";
import UserTable from "../Components/UserTable";

function Dashboard() {
  return (
    <DashBoardLayout title={"Artist"}>
      <UserTable />
    </DashBoardLayout>
  );
}

export default Dashboard;
