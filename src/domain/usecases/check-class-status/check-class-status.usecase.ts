import { ListStudentsFromClassByIdPort } from '../../../domain/ports/list-students-from-class-by-id.port';
import { CheckClassStatusInput } from './check-class-status.types';

export class CheckClassStatusUsecase {
  constructor(private readonly listStudentsFromClassByIdPort: ListStudentsFromClassByIdPort) {}

  async execute({ classId }: CheckClassStatusInput): Promise<string> {
    const students = await this.listStudentsFromClassByIdPort.execute({ classId });

    const totalStudents = students.length;
    const evaluatedStudents = students.filter((student) => student.status !== 'NAO_AVALIADO').length;

    if (evaluatedStudents === 0) {
      return 'ABERTA';
    } else if (evaluatedStudents < totalStudents) {
      return 'EM_FECHAMENTO';
    } else {
      return 'FECHADA';
    }
  }
}
