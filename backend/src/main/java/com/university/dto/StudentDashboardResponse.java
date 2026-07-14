package com.university.dto;

import java.time.LocalDate;
import java.util.List;

public class StudentDashboardResponse {
    private Long studentRecordId;
    private String studentNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String major;
    private Double gpa;
    private int totalEnrollments;
    private int gradedEnrollments;
    private int ungradedEnrollments;
    private int totalCredits;
    private int gradedCredits;
    private LocalDate latestEnrollmentDate;
    private List<StudentDashboardEnrollment> enrollments;

    public Long getStudentRecordId() {
        return studentRecordId;
    }

    public void setStudentRecordId(Long studentRecordId) {
        this.studentRecordId = studentRecordId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Double getGpa() {
        return gpa;
    }

    public void setGpa(Double gpa) {
        this.gpa = gpa;
    }

    public int getTotalEnrollments() {
        return totalEnrollments;
    }

    public void setTotalEnrollments(int totalEnrollments) {
        this.totalEnrollments = totalEnrollments;
    }

    public int getGradedEnrollments() {
        return gradedEnrollments;
    }

    public void setGradedEnrollments(int gradedEnrollments) {
        this.gradedEnrollments = gradedEnrollments;
    }

    public int getUngradedEnrollments() {
        return ungradedEnrollments;
    }

    public void setUngradedEnrollments(int ungradedEnrollments) {
        this.ungradedEnrollments = ungradedEnrollments;
    }

    public int getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(int totalCredits) {
        this.totalCredits = totalCredits;
    }

    public int getGradedCredits() {
        return gradedCredits;
    }

    public void setGradedCredits(int gradedCredits) {
        this.gradedCredits = gradedCredits;
    }

    public LocalDate getLatestEnrollmentDate() {
        return latestEnrollmentDate;
    }

    public void setLatestEnrollmentDate(LocalDate latestEnrollmentDate) {
        this.latestEnrollmentDate = latestEnrollmentDate;
    }

    public List<StudentDashboardEnrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<StudentDashboardEnrollment> enrollments) {
        this.enrollments = enrollments;
    }
}
