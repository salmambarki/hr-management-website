import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { listUsers } from '../../services/UserService';

const LoginAdmin = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      // Navigate to Homepage if user exists
      navigate('/users');
    } else {
      // Set error message if user does not exist
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1>Welcome, Administrator! 👋</h1>
        <p>
        We are delighted to have you back in our Human Resources Management application. Here, you can efficiently manage employee records, oversee recruitment processes, and ensure seamless HR operations. If you encounter any issues or need assistance, please do not hesitate to reach out to our support team.

Happy managing!
        </p>
      </div>
      <div style={styles.right}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2>Welcome Back!</h2>
          <p>Don't have an account? <Link to="/signupadmin" style={styles.link}>Create a new account now</Link>, it's FREE! Takes less than a minute.</p>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login Now</button>
         
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    backgroundColor: '#f0f4f8',
  },
  left: {
    flex: 1,
    backgroundColor: '#0052CC',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    textAlign: 'center',
  },
  right: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },

  link: {
    display: 'block',
    textAlign: 'center',
    color: '#007bff',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default LoginAdmin;
