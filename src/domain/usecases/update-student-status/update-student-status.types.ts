export interface UpdateStudentStatusInput {
  studentId: string;
  newStatus: string;
}

export interface UpdateStudentStatusOutput {
  success: boolean;
  message: string;
}
