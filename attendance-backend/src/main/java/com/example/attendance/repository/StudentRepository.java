package com.example.attendance.repository;

import com.example.attendance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // ស្វែងរកសិស្សតាមលេខកាត (Card ID) សម្រាប់ពេលស្កេនវត្តមាន
    Student findByCardId(String cardId);
}