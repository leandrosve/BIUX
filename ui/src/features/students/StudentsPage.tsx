import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import AutoBreadcrumbs from '../../layout/AutoBreadcrumbs'
import { InstructorStudentsProvider } from '../../context/ListsProviders'
import StudentList from './StudentList'

 const StudentsPage = () => {
  return (
    <>
          <AutoBreadcrumbs />

     <InstructorStudentsProvider>
        <Routes>
          <Route path='' element={<StudentList />} />

        </Routes>
      </InstructorStudentsProvider>
      <Outlet />
    <Outlet />
    </>
    
  )
}

export default StudentsPage;