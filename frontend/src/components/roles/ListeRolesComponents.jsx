import React, { useEffect, useState } from 'react';
import { listRoles, roledelete } from '../../services/RoleService';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';

const ListeRolesComponents = () => {
    const [roles, setRole] = useState([]);
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllRoles();
    }, []);

    function getAllRoles() {
        listRoles().then((response) => {
            setRole(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewRole() {
        navigate('/add-role');
    }

    function updateRole(id) {
        navigate(`/edit-role/${id}`);
    }

    function removeRole(id) {
        roledelete(id).then((response) => {
            getAllRoles();
        }).catch(error => {
            console.error(error);
        });
    }

    const filteredRoles = roles.filter(role => role.id.toString().includes(searchId));

    return (
        <>
            <HeaderComponent />
            <div className='container' style={styles.container}>
                <h2 className='text-center'>List of Roles</h2>
                <input
                    type='text'
                    placeholder='Search Role by ID'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
                <button className='btn btn-primary mb-2' onClick={addNewRole}>Add Role</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Role Id</th>
                            <th>Role Name</th>
                            <th>Role Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoles.map(role => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>{role.description}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateRole(role.id)} style={styles.button}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeRole(role.id)} style={styles.button}>Delete</button>
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
        maxWidth: '1200px'
    },
    searchInput: {
        marginBottom: '20px',
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        marginRight: '5px',
    }
};

export default ListeRolesComponents;
