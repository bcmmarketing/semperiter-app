import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Overview from "./Overview";
import Users from "./Users";
import Destinations from "./Destinations";
import Settings from "./Settings";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
}
