import RoutineForm from './RoutineForm';
import RoutineList from './RoutineList';
import { Outlet, Route, Routes } from 'react-router-dom';
import RoutineDetails from './RoutineDetails';
import { InstructorRoutinesProvider } from '../../context/ListsProviders';
import StudentDetail from '../students/StudentDetail';

const RoutinesPage = () => {
  return (
    <>
      <InstructorRoutinesProvider>
        <Routes>
          <Route path='crear' element={<RoutineForm />} />
          <Route path='' element={<RoutineList />} />
          <Route path='/:id' element={<RoutineDetails />} />
          <Route path='/:routineId/alumno/:id' element={<StudentDetail />} />
        </Routes>
      </InstructorRoutinesProvider>
      <Outlet />
    </>
  );
};

export default RoutinesPage;
