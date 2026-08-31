package com.example.attendance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("លេខកូដ OTP សម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញ");
        helper.setText(
                "<div style='font-family:sans-serif;padding:20px'>"
                        + "<h2>កំណត់ពាក្យសម្ងាត់ឡើងវិញ</h2>"
                        + "<p>លេខកូដ OTP របស់អ្នកគឺ៖</p>"
                        + "<h1 style='letter-spacing:5px;color:#2563eb'>" + otp + "</h1>"
                        + "<p>លេខកូដនេះមានសុពលភាព 5 នាទី។</p>"
                        + "</div>", true);

        mailSender.send(message);
    }
}