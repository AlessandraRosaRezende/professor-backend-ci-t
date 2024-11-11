export interface UpdateStudentStatusRequestBody {
  aulas_lecionadas: number;
  aulas_atendidas: number;
  nota_p1: number;
  nota_p2: number;
}

export interface UpdateStudentStatusResponseBody {
  id: string;
  name: string;
  status: string;
}
