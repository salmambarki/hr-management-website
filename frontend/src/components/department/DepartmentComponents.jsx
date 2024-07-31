import React, { useState, useEffect } from 'react';
import { createDepartment, updateDepartment, departmentById } from '../../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';

const DepartmentComponent = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        description: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            departmentById(id).then(response => {
                const department = response.data;
                setName(department.name);
                setDescription(department.description);
            }).catch(error => {
                console.error("There was an error fetching the department data!", error);
            });
        }
    }, [id]);

    const handleName = (e) => setName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);

    const saveDepartment = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const department = { name, description };
            if (id) {
                updateDepartment(id, department).then((response) => {
                    navigate('/departments');
                }).catch(error => {
                    console.error("There was an error updating the department!", error);
                });
            } else {
                createDepartment(department).then((response) => {
                    navigate('/departments');
                }).catch(error => {
                    console.error("There was an error creating the department!", error);
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    return (
        <>
            <HeaderComponent />
            <div className='container' style={styles.container}>
                <div className='row'>
                    <div style={styles.card}>
                        <h2 className='text-center'>{id ? 'Update Department' : 'Add Department'}</h2>
                        <div style={styles.cardBody}>
                            <form style={styles.form}>
                                {errors.name && <p style={styles.error}>{errors.name}</p>}
                                {errors.description && <p style={styles.error}>{errors.description}</p>}

                                <div style={styles.inputGroup}>
                                    <label>Name:</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Department Name'
                                        name='name'
                                        value={name}
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        onChange={handleName}
                                        style={styles.input}
                                    />
                                    {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label>Description:</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Description'
                                        name='description'
                                        value={description}
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        onChange={handleDescription}
                                        style={styles.input}
                                    />
                                    {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                                </div>

                                <button type='submit' className='btn btn-success' style={styles.button} onClick={saveDepartment}>Submit</button>
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

export default DepartmentComponent;
