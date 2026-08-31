package com.example.attendance.controller;

import com.example.attendance.model.ClassRoom;
import com.example.attendance.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ClassController {

    @Autowired
    private ClassRepository classRepository;

    //បញ្ជីថ្នាក់រៀនទាំងអស់
    @GetMapping
    public List<ClassRoom> getAllClasses() {
        return classRepository.findAll();
    }

    // បន្ថែមថ្នាក់រៀនថ្មី
    @PostMapping
    public ClassRoom createClass(@RequestBody ClassRoom classRoom) {
        return classRepository.save(classRoom);
    }

    // លុបថ្នាក់រៀនតាម ID
    @DeleteMapping("/{id}")
    public void deleteClass(@PathVariable Long id) {
        classRepository.deleteById(id);
    }
}