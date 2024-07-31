import React, { useState, useEffect } from 'react';
import { listLeaves, updateLeaveStatus } from '../../services/LeaveRequestService';
import HeaderComponent from '../HeaderComponent';

const ListeLeavesRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    listLeaves()
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave requests:', error);
      });
  }, []);

  const handleStatusChange = (id, status) => {
    updateLeaveStatus(id, status)
      .then(() => {
        setLeaveRequests(prevState =>
          prevState.map(leave =>
            leave.id === id ? { ...leave, status } : leave
          )
        );
      })
      .catch(error => {
        console.error('Error updating leave request status:', error);
      });
  };

  return (
    <>
      <HeaderComponent />
      <div className="container" style={styles.container}>
        <h2 className="text-center">Leave Requests List</h2>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>days Consumed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(leave => (
                <tr key={leave.id}>
                  <td>{leave.employee.firstName} {leave.employee.lastName}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.daysConsumed}</td>
                  <td>
                    {leave.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(leave.id, 'Approved')}
                          className="btn btn-success ml-2"
                          disabled={leave.status !== 'Pending'}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(leave.id, 'Rejected')}
                          className="btn btn-danger ml-2"
                          disabled={leave.status !== 'Pending'}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>{leave.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    marginLeft: '250px',
    maxWidth: '1230px',
  },
};

export default ListeLeavesRequests;
