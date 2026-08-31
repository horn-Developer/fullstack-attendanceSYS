package com.example.attendance.repository;

import com.example.attendance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // ស្វែងរកអ្នកប្រើប្រាស់តាម Username សម្រាប់ពេល Login
    User findByUsername(String username);
    User findByEmail(String email);
}