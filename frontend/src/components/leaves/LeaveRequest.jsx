import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createLeave } from '../../services/LeaveRequestService';
import HeaderUserComponent from '../HeaderUserComponent';

const LeaveRequest = () => {
  const { id } = useParams();  // Récupérer l'ID de l'employé depuis les paramètres de l'URL
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysConsumed, setDaysConsumed] = useState('');
  const [remainingDays, setRemainingDays] = useState('');
  const [error, setError] = useState('');

  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);
  const handleDaysConsumed = (e) => setDaysConsumed(e.target.value);
  const handleRemainingDays = (e) => setRemainingDays(e.target.value);

  const validateForm = () => {
    let valid = true;
    setError('');

    if (!startDate || !endDate || !daysConsumed || !remainingDays) {
      setError("All fields are required.");
      valid = false;
    }

    return valid;
  };

  const saveLeaveRequest = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const leaveRequest = {
      startDate,
      endDate,
      daysConsumed,
      remainingDays,
      status: 'Pending',
      employee: {id : id},
    };
  
    createLeave(leaveRequest)
      .then(response => {
        navigate(`/liste-leave/${id}`);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 500) {
            setError("Internal server error. Please try again later.");
          } else {
            setError("Error: " + error.response.data.message);
          }
        } else if (error.request) {
          setError("Network error. Please check your internet connection.");
        } else {
          setError("Unknown error occurred.");
        }
      });
  };
  

  return (
    <>
      <HeaderUserComponent employeeId={id} />
      <div className='container' style={styles.container}>
        <div className='row'>
          <div style={styles.card}>
            <h2 className='text-center'>Create Leave Request</h2>
            <div style={styles.cardBody}>
              <form style={styles.form} onSubmit={saveLeaveRequest}>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.inputGroup}>
                  <label>Start Date:</label>
                  <input
                    type='date'
                    placeholder='Enter Start Date'
                    name='startDate'
                    value={startDate}
                    className='form-control'
                    onChange={handleStartDate}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label>End Date:</label>
                  <input
                    type='date'
                    placeholder='Enter End Date'
                    name='endDate'
                    value={endDate}
                    className='form-control'
                    onChange={handleEndDate}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label>Days Consumed:</label>
                  <input
                    type='number'
                    placeholder='Enter Days Consumed'
                    name='daysConsumed'
                    value={daysConsumed}
                    className='form-control'
                    onChange={handleDaysConsumed}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label>Remaining Days:</label>
                  <input
                    type='number'
                    placeholder='Enter Remaining Days'
                    name='remainingDays'
                    value={remainingDays}
                    className='form-control'
                    onChange={handleRemainingDays}
                    style={styles.input}
                  />
                </div>

                <button type='submit' className='btn btn-success' style={styles.button}>Submit</button>
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

export default LeaveRequest;
