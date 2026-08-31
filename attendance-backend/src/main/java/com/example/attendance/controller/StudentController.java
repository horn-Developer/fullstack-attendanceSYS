package com.example.attendance.controller;

import com.example.attendance.model.Student;
import com.example.attendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // ទាញយកទិន្នន័យសិស្សទាំងអស់
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // បន្ថែមសិស្សថ្មី
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // កែប្រែព័ត៌មានសិស្ស
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("រកមិនឃើញសិស្សที่มี ID: " + id));

        student.setName(studentDetails.getName());
        student.setCardId(studentDetails.getCardId());
        student.setGender(studentDetails.getGender());
        student.setGrade(studentDetails.getGrade());

        return studentRepository.save(student);
    }

    // លុបសិស្សតាម ID
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}