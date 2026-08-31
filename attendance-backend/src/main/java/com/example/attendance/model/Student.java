package com.example.attendance.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String cardId; // លេខកាតសម្រាប់ស្កេនវត្តមាន
    private String gender; // ភេទ (Male / Female)
    private String grade;  // ថ្នាក់រៀន
}