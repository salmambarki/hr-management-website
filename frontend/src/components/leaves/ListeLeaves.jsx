import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listLeaves } from '../../services/LeaveRequestService';
import { listEmployees } from '../../services/EmployeeService';
import HeaderUserComponent from '../HeaderUserComponent';

const ListeLeaves = () => {
  const { id } = useParams(); // Récupérer l'ID de l'employé depuis les paramètres de l'URL
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listLeaves()
      .then(response => {
        console.log(response.data); // Vérifiez la structure des données ici
        // Filtrer les congés pour n'afficher que ceux de l'employé spécifié par l'ID
        setLeaveRequests(response.data.filter(leave => leave.employee.id == id));
      })
      .catch(error => {
        console.error("There was an error fetching the leave requests!", error);
      });

    listEmployees()
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the employees!", error);
      });
  }, [id]);

  return (
    <div className="container" style={styles.container}>
      <HeaderUserComponent employeeId={id} />
      <h2 className="text-center">Leave Request History</h2>

      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days Consumed</th>
              <th>Remaining Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(leave =>
              <tr key={leave.id}>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.daysConsumed}</td>
                <td>{leave.remainingDays}</td>
                <td>{leave.status}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    marginLeft: '250px',
    maxWidth: '1230px',
  },
};

export default ListeLeaves;
