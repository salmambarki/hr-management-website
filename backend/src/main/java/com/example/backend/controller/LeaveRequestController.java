package com.example.backend.controller;

import com.example.backend.entity.LeaveRequest;
import com.example.backend.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService service;

    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return service.getAllLeaveRequests();
    }

    @PostMapping
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        return service.createLeaveRequest(leaveRequest);
    }

    @PutMapping("/{id}/status")
    public LeaveRequest updateLeaveRequestStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateLeaveRequestStatus(id, status);
    }
}

