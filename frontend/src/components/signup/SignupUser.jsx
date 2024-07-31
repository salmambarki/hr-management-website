import React, { useState, useEffect } from 'react';
import { createEmployee } from '../../services/EmployeeService';  // Importez uniquement createEmployee
import { useNavigate } from 'react-router-dom';
import { listRoles, roleById } from '../../services/RoleService';
import { departmentById, listDepartments } from '../../services/DepartmentService';

const SignupUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [salary, setSalary] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        listRoles().then(response => setRoles(response.data));
        listDepartments().then(response => setDepartments(response.data));
    }, []);

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const handleHireDate = (e) => setHireDate(e.target.value);
    const handleSalary = (e) => setSalary(e.target.value);
    const handleRoleId = (e) => setRoleId(e.target.value);
    const handleDepartmentId = (e) => setDepartmentId(e.target.value);

    const validateForm = async () => {
        let valid = true;
        setError('');

        try {
            await roleById(roleId);
        } catch (error) {
            setError(prevError => prevError + " This role does not exist.");
            valid = false;
        }

        try {
            await departmentById(departmentId);
        } catch (error) {
            setError(prevError => prevError + " This department does not exist.");
            valid = false;
        }
        return valid;
    };

    const saveEmployee = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        const role = roles.find(r => r.id === parseInt(roleId));
        const department = departments.find(d => d.id === parseInt(departmentId));

        if (!role) {
            setError("Invalid role selected.");
            return;
        }
        if (!password) {
            setError("All fields are required.");
            return;
        }

        if (!department) {
            setError("Invalid department selected.");
            return;
        }

        const employee = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            hireDate,
            salary,
            department: { id: department.id, name: department.name, description: department.description },
            role: { id: role.id, name: role.name, description: role.description }
        };

        createEmployee(employee).then((response) => {
            navigate('/loginuser');
        }).catch((error) => {
            setError("Error creating employee: " + error.message);
        });
    };

    return (
        <div className='container' style={styles.container}>
            <h2 className='text-center'>Sign Up Employee</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>First Name</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={handleFirstName}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Last Name</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={handleLastName}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={handleEmail}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={handlePassword}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input
                        type='text'
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Hire Date</label>
                    <input
                        type='date'
                        value={hireDate}
                        onChange={handleHireDate}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Salary</label>
                    <input
                        type='text'
                        value={salary}
                        onChange={handleSalary}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Department</label>
                    <select
                        name='departmentId'
                        value={departmentId}
                        onChange={handleDepartmentId}
                        style={styles.input}
                    >
                        <option value=''>Select Department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.inputGroup}>
                    <label>Role</label>
                    <select
                        name='roleId'
                        value={roleId}
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
                <button type='submit' style={styles.button} onClick={saveEmployee}>Save</button>
            </form>
        </div>
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

export default SignupUser;
