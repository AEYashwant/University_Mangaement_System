package com.university.repository;

import com.university.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long>, JpaSpecificationExecutor<Enrollment> {
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByStudentIdOrderByEnrollmentDateDesc(Long studentId);
    List<Enrollment> findByCourseId(Long courseId);
}
