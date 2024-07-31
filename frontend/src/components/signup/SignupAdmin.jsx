import React, { useState, useEffect } from 'react';
import { createUser } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { listRoles } from '../../services/RoleService';

const SignupAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        listRoles().then(response => setRoles(response.data));
    }, []);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleRoleId = (e) => setRoleId(e.target.value);

    const validateForm = () => {
        let valid = true;
        setError('');

        if (!username || !password || !email || !roleId) {
            setError("All fields are required.");
            valid = false;
        }

        return valid;
    };

    const saveUser = (e) => {
        e.preventDefault();
        const isValid = validateForm();
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

        createUser(user).then((response) => {
            navigate('/loginadmin');
        }).catch((error) => {
            setError("Error creating user: " + error.message);
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 className='text-center'>Sign Up Admin</h2>
                <div style={styles.cardBody}>
                    <form style={styles.form} onSubmit={saveUser}>
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
                        <button type='submit' className='btn btn-success' style={styles.button}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '8px 8px 8px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100%',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
};

export default SignupAdmin;
