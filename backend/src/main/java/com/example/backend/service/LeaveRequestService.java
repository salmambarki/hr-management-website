package com.example.backend.service;

import com.example.backend.entity.Employee;
import com.example.backend.entity.LeaveRequest;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {
    @Autowired
    private LeaveRequestRepository repository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<LeaveRequest> getAllLeaveRequests() {
        return repository.findAll();
    }

    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        Optional<Employee> employee = employeeRepository.findById(leaveRequest.getEmployee().getId());
        if (employee.isPresent()) {
            leaveRequest.setEmployee(employee.get());
            return repository.save(leaveRequest);
        } else {
            throw new RuntimeException("Employee not found");
        }
    }


    public LeaveRequest updateLeaveRequestStatus(Long id, String status) {
        LeaveRequest leaveRequest = repository.findById(id).orElseThrow(() -> new RuntimeException("Leave Request not found"));
        leaveRequest.setStatus(status);
        return repository.save(leaveRequest);
    }
}
