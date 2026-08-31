package com.example.attendance.controller;

import com.example.attendance.model.Attendance;
import com.example.attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // ទាញយកវត្តមានប្រចាំថ្ងៃ
    @GetMapping("/today")
    public List<Attendance> getTodayAttendance() {
        return attendanceRepository.findByDate(LocalDate.now());
    }

    // ទាញយកវត្តមានតាម Date
    @GetMapping
    public List<Attendance> getAttendanceByDate(@RequestParam(required = false) String date) {
        if (date != null && !date.isEmpty()) {
            LocalDate searchDate = LocalDate.parse(date);
            return attendanceRepository.findByDate(searchDate);
        }
        return attendanceRepository.findAll();
    }

    // កត់ត្រាវត្តមានសិស្ស
    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        if (attendance.getDate() == null) {
            attendance.setDate(LocalDate.now());
        }
        return attendanceRepository.save(attendance);
    }
}