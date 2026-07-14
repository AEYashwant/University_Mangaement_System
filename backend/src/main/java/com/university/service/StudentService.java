package com.university.service;

import com.university.dto.StudentDashboardEnrollment;
import com.university.dto.StudentDashboardResponse;
import com.university.dto.StudentGpaResponse;
import com.university.model.Enrollment;
import com.university.model.Student;
import com.university.repository.EnrollmentRepository;
import com.university.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    private static final Map<String, Double> GRADE_POINTS = new HashMap<>();

    static {
        GRADE_POINTS.put("A+", 4.0);
        GRADE_POINTS.put("A", 4.0);
        GRADE_POINTS.put("A-", 3.7);
        GRADE_POINTS.put("B+", 3.3);
        GRADE_POINTS.put("B", 3.0);
        GRADE_POINTS.put("B-", 2.7);
        GRADE_POINTS.put("C+", 2.3);
        GRADE_POINTS.put("C", 2.0);
        GRADE_POINTS.put("C-", 1.7);
        GRADE_POINTS.put("D+", 1.3);
        GRADE_POINTS.put("D", 1.0);
        GRADE_POINTS.put("D-", 0.7);
        GRADE_POINTS.put("F", 0.0);
    }

    public StudentService(StudentRepository studentRepository, EnrollmentRepository enrollmentRepository) {
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Transactional(readOnly = true)
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    @Transactional
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    @Transactional
    public void deleteById(Long id) {
        studentRepository.deleteById(id);
    }

    @Transactional
    public Student update(Long id, Student studentDetails) {
        return studentRepository.findById(id).map(student -> {
            student.setFirstName(studentDetails.getFirstName());
            student.setLastName(studentDetails.getLastName());
            student.setEmail(studentDetails.getEmail());
            student.setMajor(studentDetails.getMajor());
            student.setStudentId(studentDetails.getStudentId());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    @Transactional(readOnly = true)
    public StudentGpaResponse getStudentGpa(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + studentId));

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);
        GpaComputationResult result = calculateGpa(enrollments);

        StudentGpaResponse response = new StudentGpaResponse();
        response.setStudentRecordId(student.getId());
        response.setStudentNumber(student.getStudentId());
        response.setStudentName(buildStudentName(student));
        response.setGpa(result.getGpa());
        response.setGradedEnrollments(result.getGradedEnrollments());
        response.setGradedCredits(result.getGradedCredits());
        return response;
    }

    @Transactional(readOnly = true)
    public StudentDashboardResponse getStudentDashboard(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + studentId));

        List<Enrollment> enrollments = enrollmentRepository.findByStudentIdOrderByEnrollmentDateDesc(studentId);
        GpaComputationResult gpaResult = calculateGpa(enrollments);

        StudentDashboardResponse response = new StudentDashboardResponse();
        response.setStudentRecordId(student.getId());
        response.setStudentNumber(student.getStudentId());
        response.setFirstName(student.getFirstName());
        response.setLastName(student.getLastName());
        response.setEmail(student.getEmail());
        response.setMajor(student.getMajor());
        response.setGpa(gpaResult.getGpa());
        response.setTotalEnrollments(enrollments.size());
        response.setGradedEnrollments(gpaResult.getGradedEnrollments());
        response.setUngradedEnrollments(enrollments.size() - gpaResult.getGradedEnrollments());
        response.setTotalCredits(enrollments.stream().mapToInt(enrollment -> enrollment.getCourse().getCredits()).sum());
        response.setGradedCredits(gpaResult.getGradedCredits());
        response.setLatestEnrollmentDate(enrollments.isEmpty() ? null : enrollments.get(0).getEnrollmentDate());

        List<StudentDashboardEnrollment> dashboardEnrollments = enrollments.stream().map(this::mapToDashboardEnrollment).toList();
        response.setEnrollments(dashboardEnrollments);
        return response;
    }

    private StudentDashboardEnrollment mapToDashboardEnrollment(Enrollment enrollment) {
        StudentDashboardEnrollment dashboardEnrollment = new StudentDashboardEnrollment();
        dashboardEnrollment.setEnrollmentId(enrollment.getId());
        dashboardEnrollment.setCourseId(enrollment.getCourse().getId());
        dashboardEnrollment.setCourseCode(enrollment.getCourse().getCourseCode());
        dashboardEnrollment.setCourseTitle(enrollment.getCourse().getTitle());
        dashboardEnrollment.setCredits(enrollment.getCourse().getCredits());
        dashboardEnrollment.setEnrollmentDate(enrollment.getEnrollmentDate());
        dashboardEnrollment.setGrade(enrollment.getGrade());
        dashboardEnrollment.setGradePoints(resolveGradePoints(enrollment.getGrade()));
        return dashboardEnrollment;
    }

    private GpaComputationResult calculateGpa(List<Enrollment> enrollments) {
        double weightedPoints = 0.0;
        int gradedCredits = 0;
        int gradedEnrollments = 0;

        for (Enrollment enrollment : enrollments) {
            Double gradePoints = resolveGradePoints(enrollment.getGrade());
            if (gradePoints == null) {
                continue;
            }

            int credits = enrollment.getCourse().getCredits();
            weightedPoints += gradePoints * credits;
            gradedCredits += credits;
            gradedEnrollments++;
        }

        Double gpa = gradedCredits == 0 ? null : roundToTwoDecimals(weightedPoints / gradedCredits);
        return new GpaComputationResult(gpa, gradedEnrollments, gradedCredits);
    }

    private Double resolveGradePoints(String grade) {
        if (grade == null) {
            return null;
        }

        Double gradePoints = GRADE_POINTS.get(grade.trim().toUpperCase(Locale.ROOT));
        return gradePoints;
    }

    private Double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private String buildStudentName(Student student) {
        String firstName = student.getFirstName() == null ? "" : student.getFirstName().trim();
        String lastName = student.getLastName() == null ? "" : student.getLastName().trim();
        return (firstName + " " + lastName).trim();
    }

    private static class GpaComputationResult {
        private final Double gpa;
        private final int gradedEnrollments;
        private final int gradedCredits;

        private GpaComputationResult(Double gpa, int gradedEnrollments, int gradedCredits) {
            this.gpa = gpa;
            this.gradedEnrollments = gradedEnrollments;
            this.gradedCredits = gradedCredits;
        }

        private Double getGpa() {
            return gpa;
        }

        private int getGradedEnrollments() {
            return gradedEnrollments;
        }

        private int getGradedCredits() {
            return gradedCredits;
        }
    }
}
