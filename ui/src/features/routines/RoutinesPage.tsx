import RoutineForm from './RoutineForm';
import RoutineList from './RoutineList';
import { Outlet, Route, Routes } from 'react-router-dom';
import RoutineDetails from './RoutineDetails';
import { InstructorRoutinesProvider } from '../../context/ListsProviders';

const RoutinesPage = () => {
  return (
    <>
      <InstructorRoutinesProvider>
        <Routes>
          <Route path='crear' element={<RoutineForm />} />

          <Route path='' element={<RoutineList />} />
          <Route path='/:id' element={<RoutineDetails />} />
        </Routes>
      </InstructorRoutinesProvider>
      <Outlet />
    </>
  );
};

export default RoutinesPage;
