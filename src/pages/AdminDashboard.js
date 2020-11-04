import React, { useContext } from "react";
import AdminLogin from "../components/AdminLogin";
import Dashboard from "../components/Dashboard";
import { Divider, Typography } from "@material-ui/core";
import { store } from "../store/store.js";

export default function AdminDashboard() {
  const { state } = useContext(store);

  // return <div>{!state.user.age ? <AdminLogin /> : <Dashboard />}</div>;
  return (
    <div>
      {!state.user ? (
        <AdminLogin />
      ) : state.user.age === 666 ? (
        <div>
          <Typography
            variant="h5"
            style={{ display: "block", padding: 10, margin: 5 }}
          >
            Welcome to Sith-Dashboard Lord Vader
          </Typography>
          <Divider />
          <Dashboard />
        </div>
      ) : null}
    </div>
  );
}
