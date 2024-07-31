import React, { useEffect, useState } from 'react';
import { departmentdelete, listDepartments } from '../../services/DepartmentService';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';

const ListeDepartmentComponents = () => {
    const [departments, setDepartments] = useState([]);
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllDepartments();
    }, []);

    function getAllDepartments() {
        listDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewDepartment() {
        navigate('/add-department');
    }

    function updateDepartment(id) {
        navigate(`/edit-department/${id}`);
    }

    function removeDepartment(id) {
        console.log(id);
        departmentdelete(id).then((response) => {
            getAllDepartments();
        }).catch(error => {
            console.log(error);
        });
    }

    const filteredDepartments = departments.filter(department =>
        department.id.toString().includes(searchId)
    );

    return (
        <>
            <HeaderComponent />
            <div className='container' style={styles.container}>
                <h2 className='text-center'>List of Departments</h2>
                <input
                    type='text'
                    placeholder='Search Department by ID'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
                <button className='btn btn-primary mb-2' onClick={addNewDepartment} style={styles.addButton}>
                    Add Department
                </button>
                <table className='table table-striped table-bordered' style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Department Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments.map(department => (
                            <tr key={department.id} style={styles.row}>
                                <td>{department.id}</td>
                                <td>{department.name}</td>
                                <td>{department.description}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateDepartment(department.id)} style={styles.updateButton}>
                                        Update
                                    </button>
                                    <button className='btn btn-danger' onClick={() => removeDepartment(department.id)} style={styles.deleteButton}>
                                        Delete
                                    </button>
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
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        maxWidth: '1200px',
    },
    searchInput: {
        marginBottom: '20px',
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    addButton: {
        marginBottom: '20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    thead: {
        backgroundColor: '#f8f9fa',
    },
    row: {
        textAlign: 'center',
    },
    updateButton: {
        marginRight: '10px',
        backgroundColor: '#17a2b8',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ListeDepartmentComponents;
