export interface StudentGpa {
  studentRecordId: number;
  studentNumber: string;
  studentName: string;
  gpa: number | null;
  gradedEnrollments: number;
  gradedCredits: number;
}
