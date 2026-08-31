package com.example.attendance.model;

import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String status;

    private Long studentId;
    private String studentName;
    private String cardId;
    private String gender;
    private String grade;

    // Constructor ទទេ
    public Attendance() {}

    // ==========================================
    // 🌟 GETTERS & SETTERS (កន្លែងដែល Controller ហៅប្រើ)
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() { // 👈 Controller ហៅ getDate() កន្លែងនេះ
        return date;
    }

    public void setDate(LocalDate date) { // 👈 Controller ហៅ setDate() កន្លែងនេះ
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}