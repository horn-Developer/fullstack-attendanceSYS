package com.example.attendance.repository;

import com.example.attendance.model.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<ClassRoom, Long> {
    // អាចបន្ថែម Custom Query បន្ថែមនៅទីនេះប្រសិនបើត្រូវការ ឧ. ស្វែងរកតាមឈ្មោះថ្នាក់
    ClassRoom findByClassName(String className);
}