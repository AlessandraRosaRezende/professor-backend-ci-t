export interface UpdateStudentStatusPortInput {
  studentId: string;
  aulasLecionadas: number;
  aulasAtendidas: number;
  notaP1: number;
  notaP2: number;
  status?: string; // O status será calculado no usecase e passado aqui
}

export interface UpdateStudentStatusPortResult {
  id: string;
  name: string;
  status: string;
}

export interface UpdateStudentStatusPort {
  execute(input: UpdateStudentStatusPortInput): Promise<UpdateStudentStatusPortResult>;
}
