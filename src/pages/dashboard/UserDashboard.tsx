import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import Profile from './Profile';
import MyPhotos from './MyPhotos';

export default function UserDashboard() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Profile />} />
        <Route path="photos" element={<MyPhotos />} />
      </Route>
    </Routes>
  );
}
