package com.university.controller;

import com.university.dto.EnrollmentGradeUpdateRequest;
import com.university.dto.EnrollmentRequest;
import com.university.model.Enrollment;
import com.university.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:4200")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments(
            @RequestParam(required = false) String studentName,
            @RequestParam(required = false) String courseCode,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        return enrollmentService.findAll(studentName, courseCode, dateFrom, dateTo);
    }

    @PostMapping
    public ResponseEntity<Enrollment> createEnrollment(@RequestBody EnrollmentRequest request) {
        try {
            Enrollment newEnrollment = enrollmentService.enrollStudentInCourse(request);
            return ResponseEntity.ok(newEnrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enrollment> updateEnrollmentGrade(@PathVariable Long id, @RequestBody EnrollmentGradeUpdateRequest request) {
        try {
            Enrollment updatedEnrollment = enrollmentService.updateGrade(id, request.getGrade());
            return ResponseEntity.ok(updatedEnrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
        return ResponseEntity.noContent().build();
    }
}
