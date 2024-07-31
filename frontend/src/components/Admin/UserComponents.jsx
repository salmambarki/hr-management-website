import React, { useState, useEffect } from 'react';
import { createUser, updateUser, userById } from '../../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import { listRoles, roleById } from '../../services/RoleService';
import HeaderComponent from '../HeaderComponent';

const UserComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        listRoles().then(response => setRoles(response.data));

        if (id) {
            userById(id).then(response => {
                const user = response.data;
                setUsername(user.username);
                setPassword(user.password);
                setEmail(user.email);
                setRoleId(user.role.id);
            });
        }
    }, [id]);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleRoleId = (e) => setRoleId(e.target.value);

    const validateForm = async () => {
        let valid = true;
        setError('');

        if (!username || !password || !email || !roleId) {
            setError("All fields are required.");
            valid = false;
        }

        return valid;
    };

    const saveUser = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        const role = roles.find(r => r.id === parseInt(roleId));

        if (!role) {
            setError("Invalid role selected.");
            return;
        }

        const user = {
            username,
            password,
            email,
            role: { id: role.id, name: role.name, description: role.description }
        };

        if (id) {
            updateUser(id, user).then((response) => {
                navigate('/users');
            }).catch((error) => {
                setError("Error updating user: " + error.message);
            });
        } else {
            createUser(user).then((response) => {
                navigate('/users');
            }).catch((error) => {
                setError("Error creating user: " + error.message);
            });
        }
    };

    return (
        <>
            <HeaderComponent />
            <div className='container' style={styles.container}>
                <div className='row'>
                    <div  style={styles.card}>
                        <h2 className='text-center'>{id ? 'Update Admin' : 'Add Admin'}</h2>
                        <div  style={styles.cardBody}>
                            <form style={styles.form}>
                                {error && <p style={styles.error}>{error}</p>}
                                <div style={styles.inputGroup}>
                                    <label>Username:</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Username'
                                        name='username'
                                        value={username}
                                        className='form-control'
                                        onChange={handleUsername}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label>Password:</label>
                                    <input
                                        type='password'
                                        placeholder='Enter Password'
                                        name='password'
                                        value={password}
                                        className='form-control'
                                        onChange={handlePassword}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label>Email:</label>
                                    <input
                                        type='email'
                                        placeholder='Enter Email'
                                        name='email'
                                        value={email}
                                        className='form-control'
                                        onChange={handleEmail}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label>Role:</label>
                                    <select
                                        name='roleId'
                                        value={roleId}
                                        className='form-control'
                                        onChange={handleRoleId}
                                        style={styles.input}
                                    >
                                        <option value=''>Select Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type='submit' className='btn btn-success' style={styles.button} onClick={saveUser}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        backgroundColor: '#fff',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '10px',
        boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '5px',
        width: '300px',  // Make input fields wider
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        gridColumn: 'span 2',
        padding: '6px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default UserComponent;
