import { Outlet, Route, Routes } from 'react-router-dom'
import { InstructorStudentsProvider } from '../../context/ListsProviders'
import StudentList from './StudentList'
import StudentDetail from '../students/StudentDetail';

 const StudentsPage = () => {
  return (
    <>
 
     <InstructorStudentsProvider>
        <Routes>
          <Route path='' element={<StudentList />} />
          <Route path='/:id' element={<StudentDetail />} />
        </Routes>
      </InstructorStudentsProvider>
      <Outlet />
    <Outlet />
    </>
    
  )
}

export default StudentsPage;