import RoutineForm from './RoutineForm';
import AutoBreadcrumbs from '../../layout/AutoBreadcrumbs';
import RoutineList from './RoutineList';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Fade, Text } from '@chakra-ui/react';
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
