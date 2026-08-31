package com.example.attendance.controller;

import com.example.attendance.model.User;
import com.example.attendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // បញ្ជីអ្នកប្រើប្រាស់ទាំងអស់
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // បន្ថែមអ្នកប្រើប្រាស់ថ្មី
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // កែប្រែអ្នកប្រើប្រាស់
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id).orElseThrow();
        user.setUsername(updatedUser.getUsername());
        user.setPassword(updatedUser.getPassword());
        user.setRole(updatedUser.getRole());
        return userRepository.save(user);
    }

    // លុបអ្នកប្រើប្រាស់
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
