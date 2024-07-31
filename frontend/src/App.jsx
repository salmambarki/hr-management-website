import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListUserComponents from './components/Admin/ListeUserComponents';
import ListeEmployeeComponent from './components/employees-User/ListeEmployeeComponent';
import EmployeeComponent from './components/employees-User/EmployeeComponent';
import UserComponents from './components/Admin/UserComponents';
import ListeRolesComponents from './components/roles/ListeRolesComponents';
import ListeDepartmentComponents from './components/department/ListeDepartmentComponents';
import DepartmentComponent from './components/department/DepartmentComponents';
import RoleComponent from './components/roles/RoleComponents';

import LoginUser from './components/login/LoginUser';
import LoginAdmin from './components/login/LoginAdmin';
import SignupAdmin from './components/signup/SignupAdmin';
import SignupUser from './components/signup/SignupUser';
import ProfilUser from './components/employees-User/ProfilUser';
import LeaveRequest from './components/leaves/LeaveRequest';
import ReceptionPage from './components/Receptionpage';
import ListeLeaves from './components/leaves/ListeLeaves';
import ListeLeavesRequests from './components/leaves/ListeLeavesRequests';


function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<ReceptionPage/>} />
          <Route path='/loginuser' element={<LoginUser/>} />
          <Route path='/loginadmin' element={<LoginAdmin/>} />
          <Route path='/signupadmin' element={<SignupAdmin/>} />
          <Route path='/signupuser' element={<SignupUser/>} />
          <Route path='/employees' element={<ListeEmployeeComponent />} />
          <Route path='/leave-management/:id' element={<LeaveRequest/>} />
          <Route path='/liste-leave/:id' element={<ListeLeaves/>} />
          <Route path='/leave-management' element={<ListeLeavesRequests/>} />
          <Route path='/add-employee' element={<EmployeeComponent/>} />
          <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
          <Route path='/users' element={<ListUserComponents/>} />
          <Route path='/add-user' element={<UserComponents/>} />
          <Route path='/edit-user/:id' element={<UserComponents />} />
          <Route path='/roles' element={<ListeRolesComponents/>} />
          <Route path='/departments' element={<ListeDepartmentComponents/>} />
          <Route path='/add-department' element={<DepartmentComponent/>} />
          <Route path='/edit-department/:id' element={<DepartmentComponent/>} />
          <Route path='/add-role' element={<RoleComponent/>} />
          <Route path='/edit-role/:id' element={<RoleComponent/>} />
          <Route path='/profiluser/:id' element={<ProfilUser/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
