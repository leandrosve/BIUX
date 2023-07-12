import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import StudentRoutineDetails from './StudentRoutineDetail';
import { BRoutes } from '../../router/routes';
import StudentRoutineList from './StudentRoutineList';

const StudentRoutinesPage = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<StudentRoutineList showBreadcrumbs/>} />
        <Route path='/:id' element={<StudentRoutineDetails />} />
        <Route path='*' element={<Navigate to={BRoutes.DASHBOARD} replace />} />,
      </Routes>
      <Outlet />
    </>
  );
};

export default StudentRoutinesPage;
