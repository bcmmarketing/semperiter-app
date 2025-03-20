import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import MyPhotos from './MyPhotos';

export default function UserDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/photos" element={<MyPhotos />} />
    </Routes>
  );
}
