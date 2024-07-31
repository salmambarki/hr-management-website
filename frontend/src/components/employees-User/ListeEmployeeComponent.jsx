import React, { useEffect, useState } from 'react';
import { employeedelete, listEmployees } from '../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';

const ListeEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        employeedelete(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        });
    }

    const filteredEmployees = employees.filter(employee => employee.id.toString().includes(searchId));

    return (
        <>
            <HeaderComponent />
            <div className='container' style={styles.container}>
                <h2 className='text-center'>List of Employees</h2>
                <input
                    type='text'
                    placeholder='Search Employee by ID'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
                <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email</th>
                            <th>Employee Department Id</th>
                            <th>Employee Role Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department.id}</td>
                                <td>{employee.role.id}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const styles = {
    container: {
        marginTop: '20px',
        marginLeft: '250px',
        maxWidth: '1230px'
    },
    searchInput: {
        marginBottom: '20px',
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
};

export default ListeEmployeeComponent;
