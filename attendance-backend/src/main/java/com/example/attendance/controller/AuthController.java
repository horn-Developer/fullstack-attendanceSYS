package com.example.attendance.controller;

import com.example.attendance.dto.ForgotPasswordDto;
import com.example.attendance.dto.ResetPasswordDto;
import com.example.attendance.dto.VerifyOtpDto;
import com.example.attendance.model.User;
import com.example.attendance.repository.UserRepository;
import com.example.attendance.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // ===== Login =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User user = userRepository.findByUsername(loginUser.getUsername());
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខសម្ងាត់មិនត្រឹមត្រូវ!");
    }

    // ===== Register =====
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ===== 1) Forgot Password: ផ្ញើ OTP ទៅ Email =====
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto dto) {
        Map<String, String> res = new HashMap<>();
        User user = userRepository.findByEmail(dto.getEmail());

        if (user == null) {
            res.put("message", "រកមិនឃើញ Email នេះទេ");
            return ResponseEntity.status(404).body(res);
        }

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user.setOtpCode(otp);
        user.setOtpExpires(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        try {
            emailService.sendOtpEmail(dto.getEmail(), otp);
        } catch (Exception e) {
            e.printStackTrace(); // ✅ បង្ហាញ error ពិតប្រាកដក្នុង console
            res.put("message", "មិនអាចផ្ញើ Email បានទេ: " + e.getMessage());
            return ResponseEntity.status(500).body(res);
        }

        res.put("message", "OTP ត្រូវបានផ្ញើទៅ Email របស់អ្នកហើយ");
        return ResponseEntity.ok(res);
    }

    // ===== 2) Verify OTP =====
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpDto dto) {
        Map<String, String> res = new HashMap<>();
        User user = userRepository.findByEmail(dto.getEmail());

        if (user == null || user.getOtpCode() == null || !user.getOtpCode().equals(dto.getOtp())) {
            res.put("message", "OTP មិនត្រឹមត្រូវ");
            return ResponseEntity.status(400).body(res);
        }

        if (LocalDateTime.now().isAfter(user.getOtpExpires())) {
            res.put("message", "OTP ផុតកំណត់ហើយ");
            return ResponseEntity.status(400).body(res);
        }

        res.put("message", "OTP ត្រឹមត្រូវ");
        return ResponseEntity.ok(res);
    }

    // ===== 3) Reset Password =====
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto dto) {
        Map<String, String> res = new HashMap<>();
        User user = userRepository.findByEmail(dto.getEmail());

        if (user == null || user.getOtpCode() == null
                || !user.getOtpCode().equals(dto.getOtp())
                || LocalDateTime.now().isAfter(user.getOtpExpires())) {
            res.put("message", "OTP មិនត្រឹមត្រូវ ឬផុតកំណត់");
            return ResponseEntity.status(400).body(res);
        }

        user.setPassword(dto.getNewPassword());
        user.setOtpCode(null);
        user.setOtpExpires(null);
        userRepository.save(user);

        res.put("message", "កំណត់ពាក្យសម្ងាត់ថ្មីបានជោគជ័យ");
        return ResponseEntity.ok(res);
    }
}