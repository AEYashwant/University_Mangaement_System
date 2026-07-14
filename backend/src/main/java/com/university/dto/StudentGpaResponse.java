package com.university.dto;

public class StudentGpaResponse {
    private Long studentRecordId;
    private String studentNumber;
    private String studentName;
    private Double gpa;
    private int gradedEnrollments;
    private int gradedCredits;

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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Double getGpa() {
        return gpa;
    }

    public void setGpa(Double gpa) {
        this.gpa = gpa;
    }

    public int getGradedEnrollments() {
        return gradedEnrollments;
    }

    public void setGradedEnrollments(int gradedEnrollments) {
        this.gradedEnrollments = gradedEnrollments;
    }

    public int getGradedCredits() {
        return gradedCredits;
    }

    public void setGradedCredits(int gradedCredits) {
        this.gradedCredits = gradedCredits;
    }
}
