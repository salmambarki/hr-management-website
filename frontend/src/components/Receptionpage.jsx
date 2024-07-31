import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReceptionPage = () => {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/loginadmin');
    };

    const handleUserLogin = () => {
        navigate('/loginuser');
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minHeight: '80vh',
        },
        textContainer: {
            flex: 1,
            paddingRight: '40px',
            textAlign: 'left',
        },
        heading: {
            fontSize: '36px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
        },
        buttonContainer: {
            display: 'flex',
            gap: '20px',
        },
        button: {
            padding: '15px 30px',
            fontSize: '18px',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
                backgroundColor: '#0056b3',
            }
        },
        imageContainer: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
        },
        image: {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.textContainer}>
                <h1 style={styles.heading}>Welcome to Your Human Resource Management System</h1>
                <div style={styles.buttonContainer}>
                    <button onClick={handleAdminLogin} style={styles.button}>Admin </button>
                    <button onClick={handleUserLogin} style={styles.button}>User </button>
                </div>
            </div>
            <div style={styles.imageContainer}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_Z1bnXaPXyE3OVl7mA3df9p0t8aKIWDgIQ&s" alt="Visitor Management Software" style={styles.image} />
            </div>
        </div>
    );
};

export default ReceptionPage;
