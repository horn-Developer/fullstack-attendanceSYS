package com.example.attendance.service;

import com.example.attendance.model.ClassRoom;
import com.example.attendance.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<ClassRoom> getAllClasses() {
        return classRepository.findAll();
    }

    public ClassRoom saveClass(ClassRoom classRoom) {
        return classRepository.save(classRoom);
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}