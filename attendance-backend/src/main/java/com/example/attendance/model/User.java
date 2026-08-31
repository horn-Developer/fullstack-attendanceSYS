package com.example.attendance.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // ឈ្មោះសម្រាប់ចូលប្រព័ន្ធ
    private String password; // លេខសម្ងាត់
    private String role;     // តួនាទី (ឧ. ADMIN ឬ TEACHER)
    private String email;

    private String otpCode;
    private LocalDateTime otpExpires;

}