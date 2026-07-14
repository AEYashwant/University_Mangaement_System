package com.university.service;

import com.university.dto.EnrollmentRequest;
import com.university.model.Course;
import com.university.model.Enrollment;
import com.university.model.Student;
import com.university.repository.CourseRepository;
import com.university.repository.EnrollmentRepository;
import com.university.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.Locale;
import java.util.List;
import jakarta.persistence.criteria.Join;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, StudentRepository studentRepository, CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    @Transactional
    public List<Enrollment> findAll(String studentName, String courseCode, LocalDate dateFrom, LocalDate dateTo) {
        boolean hasFilters = StringUtils.hasText(studentName) || StringUtils.hasText(courseCode) || dateFrom != null || dateTo != null;
        Sort sort = Sort.by(Sort.Direction.DESC, "enrollmentDate").and(Sort.by(Sort.Direction.DESC, "id"));
        if (!hasFilters) {
            return enrollmentRepository.findAll(sort);
        }

        Specification<Enrollment> specification = (root, query, cb) -> cb.conjunction();

        if (StringUtils.hasText(studentName)) {
            String search = studentName.trim().toLowerCase(Locale.ROOT);
            specification = specification.and((root, query, cb) -> {
                Join<Enrollment, Student> student = root.join("student");
                String pattern = "%" + search + "%";
                return cb.or(
                        cb.like(cb.lower(student.get("firstName")), pattern),
                        cb.like(cb.lower(student.get("lastName")), pattern),
                        cb.like(
                                cb.lower(cb.concat(cb.concat(student.get("firstName"), " "), student.get("lastName"))),
                                pattern
                        )
                );
            });
        }

        if (StringUtils.hasText(courseCode)) {
            String search = courseCode.trim().toLowerCase(Locale.ROOT);
            specification = specification.and((root, query, cb) -> {
                Join<Enrollment, Course> course = root.join("course");
                return cb.like(cb.lower(course.get("courseCode")), "%" + search + "%");
            });
        }

        if (dateFrom != null) {
            specification = specification.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("enrollmentDate"), dateFrom));
        }

        if (dateTo != null) {
            specification = specification.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("enrollmentDate"), dateTo));
        }

        return enrollmentRepository.findAll(specification, sort);
    }

    @Transactional
    public Enrollment enrollStudentInCourse(EnrollmentRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setGrade(normalizeGrade(request.getGrade()));

        return enrollmentRepository.save(enrollment);
    }

    @Transactional
    public Enrollment updateGrade(Long enrollmentId, String grade) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setGrade(normalizeGrade(grade));
        return enrollmentRepository.save(enrollment);
    }

    @Transactional
    public void deleteEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Enrollment> findByStudentIdOrderByEnrollmentDateDesc(Long studentId) {
        return enrollmentRepository.findByStudentIdOrderByEnrollmentDateDesc(studentId);
    }

    @Transactional(readOnly = true)
    public List<Enrollment> findByStudentId(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    private String normalizeGrade(String grade) {
        if (grade == null) {
            return null;
        }

        String trimmed = grade.trim().toUpperCase(Locale.ROOT);
        return trimmed.isEmpty() ? null : trimmed;
    }
}
