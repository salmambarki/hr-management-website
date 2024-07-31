import React, { useEffect, useState } from 'react';
import { deleteUser, listUsers } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';

const ListUserComponents = () => {
    const [users, setUsers] = useState([]);
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    function getAllUsers() {
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewUser() {
        navigate('/add-user');
    }

    function updateUser(id) {
        navigate(`/edit-user/${id}`);
    }

    function removeUser(id) {
        deleteUser(id).then((response) => {
            getAllUsers();
        }).catch(error => {
            console.error(error);
        });
    }

    const filteredUsers = users.filter(user => user.id.toString().includes(searchId));

    return (
        <>
            <HeaderComponent />
            <div className='container' style={styles.container}>
                <h2 className='text-center'>List of Admins</h2>
                <input
                    type='text'
                    placeholder='Search User by ID'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
                <button className='btn btn-primary mb-2' onClick={addNewUser}>Add User</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Admin Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role.id}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateUser(user.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeUser(user.id)}>Delete</button>
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
};

export default ListUserComponents;
