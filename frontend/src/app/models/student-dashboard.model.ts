export interface StudentDashboardEnrollment {
  enrollmentId: number;
  courseId: number;
  courseCode: string;
  courseTitle: string;
  credits: number;
  enrollmentDate: string;
  grade: string | null;
  gradePoints: number | null;
}

export interface StudentDashboard {
  studentRecordId: number;
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  gpa: number | null;
  totalEnrollments: number;
  gradedEnrollments: number;
  ungradedEnrollments: number;
  totalCredits: number;
  gradedCredits: number;
  latestEnrollmentDate: string | null;
  enrollments: StudentDashboardEnrollment[];
}
